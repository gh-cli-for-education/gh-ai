/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 20/05/2024
 * @desc Contains the gh-ai OpenAI API calls
 */
import OpenAI from 'openai';
import { z } from 'zod';

import { API, CONSOLE_PROMPT } from '../utils.js';
import { createOrRetreiveAssistant, createOrRetreiveThread, call } from './call.js';
import { TOOLS, TOOLS_DESCRIPTIONS } from './tools.js';
'use strict';

/**
 * The interface function of openai to be used by gh-ai
 * @param {object} responseObject The object where all the data is going to be stored
 * @param {string} outputDirectory The output directory to generate the files created by the ai
 * @param {object} options The program options 
 */
API['OPENAI'] = async function(responseObject, outputDirectory, options) {
  
  const OPENAI = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  let assistant = undefined;
  let thread = undefined;

  try {

    // Creating the assistant and thread
    assistant = await createOrRetreiveAssistant(OPENAI, responseObject.systemPrompt, options.llmModel, TOOLS_DESCRIPTIONS, process.env.ASSISTANT_ID);
    thread = await createOrRetreiveThread(OPENAI, process.env.THREAD_ID);

    for (const PROMPT of responseObject.userPrompts) {

      console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT.title}`);

      // For each prompt section
      for (const PROMPT_SECTION of PROMPT.prompts) {

        console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT_SECTION.title}`);

        let callResult = await call(OPENAI, PROMPT_SECTION.text, assistant.id, thread.id, PROMPT_SECTION.executeTool);

        // If a tool is required then it is executed, the ouput is send to the ai
        while (callResult.runStatus === 'requires_action' && !process.env.GRACEFUL_SHUTDOWN) {
          let toolOutputs = await manageToolActions(OPENAI, thread.id, callResult.runID, outputDirectory, options);
          callResult = await call(OPENAI, toolOutputs, assistant.id, thread.id, undefined, callResult.runID);
        }

        await addResponseToPrompt(OPENAI, PROMPT_SECTION, thread.id, callResult.runID);
        
        if (callResult.runStatus === 'failed' || process.env.GRACEFUL_SHUTDOWN) { 
          return; 
        } 
      }
    }

    await calculatePromgramTotalUsage(responseObject);
    console.log(`\n${CONSOLE_PROMPT.GH_AI}The ${options.llmApi} API call has been executed successfully!`);
  } 
  // No matter what happens the asisstant and thread must be deleted or saved
  finally {
    
    if (!options.saveAssistant && assistant) {
      await OPENAI.beta.assistants.del(assistant.id);
    }
    else if (assistant) {
      responseObject.assistant = assistant.id;
    }
  
    if (!options.saveThread && thread) {
      await OPENAI.beta.threads.del(thread?.id);
    }
    else if (thread) {
      responseObject.thread = thread.id;
    }

  }
}

/**
 * Store the AI response inside the corresponding prompt object
 * @param {OpenAI} openai The openai API object
 * @param {object} prompt The corresponding prompt where the response is going to be stored
 * @param {string} threadID 
 * @param {string} runID 
 */
async function addResponseToPrompt(openai, prompt, threadID, runID) {
  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  let assistantResponse = '';

  if (RUN.status !== 'completed') {
    assistantResponse = RUN.last_error?.message;
  }
  else {
    // retreiving the entire message list
    const MESSAGES_LIST = await openai.beta.threads.messages.list(threadID); 
    
    // Find the last assistant(AI) response
    const LATEST_ASSISTANT_MESSAGE = MESSAGES_LIST.data.find((message) => { 
      return message.role === 'assistant'; 
    });
    
    // Extract all the possible messages within the ai response 
    assistantResponse = LATEST_ASSISTANT_MESSAGE.content?.map((content) => { 
      return content.text.value; 
    });
  }

  prompt.response = assistantResponse;
  prompt.usage = RUN.usage;
}

/**
 * Traverse the reponse object to calculate the total token usage of the program
 * @param {object} responseObject 
 */
async function calculatePromgramTotalUsage(responseObject) {
  for (const PROMPT of responseObject.userPrompts) {
    let promptUsage = PROMPT.usage;

    for (const PROMPT_SECTION of PROMPT.prompts) {
      let sectionUsage = PROMPT_SECTION.usage;

      promptUsage.totalPromptTokens     += sectionUsage.prompt_tokens;
      promptUsage.totalCompletionTokens += sectionUsage.completion_tokens;
      promptUsage.totalTokens           += sectionUsage.total_tokens;
    }

    responseObject.usage.totalPromptTokens     += promptUsage.totalPromptTokens;
    responseObject.usage.totalCompletionTokens += promptUsage.totalCompletionTokens;
    responseObject.usage.totalTokens           += promptUsage.totalTokens;
  }
}

/**
 * Given the name of the tool to execute and the corresponding input 
 * this function execute it and return the output
 * @param {OpenAI} openai the API object
 * @param {string} threadID 
 * @param {string} runID 
 * @param {string} outputDirectory In case the function needs it  
 * @param {object} options 
 * @returns {object} Returns an object with the tool id and the corresponding output
 */
async function manageToolActions(openai, threadID, runID, outputDirectory, options) {

  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  if (RUN.required_action.type === 'submit_tool_outputs') {

    let requiredActions = RUN.required_action.submit_tool_outputs;
    let outputs = await Promise.all(requiredActions.tool_calls.map(async (call) => {

      if (options.debug) 
        console.log(`${CONSOLE_PROMPT.DEBUG}Executing ${call.function.name} tool.`);

      let toolOutput = {
        tool_call_id: call.id,
        output: '',
      };

      try {
        toolOutput.output = await TOOLS[call.function.name](call.function.arguments, outputDirectory, options);
        console.log(`${CONSOLE_PROMPT.GH_AI}Tool executed successfully!.`);
      } catch (error) {
        console.error(`${CONSOLE_PROMPT.WARNING}Tool execution failed. The AI failed to give a valid input.`);
        if (error instanceof SyntaxError || error instanceof z.ZodError) {
          let errorMsg = (error instanceof SyntaxError)? 'JSON Syntax' : 'Schema';
          toolOutput.output = `The input object doens't have a valid ${errorMsg}. Make sure to rewrite the input using the correct syntax and schema.`;
        }
        else {
          console.error(`${CONSOLE_PROMPT.WARNING}Tool execution failed. The tool had an internal error.`);
          if (options.debug) { console.log(error); }
          toolOutput.output = 'Unexpected Error ocurred';
        }
        return toolOutput;
      }
      return toolOutput;
    }));

    return { tool_outputs: outputs };
  }

  throw new OpenAI.APIError(-3, {
    type: 'submit_tool_outputs_error',
    message: 'The action required was not a tool output submition.'
  });
}

export { API };
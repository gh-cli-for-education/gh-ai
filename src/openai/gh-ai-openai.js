import OpenAI from 'openai';
import { z } from 'zod';

import { API, CONSOLE_PROMPT } from '../utils.js';
import { createOrRetreiveAssistant, createOrRetreiveThread, call } from './call.js';
import { TOOLS, TOOLS_DESCRIPTIONS } from './tools.js';
'use strict';

/**
 * 
 * @param {object} responseObject 
 * @param {string} outputDirectory 
 * @param {object} options 
 * @returns 
 */
API['OPENAI'] = async function(responseObject, outputDirectory, options) {
  
  const OPENAI = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  let assistant = undefined;
  let thread = undefined;

  try {

    // Se obtienen el asistente y la conversación, en caso de que no existan en el env se generan unos nuevos
    assistant = await createOrRetreiveAssistant(OPENAI, responseObject.systemPrompt, options.llmModel, TOOLS_DESCRIPTIONS, process.env.ASSISTANT_ID);
    thread = await createOrRetreiveThread(OPENAI, process.env.THREAD_ID);

    // Por cada prompt del usuario
    for (const PROMPT of responseObject.userPrompts) {

      console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT.title}`);

      // Por cada sección de un mismo prompt
      /** @TODO HAY UN "BUG" QUE SI PASA UN CONTENT QUE NO ES UN ARRAY SINO UNA SOLA STRING EMPEZARÁ A EJECUTAR LETRA POR LETRA DE LA STRING */
      for (const PROMPT_SECTION of PROMPT.prompts) {

        console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT_SECTION.title}`);

        // Se llama a la api 
        let callResult = await call(OPENAI, PROMPT_SECTION.text, assistant.id, thread.id, PROMPT_SECTION.executeTool);

        // En caso de que se requiera una acción, se ejecuta y se vuelva a llamar a la API con la respuesta de la Tool todas las veces que sea necesaria 
        while (callResult.runStatus === 'requires_action' && !process.env.GRACEFUL_SHUTDOWN) {
          let toolOutputs = await manageToolActions(OPENAI, thread.id, callResult.runID, outputDirectory, options);
          callResult = await call(OPENAI, toolOutputs, assistant.id, thread.id, undefined, callResult.runID);
        }

        // Se añade el mensaje al responseObject
        await addResponseToPrompt(OPENAI, PROMPT_SECTION, thread.id, callResult.runID);
        
        // await addResultToResponseObject(OPENAI, responseObject, { title: PROMPT.title, content: PROMPT_SECTION }, thread.id, callResult.runID, options.tokensVerbose);

        // En caso de error or SIGINT detener la ejecución
        if (callResult.runStatus === 'failed' || process.env.GRACEFUL_SHUTDOWN) { 
          return; 
        } 
      }
    }

    await calculatePromgramTotalUsage(responseObject);
    console.log(`\n${CONSOLE_PROMPT.GH_AI}The ${options.llmApi} API call has been executed successfully!`);
  } 
  // Independientemente de lo que ocurra, sea una ejecución correcta o exista una excepción se debe limpiar o guardar la memoria
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
 * 
 * @param {OpenAI} openai 
 * @param {object} prompt 
 * @param {string} threadID 
 * @param {string} runID 
 * @param {boolean} tokensVerbose 
 */
async function addResponseToPrompt(openai, prompt, threadID, runID) {
  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  let assistantResponse = '';

  // Se comprueba si se debe pasar el mensaje de error o no
  if (RUN.status !== 'completed') {
    assistantResponse = RUN.last_error?.message;
  }
  else {
    // Se obtiene la lista de mensajes (Tanto de usuario como IA)
    const MESSAGES_LIST = await openai.beta.threads.messages.list(threadID); 
    
    // Se encuentra el ultimo mensaje de la IA(assistant), que en este caso será el primer mensaje del array con role assistant
    const LATEST_ASSISTANT_MESSAGE = MESSAGES_LIST.data.find((message) => { 
      return message.role === 'assistant'; 
    });
    
    // Se obtiene todos los posibles textos que haya podido generar en un solo mensaje.
    assistantResponse = LATEST_ASSISTANT_MESSAGE.content?.map((content) => { 
      return content.text.value; 
    });
  }

  prompt.response = assistantResponse;
  prompt.usage = RUN.usage;
}

/**
 * 
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
 * @param {OpenAI} openai
 * @param {string} threadID 
 * @param {string} runID 
 * @param {string} outputDirectory 
 * @param {object} options 
 * @returns 
 */
async function manageToolActions(openai, threadID, runID, outputDirectory, options) {

  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  if (RUN.required_action.type === 'submit_tool_outputs') {

    let requiredActions = RUN.required_action.submit_tool_outputs;
    let outputs = await Promise.all(requiredActions.tool_calls.map(async (call) => {

      console.log(`${CONSOLE_PROMPT.DEBUG}Executing ${call.function.name} tool.`);

      let toolOutput = '';

      try {
        toolOutput = await TOOLS[call.function.name](call.function.arguments, outputDirectory, options);
        console.log(`${CONSOLE_PROMPT.GH_AI}Tool executed successfully!.`);
      } catch (error) {

        console.error(`${CONSOLE_PROMPT.WARNING}Tool execution failed. The AI failed to give a valid input.`);
        if (error instanceof SyntaxError) {
          toolOutput = 'The input object doens\'t have a valid JSON Syntax.';
        }
        else if (error instanceof z.ZodError) {
          toolOutput = 'The input JSON doesn\'t follow the expected Schema.';
        }
        else {
          console.error(`${CONSOLE_PROMPT.WARNING}Tool execution failed. The tool had an internal error.`);
          throw error;
        }
      }

      toolOutput += 'Execute the same tool again with a valid syntax.';
      return { tool_call_id: call.id, output: toolOutput };
    }));

    return { tool_outputs: outputs };
  }

  throw new OpenAI.APIError(-3, {
    type: 'submit_tool_outputs_error',
    message: 'The action required was not a tool output submition.'
  });
}

async function gracefulShutdown() {
  
}

export { API };
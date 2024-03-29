#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 12/02/2024
 * @desc @TODO hacer la descripción
 */
import OpenAI from 'openai';
import { sleep } from 'openai/core.js';

import { API } from './utils.js';
import { TEMPLATES } from './templates/templates.js'; // update TEMPLATES object
import { COLORS } from './colors.js';
import { TOOLS, TOOLS_DESCRIPTIONS } from './openai-api-tools.js';
'use strict';

const GH_AI_PROMPT  = COLORS.yellow('GH-AI>: ');
const OPENAI_PROMPT = COLORS.blue(`GH-AI-OPENAI>: `);
const ERROR_PROMPT  = COLORS.red(`GH-AI-ERROR>: `);
const WARNING_PROMPT  = COLORS.magenta(`GH-AI-WARNING>: `);

/**
 * @description OpenAI specific implementation of the API call
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function(inputObject, outputDirectory, options) {
  
  const OPENAI = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  const TYPE = options.commandType.toUpperCase();

  const SYSTEM_PROMPT = TEMPLATES[TYPE].SYSTEM(inputObject);
  const PROMPTS = TEMPLATES[TYPE].USER(inputObject[options.commandType]);

  let apiCallResult = {
    systemPrompt: SYSTEM_PROMPT,
    messages: [],
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
    },
    failed: false,
    config: {
      llm: options.llm,
      language: inputObject.extension?.languageSettings.language
    },
    assistant: undefined,
    thread: undefined,
  };

  let assistant;
  let thread;

  try {
    [assistant, thread] = await createAssistantAndThread(OPENAI, SYSTEM_PROMPT, options);
    
    for (const PROMPT of PROMPTS) {

      console.log(`${GH_AI_PROMPT}Working with ${PROMPT.title} file`);

      // Añadir el mensaje a la conversación
      await OPENAI.beta.threads.messages.create(
        thread.id,
        {
          role: 'user',
          content: PROMPT.content
        }
      );

      const DELAY = 10000; // 10s
      const MAX_TRIES = 10;
      let currentTry = 0;
      
      let result = {};
      while (currentTry < MAX_TRIES) {
        result = await call(OPENAI, assistant.id, thread.id, outputDirectory, options);

        if (result.completed) { break; }

        if (!result.error) {
          currentTry++;
          await sleep(DELAY);
        }
        else {
          apiCallResult.failed = true;
          break;
        }
      }
      
      if (apiCallResult.failed || currentTry >= MAX_TRIES) {

        console.log(`${ERROR_PROMPT} The API call couldn't be executed correctly, Generating Logs and stopping execution.`);

        apiCallResult.messages.push({
          title: PROMPT.title,
          prompt: PROMPT.content,
          response: run.last_error.message,
          usage: undefined
        });

        apiCallResult.usage.totalPromptTokens = run.usage.prompt_tokens;
        apiCallResult.usage.totalTokens = run.usage.total_tokens;
        
        return apiCallResult;
      }

      let messages = await OPENAI.beta.threads.messages.list(thread.id);
      messages = messages.data.filter(message => message.role === 'assistant');
  
      apiCallResult.messages.push({
        title: PROMPT.title,
        prompt: PROMPT.content,
        response: messages[0].content.map((content) => { return content.text.value;}),
        usage: (options.tokensVerbose)? result.run.usage : undefined,
      });

    }

    console.log(`\n${GH_AI_PROMPT}The ${options.llmApi} API call has been executed successfully!`);

    if (options.tokensVerbose) { // Calcular el total de tokens usados.
      for (const MESSAGE of apiCallResult.messages) {
        apiCallResult.usage.totalPromptTokens += MESSAGE.usage.prompt_tokens;
        apiCallResult.usage.totalCompletionTokens += MESSAGE.usage.completion_tokens;
        apiCallResult.usage.totalTokens += MESSAGE.usage.total_tokens;
      }
    }

    return apiCallResult;
  } 
  finally { // Independientemente de lo que pase (Excepcion o ejecución correcta)
    
    if (options.saveAssistant) {
      apiCallResult.assistant = assistant.id;
      console.log(`${GH_AI_PROMPT}The assistant ID has been saved.`);
    } 
    else {
      await OPENAI.beta.assistants.del(assistant.id);
    }
  
    if (options.saveThread) {
      apiCallResult.thread = thread.id;
      console.log(`${GH_AI_PROMPT}The thread ID has been saved.`);
    } 
    else {
      await OPENAI.beta.threads.del(thread.id);
    }

  }
}

/**
 * 
 * @param {*} openai 
 * @param {*} options 
 * @returns 
 */
async function createAssistantAndThread(openai, systemPrompt, options) {
  const MODEL = options.llmModel || 'gpt-3.5-turbo-0125';

  let assistant;

  if (process.env.ASSISTANT_ID) {
    assistant = await openai.beta.assistants.retrieve(process.env.ASSISTANT_ID);
  } 
  else {
    assistant = await openai.beta.assistants.create({ model: MODEL });
  }
  
  // independientemente de si se ha creado o se ha utilizado uno anterior se actualiza sus datos para que use la información actual.
  assistant = await openai.beta.assistants.update(
    assistant.id,
    {
      name: 'gh-ai-assistant',
      model: MODEL,
      description: 'Assistant generated by the gh-ai extension',
      tools: TOOLS_DESCRIPTIONS,
      instructions: systemPrompt
    }
  );

  let thread;
  if (process.env.THREAD_ID) {
    thread = await openai.beta.threads.retrieve(process.env.THREAD_ID);
  } 
  else {
    thread = await openai.beta.threads.create();
  }

  return [assistant, thread];
}

// Ver como puedo quitar de aquí el outputDirectory
async function call(openai, assistantID, threadID, outputDirectory, options) {

  const DELAY = 2000; // ms
  let failure = false;

  // Empezar la conversación  
  let run = await openai.beta.threads.runs.create(
    threadID,
    { assistant_id: assistantID, }
  ); 

  // Comprobar constantemente si la conversación ha terminado correctamente
  while (!failure) {
    // Comprobar la conversación en el momento actual
    run = await openai.beta.threads.runs.retrieve(threadID, run.id);
  
    switch (run.status) {

      case 'failed':
        let result = { completed: false, error: false, run: run }
        if (run.last_error.code === 'rate_limit_exceeded') {
          console.log(`${WARNING_PROMPT}Rate limit exceeded, applying a 10s delay.`);
        } 
        else {
          console.log(`${ERROR_PROMPT}The run failed while attempting to talk with the AI.`);
          result.error = true;
        }
        return result;

      case 'expired':
        console.log(`${ERROR_PROMPT}The run reached the 10 minutes limit.`); 
        return { completed: false, error: true, run: run };

      case 'queued':
        console.log(`${OPENAI_PROMPT}The run is still in queue. Waiting for the API to received.`);
        break;
  
      case 'in_progress':
        console.log(`${OPENAI_PROMPT}The run is still active. Waiting for the API to response.`);
        break;
  
      case 'cancelling':
        console.log(`${OPENAI_PROMPT}The run is being cancelled.`);
        break;
  
      case 'cancelled':
        console.log(`${OPENAI_PROMPT}The run has been cancelled successfully.`);
        return { completed: false, error: false, run: run };
  
      case 'requires_action':
        console.log(`${OPENAI_PROMPT}The run requires an action from a tool. Waiting for the result.`);
        const TOOL_OUTPUTS = await manageToolActions(run, outputDirectory, options);
        run = await openai.beta.threads.runs.submitToolOutputs(
          threadID,
          run.id,
          TOOL_OUTPUTS
        );
        console.log(`${OPENAI_PROMPT}Tool executed successfully!`);
        break;
  
      case 'completed':
        console.log(`${OPENAI_PROMPT}The run has been completed, extracting the AI response.`);
        return { completed: true, error: false, run: run };
          
      default: 
        throw new OpenAI.APIError(-1, {
          type: 'no_status_support_error', 
          message: 'The run is in a not supported status.'
        });
    }

    await sleep(DELAY);
  }
}

/**
 * 
 * @param {*} run 
 * @param {*} outputDirectory 
 * @param {*} options 
 * @returns 
 */
async function manageToolActions(run, outputDirectory, options) {
  if (run.required_action.type === 'submit_tool_outputs') {

    let requiredActions = run.required_action.submit_tool_outputs;
    let outputs = await Promise.all(requiredActions.tool_calls.map(async (call) => {

      console.log(`\tDEBUG>: Executing ${call.function.name} tool.`);
      return {
        tool_call_id: call.id,
        output: await TOOLS[call.function.name](call.function.arguments, outputDirectory, options)
      }

    }));
    return { tool_outputs: outputs };

  }

  throw new OpenAI.APIError(-3, {
    type: 'submit_tool_outputs_error',
    message: 'The action required was not a tool output submition.'
  });
}

export { API };
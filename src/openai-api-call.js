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

import { API, TEMPLATES } from './utils.js';
import './templates/templates.js';
import { COLORS } from './colors.js';
import { TOOLS, TOOLS_DESCRIPTIONS } from './openai-api-tools.js';

'use strict';

/**
 * @description OpenAI specific implementation of the API call @TODO Mejorar esto
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function(inputObject, outputDirectory, options) {

  const OPENAI = new OpenAI({ // Crear un formato de error para que el programa pueda parsear el error sin tener que estar pendiente de los paquetes de las API 
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
  
  const [ASSISTANT, THREAD] = await createAssistantAndThread(OPENAI, options);

  const TYPE = options.commandType.toUpperCase();
  const PROMPTS = {
    system: TEMPLATES.SYSTEM[TYPE](inputObject),
    user:   TEMPLATES.USER[TYPE](inputObject)
  };   

  let response = await CALL[TYPE](
    OPENAI,
    ASSISTANT, 
    THREAD,
    PROMPTS,
    outputDirectory,
    options
  );

  if (options.safeAssistant) {
    response.assistant = ASSISTANT.id;
  } else {
    await OPENAI.beta.assistants.del(ASSISTANT.id);
  }

  if (options.safeThread) {
    response.thread = THREAD.id;
  } else {
    await OPENAI.beta.threads.del(THREAD.id);
  }
  
  return [PROMPTS, response];
}

/**
 * @description
 * @todo 
 *  1-) Comprobar las opciones
 *  2-) Si Save-assistant esta activo guardar el assistant y el thread utilizado
 *  3-) Si ASSISTANT_ID o THREAD_ID estan activados no generar los correspondientes objetos sino sacarlos de la API
 *  3-1) Al sacarlos de la API modificarlos con los valores actuales del options
 */
async function createAssistantAndThread(openai, options) {
  const MODEL = options.llmModel || 'gpt-3.5-turbo-0125';

  let assistant;

  if (process.env.ASSISTANT_ID) {
    assistant = await openai.beta.assistants.retrieve(process.env.ASSISTANT_ID);
  } else {
    assistant = await openai.beta.assistants.create({ model: MODEL });
  }
  assistant = await openai.beta.assistants.update(
    assistant.id,
    {
    name: 'gh-ai-assistant',
    model: MODEL,
    description: '',
    tools: TOOLS_DESCRIPTIONS
    }
  );

  let thread;
  if (process.env.THREAD_ID) {
    thread = await openai.beta.threads.retrieve(process.env.THREAD_ID);
  } else {
    thread = await openai.beta.threads.create();
  }

  return [assistant, thread];
}

const CALL = Object.create(null);

/**
 * 
 * @param {*} openai 
 * @param {*} inputObject 
 * @param {*} outputDirectory 
 * @param {*} options 
 * @returns 
 */
CALL['EXTENSION'] = async function(
  openai, 
  assistant, 
  thread, 
  prompts, 
  outputDirectory, 
  options
) {

  // Declare the response object
  let apiResponse = {
    response: [],
    usage: {},
    llm: options.llm
  };

  await Promise.all(prompts.user.userPrompts().map(async (file) => {
    // Poner un console.log como: Trabajando con: Fichero.name
    await openai.beta.threads.messages.create(
      thread.id,
      {
        role: 'user',
        content: file
      }
    );
    let run = await openai.beta.threads.runs.create(
      thread.id,
      {
        assistant_id: assistant.id, 
        instructions: prompts.system.instruction()
      }
    );
    const COMPLETED = await checkRunStatus(
      openai, 
      thread.id,
      run.id, 
      outputDirectory, 
      options
    );

    if (!COMPLETED) {
      run = await openai.beta.threads.run.retreive(thread.id, run.id);
      throw run.last_error;
    }

    const MESSAGES = await openai.beta.threads.messages.list(thread.id);
    let response = MESSAGES.data.filter(message => message.role === 'assistant');

    apiResponse.response.push(...response[0].content.map((content) => {
      return content.text.value;
    }));
    apiResponse.usage = run.usage;
  }));

  return apiResponse;
}

/**
 * 
 * @param {*} run 
 */
async function checkRunStatus(openai, threadID, runID, outputDirectory, options) {
  const SLEEP_TIME = 3600;
  const PROMPT = `${COLORS.blue(`${options.llm}-RUN>: `)}`;
  const ERROR_PROMPT = `${COLORS.red(`ERROR-RUN>: `)}`;
  let completed = false;
  let failure = false;
  while(!completed) {
    const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);
    let message = '';
    switch(RUN.status) {
      case 'failed':
        message = 'The run failed while attempting to talk with the AI.';
        failure = true;
        break; 
      
      case 'expired':
        message = 'The run reached the 10 minutes limit.';
        failure = true;
        break;
      
      case 'queued':
        message = 'The run is still in queue. Waiting for the API to received.';
        break;

      case 'in_progress':
        message = 'The run is still active. Waiting for the API to response.';
        break;

      case 'cancelling':
        message = 'The run is being cancelled.';
        break;

      case 'cancelled':
        message = 'The run has been cancelled successfully.';
        failure = true;
        break;

      case 'requires_action':
        message = 'The run requires an action from a function. Waiting for the result.';
        RUN = await openai.beta.threads.runs.submitToolOutputs(
          threadID,
          runID,
          await manageToolActions(RUN, outputDirectory, options)
        )  
        break;

      case 'completed':
        message = 'The run has been completed, extracting the AI response.';
        completed = true;
        break;
        
      default: 
        throw new OpenAI.APIError(-1, {
          type: 'no_status_support_error', 
          message: 'The run is in a not supported status.'
        });
    }
    if (failure) {
      console.error(`${ERROR_PROMPT}${message}`);
      return false; 
    }
    console.log(`${PROMPT}${message}`);
    await sleep(SLEEP_TIME);
  }
  return true;
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
      console.log(`   Executing ${call.function.name} tool.`);
      return {
        tool_call_id: call.id,
        output: await TOOLS[call.function.name](call.function.arguments, options, outputDirectory)
      }
    }));
    return { tool_outputs: outputs };
  }
  throw new Error('The required action was not a function.'); // Esto en teoria nunca ocurre
}

export { API };
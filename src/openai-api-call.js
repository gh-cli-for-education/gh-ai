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
import * as fs from 'fs/promises';
import OpenAI from 'openai';
import z from 'zod';

import { parseInputFile, createReadme, API, TEMPLATES} from './utils.js';
import { API_RESPONSE_SCHEMA } from './schemas/api-response-schema.js';
import { USER_EXTENSION } from './templates/extension-user-prompts.js';
import { SYSTEM_EXTENSION } from './templates/extension-system-messages.js';
import { README } from './templates/readme-content.js';
import { COLORS } from './colors.js';
'use strict';

const TOOLS = {
  apiInput: [
    {
      type: 'function',
      function: {
        name: 'get_gh_api_documentation',
        description: 'Retreive information from the gh api documentation',
        parameters: {
          type: 'object',
          properties: {
            // poner aquí las properties 
          }
        },
        required: [] 
      }
    },
    {
      type: 'function',
      function: {
        name: 'create_file',
        description: `Use this function whenever you are going to create a new file with the current content you have from that file. 
        In case there is no errors leave an empty array in the errors property`,
        parameters: {
          type: 'object',
          properties: {
            file: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'The file\'s name' },
                content: { type: 'string', description: 'The file\'s content' }      
              },
              required: ['name', 'content']
            },
          },
          required: ['file']
        }
      }
    }
  ],
  create_file: async (input, options, outputDirectory) => {    
    try {
      await fs.mkdir(outputDirectory, { recursive: true });
      input = JSON.parse(input);
      API_RESPONSE_SCHEMA.parse(input);
      let file = input.file;
      await fs.writeFile(`${outputDirectory}/${file.name}`, file.content);
      if (input.errors) { 
        input.errors.map((error) => {
          console.log(`${COLORS.red(`${options.llm}>: `)} ${error}`); 
        });
      }
      return 'Function executed successfully. Do not respond this output and wait for the user input.';      
    } catch (error) {
      let warning = COLORS.magenta('WARNING>: ');
      let errorMsg = '';
      if (error instanceof SyntaxError) {
        errorMsg = 'The input object doens\'t have a valid JSON Syntax. ';
        console.error(`${warning}${errorMsg}`);
        return errorMsg + 'Try calling the function again with a valid Syntax.';
      }
      else if (error instanceof z.ZodError) {
        errorMsg = 'The input JSON doesn\'t follow the expected Schema. ';
        console.error(`${warning}${errorMsg}`)
        return errorMsg + 'Try calling the function again with a valid JSON Schema.';
      } 
      else {
        throw error;
      }
    }
  },
  get_gh_api_documentation: (input, options) => {

  }
}

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  let type = options.commandType.toUpperCase();
  return {
    system: TEMPLATES.SYSTEM[type](inputObject),
    user: TEMPLATES.USER[type](inputObject)
  }; 
}

/**
 * 
 * @param {*} prompts 
 * @param {*} options 
 * @returns 
 */
async function call(prompts, options, outputDirectory) {
  const openai = new OpenAI({ // Crear un formato de error para que el programa pueda parsear el error sin tener que estar pendiente de los paquetes de las API 
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
  const DEFAULT_MODEL = 'gpt-3.5-turbo-0125';
  const assistant = await openai.beta.assistants.create({
    name: 'gh-ai-assistant',
    instructions: prompts.system.instruction(),
    model: DEFAULT_MODEL,
    tools: [TOOLS.apiInput[1]]
  });
  const thread = await openai.beta.threads.create();
  let apiReponse = {
    response: []
  };
  let files = prompts.user.userPrompts();
  for (let index in files) {
    await openai.beta.threads.messages.create(thread.id, {
      role: 'user',
      content: files[index]
    });
    let run = await openai.beta.threads.runs.create(
      thread.id,
      { 
        assistant_id: assistant.id, 
        instructions: prompts.system.instruction() 
      }
    );
    let attempts = 0;
    const MAX_AMOUNT_OF_ATTEMPTS = 3600;
    while (true) {
      console.log(attempts);
      if (attempts > MAX_AMOUNT_OF_ATTEMPTS) {
        await openai.beta.threads.runs.cancel(
          thread.id,
          run.id
        );
        let error = new Error('The run spent all the attempts for completions.');
        error.reason = run.status;
        throw error;
      }
      run = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
      let verbose = (attempts % 500 ===  0);
      try {
        if (await CheckRunStatus(run, verbose, options, outputDirectory, thread.id, openai)) {
          break; 
        };
      } catch(error) {
        if (run.status !== 'failed') {
          await openai.beta.threads.runs.cancel(
            thread.id,
            run.id
          );
        }
        await openai.beta.assistants.del(assistant.id);
        throw error;
      }
      attempts++;
    }
    const messages = await openai.beta.threads.messages.list(thread.id);
    let response = messages.data.filter(message => message.role === 'assistant');
    response = response.map((message) => {
      return message.content.map((content) => {
        return content.text.value;
      }); 
    })
    // console.log(response);
    apiReponse.response.push(...response.flat());
    apiReponse.usage = run.usage;
    
  }
  apiReponse.llm = options.llm;
  await openai.beta.assistants.del(assistant.id);
  return apiReponse;
}

/**
 * 
 * @param {*} run 
 */
async function CheckRunStatus(run, verbose, options, outputDirectory, threadID, openai) {
  let message = '';
  let error = new Error();
  let prompt = `${COLORS.blue(`${options.llm}-RUN>: `)}`;
  switch (run.status) {
    case 'failed':
      error.message = 'The run failed while attempting to talk with the AI.';
      error.reason = run.last_error;
      throw error;

    case 'cancelled':
      error.message = 'The run was cancelled by the user or the API.';
      error.reason = run.cancelled_at;
      throw error;

    case 'expired':
      error.message = 'The run expired before the thread ending.';
      error.reason = run.last_error;
      throw error;
    
    case 'queued':
      message = 'The run is still in queue. Waiting for the API to received.';
      break;
    
    case 'in_progress':
      message = 'The run is still active. Waiting for the API to response.';
      break;
  
    case 'requires_action':
      console.log(`${prompt}The run requires an action from a function. Waiting for the result.`);
      let outputs = await manageToolActions(run, options, outputDirectory);
      run = await openai.beta.threads.runs.submitToolOutputs(
        threadID,
        run.id,
        { tool_outputs: outputs }
      )  
      return false;

    case 'completed':
      console.log(`${prompt}The run has been completed, extracting the AI response.`);
      return true;
    
    default: 
      error.message = 'The run has a not supported status.';
      error.reason = run.status;
      throw error;
  }
  if (verbose) {
    console.log(`${prompt}${message}`);
  }
  return false; 
}

async function manageToolActions(run, options, outputDirectory) {
  console.log('Executing tool');
  if (run.required_action.type === 'submit_tool_outputs') {
    let requiredActions = run.required_action.submit_tool_outputs;
    let outputs = await Promise.all(requiredActions.tool_calls.map(async (call) => {
      return {
        tool_call_id: call.id,
        output: await TOOLS[call.function.name](call.function.arguments, options, outputDirectory)
      }
    }));
    // console.log(outputs);
    return outputs;
  }
  throw new Error('The required action was not a function.');
}

/**
 * @description OpenAI specific implementation of the API call @TODO Mejorar esto
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function (inputfile, outputDirectory, options) {
  try {
    let prompt = COLORS.yellow(`${options.llm}>: `);
    console.log(`${prompt}Parsing the user input.`)
    let inputObject = await parseInputFile(inputfile, options);
    console.log(`${prompt}Generating prompts with the user input.`)
    let prompts = generatePrompt(inputObject, options);
    if (options.debug) { console.log(prompts); }
    console.log(`${prompt}Starting API call. This process may take a few seconds.`);
    let response = await call(prompts, options, outputDirectory);
    if (options.debug) { console.log(response); }
    console.log(`${prompt}Parsing the response data.`);
    await createReadme(prompts, response, outputDirectory, options);
    console.log(`${prompt}Generated README.md file inside ${outputDirectory}/`);
  } catch (error) {
    if (error instanceof OpenAI.AuthenticationError) {
      throw new Error('The API key or the organization name is not valid');
    }
    throw error;
  }
}

export { API };
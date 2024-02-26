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
import Mustache from 'mustache';

import { parseInputFile, HELP_TYPES, API, TEMPLATES} from './utils.js';
import { API_RESPONSE_SCHEMA } from './schemas/api-response-schema.js';
import { USER_EXTENSION } from './templates/extension-user-prompts.js';
import { SYSTEM_EXTENSION } from './templates/extension-system-messages.js';
'use strict';

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  let prompts = {};
  let type = options.commandType.toUpperCase();
  prompts.system = TEMPLATES.SYSTEM[type](inputObject);;
  let userPrompts = TEMPLATES.USER[type](inputObject);
  prompts.user = [];
  userPrompts.map((prompt) => {
    prompts.user.push({ role: 'user', content: prompt });
  });
  return prompts;
}

/**
 * @description
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createFiles(prompt, apiResponse, outputDirectory, options) {
  // Comprobar con anterioridad que apiResponse sigue el formato correcto
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
  } catch(error) {
    if (error.code === 'EEXIT') { console.log(`El directorio ya existe`); }
  }
  apiResponse = JSON.parse(apiResponse);
  API_RESPONSE_SCHEMA.parse(apiResponse);
  let readmeContent = '## This file has been created to store the conversation you had with the llm\n\n';
  readmeContent += `${prompt[0].content}\n${prompt[1].content}\n`;
  readmeContent += `## API RESPONSE\n\nAI advices:\n\n${apiResponse.advices}\n\n`;
  readmeContent += `files created:\n\n`;
  apiResponse.files.forEach(async (file) => {
    await fs.writeFile(`${outputDirectory}/${file.filename}`, file.content);
    readmeContent += `${file.filename}:\n${file.content}\n\n`;
  });
  readmeContent += `Errors encountered:\n\n${apiResponse.errors}`;
  await fs.writeFile(`${outputDirectory}/README.md`, readmeContent);
  console.log(`\x1b[33m${options.llm}>:\x1b[0m ${apiResponse.advices}`);
  if (apiResponse.length > 0) { console.log(`\x1b[31m${options.llm}>:\x1b[0m ${apiResponse.errors}`); }
  // console.log(Aqui iría el aviso de que no es buena idea utilizar esto sin revisar el código que ha relizado la IA)
  // Parsear las respuestas, dependerá del tipo de la ayuda y de como es el JSON generado por el LLM
}

/**
 * 
 * @param {*} prompts 
 * @param {*} options 
 * @returns 
 */
async function call(prompts, options) {
  const openai = new OpenAI({ // Crear un formato de error para que el programa pueda parsear el error sin tener que estar pendiente de los paquetes de las API 
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
  const DEFAULT_MODEL = 'gpt-3.5-turbo-0125';
  const assistant = await openai.beta.assistants.create({
    instructions: prompts.system,
    model: DEFAULT_MODEL,
  });
  const thread = await openai.beta.threads.create();
  prompts.user.map(async (prompt) => {
    await openai.beta.threads.messages.create(thread.id, prompt);
    let run = await openai.beta.threads.runs.create(
      thread.id,
      { assistant_id: assistant.id }
    );
    while (run.status !== 'completed') {
      if (run.status === 'failed' || run.status === 'cancelled') { break; }
      run = await openai.beta.threads.runs.retrieve(
        thread.id,
        run.id
      );
    }
    const messages = await openai.beta.threads.messages.list(
      thread.id
    );
    console.log(messages.data[0].content);
  });


  // console.log(run);
  // console.log(messages.data[0].content);
  /*
  const completions = await openai.chat.completions.create({
    messages: prompts, // Aquí va el Array de los mensajes espeficicados de la siguiente manera:
                       // { role: ('assistant', 'user', 'system'), content: (Contenido del mensaje)} *-> Investigar más acerca del significado del rol
                       // assistant -> El tipo de mensaje que devuelve ChatGPT -> Se puede utilizar para pasar los ejemplos de como el llm debe responder 
                       // System -> Permite darle información al llm para que la guarde(Aquí van las Persona, reglas y formato de salida del mensaje)
                       // User -> Los mensajes del usuario al llm  
    model: DEFAULT_MODEL,
    n: 1,                                     // La cantidad de posibles respuestas, por defecto uno y es recomendado dejarlo en 1
    response_format: { type: 'json_object' }, // Comprueba que la respuesta generada por OPENAI en formato json sea valido, IMPORTANTE: SE DEBE INDICAR QUE EL OUTPUT SEA EN FORMATO JSON O EL LLM PUEDE DAR FALLOS 
    temperature: 0.2,                         // Tambien esta top_p: Ambos controlan la aleatoriedad de las respuestas. No modificar ambos a la vez.
    tools: undefined                          // Permite a ChatGPT llamar a funciones pasandoles directamente el JSON generado por el mismo. (investigar más).
  });
  
  // Realizar check de los posibles errores
  const response = completions.choices[0]; // Solo existe una posible respuesta
  let finishReason = response.finish_reason;

  if (options.debug) { console.log('Finish reason of the openAI response:', finishReason); }
  if (options.tokensVerbose) { console.log(completions.usage); }

  if (finishReason !== 'stop' && finishReason !== 'tool_calls') {
    let errorMsg = 'There is a problem with the ChatGPT response!\nReason: ';
    if (finishReason === 'length') {
      errorMsg += 'The maximum amount of tokens was reached the llm can\'t generate more words.';
    } else {
      errorMsg += 'The prompt was omitted due to a flag in content filter.';
    }
    throw new Error(errorMsg);
    
  } // Realizar parsing de las respuestas para devolver un array de respuestas 
  /** @TODO SEGUIR POR AQUI  
  return response.message.content; */
}

/**
 * @description OpenAI specific implementation of the API call @TODO Mejorar esto
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function (inputfile, outputdirectory, options) {
  try {
    let inputObject = await parseInputFile(inputfile, options);
    let prompts = generatePrompt(inputObject, options);
    if (options.debug) { console.log(prompts); }
    let response = await call(prompts, options);
    return;
    if (options.debug) { console.log(response); }
    await createFiles(prompts, response, outputdirectory, options);
  } catch (error) {
    if (error instanceof OpenAI.AuthenticationError) {
      throw new Error('The API key or the organization name is not valid');
    }
    throw error;
  }
}

export { API };
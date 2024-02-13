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
import { parseInputFile } from './utils.js';
import OpenAI from 'openai';
'use strict';

/**  */
const API = Object.create(null);

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  let prompts = [];
  prompts.push({
    role: 'system',
    content: ''
  });
  prompts.push({ // Aquí se podría ver si se realiza un mensaje completo o se separa por tareas
    role: 'user',
    content: 'Texto del user content'
  });
  // generar todos los mensajes del prompt 
  // llamar a la API con los mensajes 
  return prompts;
}

/**
 * @description
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createFiles(prompt, apiResponse, outputDirectory, options) {
  // Comrprobar con anterioridad que apiResponse sigue el formato correcto
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
  } catch(error) {
    if (error.code === 'EEXIT') { console.log(`El directorio ya existe`); }
  }
  apiResponse = JSON.parse(apiResponse);
  console.log(apiResponse.files);
  let readmeContent = 'This file has been created to store the conversation you had with the llm\n';
  readmeContent += prompt + '\n' + apiResponse;
  await fs.writeFile(`${outputDirectory}/README.md`, readmeContent);
  console.log(`\x1b[33m${options.llm}>:\x1b[0m ${apiResponse.advices}`);
  apiResponse.files.forEach(async (file) => {
    await fs.writeFile(`${outputDirectory}/${file['file-name']}`, `${file.content}\n${file['aditional-info']}`);
  });
  console.log(`\x1b[34m${options.llm}>:\x1b[0m ${apiResponse.warnings}`);
  console.log(`\x1b[31m${options.llm}>:\x1b[0m ${apiResponse.errors}`);
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
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
  const DEFAULT_MODEL = 'gpt-3.5-turbo-0125';
  const completions = await openai.chat.completions.create({
    messages: prompts, // Aquí va el Array de los mensajes espeficicados de la siguiente manera:
                       // { role: ('assistant', 'user', 'system'), content: (Contenido del mensaje)} *-> Investigar más acerca del significado del rol
                       // assistant -> El tipo de mensaje que devuelve ChatGPT -> Se puede utilizar para pasar los ejemplos de como el llm debe responder 
                       // System -> Permite darle información al llm para que la guarde(Aquí van las Persona, reglas y formato de salida del mensaje)
                       // User -> Los mensajes del usuario al llm  
    model: DEFAULT_MODEL,
    n: 1,                                     // La cantidad de posibles respuestas, por defecto uno y es recomendado dejarlo en 1
    response_format: { type: 'json_format' }, // Comprueba que la respuesta generada por OPENAI en formato json sea valido, IMPORTANTE: SE DEBE INDICAR QUE EL OUTPUT SEA EN FORMATO JSON O EL LLM PUEDE DAR FALLOS 
    temperature: 0.2,                         // Tambien esta top_p: Ambos controlan la aleatoriedad de las respuestas. No modificar ambos a la vez.
    tools: undefined                          // Permite a ChatGPT llamar a funciones pasandoles directamente el JSON generado por el mismo. (investigar más).
  });

  // Realizar check de los posibles errores
  const response = completions.choices[0]; // Solo existe una posible respuesta
  const usage = completions.usage; /** @TODO comprobar que --tokens-verbose esta activado */
  let finishReason = response.finish_reason;
  if (finishReason !== 'stop' || finishReason !== 'tool_calls' ) {
    let errorMsg = 'There is a problem with the ChatGPT response!\nReason: ';
    if (finishReason === 'length') {
      errorMsg += 'The maximum amount of tokens was reached the llm can\'t generate more words.';
    } else {
      errorMsg += 'The prompt was omitted due to a flag in content filter.';
    }
    throw new Error(errorMsg);
  } // Realizar parsing de las respuestas para devolver un array de respuestas 
  /** @TODO SEGUIR POR AQUI  */
  return response.message.content; 
}

/**
 * @description OpenAI specific implementation of the call @TODO Mejorar esto
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function apiCall(inputfile, outputdirectory, options) {
  let inputObject = parseInputFile(inputfile, options);
  let prompts = generatePrompt(inputObject, options);
  let response = call(prompts, options);
  createFiles(prompts, response, outputdirectory, options);
}

export { API };
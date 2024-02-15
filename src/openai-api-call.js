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

import { parseInputFile, HELP_TYPES, API} from './utils.js';
import { API_RESPONSE_SCHEMA } from './schemas/api-response-schema.js';
'use strict';

/**
 * 
 * @param {*} inputObject 
 * @param {*} helpType 
 * @returns 
 */
function generateSystemMessage(inputObject, commandType) {
  let systemMsg = 
`You are a Github CLI and a ${inputObject.scriptLanguage} professional, you always use the 
${inputObject.scriptLanguage} Google's coding style and you know everything from the Github CLI 
and ${inputObject.scriptLanguage} documentation.\n`;
  switch (commandType) {
    case HELP_TYPES.EXTENSION:
      systemMsg += 
`Your job consist in helping the user make an extension by guiding and mainly
generating quality code. The user will prompt the input in an specific format.
Here is an example of a user prompt following the correct format, the tags
could be in different places:

#NAME <mandatory>
#SCRIPTING LANGUAGE <mandatory>
#DESCRIPTION <mandatory>
#PARAMETERS <optional>
#EXAMPLES <optional>
#HELP <optional>
#CHAT LANGUAGE <optional>
`;
      break;
    default: 
      throw new Error('Unexpected Help type');
  }
  systemMsg +=
`No matter the user input you will respond in a JSON format complaying the 
following format. Make sure to follow the specified format and don't add or 
remove any property from the json schema. Here is an example of the json output:

{
  "advices": <Put here all the advices that are not code related like installation and usage>,
  "files": <Put here an array of objects tha represent the files you will create to put the code in, with the format: {
     "filename": <Put here the file name>, 
     "content": <Put here the code and comments you generate. put a header comment with a short description of the file code> 
    }>,
  "errors": <Put here an array of strings telling all the errors you found that can be from the user no putting any information to the user not asking about creating an extension, if no errors are found leave an empty array>
}
  
Here are some rules you must follow if you create code inside the content property

1. You are able to use any library or package but make sure not to use an 
excessive amount of them.
`;
  return systemMsg;
}

function generateUserMessage(inputObject) {
  let userMsg = '';
  for (let property in inputObject) {
    userMsg += `#${property.toUpperCase()} `;
    if (property === 'parameters') {
      userMsg += '\n';
      inputObject[property].forEach((parameter, index) => {
        userMsg += `${index + 1}. ${parameter.name} "${parameter.description}"\n`;
      });
    } else if (property === 'examples') {
      userMsg += '\n';
      inputObject[property].forEach((example, index) => {
        userMsg += `${index + 1}. Given this input: ${example.input}\n\nThis should be the output:\n${example.expectedOutput}\n`;
      });
    } else {
      userMsg += `${inputObject[property]}\n`;
    }
  }
  /*
  userMsg +=
`With all this information I want you to create some code that will help me start the extension, code as much as you think is needed 
to acomplish what I asked for. Remember to put comments inside the code file to explain everything you generate.

It is important that you generate code so even if you think that you won't be able to success in what the use is asking at least make enough code to start with.`;
*/
  return userMsg;
}

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  let prompts = [];
  prompts.push({
    role: 'system',
    content: generateSystemMessage(inputObject, options.commandType)
  });
  prompts.push({ // Aquí se podría ver si se realiza un mensaje completo o se separa por tareas
    role: 'user',
    content: generateUserMessage(inputObject)
  });
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
  const usage = completions.usage; /** @TODO comprobar que --tokens-verbose esta activado */
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
  /** @TODO SEGUIR POR AQUI  */
  return response.message.content; 
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
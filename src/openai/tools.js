/**
 * 
 */
import * as fs from 'fs/promises';

import { COLORS } from "../colors.js";
import { API_RESPONSE_SCHEMA } from '../schemas/api-response-schema.js';
import { CONSOLE_PROMPT } from '../utils.js';

'use strict';

const TOOLS_DESCRIPTIONS = [
  {
    type: 'function',
    function: {
      name: 'search_documentation',
      description: 'Call this function whenever you need help making a gh extension, specially when you need information from the Github Cli documentation',
      parameters: {
        type: 'object',
        properties: {
          // poner aquí las properties 
        }
      },
      required: undefined
    }
  },
  {
    type: 'function',
    function: {
      name: 'generate_file',
      description: 'This is the tool that you must use to send the user the generated code, for each user prompt you must call this function only once.',
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
  },
  {
    type: 'function',
    function: {
      name: 'talk_with_user',
      description: 'This is the tool that you must use to communicate with the user.',
      parameters: {
        type: 'object',
        properties: {
          motive: { type: 'string', description: 'One of the three possible motives (chat, question or error) to talk with the user.' },
          message: { type: 'string', description: 'The message you want to send to the user.'},
        },
        required: ['motive', 'message']
      }
    }
  },
];

const TOOLS = Object.create(null);

TOOLS['generate_file'] = async (input, outputDirectory) => {    

  // Se comprueba si el input de la IA es correcto
  input = JSON.parse(input);
  API_RESPONSE_SCHEMA.parse(input);

  // Se crea el fichero
  await fs.writeFile(`${outputDirectory}/${input.file.name}`, input.file.content);

  // Se le envia un output a la IA
  return 'Function executed successfully. Now use the tool **talk_with_user** to tell him that you are done generating the code.';     
};

TOOLS['search_documentation'] = async (input) => {
  return 'function not implemented yet';
};

TOOLS['talk_with_user'] = async (input) => {

  // Se comprueba que el input de la IA se correcta
  input = JSON.parse(input);

  const PROMPTS = {
    chat: COLORS.yellow(CONSOLE_PROMPT.CHATGPT),
    questions: COLORS.magenta(CONSOLE_PROMPT.CHATGPT),
    error: COLORS.red(CONSOLE_PROMPT.CHATGPT)
  };

  console.log(`${PROMPTS[input.motive]}${input.message}`);

  return 'Do not respond after executing this tool.';
};

export { TOOLS_DESCRIPTIONS, TOOLS };
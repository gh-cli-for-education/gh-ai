/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 20/05/2024
 * @desc Contains the definition of the external tools an assistant can use
 */
import * as fs from 'fs/promises';

import { API_RESPONSE_SCHEMA } from '../schemas/api-response-schema.js';
import { CONSOLE_PROMPT } from '../utils.js';
'use strict';

const TOOLS_DESCRIPTIONS = [
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
          message: { type: 'string', description: 'The message you want to send to the user.'},
        },
        required: ['message']
      }
    }
  },
];

const TOOLS = Object.create(null);

/**
 * Generate a file using the AI input as content
 * @param {object} input 
 * @param {string} outputDirectory 
 * @returns 
 */
TOOLS['generate_file'] = async (input, outputDirectory) => {    

  // Check if the AI input is correct
  console.log(JSON.stringify(input, null, 2));
  input = JSON.parse(input);
  API_RESPONSE_SCHEMA.parse(input);

  await fs.writeFile(`${outputDirectory}/${input.file.name}`, input.file.content);

  return 'Function executed successfully. Now use the tool **talk_with_user** to tell him that you are done generating the code.';     
};

/**
 * Prints the AI message in the command line for the user to see it
 * @param {object} input 
 * @returns {string}
 */
TOOLS['talk_with_user'] = async (input) => {
  // Check if the AI input is correct
  input = JSON.parse(input);
  console.log(`${CONSOLE_PROMPT.CHATGPT}${input.message}`);
  return 'Do not respond after executing this tool.';
};

export { TOOLS_DESCRIPTIONS, TOOLS };
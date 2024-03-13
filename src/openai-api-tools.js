/**
 * 
 */
import { z } from 'zod';
import * as fs from 'fs/promises';

import { COLORS } from "./colors.js";
import { API_RESPONSE_SCHEMA } from './schemas/api-response-schema.js';

'use strict';

const TOOLS_DESCRIPTIONS = [
  {
    type: 'function',
    function: {
      name: 'get_gh_api_documentation',
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
      name: 'create_file',
      description: `Call this function for each user prompt, creating the expected parameter using all the information provided by the user prompt.`,
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
];

const TOOLS = Object.create(null);

TOOLS['create_file'] = async (input, options, outputDirectory) => {    
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
    input = JSON.parse(input);
    API_RESPONSE_SCHEMA.parse(input);

    let file = input.file;
    await fs.writeFile(`${outputDirectory}/${file.name}`, file.content);

    if (input.errors) { 
      input.errors.map((error) => {
        console.log(`${COLORS.red(`${options.llmApi}>: `)} ${error}`); 
      });
    }

    return 'Function executed successfully. Do not respond this output and wait for the user input.';     
  } 
  catch (error) {
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
};

TOOLS['get_gh_api_documentation'] = async () => {
  return 'function not implemented yet';
};

export { TOOLS_DESCRIPTIONS, TOOLS };
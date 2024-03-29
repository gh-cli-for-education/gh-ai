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

TOOLS['generate_file'] = async (input, outputDirectory, options) => {    
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

    return 'Function executed successfully. Now use the tool **talk_with_user** to tell him that you are done generating the code.';     
  } 
  catch (error) {
    const WARNING = COLORS.magenta('WARNING>: ');
    let errorMsg = '';

    if (error instanceof SyntaxError) {
      errorMsg = 'The input object doens\'t have a valid JSON Syntax. ';
      console.error(`${WARNING}${errorMsg}`);
      return errorMsg + 'Try calling the function again with a valid Syntax.';
    }

    else if (error instanceof z.ZodError) {
      errorMsg = 'The input JSON doesn\'t follow the expected Schema. ';
      console.error(`${WARNING}${errorMsg}`)
      return errorMsg + 'Try calling the function again with a valid JSON Schema.';
    } 

    else {
      throw error;
    }
  }
};

TOOLS['search_documentation'] = async (input, options) => {
  return 'function not implemented yet';
};

TOOLS['talk_with_user'] = async (input, options) => {
  try {

    const PROMPT = 'CHATGPT>: ';
    const PROMPTS = {
      chat: COLORS.yellow(PROMPT),
      questions: COLORS.magenta(PROMPT),
      error: COLORS.red(PROMPT)
    };

    input = JSON.parse(input);

    console.log(`${PROMPTS[input.motive]}${input.message}`);

    return 'Do not respond after executing this tool.';

  } catch (error) {

    if (error instanceof SyntaxError) {
      console.error('The input object doens\'t have a valid JSON Syntax.');
      return 'Try calling the function again with a valid Syntax.';
    }

  }
};

export { TOOLS_DESCRIPTIONS, TOOLS };
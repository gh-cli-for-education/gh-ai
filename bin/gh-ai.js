#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 01/02/2024
 * @desc @TODO hacer la descripción
 */
'use strict';

import { Command, Option, program } from 'commander'; 
import { z } from 'zod';
import OpenAI from 'openai';
import dotEnv from 'dotenv';

import { parseInputFile, createProgramLogs, checkDirectoryExistance } from '../src/utils.js';
import { HELP_TYPES, PACKAGE_DATA, CONSOLE_PROMPT } from '../src/utils.js';
import { API } from '../src/openai/gh-ai-openai.js';
import { ERROR_HANDLER } from '../src/error-handlers.js';
import { PROMPT_GENERATOR } from '../src/prompt-generator.js';

dotEnv.config();
const PROGRAM = new Command();
const DEFAULT_LLM = 'OPENAI';

// Program data
PROGRAM
  .name(PACKAGE_DATA.name)
  .usage('<prompt-file> <output-directory> [options]')
  .description(PACKAGE_DATA.description)
  .addHelpText('after','\nAditional help:\n  If no option is passed the program will execute in \'interactive mode\' asking the user different program options one by one');

// Program options and arguments 

PROGRAM
  .allowUnknownOption()
  .version(PACKAGE_DATA.version, '-v, --version', 'Print the current version of the program')
  .argument('<input-file>', 'The input file used to feed the llm')
  .argument('<output-directory>', 'The directory path where all the files created by the llm will be stored')
  .option('-d, --debug', 'Output extra information about the execution process')
  .option('--tokens-verbose', 'Output the token usage information in each prompt')
  .option('--save-thread', 'Make the program not delete the used thread, instead it will save it inside the generated README file')
  .option('--save-assistant', 'Make the program not delete the used assistant, instead it will save it inside the generated README file')
  .option('-m --llm-model <model>', 'Specify which llm model would you want to use by the selected API')
  .addOption(new Option('-l, --llm-api <API>', 'Select the llm <API> to use').choices(Object.keys(API)).default(DEFAULT_LLM))
  .addOption(new Option('-t, --command-type <TYPE>', 'Select the command needed').choices(Object.keys(HELP_TYPES)).default(HELP_TYPES.EXTENSION));
  
// Program actions to options values
PROGRAM.action(async (inputFile, outputDirectory, options) => {
  // Contiene toda la información extraida del prompt del usuario
  let inputObject = {}; 

  // Es una unión del inputObject y el prompt Object con la información util para el usuario
  let responseObject = {
    systemPrompt: undefined,
    userPrompts: [],
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,      
    },
    config: {
      llm: options.llm,
      scriptLanguage: undefined
    },
    assistant: undefined,
    thread: undefined
  };

  // Antes de empezar el programa se comprueba que el directorio este vacio o no exista
  let errorWithDirectoryCreation = await checkDirectoryExistance(outputDirectory, options);

  if (errorWithDirectoryCreation) {
    console.error(`${CONSOLE_PROMPT.ERROR}The directory: "${outputDirectory}" couldn't be created.`);
    process.exit(1);
  }

  try {

    console.log(`${CONSOLE_PROMPT.GH_AI}Parsing the user input.`);

    inputObject = await parseInputFile(inputFile, responseObject, options);

    console.log(`${CONSOLE_PROMPT.GH_AI}Generating prompts...`);
    await PROMPT_GENERATOR[options.commandType.toUpperCase()](inputObject, responseObject, responseObject, options);

    console.log(`${CONSOLE_PROMPT.GH_AI}Starting ${options.llmApi} API call. This process may take a few seconds.`);
    await API[options.llmApi](responseObject, outputDirectory, options);

  } catch (error) {
    if (error instanceof z.ZodError) { 
      ERROR_HANDLER.zodError(error);
    }
    else if (Object.hasOwn(error, 'token')) { // Checks if the error object has an 'offset property (It is better to create an specific Error Type)
      ERROR_HANDLER.nearleyError(error);
    }
    else if (error instanceof OpenAI.APIError) {
      ERROR_HANDLER.openaiError(error);
    } 
    else {
      console.error(`${CONSOLE_PROMPT.ERROR}An unexpected error has ocurred\n ${error.message}`);
      if (options.debug) { console.error(error); }
    }
  }
  
  // No importa lo que pase, se tienen que generar los logs
  await createProgramLogs(inputObject, responseObject, inputFile, outputDirectory, options);
  
  process.exit(0);
});

PROGRAM.parse(process.argv);

const gracefulShutdown = () => { 
  console.log(`${CONSOLE_PROMPT.GH_AI}Cancelling the program execution...`);
  process.env.GRACEFUL_SHUTDOWN = true; 
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
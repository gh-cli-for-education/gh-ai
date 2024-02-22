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

import { Command, Option } from 'commander'; 
import { z } from 'zod';
// import { createRequire } from 'module'; // No se esta usando por ahora
// const require = createRequire(import.meta.url);
import dotEnv from 'dotenv';

import { HELP_TYPES, PACKAGE_DATA } from '../src/utils.js';
import { API } from '../src/openai-api-call.js';
import { ERROR_HANDLER } from '../src/error-handlers.js';

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
  .argument('<prompt-file>', 'The prompt file used to feed the llm')
  .argument('<output-directory>', 'The directory path where all the files created by the llm will be stored')
  .option('-d, --debug', 'Output extra information about the execution process')
  .option('--org <organization>', 'Specify which organization is used for an API request.')
  .option('--tokens-verbose', 'Output the token usage information in each prompt')
  .addOption(new Option('-l, --llm <API>', 'Select the llm <API> to use').choices(Object.keys(API)).default(DEFAULT_LLM))
  .addOption(new Option('-t, --command-type <TYPE>', 'Select the command needed').choices(Object.keys(HELP_TYPES)).default(HELP_TYPES.EXTENSION));
  
// Program actions to options values
PROGRAM.action(async (promptFile, outputDirectory, options) => {
  await main(promptFile, outputDirectory, options);
});
PROGRAM.parse(process.argv);

/**
 * 
 */
async function main(promptFile, outputDirectory, options) {
  try {
    await API[options.llm](promptFile, outputDirectory, options); // Si se logra realizar de esta manera se puede obviar la función main
  } catch (error) {
    console.error('\x1b[31mERROR>:\x1b[0m');
    if (error instanceof z.ZodError) { 
      ERROR_HANDLER.zodError(error);
    }
    else if (Object.hasOwn(error, 'token')) { // Checks if the error object has an 'offset property
      ERROR_HANDLER.nearleyError(error);
    } else {
      console.error(error);
      console.error(`An unexpected error has ocurred\n ${error.message}`);
    }
  }
  
};



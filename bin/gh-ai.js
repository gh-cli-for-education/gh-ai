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
// import { createRequire } from 'module'; // No se esta usando por ahora
// const require = createRequire(import.meta.url);
import dotEnv from 'dotenv';

import { 
  isEmptyObject,
  Object2Array,
  HELP_TYPES,
  PACKAGE_DATA
} from '../src/utils.js';
import {
  API
} from '../src/api-calls.js';

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
  .addOption(new Option('-t, --command-type <TYPE>', 'Select the command needed').choices(Object2Array(HELP_TYPES)).default(HELP_TYPES.EXTENSION));
  
// Program actions to options values
PROGRAM
  // .on('option:debug', function() { process.env.DEBUG = this.opts().debug; })
  // .on('option:generateFile', function() { process.env.GENERATE_FILE = this.opts().generateFile; })
  .action((promptFile, outputDirectory, options) => { 
    main(promptFile, outputDirectory, options);
  });
PROGRAM.parse(process.argv);

/**
 * 
 */
function main(promptFile, outputDirectory, options) {
  // const OPTIONS = PROGRAM.opts();
  API[options.llm].apiCall(promptFile, outputDirectory, options); // Si se logra realizar de esta manera se puede obviar la función main
};



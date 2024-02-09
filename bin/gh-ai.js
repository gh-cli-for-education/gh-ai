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
import { createRequire } from 'module';
import dotEnv from 'dotenv';
const require = createRequire(import.meta.url);

import { 
  isEmptyObject,
  Object2Array,
  APIS,
  HELP_TYPES,
  PACKAGE_DATA
} from '../src/utils.js';
import { 
  checkJsonFileSchema
} from '../src/command-actions.js';

dotEnv.config();
const SHELL = require('shelljs');
const PROGRAM = new Command();

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
  .option('-d, --debug', 'output extra information about the execution process')
  .option('-g, --generate-file', 'Make the program output a json file with the parsed prompt')  
  .addOption(new Option('-l, --llm <API>', 'Select the llm <API> to use').choices(Object2Array(APIS)).default(APIS.OPENAI))
  .addOption(new Option('-t, --command-type <TYPE>', 'Select the command needed').choices(Object2Array(HELP_TYPES)).default(HELP_TYPES.EXTENSION));
  
  // Esto se puede cambiar para que en realidad genere el json del objeto creado por el parser del fichero txt

  // Program actions to options values
PROGRAM
  .on('option:debug', function() { process.env.DEBUG = this.opts().debug; })
  .on('option:generateFile', function() { process.env.GENERATE_FILE = this.opts().generateFile; })
  .action((promptFile, outputDirectory) => { 
    main(promptFile, outputDirectory);
  });
PROGRAM.parse(process.argv);

/**
 * 
 */
function main(promptFile, outputDirectory) {
  const OPTIONS = PROGRAM.opts();
  parsePromptFile()
};

const executeProgram = () => {
  const OPTIONS = PROGRAM.opts();
  if (!isEmptyObject(OPTIONS)) {
    if (OPTIONS.source) {
      checkJsonFileSchema(OPTIONS.source, OPTIONS.commandType, OPTIONS.debug);
    }
    process.exit(0);
  }
  // interactiveMode(OPTIONS); // En caso de que se ejecute sin parametros
};

executeProgram();




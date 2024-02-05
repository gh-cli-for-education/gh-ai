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
import { generateDefaultConfigFile, setNewAPIKey } from '../src/command-actions.js';

const KEY_MANAGER = {};
dotEnv.config({ processEnv: KEY_MANAGER });
const SHELL = require('shelljs');
const PROGRAM = new Command();

// Program data
PROGRAM
  .name(PACKAGE_DATA.name)
  .usage('[options]')
  .description(PACKAGE_DATA.description)
  .addHelpText('after','Aditional help:\n  If no option is passed the program will execute in \'interactive mode\' asking the user different program options one by one');

// Program options 
PROGRAM
  .allowUnknownOption()
  .version(PACKAGE_DATA.version, '-V | --version', 'Print the current version of the program')
  .option('-d | --debug', 'output extra information about the execution') 
  .addOption(new Option('-l | --llm <API>', 'Select the llm <API> to use').choices(Object2Array(APIS)).default(APIS.OPENAI))
  .option('-k | --api-key <KEY>', 'Input the <KEY> needed to use the llm <API>')
  .addOption(new Option('-t | --command-type <TYPE>', 'Select the command needed').choices(Object2Array(HELP_TYPES)).default(HELP_TYPES.EXTENSION))
  .option('-s | --source <PATH>', '<PATH> of the config file to use')
  .option('-g | --generate-file [PATH]', 'Make the program generate a config file in [PATH]')
  
PROGRAM.parse(process.argv);

const executeProgram = () => {
  const OPTIONS = PROGRAM.opts();
  if (!isEmptyObject(OPTIONS)) {
    if (OPTIONS.apiKey) {
      setNewAPIKey(dotEnv, KEY_MANAGER, OPTIONS.llm, OPTIONS.apiKey, OPTIONS.debug);
      console.log('The new Key value has been changed correctly!');
    }
    else if (OPTIONS.generateFile) {
      if (typeof OPTIONS.generateFile === 'boolean') {
        OPTIONS.generateFile = undefined;
      }
      generateDefaultConfigFile(OPTIONS.commandType, OPTIONS.generateFile, OPTIONS.debug);
      console.log("The default file has been created correctly!");
    }
    else if (OPTIONS.source) {
      
    }
    process.exit(0);
  }
  // interactiveMode(OPTIONS); // En caso de que se ejecute sin parametros
};

executeProgram();




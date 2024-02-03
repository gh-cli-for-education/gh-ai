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

import { Command } from 'commander'; 
import { createRequire } from 'module';
import * as fs from 'fs';

import { isEmptyObject } from '../src/utils.js';
import { setNewAPIKey } from '../src/command-actions.js';

const require = createRequire(import.meta.url);
const dotEnv = require('dotenv');
dotEnv.config();
const shell = require('shelljs');
const PACKAGE = {
  name: require('../package.json').name,
  version: require('../package.json').version,
  description: require('../package.json').description
};
const PROGRAM = new Command();

// Program data
PROGRAM
  .name(PACKAGE.name)
  .usage('[options]')
  .description(PACKAGE.description)
  .addHelpText('after','Aditional help:\n  If no option is passed the program will execute in \'interactive mode\' asking the user different program options one by one');

// Program options 
PROGRAM
  .allowUnknownOption() // Obvia las opciones incorrectas
  .version(PACKAGE.version, '-V | --version', 'Print the current version of the program')
  .option('-d | --debug', 'output extra information about the execution') 
  .option('-l | --llm <API>', 'Select the llm <API> to use'/*, 'openAI'*/) // Utilizar las opciones de commander para acotar los posibles argumentos 
  .option('-k | --api-key <KEY>', 'Input the <KEY> needed to use the llm <API>')
  .option('-t | --command-type <TYPE>', 'TODO'/*, 'extension'*/) // Utilizar las opciones de commander para acotar los posibles argumentos 
  .option('-f | --source-file <PATH>', 'TODO')
  .option('-g | --generate-file <PATH>', 'TODO'); // Añadir una variable PATH para indicar donde generarlo

PROGRAM.parse(process.argv);


const executeProgram = () => {
  const OPTIONS = PROGRAM.opts();
  if (!isEmptyObject(OPTIONS)) {
    let llm = OPTIONS.llm || 'OPENAI'; // Se podría aprovechar el .env para guardar valores por defecto
    if (OPTIONS.apiKey) { // Por ahora ejecutar esto solamente 
      setNewAPIKey(dotEnv, llm, OPTIONS.apiKey, OPTIONS.debug);
      process.exit(0);
    }
  }
  // interactiveMode(OPTIONS); // En caso de que se ejecute sin parametros
};

executeProgram();




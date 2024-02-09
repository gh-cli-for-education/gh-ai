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
import * as fs from 'fs/promises';
import readline from 'readline';
import nearley from 'nearley';

import * as grammarModule from './grammar.js';
import { SCHEMAS } from './utils.js';
'use strict';

const ENV_PATH = './.env';

/**
 * @descriptiong Parse the prompt file from the user and returns an object with
 * the extracted values 
 * @param {string} promptFile 
 * @param {} options 
 */
async function parsePromptFile(promptFile, options) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  let input = await fs.readFile(promptFile, 'utf-8');
  parser.feed(input);
  console.log(parser.results[0]);
  SCHEMAS['extension'].parse(parser.results[0]);  
}

async function askAI(apiKey, selectedAPI, debugFlag) {

}

/**
 * @description check if the source file is correct and returns an object 
 * with all the readed data
 * @param {string} sourceFile The PATH where the source file is located 
 * @param {string} helpType Indicates what type of schema is used to validate
 * @param {boolean} debugFlag Enable more output logs.
 * @returns {object} Object with all the data from the readed json 
 * @TODO Realizar multiples test-case
 */
const checkJsonFileSchema = (sourceFile, helpType, debugFlag) => {
  const JSON_REGEX = /^(.*)\.json$/;
  if (!JSON_REGEX.exec(sourceFile)) {
    console.log(`${sourceFile} isn't a .json file`);
    process.exit(1); // Poner un throw
  }
  try {
    if (debugFlag) { console.log('DEBUG PROMPT>:\n', SCHEMAS[helpType]); }
    let configJson = JSON.parse(fs.readFileSync(sourceFile));
    console.log(SCHEMAS[helpType].parse(configJson));
    return configJson;
  } catch (error) {
    console.log(`An error has occurred while reading the json file.\n${error}`);
  }
};

/**
 * @description Generate a default config file
 * @param {string} helpType Indicates what type of config file to generate
 * @param {string} filePath The PATH where the file is going to be located 
 * @param {boolean} debugFlag Enable more output logs.
 * @TODO en caso de que se pase un PATH, comprobar si el fichero es JSON 
 * @TODO Preguntar si se quiere sobrescribir el fichero
 */
const generateDefaultConfigFile = (helpType, filePath, debugFlag) => {
  const PATH = filePath || `./${helpType}-config-file.json`;
  if (debugFlag) { 
    console.log(`Generating the ${helpType} configuration file in ${PATH}`);
  }
  if (fs.existsSync(PATH)) {
    console.log(`File ${PATH} already exists, it's going to be overwritten...`);
    // Preguntar si se quiere sobrescribir el fichero
  }
  fs.writeFileSync(PATH, JSON.stringify(CONFIG_FILES.extension, null, 2));
};

export {
  generateDefaultConfigFile,
  checkJsonFileSchema
};

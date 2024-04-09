#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 03/02/2024
 * @name utils.js
 * @desc store any utility function or object needed by the whole program @TODO mejorar la descripción
 */
import * as fs from 'fs/promises';
import nearley from 'nearley';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

import * as grammarModule from './grammar.js';
import { TEMPLATES } from './templates/templates.js';
import { INPUT_SCHEMA } from './schemas/input-schema.js';
import { COLORS } from './colors.js';
'use strict';

const API = Object.create(null);
const GH_AI_PROMPT  = COLORS.yellow('GH-AI>: ');
/**
 * @description Parse the input file from the user and returns an object with
 * the extracted values 
 * @param {string} inputFile 
 * @param {object} options
 * @returns {object} Returns the object with the the extracted values
 * @throws {Error} If the parsed object doesn't fit the expected schema 
 * @throws {Error} If there is an error while parsing the input file
 */
async function parseInputFile(inputFile, options) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  let input = await fs.readFile(inputFile, 'utf-8');
  parser.feed(input);
  let inputObject = parser.results[0];
  if (options.debug) { console.log(inputObject); }
  INPUT_SCHEMA.parse(inputObject);
  return inputObject;
}

/**
 * @description
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createProgramLogs(inputObject, responseObject, inputFile, outputDirectory, options) {

  try { // NO ESTA DEL TODO CORRECTO HAY QUE HACER EL CHECK DEL OUTPUTDIRECTORY AL PRINCIPIO 
    await fs.mkdir(outputDirectory, { recursive: true });
  } catch(error) {
    if (error.code === 'EEXIT') { console.log(`El directorio ya existe`); } // Esto nunca se llama 
  }

  const TYPE = options.commandType.toUpperCase();

  console.log(`${GH_AI_PROMPT}Generating user-log.md where you can find all the input information`);
  const USER_LOG = TEMPLATES[TYPE].USER_LOG(inputObject, inputFile, responseObject, options);
  await fs.writeFile(`${outputDirectory}/user-log.md`, USER_LOG);

  console.log(`${GH_AI_PROMPT}Generating reponse-log.md where you can find all the output information`);
  const RESPONSE_LOG = TEMPLATES[TYPE].RESPONSE_LOG(responseObject, options);
  await fs.writeFile(`${outputDirectory}/response-log.md`, RESPONSE_LOG);  
}

// ENUMS 
const HELP_TYPES = Object.freeze({
  EXTENSION: 'extension' 
});

const PACKAGE_DATA = Object.freeze({
  name: require('../package.json').name,
  version: require('../package.json').version,
  description: require('../package.json').description
});

export { 
  parseInputFile,
  createProgramLogs,
  HELP_TYPES,
  PACKAGE_DATA,
  API,
};
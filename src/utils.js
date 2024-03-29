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
'use strict';

const API = Object.create(null);

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
  INPUT_SCHEMA.parse(inputObject);
  if (options.debug) {
    console.log(
      'DEBUG>: input File successfully readed!. input object:\n', 
      inputObject
    );
  }
  return inputObject;
}

/**
 * @description
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createReadme(inputObject, prompts, apiResponse, inputFile, outputDirectory, options) {
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
  } catch(error) {
    if (error.code === 'EEXIT') { console.log(`El directorio ya existe`); } // Esto nunca se llama 
  }
  const TYPE = options.commandType.toUpperCase();
  const LOG = TEMPLATES[TYPE].LOG(inputObject, inputFile, prompts, apiResponse, options);
  await fs.writeFile(`${outputDirectory}/log.md`, LOG);
}

/**
 * @description Check if an object literal is empty
 * @param {*} object 
 * @returns true if the object literal is empty
 * @returns false if the object literal is not empty
 */
const isEmptyObject = (object) => {
  for (const property in object) {
    if (Object.hasOwn(object, property)) { return false; }
  }
  return true;
};

/**
 * @description Convert an object into an Array of values(or keys if the
 *  isKeyArray flag is activated)
 * @param {object} object The object to convert to an Array
 * @param {boolean} isKeyArray If activated returns the object keys instead of the values
 * @returns {object} The new Array with the values or keys
 */
const Object2Array = (object, isKeyArray = false) => {
  return Object.entries(object).map(([key, value]) => {
    return ((isKeyArray)? key : value); 
  });
};

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
  isEmptyObject,
  Object2Array,
  parseInputFile,
  createReadme,
  HELP_TYPES,
  PACKAGE_DATA,
  API,
};
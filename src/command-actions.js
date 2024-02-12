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
import nearley from 'nearley';
import OpenAI from 'openai';

import * as grammarModule from './grammar.js';
import { SCHEMAS } from './utils.js';
'use strict';

const ENV_PATH = './.env';

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
  SCHEMAS[options.commandType].parse(inputObject); 
  if (options.debug) {
    console.log(
      'DEBUG>: input File successfully readed!. input object:\n', 
      inputObject
    );
  }
  return inputObject;
}

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  // generar todos los mensajes del prompt 
  // llamar a la API con los mensajes 
}

/**
 * 
 * @param {*} apiResponse 
 * @param {*} options 
 */
function responseActions(apiResponse, options) {
  // Parsear las respuestas, dependerá del tipo de la ayuda y de como es el JSON generado por el LLM
}


export {
  parseInputFile
};

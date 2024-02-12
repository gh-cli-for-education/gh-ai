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
 * @returns {undefined} If there was an error
 */
async function parseInputFile(inputFile, options) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  let input = await fs.readFile(inputFile, 'utf-8');
  try {
    parser.feed(input);
    let inputObject = parser.results[0];
    SCHEMAS[options.commandType].parse(inputObject); 
    if (options.debugFlag) {
      console.log(
        'DEBUG>: input File successfully readed!. input object:\n', 
        inputObject
      );
    }
    return inputObject;
  } catch (error) { // La idea es generar un nuevo error 
    if (error instanceof z.ZodError) { 
      let amount = (zodError.errors.length > 1)? 'Mutiple' : 'An';
      let errors = '';
      zodError.errors.map((error, index) => {
        errors += `\t${index + 1}.) ${error.message}\n`;
      });
      console.log(`${amount} error(s) ocurred while checking the input Object!.\n${errors}`);
      return undefined;
    }
    if (Object.hasOwn(error, 'token')) { // Checks if the error object has an 'offset property
      console.log('An error occured while reading the input file!');
      const lineAndColRegex = /line (\d+) col (\d+):/;
      const expectedTokenRegex = /A (.*) token based on:/g;
      const line = lineAndColRegex.exec(error.message)[1]; // Mejorar esto al poner line y col en los tokens
      const col = lineAndColRegex.exec(error.message)[2];
      console.log(`In line ${line} at column ${col}:`);
      if (error.token) {
        console.log(`The parser found an unexpected ${error.token.type} token with value: ${error.token.value}`);
      } else {
        console.log('The parser found an invalid syntax');
      }
      console.log(`The expected tokens are: ${[...error.message.matchAll(expectedTokenRegex)].map((match) => match[1])} `);
      return undefined;
    }
  }
}

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 */
function generatePrompt(inputObject, options) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
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

};

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 20/05/2024
 * @desc Contains all the function that handles the possible errors of the program
 */
import { OpenAI } from 'openai';
import * as fs from 'fs';

import { CONSOLE_PROMPT } from './utils.js';
import { COLORS } from './colors.js';

'use strict';

const ERROR_HANDLER = Object.create(null);

/**
 * @description Parse and prints to stderr the content of a ZodError exception 
 * @param {object} error The zodError exception to parse
 */
ERROR_HANDLER['zodError'] = (error) => {
  const isMoreThanOne = error.errors.length > 1;
  let amountOfErrors = `${(isMoreThanOne)? 'Mutiple' : 'An'} error${(isMoreThanOne)? '(s)' : ''}`;
  let errors = '';

  error.errors.map((error, index) => {
    errors += `${COLORS.red(`\t${index + 1}.)`)} ${error.message}\n`;
  });

  console.error(`${CONSOLE_PROMPT.ERROR}${amountOfErrors} ocurred while checking the inputObject.\n${errors}`);
};

/**
 * @description Parse and prints to stderr the content of a nearleyError exception
 * @param {object} error An error with a token property
 */
ERROR_HANDLER['nearleyError'] = (error, inputFile) => {
  const TOKEN = error.token;

  let errorMsg = `${CONSOLE_PROMPT.ERROR}The parser found an error while reading the input file.\n`;
  errorMsg += `  Unexpected ${TOKEN.type} token at line ${TOKEN.line} col ${TOKEN.col}.`;

  const LINES = fs.readFileSync(inputFile, 'utf8').split('\n');

  console.error(errorMsg, '\n');
  for (let i = TOKEN.line - 1; i <= TOKEN.line + 1; i++) {
    console.error(`${(i === TOKEN.line)? COLORS.red(`> ${i}`) : `  ${i}`} ${LINES[i - 1]}`);
  }
  
  const expectedTokenRegex = /A (.*) token based on:/g;
  const expectedTokens = [...error.message.matchAll(expectedTokenRegex)];

  console.error(`\nThe expected tokens are: ${expectedTokens.map((match) => match[1])}`);  
};

/**
 * Parse an OpenAI API Error, checking the type and logging the corresponding 
 * error message
 * @param {object} error An OpenAI API error
 */
ERROR_HANDLER['openaiError'] = (error) => {

  if (error instanceof OpenAI.APIError) {
    console.error(`${CONSOLE_PROMPT.ERROR}A(n) ${error.status} ${error.type} ocurred while making the API request.\n\t${error.message}`);
  } 
  else {
    console.error(`${CONSOLE_PROMPT.ERROR}A core OpenAI API error ocurred:\n\t${error.message}`);
  }
  
}

export { ERROR_HANDLER };
/**
 * cabecera 
 */
import nearley from 'nearley';

import * as grammarModule from './grammar.js';
import { COLORS } from './colors.js';
import { CONSOLE_PROMPT } from './utils.js';
'use strict';

const ERROR_HANDLER = Object.create(null);

/**
 * @description Parse and prints to stderr the content of a ZodError exception 
 * @param {object} error The zodError exception to parse
 */
ERROR_HANDLER['zodError'] = (error) => {
  let amount = (error.errors.length > 1)? 'Mutiple' : 'An';
  let errors = '';

  error.errors.map((error, index) => {
    errors += `\t${index + 1}.) ${error.message}\n`;
  });

  console.error(`${amount} error(s) ocurred while checking the input Object!\n${errors}`);
};

/**
 * @description Parse and prints to stderr the content of a nearleyError exception
 * @param {object} error An error with a token property
 */
ERROR_HANDLER['nearleyError'] = (error) => {
  const PARSER = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  let errorMsg = 'The parser found an error while reading the input file!\n';

  if (error.token) {
    errorMsg += `Unexpected ${error.token.type} token`;
  } else {
    errorMsg += 'Invalid syntax';
  }

  console.error(PARSER.lexer.formatError(error.token, errorMsg));
  
  const expectedTokenRegex = /A (.*) token based on:/g;
  const expectedTokens = [...error.message.matchAll(expectedTokenRegex)];

  console.error(`\nThe expected tokens are: ${expectedTokens.map((match) => match[1])}`);  
};

ERROR_HANDLER['openaiError'] = (error) => {
  console.error(`${CONSOLE_PROMPT.ERROR}A(n) ${error.status} ${error.type} ocurred while making the API request.\n\t${error.message}`);
}

export { ERROR_HANDLER };
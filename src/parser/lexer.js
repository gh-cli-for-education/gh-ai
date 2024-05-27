#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 19/05/2024
 * @desc Contains all the tokens used by the Lexer
 * @external Grammar
 */
import { makeLexer, moo } from 'moo-ignore';
'use strict';

/**
 * @description Checks if a character is a letter or not given the RegExp /[a-zA-Z]/
 * @param {string} char
 * @returns {boolean} True - if the character is a letter
 * @returns {boolean} False - if the character is not a letter
 */
const isLetter = (char) => {
  const LETTER_REGEXP = /[a-zA-Z]/;
  return LETTER_REGEXP.test(char);
};

/**
 * @description Given a word it will create a string following a case insensitive RegExp
 * @param {string} word The word that will be transformed into case insensitive 
 * @returns {string} A string with the case insensitive format
 * @example console.log(toCaseInsensive('name')); // Result -> '[nN][aA][mM][eE]'
 */
function toCaseInsensive(word) {
  const REGEX_SOURCE = word.split('').map((char) => {
    if (isLetter(char)) {
      return `[${char.toLowerCase()}${char.toUpperCase()}]`;
    }
    return char;
  });
  return REGEX_SOURCE.join('');
};

/**
 * Object that contains all the tokens used by the gh-ai extension
 */
const TOKENS = {
  WHITES: { match: /\s+/, lineBreaks: true },
  EOF:    '__EOF__',
  EXTENSION: { 
    match: new RegExp(`^[#][ ]+${toCaseInsensive('extension')}[ ]+(?:gh-[a-z][a-z0-9]*(?:[-][a-z0-9]+)*)`),
    value: (value) => {
      const EXTENSION_CAPTURING = new RegExp(`^[#][ ]+${toCaseInsensive('extension')}[ ]+(gh-[a-z][a-z0-9]*(?:[-][a-z0-9]+)*)`);
      const RESULT = EXTENSION_CAPTURING.exec(value);
      return RESULT[1]
    },
  },
  FUNCTION: { 
    match: new RegExp(`^[#]{2}[ ]+${toCaseInsensive('function')}[ ]+(?:[a-zA-Z][a-zA-Z_]*)`),
    value: (value) => {
      const FUNCTION_CAPTURING = new RegExp(`^[#]{2}[ ]+${toCaseInsensive('function')}[ ]+([a-zA-Z][a-zA-Z_]*)`);
      const RESULT = FUNCTION_CAPTURING.exec(value);
      return RESULT[1];      
    }
  }, 
  USAGE: { 
    match: new RegExp(`^[#]{3}[ ]+${toCaseInsensive('usage')}[ ]+(?:.*)`), 
    value: (value) => {
      const USAGE_CAPTURING = new RegExp(`^[#]{3}[ ]+${toCaseInsensive('usage')}[ ]+(.*)`);
      const RESULT = USAGE_CAPTURING.exec(value);
      return RESULT[1];      
    }
  },
  QUERY:             { match: new RegExp(`^[#]{3}[ ]+${toCaseInsensive('query')}`) },  
  DESCRIPTION:       { match: new RegExp(`^[#]{2,3}[ ]+${toCaseInsensive('description')}`) },
  TEMPLATE:          { match: new RegExp(`^[#]{3}[ ]+${toCaseInsensive('template')}`) },
  EXAMPLES:          { match: new RegExp(`^[#]{2}[ ]+${toCaseInsensive('examples')}`) }, 
  HELP:              { match: new RegExp(`^[#]{2}[ ]+${toCaseInsensive('help')}`) },
  ARGUMENTS:         { match: new RegExp(`^[#]{3}[ ]+${toCaseInsensive('arguments')}`) }, 
  PARAMETERS:        { match: new RegExp(`^[#]{3}[ ]+${toCaseInsensive('parameters')}`) }, 
  LANGUAGE_SETTINGS: { match: new RegExp(`^[#]{2}[ ]+${toCaseInsensive('language')}[ ]*${toCaseInsensive('settings')}`) }, 
  CHAT_SETTINGS:     { match: new RegExp(`^[#][ ]+${toCaseInsensive('chat')}[ ]*${toCaseInsensive('settings')}`) }, 
  README:            { match: new RegExp(`^[#]{2}[ ]+${toCaseInsensive('readme')}`) }, 
  HEADER: { 
    match: /^(?:[#]{1,6})[ ]+(?:.*)/,
    value: (value) => {
      const HEADER_CAPTURING = /^([#]{1,6})[ ]+(.*)/;
      const RESULT = HEADER_CAPTURING.exec(value);
      return {
        depth: RESULT[1].length,
        content: RESULT[2],
      };
    },
  },
  COMMENT: { match: new RegExp(`^[\\[]${toCaseInsensive('comment')}[\\]][:][ ]+[#][ ]+[(].+[)]`) },
  LONG_PARAMETER: { 
    match: /^[-][ ]+(?:[-]{2}[a-z]{2,}(?:[-][a-z]{2,})*)(?:[ ]+(?:.*))?/, 
    value: (value) => {
      const LONG_PARAMETER_CAPTURING = /^[-][ ]+([-]{2}[a-zA-Z]{2,}(?:[-][a-zA-Z]{2,})*)(?:[ ]+(.*))?/;
      const RESULT = LONG_PARAMETER_CAPTURING.exec(value);
      return {
        parameter: RESULT[1],
        argument: null,
        description: RESULT[2]
      };
    } 
  },
  SHORT_PARAMETER: { 
    match: /^[-][ ]+(?:[-][a-z])(?:[ ]+(?:.*))?/, 
    value: (value) => {
      const SHORT_PARAMETER_CAPTURING = /^[-][ ]+([-][a-z])(?:[ ]+(.*))?/;
      const RESULT = SHORT_PARAMETER_CAPTURING.exec(value);
      return {
        parameter: RESULT[1],
        argument: null,
        description: RESULT[2]
      };
    } 
  },
  LONG_SHORT_PARAMETER: {
    match: /^[-][ ]+(?:[-][a-z][ ]+[-]{2}[a-z]{2,}(?:[-][a-z]{2,})*)(?:[ ]+(?:.*))?/,
    value: (value) => {
      const LONG_SHORT_PARAMETER_CAPTURING = /^[-][ ]+([-][a-z])[ ]+([-]{2}[a-z]{2,}(?:[-][a-z]{2,})*)(?:[ ]+(.*))?/;
      const RESULT = LONG_SHORT_PARAMETER_CAPTURING.exec(value);
      return {
        parameter: `${RESULT[1]} ${RESULT[2]}`,
        argument: null,
        description: RESULT[3],
      }
    },
  },
  KEY_VALUE: { 
    match: /^[-][ ]+(?:[a-zA-Z]+)[ ]*(?:[:]|[=])[ ]*(?:[a-zA-Z]+)/, 
    value: (value) => {
      const KEY_VALUE_CAPTURING = /^[-][ ]+([a-zA-Z]+)[ ]*(?:[:]|[=])[ ]*([a-zA-Z]+)/;
      const RESULT = KEY_VALUE_CAPTURING.exec(value);
      return {
        name: RESULT[1],
        value: RESULT[2]
      };
    }
  },
  ARGUMENT: { 
    match: /^[-][ ]+(?:[a-z][a-z0-9]*(?:[-][a-z0-9]+)*)(?:[ ]+(?:.*))/,
    value: (value) => {
      const ARGUMENT_CAPTURING = /^[-][ ]+([a-z][a-z0-9]*(?:[-][a-z0-9]+)*)(?:[ ]+(.*))/;
      const RESULT = ARGUMENT_CAPTURING.exec(value);
      return {
        argument: RESULT[1],
        description: RESULT[2]
      };      
    } 
  },
  ITEM_LIST: {
    match: /^(?:(?:[-+*])|(?:[0-9]+[.]))[ ]+(?:.*)/,
    value: (value) => {
      const ITEM_LIST_CAPTURING = /^(?:([-+*])|([0-9]+)[.])[ ]+(.*)/;
      const RESULT = ITEM_LIST_CAPTURING.exec(value);
      return {
        delimiter: RESULT[1] ?? RESULT[2],
        isOrdered: (RESULT[2] !== undefined),
        content: RESULT[3]
      };
    },

  },
  CODEBLOCK: { match: /^[`]{3}(?:[a-zA-Z]+)(?:[^\n]|\n)*?[`]{3}$/, lineBreaks: true, },
  HIGHLIGHT: { match: /[`](?:[^\n]*?)[`]/ },
  PARAGRAPH: { match: /(?:[^\n]+|\n)/, lineBreaks: true},
  ERROR:     moo.error,
};

// Generation of the Lexer, it will skip any WHITES and COMMENT tokens
const LEXER = makeLexer(TOKENS, ['WHITES', 'COMMENT'], { eof: true });

export { LEXER };
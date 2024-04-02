#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 09/02/2024
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
  const regexSource = word.split('').map((char) => {
    if (isLetter(char)) {
      return `[${char.toLowerCase()}${char.toUpperCase()}]`;
    }
    return char;
  });
  return regexSource.join('');
};

const TOKENS = {
  WHITES: { match: /\s+/, lineBreaks: true },
  EOF: '__EOF__',
  EXTENSION: { match: new RegExp('^# *' + toCaseInsensive('extension')) },
  QUERY: { match: new RegExp('^# *' + toCaseInsensive('query')) }, 
  MAIN_FILE: { 
    match: new RegExp('^#{2} *' + toCaseInsensive('main') + ' *' + toCaseInsensive('file') + ' +gh-[a-z][a-z0-9]*(?:[-][a-z0-9]+)*'), 
    value: (value) => {
      const MAIN_FILE_CAPTURING = new RegExp('^#{2} *' + toCaseInsensive('main') + ' *' + toCaseInsensive('file') + ' +(gh-[a-z][a-z0-9]*(?:[-][a-z0-9]+)*)');
      const RESULT = MAIN_FILE_CAPTURING.exec(value);
      return RESULT[1];
    } 
  },  
  FUNCTIONS:  { match: new RegExp('^#{3} *' + toCaseInsensive('functions')) }, 
  EXAMPLES:   { match: new RegExp('^#{2} *' + toCaseInsensive('examples')) }, 
  HELP:       { match: new RegExp('^#{3} *' + toCaseInsensive('help')) }, 
  ARGUMENTS:  { match: new RegExp('^#{3} *' + toCaseInsensive('arguments')) }, 
  PARAMETERS: { match: new RegExp('^#{3} *' + toCaseInsensive('parameters')) }, 
  FILE: { 
    match: new RegExp('^#{2} *' + toCaseInsensive('file') + ' +[a-z][a-z0-9]*(?:[-][a-z0-9]+)*'), 
    value: (value) => {
      const FILE_CAPTURING = new RegExp('^#{2} *' + toCaseInsensive('file') + ' +([a-z][a-z0-9]*(?:[-][a-z0-9]+)*)');
      const RESULT = FILE_CAPTURING.exec(value);
      return RESULT[1];
    } 
  }, 
  LANGUAGE_SETTINGS: { match: new RegExp('^#{2} *' + toCaseInsensive('language') + ' *' + toCaseInsensive('settings')) }, 
  CHAT_SETTINGS:     { match: new RegExp('^# *' + toCaseInsensive('chat') + ' *' + toCaseInsensive('settings')) }, 
  README:            { match: new RegExp('^#{2} *' + toCaseInsensive('readme')) }, 
  COMMENT:           { match: new RegExp('^\\[' + toCaseInsensive('comment') + '\\]: +# +\\([^\\n]+\\)') }, 
  LONG_PARAMETER: { 
    match: /^[-] +[-]{2}[a-zA-Z]{2,}(?:[-][a-zA-Z]{2,})* +(?:.*)/, 
    value: (value) => {
      const LONG_PARAMETER_CAPTURING = /[-] +([-]{2}[a-zA-Z]{2,}(?:[-][a-zA-Z]{2,})*) +(.*)/;
      const RESULT = LONG_PARAMETER_CAPTURING.exec(value);
      return {
        parameter: RESULT[1],
        argument: null,
        description: RESULT[2]
      };
    } 
  },
  SHORT_PARAMETER: { 
    match: /^[-] +[-][a-zA-Z] +(?:.*)/, 
    value: (value) => {
      const SHORT_PARAMETER_CAPTURING = /[-] +([-][a-zA-Z]) +(.*)/;
      const RESULT = SHORT_PARAMETER_CAPTURING.exec(value);
      return {
        parameter: RESULT[1],
        argument: null,
        description: RESULT[2]
      };
    } 
  },
  SETTING: { 
    match: /^[-] +(?:[a-zA-Z]+) *: *(?:[a-zA-Z]+)/, 
    value: (value) => {
      const SETTING_CAPTURING = /^[-] +([a-zA-Z]+) *: *([a-zA-Z]+)/;
      const RESULT = SETTING_CAPTURING.exec(value);
      return {
        name: RESULT[1],
        value: RESULT[2]
      };
    }
  },
  ARGUMENT: { 
    match: /[-] +(?:[a-z][a-z0-9]*(?:[-][a-z0-9]+)*)(?: +.*)?/,
    value: (value) => {
      const ARGUMENT_CAPTURING = /[-] +([a-z][a-z0-9]*(?:[-][a-z0-9]+)*)(?: +(.*))?/;
      const RESULT = ARGUMENT_CAPTURING.exec(value);
      return {
        argument: RESULT[1],
        description: RESULT[2]
      };      
    } 
  },
  UNORDERED_LIST: { 
    match: /[+*] (?:[^\n]*)/, 
    value: (value) => {
      const UNORDERED_LIST_CAPTURING = /[-+*] ([^\n]*)/;
      const RESULT = UNORDERED_LIST_CAPTURING.exec(value);
      return RESULT[1];          
    } 
  },
  ORDERED_LIST: { 
    match: /\d+\. (?:[^\n]*)/, 
    value: (value) => {
      const ORDERED_LIST_CAPTURING = /(\d+)\. ([^\n]*)/;
      const RESULT = ORDERED_LIST_CAPTURING.exec(value);
      return {
        order: RESULT[1],
        content: RESULT[2]
      }       
    } 
  },
  CODEBLOCK: { match: /^[`]{3}[a-zA-Z]+(?:[^\n]|\n)*?[`]{3}$/, lineBreaks: true, },
  HIGHLIGHT: /[`](?:[^\n]*)[`]/,
  PARAGRAPH: { match: /(?:[^\n]+|\n)/, lineBreaks: true},
  ERROR:     moo.error,
};

const LEXER = makeLexer(TOKENS, ['WHITES', 'COMMENT'], { eof: true });

export { LEXER };
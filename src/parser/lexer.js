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
 * @description Cut double quotation marks from a given string
 * @param {string} string The string with the double quotation marks 
 * @returns {string} The string without the double quotation marks
 * @example console.log(sliceQuotationMarks('"hello!"')); // 'hello!'
 */
const sliceDoubleQuotationMarks = (string) => {
  return string.slice(1, -1);
};

/**
 * @description Extract the content of a paragraph removing both delimiters
 * @param {string} paragraph 
 * @returns {string} With the content of the paragraph
 */
const getParagraphContent = (paragraph) => {
  const PARAGRAPH_WITH_GROUP = /<p>((?:.|\s)*?)<\/p>/;
  return PARAGRAPH_WITH_GROUP.exec(paragraph)[1].trim();
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

// Auxiliary regex 
const ARG_NAME        = '\s*[a-z][a-z]*(?:[-][a-z][a-z]*)*\s*';

const TOKENS = {
  HASH_SYMBOL:       /[#]/,
  PARAMETER:         /[-][a-zA-Z]|[-]{2}[a-zA-Z]{2,}/, // Esta incompleto
  HYPHEN:            /[-]/,
  COLON:             /[:]/,
  WHITES:            { match: /\s+/, lineBreaks: true },
  COMMENT:           new RegExp('[[]' + toCaseInsensive('comment') + '[]]:\\s*#\\s*[(][^\\n]+?[)]'),
  STRING:            { match: /"(?:[^"\\]|\\.)*"/, value: sliceDoubleQuotationMarks, lineBreaks: true },
  PARAGRAPH:         { match: /<p>(?:.|\s)*?<\/p>/, value: getParagraphContent, lineBreaks: true },
  ARGUMENT:          new RegExp(`\<${ARG_NAME}\>|\[${ARG_NAME}\]`), // Hacer la función que parsee el valor
  GH_NAME:           /gh-[a-z][a-z0-9]*(?:[-][a-z0-9]+)*/,
  EXTENSION:         new RegExp(toCaseInsensive('extension')),
  MAIN_FILE:         new RegExp(toCaseInsensive('main') + '\\s*' + toCaseInsensive('file')),
  FUNCTIONS:         new RegExp(toCaseInsensive('functions')),
  PARAMETERS:        new RegExp(toCaseInsensive('parameters')),
  ARGUMENTS:         new RegExp(toCaseInsensive('arguments')),
  LANGUAGE_SETTINGS: new RegExp(toCaseInsensive('language') + '\\s*' + toCaseInsensive('settings')),
  CHAT_SETTINGS:     new RegExp(toCaseInsensive('chat') + '\\s*' + toCaseInsensive('settings')),
  LANGUAGE:          new RegExp(toCaseInsensive('language')),
  STYLE:             new RegExp(toCaseInsensive('style')),
  SPECIFICATION:     new RegExp(toCaseInsensive('specification')),
  EXAMPLES:          new RegExp(toCaseInsensive('examples')),
  FILES:             new RegExp(toCaseInsensive('files')),
  FILE:              new RegExp(toCaseInsensive('file')),
  HELP:              new RegExp(toCaseInsensive('help')),
  API_QUERY:         new RegExp(toCaseInsensive('api') + '\\s*' + toCaseInsensive('query')),
  EOF:               '__EOF__',
  WORD:              /[^-<>\.:\s\[\]{}(),"]+/, // Arreglar lo de los word y las keywords
  ERROR:             moo.error

};

// console.log(TOKENS, '\n');

/** @description moo-ignore lexer with all the tokens needed for the parser */
let lexer = makeLexer(TOKENS, ['WHITES', 'COMMENT'], { eof: true });

export { lexer };

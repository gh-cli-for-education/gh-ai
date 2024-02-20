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

const HASH_SYMBOL     = /[#]/;
const WHITES          = /(?:\s+|\/\*(?:.|\n)*?\*\/)+/; // ESTE WHITES ESTA PENSADO PARA EGG
const STRING          = /"(?:[^"\\]|\\.)*"/;
const PARAGRAPH       = /<p>(?:.|\s)*?<\/p>/;
const GH_NAME         = /[a-z][a-z0-9]*(?:[-][a-z0-9]+)*/
const NAME            = new RegExp(toCaseInsensive('name'));                                                                             // /name/i
const SCRIPT_LANGUAGE = new RegExp(toCaseInsensive('script') + '(?:' + toCaseInsensive('ing') + ')?\\s*' + toCaseInsensive('language')); // /script(?:ing)?\s*language/i
const SPECIFICATION   = new RegExp(toCaseInsensive('specification'));                                                                    // /specification/i
const STYLE           = new RegExp(toCaseInsensive('style'));                                                                            // /style/i
const DESCRIPTION     = new RegExp(toCaseInsensive('description'));                                                                      // /description/i
const USAGE           = new RegExp(toCaseInsensive('usage'));                                                                            // /usage/i
const HELP            = new RegExp(toCaseInsensive('help'));                                                                             // /help/i
const PARAMETER       = new RegExp(toCaseInsensive('parameter'));                                                                        // /parameter/i
const EXAMPLE         = new RegExp(toCaseInsensive('example'));                                                                          // /example/i
const COMMAND         = new RegExp(toCaseInsensive('command'));                                                                          // /command/i
const OUTPUT          = new RegExp(toCaseInsensive('output'));                                                                           // /output/i
const LANGUAGE        = new RegExp(toCaseInsensive('language'));                                                                         // /language/i
const FILE            = new RegExp(toCaseInsensive('file'));                                                                             // /file/i
const ARGUMENT        = new RegExp(toCaseInsensive('argument'));                                                                         // /argument/i
const EOF             = '__EOF__';

const TOKENS = {
  HASH_SYMBOL,
  WHITES:    { match: WHITES, lineBreaks: true },
  STRING:    { match: STRING, value: sliceDoubleQuotationMarks, lineBreaks: true },
  PARAGRAPH: { match: PARAGRAPH, value: getParagraphContent, lineBreaks: true },
  NAME,
  SCRIPT_LANGUAGE,
  SPECIFICATION,
  STYLE,
  DESCRIPTION,
  USAGE,
  HELP,
  PARAMETER,
  EXAMPLE,
  COMMAND,
  OUTPUT,
  LANGUAGE,
  FILE,
  ARGUMENT,
  GH_NAME,
  EOF,
  ERROR: moo.error
};

// console.log(TOKENS, '\n');

/** @description moo-ignore lexer with all the tokens needed for the parser */
let lexer = makeLexer(TOKENS, ['WHITES'], { eof: true });

export { lexer };

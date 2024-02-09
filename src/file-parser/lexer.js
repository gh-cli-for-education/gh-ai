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
import { makeLexer } from 'moo-ignore';
'use strict';

const WHITES =          /(?:\s+|\/\*(?:.|\n)*?\*\/)+/; // ESTE WHITES ESTA PENSADO PARA EGG
const STRING =          /"(?:[^"\\]|\\.)*"/;
const LANG_CASE_WORD =  /[a-z][a-z0-9]*(?:[-][a-z0-9]+)*/
const HASH_SYMBOL =     /[#]/;
const NAME =            /NAME/;
const SCRIPT_LANGUAGE = /SCRIPT(?:ING)?\s*LANGUAGE/;
const DESCRIPTION =     /DESCRIPTION/;
const HELP =            /HELP/;
const PARAMETERS =      /PARAMETERS/;
const EXAMPLES =        /EXAMPLES/;
const INPUT =           /INPUT/;
const EXPECTED_OUTPUT = /(?:EXPECTED\s*)?OUTPUT/;
const CHAT_LANGUAGE =   /CHAT\s*LANGUAGE/;
const EOF = '__EOF__';

const TOKENS = {
  WHITES: { match: WHITES, lineBreaks: true},
  STRING: { match: STRING, value: (value) => { return value.slice(1, -1); }},
  HASH_SYMBOL,
  NAME,
  SCRIPT_LANGUAGE,
  DESCRIPTION,
  HELP,
  PARAMETERS,
  EXAMPLES,
  INPUT,
  EXPECTED_OUTPUT,
  CHAT_LANGUAGE,
  LANG_CASE_WORD,
  EOF
};

/** @description moo-ignore lexer with all the tokens needed for the parser */
let lexer = makeLexer(TOKENS, ['WHITES'], { eof: true});

export { lexer };

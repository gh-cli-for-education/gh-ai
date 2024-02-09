/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 09/02/2024
 * @desc Contains all the parser rules and the corresponding semantic actions
 * @external Grammar
 * Generated automatically by nearley, version 2.20.1
 * http://github.com/Hardmath123/nearley
 */

import { lexer } from './file-parser/lexer.js';
import {
  buildProperty,
  buildPropertyList,
  buildObject,
  buildParameter,
  buildExample
} from './file-parser/semantic-actions.js'; 

function id(x) { return x[0]; }
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "prompt$ebnf$1", "symbols": []},
    {"name": "prompt$ebnf$1$subexpression$1", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), "properties"], "postprocess": buildPropertyList},
    {"name": "prompt$ebnf$1", "symbols": ["prompt$ebnf$1", "prompt$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prompt", "symbols": ["prompt$ebnf$1", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildObject},
    {"name": "properties", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME), (lexer.has("LANG_CASE_WORD") ? {type: "LANG_CASE_WORD"} : LANG_CASE_WORD)], "postprocess": buildProperty['name']},
    {"name": "properties", "symbols": [(lexer.has("SCRIPT_LANGUAGE") ? {type: "SCRIPT_LANGUAGE"} : SCRIPT_LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildProperty['scriptLanguage']},
    {"name": "properties", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildProperty['description']},
    {"name": "properties", "symbols": [(lexer.has("HELP") ? {type: "HELP"} : HELP), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildProperty['help']},
    {"name": "properties$ebnf$1$subexpression$1", "symbols": ["parameter"], "postprocess": id},
    {"name": "properties$ebnf$1", "symbols": ["properties$ebnf$1$subexpression$1"]},
    {"name": "properties$ebnf$1$subexpression$2", "symbols": ["parameter"], "postprocess": id},
    {"name": "properties$ebnf$1", "symbols": ["properties$ebnf$1", "properties$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "properties", "symbols": [(lexer.has("PARAMETERS") ? {type: "PARAMETERS"} : PARAMETERS), "properties$ebnf$1"], "postprocess": buildProperty['parameters']},
    {"name": "properties$ebnf$2$subexpression$1", "symbols": ["example"], "postprocess": id},
    {"name": "properties$ebnf$2", "symbols": ["properties$ebnf$2$subexpression$1"]},
    {"name": "properties$ebnf$2$subexpression$2", "symbols": ["example"], "postprocess": id},
    {"name": "properties$ebnf$2", "symbols": ["properties$ebnf$2", "properties$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "properties", "symbols": [(lexer.has("EXAMPLES") ? {type: "EXAMPLES"} : EXAMPLES), "properties$ebnf$2"], "postprocess": buildProperty['examples']},
    {"name": "properties", "symbols": [(lexer.has("CHAT_LANGUAGE") ? {type: "CHAT_LANGUAGE"} : CHAT_LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildProperty['chatLanguage']},
    {"name": "parameter", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), (lexer.has("NAME") ? {type: "NAME"} : NAME), (lexer.has("STRING") ? {type: "STRING"} : STRING), (lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), (lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildParameter},
    {"name": "example", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), (lexer.has("INPUT") ? {type: "INPUT"} : INPUT), (lexer.has("STRING") ? {type: "STRING"} : STRING), (lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), (lexer.has("EXPECTED_OUTPUT") ? {type: "EXPECTED_OUTPUT"} : EXPECTED_OUTPUT), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildExample}
]
  , ParserStart: "prompt"
};

export { grammar };

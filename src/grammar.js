// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

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
 */
import { lexer } from './file-parser/lexer.js';
import {
  getProperty,
  buildName,
  buildDescription,
  buildObject,
  buildScriptLanguage,
  buildLlmLanguage,
  buildUsage,
  buildParameter,
  buildExample,
  buildFile
} from './file-parser/semantic-actions.js'; 
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "prompt$ebnf$1", "symbols": []},
    {"name": "prompt$ebnf$1$subexpression$1", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), "property"], "postprocess": getProperty},
    {"name": "prompt$ebnf$1", "symbols": ["prompt$ebnf$1", "prompt$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prompt", "symbols": ["prompt$ebnf$1", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildObject},
    {"name": "property", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME), (lexer.has("GH_NAME") ? {type: "GH_NAME"} : GH_NAME)], "postprocess": buildName},
    {"name": "property", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": buildDescription},
    {"name": "property", "symbols": [(lexer.has("SCRIPT_LANGUAGE") ? {type: "SCRIPT_LANGUAGE"} : SCRIPT_LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING), "specification", "style"], "postprocess": buildScriptLanguage},
    {"name": "property", "symbols": [(lexer.has("LANGUAGE") ? {type: "LANGUAGE"} : LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildLlmLanguage},
    {"name": "property", "symbols": [(lexer.has("USAGE") ? {type: "USAGE"} : USAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING), "help"], "postprocess": buildUsage},
    {"name": "property", "symbols": [(lexer.has("PARAMETER") ? {type: "PARAMETER"} : PARAMETER), "name", "description"], "postprocess": buildParameter},
    {"name": "property", "symbols": [(lexer.has("EXAMPLE") ? {type: "EXAMPLE"} : EXAMPLE), "command", "output"], "postprocess": buildExample},
    {"name": "property", "symbols": [(lexer.has("FILE") ? {type: "FILE"} : FILE), "name", "description"], "postprocess": buildFile},
    {"name": "specification", "symbols": [], "postprocess": id},
    {"name": "specification$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "specification$subexpression$1$macrocall$1", "symbols": ["specification$subexpression$1$macrocall$2", "specification$subexpression$1$macrocall$2"]},
    {"name": "specification$subexpression$1", "symbols": ["specification$subexpression$1$macrocall$1", (lexer.has("SPECIFICATION") ? {type: "SPECIFICATION"} : SPECIFICATION)]},
    {"name": "specification", "symbols": ["specification$subexpression$1", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": getProperty},
    {"name": "style", "symbols": [], "postprocess": id},
    {"name": "style$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "style$subexpression$1$macrocall$1", "symbols": ["style$subexpression$1$macrocall$2", "style$subexpression$1$macrocall$2"]},
    {"name": "style$subexpression$1", "symbols": ["style$subexpression$1$macrocall$1", (lexer.has("STYLE") ? {type: "STYLE"} : STYLE)]},
    {"name": "style", "symbols": ["style$subexpression$1", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": getProperty},
    {"name": "name$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "name$subexpression$1$macrocall$1", "symbols": ["name$subexpression$1$macrocall$2", "name$subexpression$1$macrocall$2"]},
    {"name": "name$subexpression$1", "symbols": ["name$subexpression$1$macrocall$1", (lexer.has("NAME") ? {type: "NAME"} : NAME)]},
    {"name": "name", "symbols": ["name$subexpression$1", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": getProperty},
    {"name": "description$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "description$subexpression$1$macrocall$1", "symbols": ["description$subexpression$1$macrocall$2", "description$subexpression$1$macrocall$2"]},
    {"name": "description$subexpression$1", "symbols": ["description$subexpression$1$macrocall$1", (lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION)]},
    {"name": "description", "symbols": ["description$subexpression$1", (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": getProperty},
    {"name": "command$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "command$subexpression$1$macrocall$1", "symbols": ["command$subexpression$1$macrocall$2", "command$subexpression$1$macrocall$2"]},
    {"name": "command$subexpression$1", "symbols": ["command$subexpression$1$macrocall$1", (lexer.has("COMMAND") ? {type: "COMMAND"} : COMMAND)]},
    {"name": "command", "symbols": ["command$subexpression$1", (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": getProperty},
    {"name": "output$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "output$subexpression$1$macrocall$1", "symbols": ["output$subexpression$1$macrocall$2", "output$subexpression$1$macrocall$2"]},
    {"name": "output$subexpression$1", "symbols": ["output$subexpression$1$macrocall$1", (lexer.has("OUTPUT") ? {type: "OUTPUT"} : OUTPUT)]},
    {"name": "output", "symbols": ["output$subexpression$1", (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": getProperty},
    {"name": "help", "symbols": [], "postprocess": id},
    {"name": "help$ebnf$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "help$ebnf$1$subexpression$1$macrocall$1", "symbols": ["help$ebnf$1$subexpression$1$macrocall$2", "help$ebnf$1$subexpression$1$macrocall$2"]},
    {"name": "help$ebnf$1$subexpression$1", "symbols": ["help$ebnf$1$subexpression$1$macrocall$1", (lexer.has("HELP") ? {type: "HELP"} : HELP)]},
    {"name": "help$ebnf$1", "symbols": ["help$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "help$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "help", "symbols": ["help$ebnf$1", (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": getProperty}
]
  , ParserStart: "prompt"
}

export {grammar};

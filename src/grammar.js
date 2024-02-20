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
  getParameterValue,
  buildName,
  buildDescription,
  buildObject,
  buildScriptLanguage,
  buildLlmLanguage,
  buildUsage,
  buildParameter,
  buildArgument,
  buildExample,
  buildFile,
} from './file-parser/semantic-actions.js'; 
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "prompt$ebnf$1", "symbols": []},
    {"name": "prompt$ebnf$1$subexpression$1", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), "property"], "postprocess": getProperty},
    {"name": "prompt$ebnf$1", "symbols": ["prompt$ebnf$1", "prompt$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prompt", "symbols": ["prompt$ebnf$1", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildObject},
    {"name": "property", "symbols": []},
    {"name": "property", "symbols": [(lexer.has("SCRIPT_LANGUAGE") ? {type: "SCRIPT_LANGUAGE"} : SCRIPT_LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING), "specification", "style"], "postprocess": buildScriptLanguage},
    {"name": "property", "symbols": [(lexer.has("LANGUAGE") ? {type: "LANGUAGE"} : LANGUAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": buildLlmLanguage},
    {"name": "property", "symbols": [(lexer.has("USAGE") ? {type: "USAGE"} : USAGE), (lexer.has("STRING") ? {type: "STRING"} : STRING), "help"], "postprocess": buildUsage},
    {"name": "property", "symbols": [(lexer.has("PARAMETER") ? {type: "PARAMETER"} : PARAMETER), "name", "description"], "postprocess": buildParameter},
    {"name": "property", "symbols": [(lexer.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT), "name", "description"], "postprocess": buildArgument},
    {"name": "property", "symbols": [(lexer.has("EXAMPLE") ? {type: "EXAMPLE"} : EXAMPLE), "command", "output"], "postprocess": buildExample},
    {"name": "property", "symbols": [(lexer.has("FILE") ? {type: "FILE"} : FILE), "name", "description"], "postprocess": buildFile},
    {"name": "property", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME), (lexer.has("GH_NAME") ? {type: "GH_NAME"} : GH_NAME)], "postprocess": buildName},
    {"name": "property", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": buildDescription},
    {"name": "specification$macrocall$2", "symbols": [(lexer.has("SPECIFICATION") ? {type: "SPECIFICATION"} : SPECIFICATION)]},
    {"name": "specification$macrocall$3", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "specification$macrocall$1", "symbols": [], "postprocess": id},
    {"name": "specification$macrocall$1$macrocall$2", "symbols": ["specification$macrocall$2"]},
    {"name": "specification$macrocall$1$macrocall$3", "symbols": ["specification$macrocall$3"]},
    {"name": "specification$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "specification$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "symbols": ["specification$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "specification$macrocall$1$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "specification$macrocall$1$macrocall$1$subexpression$1", "symbols": ["specification$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "specification$macrocall$1$macrocall$2"]},
    {"name": "specification$macrocall$1$macrocall$1", "symbols": ["specification$macrocall$1$macrocall$1$subexpression$1", "specification$macrocall$1$macrocall$3"], "postprocess": getProperty},
    {"name": "specification$macrocall$1", "symbols": ["specification$macrocall$1$macrocall$1"], "postprocess": id => id[0].flat()},
    {"name": "specification", "symbols": ["specification$macrocall$1"], "postprocess": getParameterValue},
    {"name": "style$macrocall$2", "symbols": [(lexer.has("STYLE") ? {type: "STYLE"} : STYLE)]},
    {"name": "style$macrocall$3", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "style$macrocall$1", "symbols": [], "postprocess": id},
    {"name": "style$macrocall$1$macrocall$2", "symbols": ["style$macrocall$2"]},
    {"name": "style$macrocall$1$macrocall$3", "symbols": ["style$macrocall$3"]},
    {"name": "style$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "style$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "symbols": ["style$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "style$macrocall$1$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "style$macrocall$1$macrocall$1$subexpression$1", "symbols": ["style$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "style$macrocall$1$macrocall$2"]},
    {"name": "style$macrocall$1$macrocall$1", "symbols": ["style$macrocall$1$macrocall$1$subexpression$1", "style$macrocall$1$macrocall$3"], "postprocess": getProperty},
    {"name": "style$macrocall$1", "symbols": ["style$macrocall$1$macrocall$1"], "postprocess": id => id[0].flat()},
    {"name": "style", "symbols": ["style$macrocall$1"], "postprocess": getParameterValue},
    {"name": "command$macrocall$2", "symbols": [(lexer.has("COMMAND") ? {type: "COMMAND"} : COMMAND)]},
    {"name": "command$macrocall$3", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "command$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "command$macrocall$1$subexpression$1$macrocall$1", "symbols": ["command$macrocall$1$subexpression$1$macrocall$2", "command$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "command$macrocall$1$subexpression$1", "symbols": ["command$macrocall$1$subexpression$1$macrocall$1", "command$macrocall$2"]},
    {"name": "command$macrocall$1", "symbols": ["command$macrocall$1$subexpression$1", "command$macrocall$3"], "postprocess": getProperty},
    {"name": "command", "symbols": ["command$macrocall$1"], "postprocess": getParameterValue},
    {"name": "output$macrocall$2", "symbols": [(lexer.has("OUTPUT") ? {type: "OUTPUT"} : OUTPUT)]},
    {"name": "output$macrocall$3", "symbols": [(lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)]},
    {"name": "output$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "output$macrocall$1$subexpression$1$macrocall$1", "symbols": ["output$macrocall$1$subexpression$1$macrocall$2", "output$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "output$macrocall$1$subexpression$1", "symbols": ["output$macrocall$1$subexpression$1$macrocall$1", "output$macrocall$2"]},
    {"name": "output$macrocall$1", "symbols": ["output$macrocall$1$subexpression$1", "output$macrocall$3"], "postprocess": getProperty},
    {"name": "output", "symbols": ["output$macrocall$1"], "postprocess": getParameterValue},
    {"name": "help$macrocall$2", "symbols": [(lexer.has("HELP") ? {type: "HELP"} : HELP)]},
    {"name": "help$macrocall$3", "symbols": [(lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)]},
    {"name": "help$macrocall$1", "symbols": [], "postprocess": id},
    {"name": "help$macrocall$1$macrocall$2", "symbols": ["help$macrocall$2"]},
    {"name": "help$macrocall$1$macrocall$3", "symbols": ["help$macrocall$3"]},
    {"name": "help$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "help$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "symbols": ["help$macrocall$1$macrocall$1$subexpression$1$macrocall$2", "help$macrocall$1$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "help$macrocall$1$macrocall$1$subexpression$1", "symbols": ["help$macrocall$1$macrocall$1$subexpression$1$macrocall$1", "help$macrocall$1$macrocall$2"]},
    {"name": "help$macrocall$1$macrocall$1", "symbols": ["help$macrocall$1$macrocall$1$subexpression$1", "help$macrocall$1$macrocall$3"], "postprocess": getProperty},
    {"name": "help$macrocall$1", "symbols": ["help$macrocall$1$macrocall$1"], "postprocess": id => id[0].flat()},
    {"name": "help", "symbols": ["help$macrocall$1"], "postprocess": getParameterValue},
    {"name": "name$macrocall$2", "symbols": [(lexer.has("NAME") ? {type: "NAME"} : NAME)]},
    {"name": "name$macrocall$3", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)]},
    {"name": "name$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "name$macrocall$1$subexpression$1$macrocall$1", "symbols": ["name$macrocall$1$subexpression$1$macrocall$2", "name$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "name$macrocall$1$subexpression$1", "symbols": ["name$macrocall$1$subexpression$1$macrocall$1", "name$macrocall$2"]},
    {"name": "name$macrocall$1", "symbols": ["name$macrocall$1$subexpression$1", "name$macrocall$3"], "postprocess": getProperty},
    {"name": "name", "symbols": ["name$macrocall$1"], "postprocess": getParameterValue},
    {"name": "description$macrocall$2", "symbols": [(lexer.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION)]},
    {"name": "description$macrocall$3", "symbols": [(lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)]},
    {"name": "description$macrocall$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "description$macrocall$1$subexpression$1$macrocall$1", "symbols": ["description$macrocall$1$subexpression$1$macrocall$2", "description$macrocall$1$subexpression$1$macrocall$2"]},
    {"name": "description$macrocall$1$subexpression$1", "symbols": ["description$macrocall$1$subexpression$1$macrocall$1", "description$macrocall$2"]},
    {"name": "description$macrocall$1", "symbols": ["description$macrocall$1$subexpression$1", "description$macrocall$3"], "postprocess": getProperty},
    {"name": "description", "symbols": ["description$macrocall$1"], "postprocess": getParameterValue}
]
  , ParserStart: "prompt"
}

export {grammar};
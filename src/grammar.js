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
import { LEXER } from './parser/lexer.js';
import {
  buildPrompt,
  buildExtension,
  buildFile,
  buildFunction,
  buildHelp,
  buildReadme,
  buildExample,
  buildExamples,
  buildSettings,
} from './parser/semantic-actions.js';
var grammar = {
    Lexer: LEXER,
    ParserRules: [
    {"name": "prompt$ebnf$1", "symbols": []},
    {"name": "prompt$ebnf$1$subexpression$1", "symbols": ["mainProperties"], "postprocess": id},
    {"name": "prompt$ebnf$1", "symbols": ["prompt$ebnf$1", "prompt$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prompt", "symbols": ["prompt$ebnf$1", (LEXER.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildPrompt},
    {"name": "mainProperties$ebnf$1$subexpression$1", "symbols": ["extensionProperties"], "postprocess": id},
    {"name": "mainProperties$ebnf$1", "symbols": ["mainProperties$ebnf$1$subexpression$1"]},
    {"name": "mainProperties$ebnf$1$subexpression$2", "symbols": ["extensionProperties"], "postprocess": id},
    {"name": "mainProperties$ebnf$1", "symbols": ["mainProperties$ebnf$1", "mainProperties$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mainProperties", "symbols": [(LEXER.has("EXTENSION") ? {type: "EXTENSION"} : EXTENSION), "mainProperties$ebnf$1"], "postprocess": buildExtension},
    {"name": "mainProperties", "symbols": [(LEXER.has("QUERY") ? {type: "QUERY"} : QUERY)], "postprocess": id},
    {"name": "mainProperties$ebnf$2$subexpression$1", "symbols": [(LEXER.has("SETTING") ? {type: "SETTING"} : SETTING)], "postprocess": id},
    {"name": "mainProperties$ebnf$2", "symbols": ["mainProperties$ebnf$2$subexpression$1"]},
    {"name": "mainProperties$ebnf$2$subexpression$2", "symbols": [(LEXER.has("SETTING") ? {type: "SETTING"} : SETTING)], "postprocess": id},
    {"name": "mainProperties$ebnf$2", "symbols": ["mainProperties$ebnf$2", "mainProperties$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mainProperties", "symbols": [(LEXER.has("CHAT_SETTINGS") ? {type: "CHAT_SETTINGS"} : CHAT_SETTINGS), "mainProperties$ebnf$2"], "postprocess": buildSettings['chatSettings']},
    {"name": "extensionProperties$ebnf$1$subexpression$1", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "extensionProperties$ebnf$1", "symbols": ["extensionProperties$ebnf$1$subexpression$1"]},
    {"name": "extensionProperties$ebnf$1$subexpression$2", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "extensionProperties$ebnf$1", "symbols": ["extensionProperties$ebnf$1", "extensionProperties$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties$ebnf$2", "symbols": []},
    {"name": "extensionProperties$ebnf$2$subexpression$1", "symbols": ["function"], "postprocess": id},
    {"name": "extensionProperties$ebnf$2", "symbols": ["extensionProperties$ebnf$2", "extensionProperties$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties$ebnf$3$subexpression$1", "symbols": ["help"], "postprocess": id},
    {"name": "extensionProperties$ebnf$3", "symbols": ["extensionProperties$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "extensionProperties$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extensionProperties", "symbols": [(LEXER.has("MAIN_FILE") ? {type: "MAIN_FILE"} : MAIN_FILE), "extensionProperties$ebnf$1", "extensionProperties$ebnf$2", "extensionProperties$ebnf$3"], "postprocess": buildFile},
    {"name": "extensionProperties$ebnf$4$subexpression$1", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "extensionProperties$ebnf$4", "symbols": ["extensionProperties$ebnf$4$subexpression$1"]},
    {"name": "extensionProperties$ebnf$4$subexpression$2", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "extensionProperties$ebnf$4", "symbols": ["extensionProperties$ebnf$4", "extensionProperties$ebnf$4$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties$ebnf$5", "symbols": []},
    {"name": "extensionProperties$ebnf$5$subexpression$1", "symbols": ["function"], "postprocess": id},
    {"name": "extensionProperties$ebnf$5", "symbols": ["extensionProperties$ebnf$5", "extensionProperties$ebnf$5$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(LEXER.has("FILE") ? {type: "FILE"} : FILE), "extensionProperties$ebnf$4", "extensionProperties$ebnf$5"], "postprocess": buildFile},
    {"name": "extensionProperties$ebnf$6", "symbols": []},
    {"name": "extensionProperties$ebnf$6$subexpression$1", "symbols": [(LEXER.has("SETTING") ? {type: "SETTING"} : SETTING)], "postprocess": id},
    {"name": "extensionProperties$ebnf$6", "symbols": ["extensionProperties$ebnf$6", "extensionProperties$ebnf$6$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(LEXER.has("LANGUAGE_SETTINGS") ? {type: "LANGUAGE_SETTINGS"} : LANGUAGE_SETTINGS), "extensionProperties$ebnf$6"], "postprocess": buildSettings['languageSettings']},
    {"name": "extensionProperties$ebnf$7", "symbols": []},
    {"name": "extensionProperties$ebnf$7$subexpression$1", "symbols": [(LEXER.has("ORDERED_LIST") ? {type: "ORDERED_LIST"} : ORDERED_LIST)], "postprocess": id},
    {"name": "extensionProperties$ebnf$7", "symbols": ["extensionProperties$ebnf$7", "extensionProperties$ebnf$7$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(LEXER.has("README") ? {type: "README"} : README), "extensionProperties$ebnf$7"], "postprocess": buildReadme},
    {"name": "extensionProperties$ebnf$8$subexpression$1", "symbols": ["example"], "postprocess": id},
    {"name": "extensionProperties$ebnf$8", "symbols": ["extensionProperties$ebnf$8$subexpression$1"]},
    {"name": "extensionProperties$ebnf$8$subexpression$2", "symbols": ["example"], "postprocess": id},
    {"name": "extensionProperties$ebnf$8", "symbols": ["extensionProperties$ebnf$8", "extensionProperties$ebnf$8$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(LEXER.has("EXAMPLES") ? {type: "EXAMPLES"} : EXAMPLES), "extensionProperties$ebnf$8"], "postprocess": buildExamples},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("UNORDERED_LIST") ? {type: "UNORDERED_LIST"} : UNORDERED_LIST)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("HIGHLIGHT") ? {type: "HIGHLIGHT"} : HIGHLIGHT)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("CODEBLOCK") ? {type: "CODEBLOCK"} : CODEBLOCK)], "postprocess": id},
    {"name": "function$ebnf$1", "symbols": []},
    {"name": "function$ebnf$1$subexpression$1", "symbols": [(LEXER.has("SETTING") ? {type: "SETTING"} : SETTING)], "postprocess": id},
    {"name": "function$ebnf$1", "symbols": ["function$ebnf$1", "function$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function$ebnf$2$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "function$ebnf$2", "symbols": ["function$ebnf$2$subexpression$1"]},
    {"name": "function$ebnf$2$subexpression$2", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "function$ebnf$2", "symbols": ["function$ebnf$2", "function$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function$ebnf$3", "symbols": []},
    {"name": "function$ebnf$3$subexpression$1", "symbols": [(LEXER.has("ORDERED_LIST") ? {type: "ORDERED_LIST"} : ORDERED_LIST)], "postprocess": id},
    {"name": "function$ebnf$3", "symbols": ["function$ebnf$3", "function$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "function", "symbols": [(LEXER.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "function$ebnf$1", "function$ebnf$2", "function$ebnf$3"], "postprocess": buildFunction},
    {"name": "example$subexpression$1", "symbols": [(LEXER.has("HIGHLIGHT") ? {type: "HIGHLIGHT"} : HIGHLIGHT)], "postprocess": id},
    {"name": "example$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "example", "symbols": ["example$subexpression$1", (LEXER.has("CODEBLOCK") ? {type: "CODEBLOCK"} : CODEBLOCK)], "postprocess": buildExample},
    {"name": "help$ebnf$1", "symbols": []},
    {"name": "help$ebnf$1$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "help$ebnf$1", "symbols": ["help$ebnf$1", "help$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "help$ebnf$2", "symbols": []},
    {"name": "help$ebnf$2$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "help$ebnf$2", "symbols": ["help$ebnf$2", "help$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "help", "symbols": [(LEXER.has("HELP") ? {type: "HELP"} : HELP), (LEXER.has("USAGE") ? {type: "USAGE"} : USAGE), "help$ebnf$1", "argumentSection", "parameterSection", "help$ebnf$2"], "postprocess": buildHelp},
    {"name": "argumentSection", "symbols": [], "postprocess": id},
    {"name": "argumentSection$ebnf$1$subexpression$1", "symbols": [(LEXER.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT)], "postprocess": id},
    {"name": "argumentSection$ebnf$1", "symbols": ["argumentSection$ebnf$1$subexpression$1"]},
    {"name": "argumentSection$ebnf$1$subexpression$2", "symbols": [(LEXER.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT)], "postprocess": id},
    {"name": "argumentSection$ebnf$1", "symbols": ["argumentSection$ebnf$1", "argumentSection$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "argumentSection", "symbols": [(LEXER.has("ARGUMENTS") ? {type: "ARGUMENTS"} : ARGUMENTS), "argumentSection$ebnf$1"], "postprocess": id => id[1]},
    {"name": "parameterSection", "symbols": [], "postprocess": id},
    {"name": "parameterSection$ebnf$1$subexpression$1", "symbols": ["parameters"], "postprocess": id},
    {"name": "parameterSection$ebnf$1", "symbols": ["parameterSection$ebnf$1$subexpression$1"]},
    {"name": "parameterSection$ebnf$1$subexpression$2", "symbols": ["parameters"], "postprocess": id},
    {"name": "parameterSection$ebnf$1", "symbols": ["parameterSection$ebnf$1", "parameterSection$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameterSection", "symbols": [(LEXER.has("PARAMETERS") ? {type: "PARAMETERS"} : PARAMETERS), "parameterSection$ebnf$1"], "postprocess": id => id[1]},
    {"name": "parameters", "symbols": [(LEXER.has("SHORT_PARAMETER") ? {type: "SHORT_PARAMETER"} : SHORT_PARAMETER)], "postprocess": id},
    {"name": "parameters", "symbols": [(LEXER.has("LONG_PARAMETER") ? {type: "LONG_PARAMETER"} : LONG_PARAMETER)], "postprocess": id}
]
  , ParserStart: "prompt"
}

export {grammar};
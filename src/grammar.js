// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
function id(x) { return x[0]; }

/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 07/05/2024
 * @desc Contains all the parser rules and the corresponding semantic actions
 * @external Grammar
 */
import { LEXER } from './parser/lexer.js';
import {
  buildInputObject,
  buildExtension,
  buildFunction,
  buildHelp,
  buildDescription,
  buildFile,
  buildSection,
  buildSections,
  buildExample,
  buildExamples,
  buildSettings,
} from './parser/semantic-actions.js';
var grammar = {
    Lexer: LEXER,
    ParserRules: [
    {"name": "inputObject", "symbols": ["chatSettings", "extension", (LEXER.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildInputObject},
    {"name": "chatSettings$ebnf$1$subexpression$1", "symbols": [(LEXER.has("KEY_VALUE") ? {type: "KEY_VALUE"} : KEY_VALUE)], "postprocess": id},
    {"name": "chatSettings$ebnf$1", "symbols": ["chatSettings$ebnf$1$subexpression$1"]},
    {"name": "chatSettings$ebnf$1$subexpression$2", "symbols": [(LEXER.has("KEY_VALUE") ? {type: "KEY_VALUE"} : KEY_VALUE)], "postprocess": id},
    {"name": "chatSettings$ebnf$1", "symbols": ["chatSettings$ebnf$1", "chatSettings$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chatSettings", "symbols": [(LEXER.has("CHAT_SETTINGS") ? {type: "CHAT_SETTINGS"} : CHAT_SETTINGS), "chatSettings$ebnf$1"], "postprocess": buildSettings['chatSettings']},
    {"name": "extension$ebnf$1", "symbols": []},
    {"name": "extension$ebnf$1$subexpression$1", "symbols": ["function"], "postprocess": id},
    {"name": "extension$ebnf$1", "symbols": ["extension$ebnf$1", "extension$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extension$ebnf$2$subexpression$1", "symbols": ["help"], "postprocess": id},
    {"name": "extension$ebnf$2", "symbols": ["extension$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "extension$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extension$ebnf$3$subexpression$1", "symbols": ["examples"], "postprocess": id},
    {"name": "extension$ebnf$3", "symbols": ["extension$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "extension$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extension$ebnf$4$subexpression$1", "symbols": ["readme"], "postprocess": id},
    {"name": "extension$ebnf$4", "symbols": ["extension$ebnf$4$subexpression$1"], "postprocess": id},
    {"name": "extension$ebnf$4", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "extension", "symbols": [(LEXER.has("EXTENSION") ? {type: "EXTENSION"} : EXTENSION), "languageSettings", "description", "extension$ebnf$1", "extension$ebnf$2", "extension$ebnf$3", "extension$ebnf$4"], "postprocess": buildExtension},
    {"name": "languageSettings$ebnf$1$subexpression$1", "symbols": [(LEXER.has("KEY_VALUE") ? {type: "KEY_VALUE"} : KEY_VALUE)], "postprocess": id},
    {"name": "languageSettings$ebnf$1", "symbols": ["languageSettings$ebnf$1$subexpression$1"]},
    {"name": "languageSettings$ebnf$1$subexpression$2", "symbols": [(LEXER.has("KEY_VALUE") ? {type: "KEY_VALUE"} : KEY_VALUE)], "postprocess": id},
    {"name": "languageSettings$ebnf$1", "symbols": ["languageSettings$ebnf$1", "languageSettings$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "languageSettings", "symbols": [(LEXER.has("LANGUAGE_SETTINGS") ? {type: "LANGUAGE_SETTINGS"} : LANGUAGE_SETTINGS), "languageSettings$ebnf$1"], "postprocess": buildSettings['languageSettings']},
    {"name": "description$ebnf$1$subexpression$1", "symbols": [(LEXER.has("DESCRIPTION") ? {type: "DESCRIPTION"} : DESCRIPTION)], "postprocess": id},
    {"name": "description$ebnf$1", "symbols": ["description$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "description$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "description$ebnf$2$subexpression$1", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "description$ebnf$2", "symbols": ["description$ebnf$2$subexpression$1"]},
    {"name": "description$ebnf$2$subexpression$2", "symbols": ["descriptionBlock"], "postprocess": id},
    {"name": "description$ebnf$2", "symbols": ["description$ebnf$2", "description$ebnf$2$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "description", "symbols": ["description$ebnf$1", "description$ebnf$2"], "postprocess": buildDescription},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("UNORDERED_LIST") ? {type: "UNORDERED_LIST"} : UNORDERED_LIST)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("HIGHLIGHT") ? {type: "HIGHLIGHT"} : HIGHLIGHT)], "postprocess": id},
    {"name": "descriptionBlock", "symbols": [(LEXER.has("CODEBLOCK") ? {type: "CODEBLOCK"} : CODEBLOCK)], "postprocess": id},
    {"name": "function$ebnf$1$subexpression$1", "symbols": ["query"], "postprocess": id},
    {"name": "function$ebnf$1", "symbols": ["function$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "function$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function$ebnf$2$subexpression$1", "symbols": ["template"], "postprocess": id},
    {"name": "function$ebnf$2", "symbols": ["function$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "function$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "function", "symbols": [(LEXER.has("FUNCTION") ? {type: "FUNCTION"} : FUNCTION), "description", "function$ebnf$1", "function$ebnf$2"], "postprocess": buildFunction},
    {"name": "query", "symbols": [(LEXER.has("QUERY") ? {type: "QUERY"} : QUERY), "description"], "postprocess": id => id[1]},
    {"name": "template$ebnf$1$subexpression$1", "symbols": [(LEXER.has("TEMPLATE") ? {type: "TEMPLATE"} : TEMPLATE)], "postprocess": id},
    {"name": "template$ebnf$1", "symbols": ["template$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "template$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "template", "symbols": ["template$ebnf$1", (LEXER.has("CODEBLOCK") ? {type: "CODEBLOCK"} : CODEBLOCK)], "postprocess": id => id[1]},
    {"name": "help$ebnf$1", "symbols": []},
    {"name": "help$ebnf$1$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "help$ebnf$1", "symbols": ["help$ebnf$1", "help$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "help$ebnf$2$subexpression$1", "symbols": ["arguments"], "postprocess": id},
    {"name": "help$ebnf$2", "symbols": ["help$ebnf$2$subexpression$1"], "postprocess": id},
    {"name": "help$ebnf$2", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "help$ebnf$3$subexpression$1", "symbols": ["parameters"], "postprocess": id},
    {"name": "help$ebnf$3", "symbols": ["help$ebnf$3$subexpression$1"], "postprocess": id},
    {"name": "help$ebnf$3", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "help$ebnf$4", "symbols": []},
    {"name": "help$ebnf$4$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "help$ebnf$4", "symbols": ["help$ebnf$4", "help$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "help", "symbols": [(LEXER.has("HELP") ? {type: "HELP"} : HELP), "usage", "help$ebnf$1", "help$ebnf$2", "help$ebnf$3", "help$ebnf$4"], "postprocess": buildHelp},
    {"name": "usage", "symbols": [(LEXER.has("USAGE") ? {type: "USAGE"} : USAGE)], "postprocess": id},
    {"name": "usage", "symbols": [(LEXER.has("HIGHLIGHT") ? {type: "HIGHLIGHT"} : HIGHLIGHT)], "postprocess": id},
    {"name": "arguments$ebnf$1$subexpression$1", "symbols": [(LEXER.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT)], "postprocess": id},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1$subexpression$1"]},
    {"name": "arguments$ebnf$1$subexpression$2", "symbols": [(LEXER.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT)], "postprocess": id},
    {"name": "arguments$ebnf$1", "symbols": ["arguments$ebnf$1", "arguments$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "arguments", "symbols": [(LEXER.has("ARGUMENTS") ? {type: "ARGUMENTS"} : ARGUMENTS), "arguments$ebnf$1"], "postprocess": id => id[1]},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": [(LEXER.has("SHORT_PARAMETER") ? {type: "SHORT_PARAMETER"} : SHORT_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": [(LEXER.has("LONG_PARAMETER") ? {type: "LONG_PARAMETER"} : LONG_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1$subexpression$1", "symbols": [(LEXER.has("LONG_SHOT_PARAMETER") ? {type: "LONG_SHOT_PARAMETER"} : LONG_SHOT_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1$subexpression$1"]},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": [(LEXER.has("SHORT_PARAMETER") ? {type: "SHORT_PARAMETER"} : SHORT_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": [(LEXER.has("LONG_PARAMETER") ? {type: "LONG_PARAMETER"} : LONG_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1$subexpression$2", "symbols": [(LEXER.has("LONG_SHOT_PARAMETER") ? {type: "LONG_SHOT_PARAMETER"} : LONG_SHOT_PARAMETER)], "postprocess": id},
    {"name": "parameters$ebnf$1", "symbols": ["parameters$ebnf$1", "parameters$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "parameters", "symbols": [(LEXER.has("PARAMETERS") ? {type: "PARAMETERS"} : PARAMETERS), "parameters$ebnf$1"], "postprocess": id => id[1]},
    {"name": "examples$ebnf$1$subexpression$1", "symbols": ["example"], "postprocess": id},
    {"name": "examples$ebnf$1", "symbols": ["examples$ebnf$1$subexpression$1"]},
    {"name": "examples$ebnf$1$subexpression$2", "symbols": ["example"], "postprocess": id},
    {"name": "examples$ebnf$1", "symbols": ["examples$ebnf$1", "examples$ebnf$1$subexpression$2"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "examples", "symbols": [(LEXER.has("EXAMPLES") ? {type: "EXAMPLES"} : EXAMPLES), "examples$ebnf$1"], "postprocess": buildExamples},
    {"name": "example$subexpression$1", "symbols": [(LEXER.has("HIGHLIGHT") ? {type: "HIGHLIGHT"} : HIGHLIGHT)], "postprocess": id},
    {"name": "example$subexpression$1", "symbols": [(LEXER.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "example", "symbols": ["example$subexpression$1", (LEXER.has("CODEBLOCK") ? {type: "CODEBLOCK"} : CODEBLOCK)], "postprocess": buildExample},
    {"name": "readme", "symbols": [(LEXER.has("README") ? {type: "README"} : README), "sections"], "postprocess": buildFile},
    {"name": "sections$ebnf$1", "symbols": []},
    {"name": "sections$ebnf$1$subexpression$1", "symbols": ["section"], "postprocess": id},
    {"name": "sections$ebnf$1", "symbols": ["sections$ebnf$1", "sections$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "sections", "symbols": ["sections$ebnf$1"], "postprocess": buildSections},
    {"name": "section", "symbols": [(LEXER.has("HEADER") ? {type: "HEADER"} : HEADER), "description"], "postprocess": buildSection}
]
  , ParserStart: "inputObject"
}

export {grammar};

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
import { lexer } from './parser/lexer.js';
import {
  buildObject,
  getProperty,
  buildExtension,
  buildMainFileProperty,
  buildParametersProperty,
  buildLargeParameter,
  buildShortParameter,
  buildArgumentsProperty,
  buildArgument,
  buildFilesProperty,
  buildFileProperties,
  buildFunctionsProperty,
  buildFunction,
  buildLanguageSettingsProperty,
  buildSetting,
  buildExamplesProperty,
  buildExample,
  buildHelpProperty, 
  buildChatSettings
} from './parser/semantic-actions.js'; 
var grammar = {
    Lexer: lexer,
    ParserRules: [
    {"name": "prompt$ebnf$1", "symbols": []},
    {"name": "prompt$ebnf$1$subexpression$1", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL), "mainProperties"], "postprocess": getProperty},
    {"name": "prompt$ebnf$1", "symbols": ["prompt$ebnf$1", "prompt$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "prompt", "symbols": ["prompt$ebnf$1", (lexer.has("EOF") ? {type: "EOF"} : EOF)], "postprocess": buildObject},
    {"name": "mainProperties", "symbols": ["extension"], "postprocess": id},
    {"name": "mainProperties", "symbols": ["apiQuery"], "postprocess": id},
    {"name": "mainProperties", "symbols": ["chatSettings"], "postprocess": id},
    {"name": "extension$ebnf$1", "symbols": []},
    {"name": "extension$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "extension$ebnf$1$subexpression$1$subexpression$1$macrocall$1", "symbols": ["extension$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "extension$ebnf$1$subexpression$1$subexpression$1$macrocall$2"]},
    {"name": "extension$ebnf$1$subexpression$1$subexpression$1", "symbols": ["extension$ebnf$1$subexpression$1$subexpression$1$macrocall$1"]},
    {"name": "extension$ebnf$1$subexpression$1", "symbols": ["extension$ebnf$1$subexpression$1$subexpression$1", "extensionProperties"], "postprocess": getProperty},
    {"name": "extension$ebnf$1", "symbols": ["extension$ebnf$1", "extension$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extension", "symbols": [(lexer.has("EXTENSION") ? {type: "EXTENSION"} : EXTENSION), (lexer.has("GH_NAME") ? {type: "GH_NAME"} : GH_NAME), "extension$ebnf$1"], "postprocess": buildExtension},
    {"name": "extensionProperties$ebnf$1", "symbols": []},
    {"name": "extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$1", "symbols": ["extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$2", "extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$2"]},
    {"name": "extensionProperties$ebnf$1$subexpression$1$subexpression$1", "symbols": ["extensionProperties$ebnf$1$subexpression$1$subexpression$1$macrocall$1"]},
    {"name": "extensionProperties$ebnf$1$subexpression$1", "symbols": ["extensionProperties$ebnf$1$subexpression$1$subexpression$1", "mainFileProperties"], "postprocess": getProperty},
    {"name": "extensionProperties$ebnf$1", "symbols": ["extensionProperties$ebnf$1", "extensionProperties$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(lexer.has("MAIN_FILE") ? {type: "MAIN_FILE"} : MAIN_FILE), (lexer.has("GH_NAME") ? {type: "GH_NAME"} : GH_NAME), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH), "extensionProperties$ebnf$1"], "postprocess": buildMainFileProperty},
    {"name": "extensionProperties$ebnf$2", "symbols": []},
    {"name": "extensionProperties$ebnf$2$subexpression$1$macrocall$2", "symbols": [(lexer.has("HASH_SYMBOL") ? {type: "HASH_SYMBOL"} : HASH_SYMBOL)]},
    {"name": "extensionProperties$ebnf$2$subexpression$1$macrocall$1", "symbols": ["extensionProperties$ebnf$2$subexpression$1$macrocall$2", "extensionProperties$ebnf$2$subexpression$1$macrocall$2", "extensionProperties$ebnf$2$subexpression$1$macrocall$2"]},
    {"name": "extensionProperties$ebnf$2$subexpression$1", "symbols": ["extensionProperties$ebnf$2$subexpression$1$macrocall$1", "file"], "postprocess": getProperty},
    {"name": "extensionProperties$ebnf$2", "symbols": ["extensionProperties$ebnf$2", "extensionProperties$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(lexer.has("FILES") ? {type: "FILES"} : FILES), "extensionProperties$ebnf$2"], "postprocess": buildFilesProperty},
    {"name": "extensionProperties$ebnf$3", "symbols": []},
    {"name": "extensionProperties$ebnf$3$subexpression$1", "symbols": ["languageSettings"], "postprocess": id},
    {"name": "extensionProperties$ebnf$3", "symbols": ["extensionProperties$ebnf$3", "extensionProperties$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(lexer.has("LANGUAGE_SETTINGS") ? {type: "LANGUAGE_SETTINGS"} : LANGUAGE_SETTINGS), "mandatoryLanguageSetting", "extensionProperties$ebnf$3"], "postprocess": buildLanguageSettingsProperty},
    {"name": "extensionProperties$ebnf$4", "symbols": []},
    {"name": "extensionProperties$ebnf$4$subexpression$1", "symbols": ["example"], "postprocess": id},
    {"name": "extensionProperties$ebnf$4", "symbols": ["extensionProperties$ebnf$4", "extensionProperties$ebnf$4$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "extensionProperties", "symbols": [(lexer.has("EXAMPLES") ? {type: "EXAMPLES"} : EXAMPLES), "extensionProperties$ebnf$4"], "postprocess": buildExamplesProperty},
    {"name": "mainFileProperties", "symbols": [(lexer.has("HELP") ? {type: "HELP"} : HELP), (lexer.has("STRING") ? {type: "STRING"} : STRING), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": buildHelpProperty},
    {"name": "mainFileProperties$ebnf$1", "symbols": []},
    {"name": "mainFileProperties$ebnf$1$subexpression$1", "symbols": ["function"], "postprocess": id},
    {"name": "mainFileProperties$ebnf$1", "symbols": ["mainFileProperties$ebnf$1", "mainFileProperties$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mainFileProperties", "symbols": [(lexer.has("FUNCTIONS") ? {type: "FUNCTIONS"} : FUNCTIONS), "mainFileProperties$ebnf$1"], "postprocess": buildFunctionsProperty},
    {"name": "mainFileProperties$ebnf$2", "symbols": []},
    {"name": "mainFileProperties$ebnf$2$subexpression$1", "symbols": ["parameter"], "postprocess": id},
    {"name": "mainFileProperties$ebnf$2", "symbols": ["mainFileProperties$ebnf$2", "mainFileProperties$ebnf$2$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mainFileProperties", "symbols": [(lexer.has("PARAMETERS") ? {type: "PARAMETERS"} : PARAMETERS), "mainFileProperties$ebnf$2"], "postprocess": buildParametersProperty},
    {"name": "mainFileProperties$ebnf$3", "symbols": []},
    {"name": "mainFileProperties$ebnf$3$subexpression$1", "symbols": ["argument"], "postprocess": id},
    {"name": "mainFileProperties$ebnf$3", "symbols": ["mainFileProperties$ebnf$3", "mainFileProperties$ebnf$3$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "mainFileProperties", "symbols": [(lexer.has("ARGUMENTS") ? {type: "ARGUMENTS"} : ARGUMENTS), "mainFileProperties$ebnf$3"], "postprocess": buildArgumentsProperty},
    {"name": "file$ebnf$1", "symbols": []},
    {"name": "file$ebnf$1$subexpression$1", "symbols": ["function"], "postprocess": id},
    {"name": "file$ebnf$1", "symbols": ["file$ebnf$1", "file$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "file", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH), "file$ebnf$1"], "postprocess": buildFileProperties},
    {"name": "function", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("WORD") ? {type: "WORD"} : WORD), (lexer.has("COLON") ? {type: "COLON"} : COLON), "paragraphOrString"], "postprocess": buildFunction},
    {"name": "parameter$ebnf$1$subexpression$1", "symbols": [(lexer.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT)], "postprocess": id},
    {"name": "parameter$ebnf$1", "symbols": ["parameter$ebnf$1$subexpression$1"], "postprocess": id},
    {"name": "parameter$ebnf$1", "symbols": [], "postprocess": function(d) {return null;}},
    {"name": "parameter", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("LARGE_PARAMETER") ? {type: "LARGE_PARAMETER"} : LARGE_PARAMETER), "parameter$ebnf$1", "paragraphOrString"], "postprocess": buildLargeParameter},
    {"name": "parameter", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("SHORT_PARAMETER") ? {type: "SHORT_PARAMETER"} : SHORT_PARAMETER), "paragraphOrString"], "postprocess": buildShortParameter},
    {"name": "argument", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("ARGUMENT") ? {type: "ARGUMENT"} : ARGUMENT), "paragraphOrString"], "postprocess": buildArgument},
    {"name": "example", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("STRING") ? {type: "STRING"} : STRING), (lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": buildExample},
    {"name": "mandatoryLanguageSetting", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("LANGUAGE") ? {type: "LANGUAGE"} : LANGUAGE), (lexer.has("COLON") ? {type: "COLON"} : COLON), "wordOrString"], "postprocess": buildSetting},
    {"name": "languageSettings", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("STYLE") ? {type: "STYLE"} : STYLE), (lexer.has("COLON") ? {type: "COLON"} : COLON), "wordOrString"], "postprocess": buildSetting},
    {"name": "languageSettings", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), (lexer.has("SPECIFICATION") ? {type: "SPECIFICATION"} : SPECIFICATION), (lexer.has("COLON") ? {type: "COLON"} : COLON), "wordOrString"], "postprocess": buildSetting},
    {"name": "apiQuery", "symbols": [(lexer.has("API") ? {type: "API"} : API)], "postprocess": id},
    {"name": "chatSettings$ebnf$1", "symbols": []},
    {"name": "chatSettings$ebnf$1$subexpression$1", "symbols": [(lexer.has("HYPHEN") ? {type: "HYPHEN"} : HYPHEN), "chatSettingsProperties", (lexer.has("COLON") ? {type: "COLON"} : COLON), "wordOrString"], "postprocess": buildSetting},
    {"name": "chatSettings$ebnf$1", "symbols": ["chatSettings$ebnf$1", "chatSettings$ebnf$1$subexpression$1"], "postprocess": function arrpush(d) {return d[0].concat([d[1]]);}},
    {"name": "chatSettings", "symbols": [(lexer.has("CHAT_SETTINGS") ? {type: "CHAT_SETTINGS"} : CHAT_SETTINGS), "chatSettings$ebnf$1"], "postprocess": buildChatSettings},
    {"name": "chatSettingsProperties", "symbols": [(lexer.has("LANGUAGE") ? {type: "LANGUAGE"} : LANGUAGE)], "postprocess": id},
    {"name": "wordOrString", "symbols": [(lexer.has("WORD") ? {type: "WORD"} : WORD)], "postprocess": id},
    {"name": "wordOrString", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id},
    {"name": "paragraphOrString", "symbols": [(lexer.has("PARAGRAPH") ? {type: "PARAGRAPH"} : PARAGRAPH)], "postprocess": id},
    {"name": "paragraphOrString", "symbols": [(lexer.has("STRING") ? {type: "STRING"} : STRING)], "postprocess": id}
]
  , ParserStart: "prompt"
}

export {grammar};

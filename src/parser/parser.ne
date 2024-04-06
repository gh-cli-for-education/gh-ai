@{%
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
  buildFunctions,
  buildHelp,
  buildReadme,
  buildExample,
  buildExamples,
  buildSettings,
} from './parser/semantic-actions.js';
%}

@lexer LEXER

prompt -> (mainProperties {% id %}):* %EOF {% buildPrompt %}

mainProperties ->  
    %EXTENSION (extensionProperties {% id %}):+ {% buildExtension %}
  | %QUERY {% id %} 
  | %CHAT_SETTINGS (%SETTING {% id %}):+ {% buildSettings['chatSettings'] %}

extensionProperties ->  
    %MAIN_FILE (descriptionBlock {% id %}):+ (functions {% id %}):? (help {% id %}):?       {% buildFile %}
  | %FILE (descriptionBlock {% id %}):+ (functions {% id %}):?                              {% buildFile %}
  | %LANGUAGE_SETTINGS (%SETTING {% id %}):*                                                {% buildSettings['languageSettings'] %}
  | %README (%ORDERED_LIST {% id %}):*                                                      {% buildReadme %}
  | %EXAMPLES ((%HIGHLIGHT {% id %} | %PARAGRAPH {% id %}) %CODEBLOCK {% buildExample %}):+ {% buildExamples %}

descriptionBlock -> 
    %PARAGRAPH      {% id %}
  | %UNORDERED_LIST {% id %}
  | %HIGHLIGHT      {% id %}
  | %CODEBLOCK      {% id %}

functions -> %FUNCTIONS (%CODEBLOCK {% id %}):+ {% buildFunctions %}

help -> %HELP %USAGE (%PARAGRAPH {% id %}):* argumentSection parameterSection (%PARAGRAPH {% id %}):* {% buildHelp %}

argumentSection  -> 
    null {% id %} 
  | %ARGUMENTS (%ARGUMENT {% id %}):+ {% id => id[1] %}

parameterSection -> 
    null {% id %} 
  | %PARAMETERS (parameters {% id %}):+ {% id => id[1] %}

parameters ->  
    %SHORT_PARAMETER {% id %}
  | %LONG_PARAMETER  {% id %}
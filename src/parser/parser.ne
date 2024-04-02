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
    %MAIN_FILE (fileProperties {% id %}):* (help {% id %}):?        {% buildFile %}
  | %FILE (fileProperties {% id %}):*                               {% buildFile %}
  | %LANGUAGE_SETTINGS (%SETTING {% id %}):*                        {% buildSettings['languageSettings'] %}
  | %README (%ORDERED_LIST {% id %}):*                              {% buildReadme %}
  | %EXAMPLES ((%HIGHLIGHT {% id %} | %PARAGRAPH {% id %}) %CODEBLOCK {% buildExample %}):+ {% buildExamples %}

fileProperties -> 
    %PARAGRAPH                         {% id %}
  | %UNORDERED_LIST                    {% id %}
  | %CODEBLOCK                         {% id %}
  | %HIGHLIGHT                         {% id %}
  | %FUNCTIONS (%CODEBLOCK {% id %}):+ {% buildFunctions %}

help -> %HELP (%PARAGRAPH {% id %}):* (%ARGUMENTS (%ARGUMENT {% id %}):+ {% id => id[1] %}):? (%PARAMETERS (%SHORT_PARAMETER {% id %} | %LONG_PARAMETER {% id %}):+ {% id => id[1] %}):? (%PARAGRAPH {% id %}):* {% buildHelp %}
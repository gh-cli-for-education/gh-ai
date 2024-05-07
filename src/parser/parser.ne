@{%
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
%}

@lexer LEXER

###################################### Main Rule ######################################
inputObject -> chatSettings extension %EOF {% buildInputObject %}

###################################### Chat Settings rules ######################################
chatSettings -> %CHAT_SETTINGS (%KEY_VALUE {% id %}):+ {% buildSettings['chatSettings'] %}

###################################### Extension rules ######################################
extension -> %EXTENSION languageSettings description (function {% id %}):* (help {% id %}):? (examples {% id %}):? (readme {% id %}):? {% buildExtension %} 

languageSettings -> %LANGUAGE_SETTINGS (%KEY_VALUE {% id %}):+ {% buildSettings['languageSettings'] %}

description -> (%DESCRIPTION {% id %}):? (descriptionBlock {% id %}):+ {% buildDescription %}
descriptionBlock -> 
    %PARAGRAPH      {% id %}
  | %UNORDERED_LIST {% id %}
  | %HIGHLIGHT      {% id %}
  | %CODEBLOCK      {% id %}

function -> %FUNCTION description (query {% id %}):? (template {% id %}):? {% buildFunction %}
query -> %QUERY description {% id => id[1] %}
template -> %TEMPLATE %CODEBLOCK {% id => id[1] %}

help -> %HELP usage (%PARAGRAPH {% id %}):* (arguments {% id %}):? (parameters {% id %}):? (%PARAGRAPH {% id %}):* {% buildHelp %}
usage -> %USAGE {% id %} | %HIGHLIGHT {% id %}
arguments  -> %ARGUMENTS (%ARGUMENT {% id %}):+ {% id => id[1] %}
parameters -> %PARAMETERS (%SHORT_PARAMETER {% id %} | %LONG_PARAMETER {% id %} | %LONG_SHOT_PARAMETER {% id %}):+ {% id => id[1] %}

examples -> %EXAMPLES (example {% id %}):+ {% buildExamples %}
example  -> (%HIGHLIGHT {% id %} | %PARAGRAPH {% id %}) %CODEBLOCK {% buildExample %}

readme -> %README sections {% buildFile %}
sections -> (section {% id %}):* {% buildSections %}
section -> %HEADER description {% buildSection %}
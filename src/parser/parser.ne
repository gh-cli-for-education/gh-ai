@{%
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 19/05/2024
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
  buildSection,
  buildSections,
  buildExample,
  buildExamples,
  buildSettings,
  buildReadme
} from './parser/semantic-actions.js';
%}

@lexer LEXER

###################################### Main Rule ######################################
inputObject -> (mainProperties {% id %}):* %EOF {% buildInputObject %}

mainProperties -> chatSettings {% id %} | extension {% id %}

###################################### Chat Settings block rules ######################################
chatSettings -> %CHAT_SETTINGS (%KEY_VALUE {% id %}):+ {% buildSettings['chatSettings'] %}

###################################### Extension block rules ######################################
extension -> %EXTENSION description (extensionProperties {% id %}):* {% buildExtension %} 

extensionProperties -> 
    languageSettings {% id %}
  | function         {% id %}
  | help             {% id %}
  | examples         {% id %}
  | readme           {% id %}

###################################### Language Settings block rules ######################################
languageSettings -> %LANGUAGE_SETTINGS (%KEY_VALUE {% id %}):+ {% buildSettings['languageSettings'] %}

###################################### Description block rules ######################################
description -> (%DESCRIPTION {% id %}):? (descriptionBlock {% id %}):+ {% buildDescription %}
descriptionBlock -> 
    %PARAGRAPH {% id %}
  | %ITEM_LIST {% id %}
  | %HIGHLIGHT {% id %}
  | %CODEBLOCK {% id %}

###################################### Function block rules ######################################
function -> %FUNCTION description (query {% id %}):? (template {% id %}):? {% buildFunction %}
query -> %QUERY description {% id => id[1] %}
template -> %TEMPLATE %CODEBLOCK {% id => id[1] %}

###################################### Help block rules ######################################
help -> %HELP usage (%PARAGRAPH {% id %}):* (arguments {% id %}):? (parameters {% id %}):? (%PARAGRAPH {% id %}):* {% buildHelp %}
usage -> %USAGE {% id %} | %HIGHLIGHT {% id %}
arguments  -> %ARGUMENTS (%ARGUMENT {% id %}):+ {% id => id[1] %}
parameters -> %PARAMETERS (parameter):+ {% id => id[1] %}
parameter -> 
    %SHORT_PARAMETER {% id %}
  | %LONG_PARAMETER {% id %}
  | %LONG_SHOT_PARAMETER {% id %}
  
###################################### Examples block rules ######################################
examples -> %EXAMPLES (example {% id %}):+ {% buildExamples %}
example  -> (%HIGHLIGHT {% id %} | %PARAGRAPH {% id %}) %CODEBLOCK {% buildExample %}

###################################### Readme block rules ######################################
readme -> %README sections {% buildReadme %}
sections -> (section {% id %}):* {% buildSections %}
section -> %HEADER description {% buildSection %}
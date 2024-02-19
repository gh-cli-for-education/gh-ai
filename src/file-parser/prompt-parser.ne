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
%}

@lexer lexer

# Macros
matchTwo[X] -> $X $X

prompt -> (%HASH_SYMBOL property {% getProperty %}):* %EOF {% buildObject %}

property -> 
    %NAME %GH_NAME                               {% buildName %}
  | %DESCRIPTION %PARAGRAPH                      {% buildDescription %}
  | %SCRIPT_LANGUAGE %STRING specification style {% buildScriptLanguage %}
  | %LANGUAGE %STRING                            {% buildLlmLanguage %}
  | %USAGE %STRING help                          {% buildUsage %}
  | %PARAMETER name description                  {% buildParameter %}
  | %EXAMPLE command output                      {% buildExample %} 
  | %FILE name description                       {% buildFile %}

## Specific parameters that each property can have 

specification -> 
    null {% id %}
  | (matchTwo[%HASH_SYMBOL] %SPECIFICATION) %STRING {% getProperty %}

style -> 
    null {% id %}
  | (matchTwo[%HASH_SYMBOL] %STYLE) %STRING {% getProperty %}

name -> (matchTwo[%HASH_SYMBOL] %NAME) %STRING {% getProperty %}

description -> (matchTwo[%HASH_SYMBOL] %DESCRIPTION) %PARAGRAPH {% getProperty %}

command -> (matchTwo[%HASH_SYMBOL] %COMMAND) %STRING {% getProperty %}

output -> (matchTwo[%HASH_SYMBOL] %OUTPUT) %PARAGRAPH {% getProperty %}

help -> 
    null {% id %}
  | (matchTwo[%HASH_SYMBOL] %HELP):? %PARAGRAPH {% getProperty %}
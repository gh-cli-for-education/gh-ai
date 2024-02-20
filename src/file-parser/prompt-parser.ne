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
  getParameterValue,
  buildName,
  buildDescription,
  buildObject,
  buildScriptLanguage,
  buildLlmLanguage,
  buildUsage,
  buildParameter,
  buildExample,
  buildFile,
} from './file-parser/semantic-actions.js'; 
%}

@lexer lexer

############### Macros ############### 

# Given a token it will match two of the same token in a row
matchTwo[X] -> $X $X

# Given a name and a value tokens it will match the following pattern ##<name> <value> and return what it is in value 
parameter[NAME, VALUE] -> (matchTwo[%HASH_SYMBOL] $NAME) $VALUE {% getProperty %}

# Add an aditional rule to the parameter[NAME, VALUE] to make it optional
optionalParameter[NAME, VALUE] -> null {% id %} | parameter[$NAME, $VALUE] {% id => id[0].flat() %}

############### rules ############### 

# Starting rule expect a list of properties and an end of file 
prompt -> (%HASH_SYMBOL property {% getProperty %}):* %EOF {% buildObject %}

# The program expect properties
property -> 
    null
  | %SCRIPT_LANGUAGE %STRING specification style {% buildScriptLanguage %}
  | %LANGUAGE %STRING                            {% buildLlmLanguage %}
  | %USAGE %STRING help                          {% buildUsage %}
  | %PARAMETER name description                  {% buildParameter %}
  | %EXAMPLE command output                      {% buildExample %} 
  | %FILE name description                       {% buildFile %}
  | %NAME %GH_NAME                               {% buildName %}
  | %DESCRIPTION %PARAGRAPH                      {% buildDescription %}

## SCRIPT_LANGUAGE parameters 
specification -> optionalParameter[%SPECIFICATION, %STRING] {% getParameterValue %}
style         -> optionalParameter[%STYLE, %STRING]         {% getParameterValue %}

## EXAMPLE parameters
command -> parameter[%COMMAND, %STRING]   {% getParameterValue %}
output ->  parameter[%OUTPUT, %PARAGRAPH] {% getParameterValue %}

## USAGE parameters 
help -> optionalParameter[%HELP, %PARAGRAPH] {% getParameterValue %}

## Generic parameters used to ask a name or a description
name        -> parameter[%NAME, %STRING]           {% getParameterValue %}
description -> parameter[%DESCRIPTION, %PARAGRAPH] {% getParameterValue %}
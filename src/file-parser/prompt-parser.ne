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
  buildProperty,
  buildPropertyList,
  buildObject,
  buildParameter,
  buildExample
} from './file-parser/semantic-actions.js'; 
%}

@lexer lexer

# The root of the prompt object it will search for a list of parameters
prompt -> (%HASH_SYMBOL properties {% buildPropertyList %}):* %EOF {% buildObject %}

# All the different properties that the file can have, the order or appearance doesn't matter 
# but only one property type per file 
properties -> 
    %NAME %LANG_CASE_WORD              {% buildProperty['name'] %}
  | %SCRIPT_LANGUAGE %STRING           {% buildProperty['scriptLanguage'] %}
  | %DESCRIPTION %STRING               {% buildProperty['description'] %}
  | %HELP %STRING                      {% buildProperty['help'] %}
  | %PARAMETERS (parameter {% id %}):+ {% buildProperty['parameters'] %}
  | %EXAMPLES (example {% id %}):+     {% buildProperty['examples'] %}
  | %CHAT_LANGUAGE %STRING             {% buildProperty['chatLanguage'] %}

# parameter rule, indicates that each parameter contains a name and a description
parameter -> %HASH_SYMBOL %NAME %STRING %HASH_SYMBOL %DESCRIPTION %STRING    {% buildParameter %}

# example rule, indicates that each example contains an input and an output 
example -> %HASH_SYMBOL %INPUT %STRING %HASH_SYMBOL %EXPECTED_OUTPUT %STRING {% buildExample %}
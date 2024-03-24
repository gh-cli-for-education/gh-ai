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
%}

@lexer lexer

############### Macros ############### 

# Given a token it will match two of the same token in a row
matchTwo[X] -> $X $X

# Given a token it will match three of the same token in a row
matchThree[X] -> $X $X $X

############### rules ############### 

# Starting rule expect a list of properties and an end of file 
prompt -> (%HASH_SYMBOL mainProperties {% getProperty %}):* %EOF {% buildObject %}

# La idea principal es que el parser divida ya de por si el prompt del usuario 
# en lo que necesite, permitiendo así que el usuario pueda generar un solo 
# fichero para todas las posibles ayudas.
mainProperties -> 
    extension    {% id %}
  | apiQuery     {% id %}
  | chatSettings {% id %}

extension -> %EXTENSION %GH_NAME ((matchTwo[%HASH_SYMBOL]) extensionProperties {% getProperty %}):* {% buildExtension %} 

extensionProperties -> 
    %MAIN_FILE %GH_NAME %PARAGRAPH ((matchThree[%HASH_SYMBOL]) mainFileProperties {% getProperty %}):* {% buildMainFileProperty %}
  | %FILES (matchThree[%HASH_SYMBOL] file {% getProperty %}):*                                         {% buildFilesProperty %}
  | %LANGUAGE_SETTINGS mandatoryLanguageSetting (languageSettings {% id %}):*                          {% buildLanguageSettingsProperty %}  
  | %EXAMPLES (example {% id %}):*                                                                     {% buildExamplesProperty %}

mainFileProperties -> 
    %HELP %STRING %PARAGRAPH           {% buildHelpProperty %} 
  | %FUNCTIONS  (function  {% id %}):* {% buildFunctionsProperty %}
  | %PARAMETERS (parameter {% id %}):* {% buildParametersProperty %}
  | %ARGUMENTS  (argument  {% id %}):* {% buildArgumentsProperty %}

file      -> %WORD %PARAGRAPH (function {% id %}):* {% buildFileProperties %}

function  -> %HYPHEN %WORD %COLON paragraphOrString {% buildFunction %}

parameter -> 
    %HYPHEN %LARGE_PARAMETER (%ARGUMENT {% id %}):? paragraphOrString {% buildLargeParameter %}
  | %HYPHEN %SHORT_PARAMETER paragraphOrString                        {% buildShortParameter %}

argument  -> %HYPHEN %ARGUMENT                paragraphOrString {% buildArgument %}

example   -> %HYPHEN %STRING %PARAGRAPH {% buildExample %}

mandatoryLanguageSetting -> %HYPHEN %LANGUAGE %COLON wordOrString {% buildSetting %}
languageSettings -> 
    %HYPHEN %STYLE %COLON wordOrString         {% buildSetting %}
  | %HYPHEN %SPECIFICATION %COLON wordOrString {% buildSetting %}


############# API Query ##################

apiQuery ->  %API {% id %}



############## Chat Settings ################

chatSettings -> %CHAT_SETTINGS (%HYPHEN chatSettingsProperties %COLON wordOrString {% buildSetting %}):* {% buildChatSettings %}

# Por ahora solo Language 
chatSettingsProperties -> %LANGUAGE {% id %}



############ Auxiliary Rules ######################

wordOrString -> %WORD {% id %} | %STRING {% id %}
 
paragraphOrString -> %PARAGRAPH {% id %} | %STRING {% id %}
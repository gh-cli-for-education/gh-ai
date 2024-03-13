#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 22/02/2024
 * @desc @TODO hacer la descripción
 */
import Mustache from 'mustache';

import { TEMPLATES } from '../utils.js';
'use strict';

const SYSTEM_EXTENSION = {

  PERSONA: 
`You are a {{language}} expert{{#specification}} always working with the {{specification}} {{language}} specification{{/specification}}{{#style}} {{#specification}}and{{/specification}} following the {{style}}\'s {{language}} coding style guide{{/style}}.
You are also a Github CLI professional specialized in the extension branch of the program. Your job is to help the user in the making of an extension
by guiding and mainly generating quality {{language}} code.`,

  USER_INPUT_FORMAT:
`The{{#files.length}} first {{/files.length}} user prompt will follow the following format:

#MAIN_FILE
  ##NAME <Here will be the name of the main program>
  ##DESCRIPTION <Here will be an overall description of what the entire program must do>
  {{#arguments.length}}##ARGUMENTS [<Here will be an array of arguments with their respective descriptions>]{{/arguments.length}}
  {{#parameters.length}}##PARAMETERS [<Here will be an array of optional parameters>]{{/parameters.length}}
  {{#usage}}##USAGE EXAMPLE <Here will be an example of how the -h option of the program should looks like>{{/usage}}
#END_MAIN_FILE
{{#files.length}}

Then every other file needed by the user will follow the following format:

#FILE
  ##NAME <Here will be the name of the expected file, if the name doesn't have the expected {{scriptLanguage.language}} extension type you must put it in the end of the filename>
  ##DESCRIPTION <Here will be the description of what the content of the file must do>  
#END_FILE
{{/files.length}}`,

  OUTPUT:
`# EXPECTED OUTPUT FROM YOU

For each user prompt you must call the system provided tools(make sure to follow the expected input):

- **create_file**: Use to put all the generated code into a file.
- **get_gh_api_documentation**: Not implemented yet, so don't use it for now.`

};

TEMPLATES.SYSTEM['EXTENSION'] = (inputObject) => {
  return {
    persona: Mustache.render(SYSTEM_EXTENSION.PERSONA, inputObject.scriptLanguage),
    input: Mustache.render(SYSTEM_EXTENSION.USER_INPUT_FORMAT, inputObject),
    output: SYSTEM_EXTENSION.OUTPUT,
    instruction: function() {
      return `${this.persona}\n${this.input}\n${this.output}`;
    }
  };
};

export { SYSTEM_EXTENSION };

/*
  OUTPUT: // Ver si se puede transformar el zod en string
`You have to respond to the user using a JSON format following the schema:

{
  "file": {<Put here The object that represent the file you will create, with the format: {
     "name": <Put here the file name>, 
     "content": <Here goes the generated code> 
    }>,
  "errors": [<Put here an array of strings telling all the errors you found>]
} 

In case the are no errors you have to leave an empty array. If the user don't
write useful information to the point you can't generate any code you must 
write an error describing what happened.

Try different approaches before giving an output. Write the best code you can make and
then wait for the user's reply.`
*/
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

const parseNameDescription = function () {
  return `${this.name}: ${this.description}\n\n`;
};

const USER_EXTENSION = {
  
  MAIN_FILE:
`#MAIN_FILE
  ##NAME {{name}}
  ##DESCRIPTION

{{description}}

  {{#arguments.length}}##ARGUMENTS{{/arguments.length}}

  {{#arguments}}  ###ARGUMENT {{nameDescription}}{{/arguments}} {{#parameters.length}}##PARAMETERS{{/parameters.length}}

  {{#parameters}}   ###PARAMETER {{nameDescription}}{{/parameters}}{{#usage}} ##USAGE {{usage.usage}} 
  {{#usage.help}}###HELP

  {{usage.help}}
  
  {{/usage.help}}{{/usage}}

#END_MAIN_FILE`,

  FILE:
`#FILE
  ##NAME {{name}}
  ##DESCRIPTION {{description}}  
#END_FILE`,

  USE_EXAMPLES:
`
#EXAMPLE

Given the command: {{command}}
The expected output of the program is: 

{{output}}

#END_EXAMPLE
`,

};

TEMPLATES.USER['EXTENSION'] = (inputObject) => {
  inputObject.nameDescription = parseNameDescription;
  return {
    mainFile: Mustache.render(USER_EXTENSION.MAIN_FILE, inputObject),
    files: inputObject.files.map((file) => {
      return Mustache.render(USER_EXTENSION.FILE, file);
    }),
    examples: inputObject.examples.map((example) => {
      return Mustache.render(USER_EXTENSION.USE_EXAMPLES, example);
    }),
    userPrompts: function () {
      // let mainFile = `${this.mainFile}\n Now there is a list of `
      return [this.mainFile].concat(this.files).flat();
    }
  };
};

export { USER_EXTENSION };
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

const parseArgument = function () {
  return `- **(${this.mandatory? 'Mandatory' : 'Optional'})** ${this.argument}: ${this.description}`;
};

const parseParameter = function () {
  return `- ${this.parameter}: ${this.description}`;
};

const USER_EXTENSION = {
  
  MAIN_FILE:
`#MAIN_FILE
  ##NAME {{name}}
  ##DESCRIPTION

{{description}}

  {{#arguments.length}}##ARGUMENTS{{/arguments.length}}
  {{#arguments}}
    
    {{parseArgument}}
  {{/arguments}}

  {{#parameters.length}}##PARAMETERS{{/parameters.length}}
  {{#parameters}}
  
    {{parseParameter}}
  {{/parameters}}

  {{#help}}##HELP {{{help.usage}}}

  {{{help.help}}}
  {{/help}}

#END_MAIN_FILE

Use the **create_file** tool.`,

  FILE:
`#FILE
  ##NAME {{name}}
  ##DESCRIPTION {{description}}  
#END_FILE

Use the **create_file** tool.`,

  USE_EXAMPLES:
`#EXAMPLE

Given the command: {{command}}
The expected output of the program is: 

{{output}}

#END_EXAMPLE`,

};

TEMPLATES.USER['extension'] = (extension) => {
  extension.parseArgument = parseArgument;
  extension.parseParameter = parseParameter;
  return {
    mainFile: Mustache.render(USER_EXTENSION.MAIN_FILE, extension.mainFile),
    files: extension.files.map((file) => {
      return Mustache.render(USER_EXTENSION.FILE, file);
    }),
    examples: extension.examples.map((example) => {
      return Mustache.render(USER_EXTENSION.USE_EXAMPLES, example);
    }),
    userPrompts: function () {
      return [this.mainFile].concat(this.files).flat();
    }
  };
};

export { USER_EXTENSION };
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
  return `${this.name}\n\n${this.description}\n\n`;
};

const USER_EXTENSION = {
  
  MAIN_FILE:
`#MAIN_FILE
  ##NAME {{name}}
  ##DESCRIPTION

{{description}}

  {{#arguments.length}}##ARGUMENTS{{/arguments.length}}
  {{#arguments}}  ###ARGUMENT {{nameDescription}}{{/arguments}} {{#parameters.length}}##PARAMETERS{{/parameters.length}}

  {{#parameters}} ###PARAMETER {{nameDescription}}{{/parameters}}{{#usage}}##USAGE {{usage.usage}} 
  {{#usage.help}}###HELP

  {{usage.help}}
  
  {{/usage.help}}{{/usage}}
#END_MAIN_FILE`,

  FILE:
`#FILE
  ##NAME {{name}}
  ##DESCRIPTION {{description}}  
#END_FILE`,

};

TEMPLATES.USER['EXTENSION'] = (inputObject) => {
  let result = [];
  inputObject.nameDescription = parseNameDescription;
  result.push(Mustache.render(USER_EXTENSION.MAIN_FILE, inputObject));
  inputObject.files.map((file) => {
    result.push(Mustache.render(USER_EXTENSION.FILE, file));
  });
  return result;
};

export { USER_EXTENSION };
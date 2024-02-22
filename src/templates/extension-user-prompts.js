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

import { TEMPLATES } from '../utils.js';
'use strict';

const USER_EXTENSION = {
  
  MAIN_FILE:
`
#MAIN_FILE
  ##NAME {{name}}
  ##DESCRIPTION {{description}}
  {{#arguments}}##ARGUMENTS{{/arguments}}
  {{#arguments}} ###ARGUMENT {{arguments.name}}\n\n{{arguments.description}}\n\n{{/arguments}}
  {{#parameters}}##PARAMETERS{{/parameters}}
  {{#parameters}} ###PARAMETER {{parameters.name}}\n\n{{parameters.description}}\n\n{{/parameters}}
  {{#usage}}##USAGE {{usage.usage}} {{#usage.help}}###HELP\n\n{{usage.help}}{{/usage.help}}\n\n{{/usage}}
#END_MAIN_FILE
`,

  FILE:
`
#FILE
  ##NAME {{name}}
  ##DESCRIPTION {{description}}  
#END_FILE 
`,

};

TEMPLATES.USER['EXTENSION'] = USER_EXTENSION;

export { USER_EXTENSION };
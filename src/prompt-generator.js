#!/usr/bin/env node
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
'use strict';

import { TEMPLATES } from "./templates/templates.js";

let PROMPT_GENERATOR = Object.create(null);

PROMPT_GENERATOR['EXTENSION'] = async function generatePrompts(inputObject, options) {
  
  let promptObject = {
    system: TEMPLATES.EXTENSION.SYSTEM(inputObject),
    user: [],
  };

  const EXTENSION = inputObject.extension;

  EXTENSION.files.forEach((file, index) => {
    let filePrompts = []
    if (index === 0) {
      filePrompts.push(TEMPLATES.EXTENSION.MAIN_FUNCTION(file));
    }
    file.functions.forEach((functionn) => {
      filePrompts.push(TEMPLATES.EXTENSION.GENERIC_FUNCTION(functionn));
    });
    filePrompts.push(TEMPLATES.EXTENSION.FILE_GENERAL_IDEA(file));
    filePrompts.push(TEMPLATES.EXTENSION.POST_PROCESSING({ name: file.name, languageSettings: inputObject.extension.languageSettings }));
    promptObject.user.push({
      title: file.name,
      content: filePrompts,
    });
  });

  if (EXTENSION.readme) {
    promptObject.readme = TEMPLATES.README(EXTENSION.readme);
  }

  return promptObject;
}

export { PROMPT_GENERATOR };
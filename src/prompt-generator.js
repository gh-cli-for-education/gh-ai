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

/**
 * 
 * @param {*} inputObject 
 * @param {*} options 
 * @returns 
 */
PROMPT_GENERATOR['EXTENSION'] = async function generatePrompts(inputObject, options) {
  
  let promptObject = {
    system: TEMPLATES.EXTENSION.SYSTEM(inputObject),
    user: [],
  };

  const EXTENSION = inputObject.extension;

  // Por cada fichero pedido por el usuario
  EXTENSION.files.forEach((file, index) => {
    let filePrompts = []

    // El primer fichero del userPrompt siempre se tratará como un MainFile
    if (index === 0) { 
      filePrompts.push(TEMPLATES.EXTENSION.MAIN_FUNCTION(file));
    }

    // Por cada función se genera su correspondiente prompt
    file.functions.forEach((functionn) => {
      filePrompts.push(TEMPLATES.EXTENSION.GENERIC_FUNCTION(functionn));
    });

    // Se añade La idea general del fichero al prompt
    filePrompts.push(TEMPLATES.EXTENSION.FILE_GENERAL_IDEA(file));
    
    // Se hace un post procesado del fichero en un prompt por separado
    filePrompts.push(TEMPLATES.EXTENSION.POST_PROCESSING({ name: file.name, languageSettings: inputObject.extension.languageSettings }));
    
    // Se guarda el prompt completo en el promptObject
    promptObject.user.push({
      title: file.name,
      content: filePrompts,
      executeTool: 'generate_file',
      askForChanges: true,
    });


  });

  // En caso de pedir una extension, se añade a la lista de userPrompts
  if (EXTENSION.readme) {
    promptObject.user.push({
      title: 'readme',
      content: [TEMPLATES.README(EXTENSION.readme)],  
    });
  }

  return promptObject;
}

export { PROMPT_GENERATOR };
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
 * @param {*} responseObject 
 * @param {*} options 
 */
PROMPT_GENERATOR['EXTENSION'] = async function generatePrompts(inputObject, responseObject, options) {
  
  responseObject.systemPrompt = TEMPLATES.EXTENSION.SYSTEM(inputObject);
  
  const EXTENSION = inputObject.extension;

  // Por cada fichero pedido por el usuario
  EXTENSION.files.forEach((file, index) => {
    let filePrompts = []

    // Se añade La idea general del fichero al prompt
    filePrompts.push({
      title: `general idea of ${file.name}.`,
      text: TEMPLATES.EXTENSION.FILE_GENERAL_IDEA(file),
      reponse: undefined,
      usage: {},
      executeTool: undefined,
      askForChanges: false,
    });

    // El primer fichero del userPrompt siempre se tratará como un MainFile
    if (index === 0) { 
      filePrompts.push({
        title: `main and help functions of ${file.name}.`,
        text: TEMPLATES.EXTENSION.MAIN_FUNCTION(file),
        reponse: undefined,
        usage: {},
        executeTool: undefined,
        askForChanges: false,
      });
    }

    // Por cada función se genera su correspondiente prompt
    console.log(file);
    file.functions?.forEach((oFunctionn) => {
      filePrompts.push({
        title: `${oFunctionn.name} of ${file.name}.`,
        text: TEMPLATES.EXTENSION.GENERIC_FUNCTION(oFunctionn),
        reponse: undefined,
        usage: {},
        executeTool: undefined,
        askForChanges: false,
      });
    });
    
    // Se hace un post procesado del fichero en un prompt por separado
    filePrompts.push({
      title: `post processing of ${file.name}.`,
      text: TEMPLATES.EXTENSION.POST_PROCESSING({ 
        name: file.name, 
        languageSettings: inputObject.extension.languageSettings 
      }),
      reponse: undefined,
      usage: {},
      executeTool: undefined,
      askForChanges: false,
    });

    // Se genera un prompt para indicarle a la IA que debe generar el fichero utilizando las tools
    filePrompts.push({
      title: `${file.name} file generation.`,
      text: TEMPLATES.EXTENSION.GENERATE_FILE(file),
      reponse: undefined,
      usage: {},
      executeTool: { type: 'function', function: { name: 'generate_file'} },
      askForChanges: true,
    });

    // Se guarda el prompt completo en el promptObject
    responseObject.userPrompts.push({
      title: file.name,
      prompts: filePrompts,
      usage: {
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        totalTokens: 0,
      }
    });
  });

  // En caso de pedir una extension, se añade a la lista de userPrompts
  if (EXTENSION.readme) {
    responseObject.userPrompts.push({
      title: 'Readme',
      prompts: [{
        title: 'Readme file generation',
        text: TEMPLATES.README(EXTENSION.readme),
        reponse: undefined,
        usage: {},
        executeTool: { type: 'function', function: { name: 'generate_file'} },
        askForChanges: true,
      }],
      usage: {
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        totalTokens: 0,        
      }
    });
  }

  if (options.debug) { 
    console.log(JSON.stringify(responseObject.userPrompts, null, 2)); 
  }
}

export { PROMPT_GENERATOR };
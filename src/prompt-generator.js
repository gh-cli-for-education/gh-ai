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
  const MAIN_FILE = EXTENSION.files[0];
  
  let filePrompts = [];

  // Se añade La idea general del fichero al prompt
  filePrompts.push({
    title: `general idea of ${MAIN_FILE.name}.`,
    text: TEMPLATES.EXTENSION.FILE_GENERAL_IDEA(MAIN_FILE),
    reponse: undefined,
    usage: {},
    executeTool: undefined,
    askForChanges: false,
  });

  filePrompts.push({
    title: `main and help functions of ${MAIN_FILE.name}.`,
    text: TEMPLATES.EXTENSION.MAIN_FUNCTION(MAIN_FILE),
    reponse: undefined,
    usage: {},
    executeTool: undefined,
    askForChanges: false,
  });

  MAIN_FILE.functions?.forEach((oFunction) => {
    filePrompts.push({
      title: `${oFunction.name} of ${MAIN_FILE.name}.`,
      text: TEMPLATES.EXTENSION.GENERIC_FUNCTION(oFunction),
      reponse: undefined,
      usage: {},
      executeTool: undefined,
      askForChanges: false,
    });
  });

  filePrompts.push({
    title: `post processing of ${MAIN_FILE.name}.`,
    text: TEMPLATES.EXTENSION.POST_PROCESSING({ 
      name: MAIN_FILE.name, 
      languageSettings: inputObject.extension.languageSettings 
    }),
    reponse: undefined,
    usage: {},
    executeTool: undefined,
    askForChanges: false,
  });

  filePrompts.push({
    title: `${MAIN_FILE.name} file generation.`,
    text: TEMPLATES.EXTENSION.GENERATE_FILE(MAIN_FILE),
    reponse: undefined,
    usage: {},
    executeTool: { type: 'function', function: { name: 'generate_file'} },
    askForChanges: true,
  });

  responseObject.userPrompts.push({
    title: MAIN_FILE.name,
    prompts: filePrompts,
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
    }
  });

  // En caso de pedir un readme, se añade a la lista de userPrompts
  if (EXTENSION.files.length > 1) {
    responseObject.userPrompts.push({
      title: 'Readme',
      prompts: [{
        title: 'Readme file generation',
        text: TEMPLATES.README(EXTENSION.files[1]),
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
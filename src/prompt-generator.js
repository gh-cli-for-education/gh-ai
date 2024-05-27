/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 20/05/2024
 * @desc Contains the implementation of the different prompt generators  
 */
import { TEMPLATES } from './templates/templates.js';
import { CONSOLE_PROMPT } from './utils.js';
'use strict';

let PROMPT_GENERATOR = Object.create(null);

/**
 * Auxiliary function to create a prompt object 
 * @param {string} title 
 * @param {string} text 
 * @param {object} tools 
 * @param {boolean} askForChanges 
 * @returns 
 */
function generatePromptObject(title, text, tools = undefined, askForChanges = false) {
  return {
    title: title,
    text: text,
    reponse: undefined,
    usage: {},
    executeTool: tools,
    askForChanges: askForChanges,    
  }
}

/**
 * Prompt generator of the Extension command help, parse the inputObject 
 * to generate the prompts and store them in the response object
 * @param {object} inputObject 
 * @param {object} responseObject 
 * @param {object} options 
 */
PROMPT_GENERATOR['EXTENSION'] = async function generatePrompts(inputObject, responseObject, options) {
  
  responseObject.systemPrompt = TEMPLATES.EXTENSION.SYSTEM(inputObject);
  
  const EXTENSION = inputObject.extension;
  const MAIN_FILE = EXTENSION.files[0];
  
  let filePrompts = [];

  filePrompts.push(generatePromptObject(
    `Requirement analysis of ${EXTENSION.name}.`,
    TEMPLATES.EXTENSION.REQUIREMENT_ANALYSIS(EXTENSION),
  ));
  filePrompts.push(generatePromptObject(
    `General idea of ${EXTENSION.name}.`,
    TEMPLATES.EXTENSION.FILE_GENERAL_IDEA(EXTENSION),
  ));
  filePrompts.push(generatePromptObject(
    `main and help functions of ${EXTENSION.name}.`,
    TEMPLATES.EXTENSION.MAIN_FUNCTION(MAIN_FILE),
  ));

  MAIN_FILE.functions?.forEach((oFunction) => {
    filePrompts.push(generatePromptObject(
      `${oFunction.name} of ${EXTENSION.name}.`,
      TEMPLATES.EXTENSION.GENERIC_FUNCTION(oFunction),
    ));
  });

  filePrompts.push(generatePromptObject(
    `post processing of ${EXTENSION.name}.`,
    TEMPLATES.EXTENSION.POST_PROCESSING({ 
      name: MAIN_FILE.name, 
      languageSettings: inputObject.extension.languageSettings 
    })
  ));

  filePrompts.push(generatePromptObject(
    `${EXTENSION.name} file generation.`,
    TEMPLATES.EXTENSION.GENERATE_FILE(MAIN_FILE),
    { type: 'function', function: { name: 'generate_file'} },
    true
  ));

  responseObject.userPrompts.push({
    title: MAIN_FILE.name,
    prompts: filePrompts,
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
    }
  });

  if (EXTENSION.readme) {
    responseObject.userPrompts.push({
      title: 'Readme',
      prompts: [
        generatePromptObject(
          'Readme file generation',
          TEMPLATES.README(EXTENSION),
          { type: 'function', function: { name: 'generate_file'} },
          true
        )
      ],
      usage: {
        totalPromptTokens: 0,
        totalCompletionTokens: 0,
        totalTokens: 0,        
      }
    });
  }

  if (options.debug) { 
    console.log(`${CONSOLE_PROMPT.DEBUG}Generated prompts using the extracted data from inputObject.`);
    console.log(responseObject.userPrompts);
  }
}

Object.freeze(PROMPT_GENERATOR);

export { PROMPT_GENERATOR };
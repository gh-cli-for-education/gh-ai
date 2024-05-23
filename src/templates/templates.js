/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 20/05/2024
 * @desc It includes the reading of the different templates of the project, 
 *       as well as the management of writing those templates with the information
 *       provided by the program.
 */
import * as fs from 'fs/promises';
import Mustache from 'mustache';
import * as url from 'url';
'use strict';

const DIRNAME = url.fileURLToPath(new URL('.', import.meta.url));
const ENCODER = 'utf-8';

// Extension templates
const EXTENSION_SYSTEM_TEMPLATE            = await fs.readFile(`${DIRNAME}extension/system-prompt.md`,     ENCODER);
const EXTENSION_MAIN_FUNCTION_TEMPLATE     = await fs.readFile(`${DIRNAME}extension/main-function.md`,     ENCODER);
const EXTENSION_GENERIC_FUNCTION_TEMPLATE  = await fs.readFile(`${DIRNAME}extension/generic-function.md`,  ENCODER);
const EXTENSION_FILE_GENERAL_IDEA_TEMPLATE = await fs.readFile(`${DIRNAME}extension/file-general-idea.md`, ENCODER);
const EXTENSION_POST_PROCESSING_TEMPLATE   = await fs.readFile(`${DIRNAME}extension/post-processing.md`,   ENCODER);
const EXTENSION_GENERATE_FILE_TEMPLATE     = await fs.readFile(`${DIRNAME}extension/generate-file.md`,     ENCODER);

// Generic templates
const USER_LOG_TEMPLATE     = await fs.readFile(`${DIRNAME}user-log.md`,        ENCODER);
const RESPONSE_LOG_TEMPLATE = await fs.readFile(`${DIRNAME}response-log.md`,    ENCODER);
const README_TEMPLATE       = await fs.readFile(`${DIRNAME}readme-template.md`, ENCODER);

let TEMPLATES = { EXTENSION: {}, };

// The escape function is changed to prevent Mustache from escaping symbols like (') into (&quot)
Mustache.escape = (value) => { return value; }

/**
 * Given the inputObject it generate the assistant's system instructions 
 * @param {object} inputObject    
 * @returns {string} 
 */
TEMPLATES.EXTENSION.SYSTEM = (inputObject) => {
  return Mustache.render(EXTENSION_SYSTEM_TEMPLATE, inputObject);
};

/**
 * Given a fileObject from the inputObject it overwrite the main_function
 * template with the new data. 
 * @param {object} fileObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.MAIN_FUNCTION = (fileObject) => {
  fileObject.argumentParser = function () {
    return `${this.argument} ${this.description}`;
  }

  fileObject.parameterParser = function () {
    return `${this.parameter} ${this.argument ?? ''} ${this.description}`;
  }
  return Mustache.render(EXTENSION_MAIN_FUNCTION_TEMPLATE, fileObject);
}

/**
 * Given a functionObject from the functions array it overwrite the generic_function 
 * template with the new data. 
 * @param {object} functionObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.GENERIC_FUNCTION = (functionObject) => {
  functionObject.functionParametersParaser = function () {
    return `A parameter called: **${this.name}** of type *${this.value}*`
  }
  return Mustache.render(EXTENSION_GENERIC_FUNCTION_TEMPLATE, functionObject);
}

/**
 * Given a fileObject from the files array it overwrite the file_general_idea 
 * template with the new data.  
 * @param {object} fileObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.FILE_GENERAL_IDEA = (fileObject) => {
  fileObject.functionNames = function () { return `- ${this.name}`; }
  fileObject.parseExamples = function () { 
    return `- Give the following input: ${this.command}.\n\n This is what the program is expected to output:\n\n ${this.output}\n`;
  }
  return Mustache.render(EXTENSION_FILE_GENERAL_IDEA_TEMPLATE, fileObject);
}

/**
 * Given a settingsObject from the nputObject it overwrite the post_processing 
 * template with the new data.  
 * @param {object} settingsObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.POST_PROCESSING = (settingsObject) => {
  return Mustache.render(EXTENSION_POST_PROCESSING_TEMPLATE, settingsObject);
}

/**
 * Given a fileObject from the files array it overwrite the generate_file template 
 * with the new data.  
 * @param {object} fileObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.GENERATE_FILE = (fileObject) => {
  return Mustache.render(EXTENSION_GENERATE_FILE_TEMPLATE, fileObject);
}

/**
 * Given the readmeObject from the inputObject it overwrite the readme template 
 * with the new data.  
 * @param {object} readmeObject 
 * @returns {string}
 */
TEMPLATES.README = (readmeObject) => {
  return Mustache.render(README_TEMPLATE, readmeObject);
}

/**
 * Given the input information it overwrite the user_log template with the 
 * new data. 
 * @param {object} inputObject 
 * @param {string} inputFile 
 * @param {object} responseObject 
 * @param {object} options 
 * @returns {string}
 */
TEMPLATES.EXTENSION.USER_LOG = (inputObject, inputFile, responseObject, options) => {
  const LOG = {
    inputObject,
    inputFile, 
    systemPrompt: responseObject.systemPrompt,
    usage: responseObject.usage,
    assistant: responseObject.assistant,
    thread: responseObject.thread,
    options,
    parseInputObject: function() { return JSON.stringify(this, null, 2); }
  }
  return Mustache.render(USER_LOG_TEMPLATE, LOG);
}

/**
 * Given the responseObject and the program options it overwrite the reponse_log
 * template with the new data. 
 * @param {object} reponseObject 
 * @param {object} options 
 * @returns {string}
 */
TEMPLATES.EXTENSION.RESPONSE_LOG = (reponseObject, options) => {
  const LOG = {
    userPrompts: reponseObject.userPrompts,
    config: reponseObject.config,
    options: options,
  };
  LOG[options.commandType] = true;
  return Mustache.render(RESPONSE_LOG_TEMPLATE, LOG);
};

// It prevents adding new elements to the object.
TEMPLATES = Object.freeze(TEMPLATES);

export { TEMPLATES };
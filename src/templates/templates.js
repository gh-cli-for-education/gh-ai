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
const EXTENSION_SYSTEM_TEMPLATE               = await fs.readFile(`${DIRNAME}extension/system-prompt.md`,        ENCODER);
const EXTENSION_MAIN_FUNCTION_TEMPLATE        = await fs.readFile(`${DIRNAME}extension/main-function.md`,        ENCODER);
const EXTENSION_GENERIC_FUNCTION_TEMPLATE     = await fs.readFile(`${DIRNAME}extension/generic-function.md`,     ENCODER);
const EXTENSION_REQUIREMENT_ANALYSIS_TEMPLATE = await fs.readFile(`${DIRNAME}extension/requirement-analysis.md`, ENCODER);
const EXTENSION_FILE_GENERAL_IDEA_TEMPLATE    = await fs.readFile(`${DIRNAME}extension/file-general-idea.md`,    ENCODER);
const EXTENSION_POST_PROCESSING_TEMPLATE      = await fs.readFile(`${DIRNAME}extension/post-processing.md`,      ENCODER);
const EXTENSION_GENERATE_FILE_TEMPLATE        = await fs.readFile(`${DIRNAME}extension/generate-file.md`,        ENCODER);

// Generic templates
const CONVERSATION_LOG_TEMPLATE = await fs.readFile(`${DIRNAME}conversation-log.md`, ENCODER);
const README_TEMPLATE           = await fs.readFile(`${DIRNAME}readme-template.md`, ENCODER);

let TEMPLATES = { EXTENSION: {}, };

// The escape function is changed to prevent Mustache from escaping symbols like (') into (&quot)
Mustache.escape = (value) => { return value; };

/**
 * Given the inputObject it generate the assistant's system instructions 
 * @param {object} inputObject    
 * @returns {string} 
 */
TEMPLATES.EXTENSION.SYSTEM = (inputObject) => {
  return Mustache.render(EXTENSION_SYSTEM_TEMPLATE, inputObject).trim();
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
  return Mustache.render(EXTENSION_MAIN_FUNCTION_TEMPLATE, fileObject).trim();
};

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
  return Mustache.render(EXTENSION_GENERIC_FUNCTION_TEMPLATE, functionObject).trim();
};

/**
 * Given a fileObject from the files array it overwrite the file_general_idea 
 * template with the new data.  
 * @param {object} fileObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.FILE_GENERAL_IDEA = (extensionObject) => {
  return Mustache.render(EXTENSION_FILE_GENERAL_IDEA_TEMPLATE, extensionObject).trim();
};

TEMPLATES.EXTENSION.REQUIREMENT_ANALYSIS = (extensionObject) => {
  const INPUT = {
    name: extensionObject.name,
    description: extensionObject.files[0].description,
    functions: extensionObject.files[0].functions,
    examples: extensionObject.examples,
    parseExamples: function () { 
      return `- Given the following input: ${this.command}.\n\n This is what the program is expected to output:\n\n${this.output}\n`;
    },
    parseFunctions: function () {
      let msg = `A function called ${this.name}, whose purpose is:\n\n${this.description}\n\n`;
      if (this.query) {
        msg += `The function calls the GitHub APIv4 using a GraphQL query. The query must be constructed from this description written in natural language:\n\n${this.query}\n\n`;
      }
      if (this.template) {
        msg += `Use this codeblock as a template to build the function:\n\n${this.template}\n`;
      }
      return msg;
    } 
  }
  return Mustache.render(EXTENSION_REQUIREMENT_ANALYSIS_TEMPLATE, INPUT).trim();
};

/**
 * Given a settingsObject from the nputObject it overwrite the post_processing 
 * template with the new data.  
 * @param {object} settingsObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.POST_PROCESSING = (settingsObject) => {
  return Mustache.render(EXTENSION_POST_PROCESSING_TEMPLATE, settingsObject).trim();
};

/**
 * Given a fileObject from the files array it overwrite the generate_file template 
 * with the new data.  
 * @param {object} fileObject 
 * @returns {string}
 */
TEMPLATES.EXTENSION.GENERATE_FILE = (fileObject) => {
  return Mustache.render(EXTENSION_GENERATE_FILE_TEMPLATE, fileObject).trim();
};

/**
 * Given the readmeObject from the inputObject it overwrite the readme template 
 * with the new data.  
 * @param {object} readmeObject 
 * @returns {string}
 */
TEMPLATES.README = (extensionObject) => {
  return Mustache.render(README_TEMPLATE, extensionObject).trim();
};


/**
 * Given the responseObject and the program options it overwrite the reponse_log
 * template with the new data. 
 * @param {object} inputObject 
 * @param {string} inputFile 
 * @param {object} reponseObject 
 * @param {object} options 
 * @returns {string}
 */
TEMPLATES.EXTENSION.CONVERSATION_LOG = (inputObject, inputFile, reponseObject, options) => {
  const INPUT = {
    inputObject,
    inputFile,
    systemPrompt: reponseObject.systemPrompt,
    userPrompts: reponseObject.userPrompts,
    config: reponseObject.config,
    assistant: reponseObject.assistant,
    thread: reponseObject.thread,
    options,
    parseInputObject: function() { return JSON.stringify(this, null, 2); }
  };
  INPUT[options.commandType] = true;
  return Mustache.render(CONVERSATION_LOG_TEMPLATE, INPUT).trim();
};

// It prevents adding new elements to the object.
TEMPLATES = Object.freeze(TEMPLATES);

export { TEMPLATES };
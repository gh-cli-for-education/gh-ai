/**
 * 
 */
import * as fs from 'fs/promises';
import Mustache from 'mustache';
'use strict';

// The escape function is changed to prevent Mustache from escaping symbols like (') into (&quot)
Mustache.escape = (value) => { return value; }

const ENCODER = 'utf-8';

let TEMPLATES = Object.create(null);

TEMPLATES = {
  EXTENSION: {},
};

const EXTENSION_SYSTEM_TEMPLATE            = await fs.readFile('src/templates/extension/system-prompt.md', ENCODER);
const EXTENSION_MAIN_FUNCTION_TEMPLATE     = await fs.readFile('src/templates/extension/main-function.md', ENCODER);
const EXTENSION_GENERIC_FUNCTION_TEMPLATE  = await fs.readFile('src/templates/extension/generic-function.md', ENCODER);
const EXTENSION_FILE_GENERAL_IDEA_TEMPLATE = await fs.readFile('src/templates/extension/file-general-idea.md', ENCODER);
const EXTENSION_POST_PROCESSING_TEMPLATE   = await fs.readFile('src/templates/extension/post-processing.md', ENCODER);

const USER_LOG_TEMPLATE     = await fs.readFile('src/templates/user-log.md', ENCODER);
const RESPONSE_LOG_TEMPLATE = await fs.readFile('src/templates/response-log.md', ENCODER);
const README_TEMPLATE       = await fs.readFile('src/templates/readme-template.md', ENCODER);

// EXTENSION TEMPLATES 
TEMPLATES.EXTENSION.SYSTEM = (inputObject) => {
  return Mustache.render(EXTENSION_SYSTEM_TEMPLATE, inputObject);
};

TEMPLATES.EXTENSION.MAIN_FUNCTION = (fileObject) => {
  fileObject.argumentParser = function () {
    return `${this.argument}     ${this.description}`;
  }

  fileObject.parameterParser = function () {
    return `${this.parameter} ${this.argument ?? ''} ${this.description}`;
  }
  return Mustache.render(EXTENSION_MAIN_FUNCTION_TEMPLATE, fileObject);
}

TEMPLATES.EXTENSION.GENERIC_FUNCTION = (functionObject) => {
  functionObject.functionParametersParaser = function () {
    return `A parameter called: **${this.name}** of type *${this.value}*`
  }
  return Mustache.render(EXTENSION_GENERIC_FUNCTION_TEMPLATE, functionObject);
}

TEMPLATES.EXTENSION.FILE_GENERAL_IDEA = (fileObject) => {
  return Mustache.render(EXTENSION_FILE_GENERAL_IDEA_TEMPLATE, fileObject);
}

TEMPLATES.EXTENSION.POST_PROCESSING = (settingsObject) => {
  return Mustache.render(EXTENSION_POST_PROCESSING_TEMPLATE, settingsObject);
}

TEMPLATES.README = (readmeObject) => {
  return Mustache.render(README_TEMPLATE, readmeObject);
}

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

TEMPLATES.EXTENSION.RESPONSE_LOG = (reponseObject, options) => {
  const LOG = {
    messages: reponseObject.messages,
    config: reponseObject.config,
    options: options,
  };
  LOG[options.commandType] = true;
  return Mustache.render(RESPONSE_LOG_TEMPLATE, LOG);
};

TEMPLATES = Object.freeze(TEMPLATES);

export { TEMPLATES };
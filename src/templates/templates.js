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

const EXTENSION_SYSTEM_TEMPLATE = await fs.readFile('src/templates/extension-system.md', ENCODER);
const EXTENSION_USER_TEMPLATE   = await fs.readFile('src/templates/extension-user.md', ENCODER);
const EXTENSION_LOG_TEMPLATE    = await fs.readFile('src/templates/extension-log.md', ENCODER);

// EXTENSION TEMPLATES 
TEMPLATES.EXTENSION.SYSTEM = (inputObject) => {
  return Mustache.render(EXTENSION_SYSTEM_TEMPLATE, inputObject);
};

TEMPLATES.EXTENSION.USER = (inputObject) => {
  const EXTENSION = inputObject.extension;
  
  let files = [EXTENSION.mainFile];
  if (EXTENSION.files) {
    files = files.concat(EXTENSION.files);
  }

  const PROMPTS = files.map((file) => {
    file.argumentParser = function() {
      return `- ${this.argument}: **(${this.mandatory? 'Mandatory' : 'Optional'})** ${this.description}\n`;
    };
    file.parameterParser = function() {
      const ARGUMENT = (this.argument)? ` ${this.argument.name}` : '';
      return `- ${this.parameter}${ARGUMENT}: ${this.description}\n`;
    };
    file.exampleParser = function() {
      return `Given the command: ${this.command}\nThe expected output of the program is:\n\n${this.output}\n\n`;
    };
    file.functionParser = function() {
      return `A function called *${this.name}*, that will do:\n\n${this.description}\n`;
    };
    return Mustache.render(EXTENSION_USER_TEMPLATE, file);
  });
  return PROMPTS;
};

TEMPLATES.EXTENSION.LOG = (inputObject, inputFile, prompts, apiResponse, options) => {
  const LOG = {
    inputObject: inputObject,
    inputFile: inputFile,
    prompts: prompts,
    apiResponse: apiResponse,
    options: options,
    parseInputObject: function() { return JSON.stringify(this, null, 2); }
  };
  return Mustache.render(EXTENSION_LOG_TEMPLATE, LOG);
};




TEMPLATES = Object.freeze(TEMPLATES);

export { TEMPLATES };
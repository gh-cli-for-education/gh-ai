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

const EXTENSION_SYSTEM_TEMPLATE       = await fs.readFile('src/templates/extension-system.md', ENCODER);
const EXTENSION_USER_TEMPLATE         = await fs.readFile('src/templates/extension-user.md', ENCODER);
const EXTENSION_USER_LOG_TEMPLATE     = await fs.readFile('src/templates/extension-user-log.md', ENCODER);
const EXTENSION_RESPONSE_LOG_TEMPLATE = await fs.readFile('src/templates/extension-response-log.md', ENCODER);

// EXTENSION TEMPLATES 
TEMPLATES.EXTENSION.SYSTEM = (inputObject) => {
  return Mustache.render(EXTENSION_SYSTEM_TEMPLATE, inputObject);
};

TEMPLATES.EXTENSION.USER = (extensionObject) => {

  const PROMPTS = extensionObject.files.map((file) => {
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
    return {
      title: file.name, 
      content: Mustache.render(EXTENSION_USER_TEMPLATE, file),
    };
  });

  // PROMPTS.push('I request you to generate a README.md file containing: 1. A brief description of what the program does.\n 2. A installation guide for the generated gh extension. 3. An Usage section. 4. An examples section with 2 examples in it.')
  return PROMPTS;
};

TEMPLATES.EXTENSION.USER_LOG = (inputObject, inputFile, response, options) => {
  const LOG = {
    inputObject,
    inputFile, 
    systemPrompt: response.systemPrompt,
    usage: response.usage,
    assistant: response.assistant,
    thread: response.thread,
    options,
    parseInputObject: function() { return JSON.stringify(this, null, 2); }
  }
  return Mustache.render(EXTENSION_USER_LOG_TEMPLATE, LOG);
}

TEMPLATES.EXTENSION.RESPONSE_LOG = (apiResponse, options) => {
  const LOG = {
    messages: apiResponse.messages,
    config: apiResponse.config,
    options: options,
  };
  return Mustache.render(EXTENSION_RESPONSE_LOG_TEMPLATE, LOG);
};

TEMPLATES = Object.freeze(TEMPLATES);

export { TEMPLATES };
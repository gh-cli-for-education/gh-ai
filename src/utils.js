/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 20/05/2024
 * @name utils.js
 * @desc store any utility function or object needed by the whole program
 */
import * as fs from 'fs/promises';
import nearley from 'nearley';
import { createRequire } from 'module';
import readline from 'readline/promises';
const require = createRequire(import.meta.url);

import * as grammarModule from './grammar.js';
import { TEMPLATES } from './templates/templates.js';
import { INPUT_SCHEMA } from './schemas/input-schema.js';
import { COLORS } from './colors.js';
'use strict';

const READLINE = readline.createInterface({ input: process.stdin, output: process.stdout });

// ENUMS 
const HELP_TYPES = Object.freeze({
  EXTENSION: 'extension' 
});

const PACKAGE_DATA = Object.freeze({
  name: require('../package.json').name,
  version: require('../package.json').version,
  description: require('../package.json').description
});

const CONSOLE_PROMPT = Object.freeze({
  GH_AI:   COLORS.yellow('GH-AI>: '),
  OPENAI:  COLORS.blue('GH-AI-OPENAI>: '),
  CHATGPT: 'CHATGPT>: ',
  ERROR:   COLORS.red('GH-AI-ERROR>: '),
  WARNING: COLORS.magenta('GH-AI-WARNING>: '),
  DEBUG:   COLORS.green('DEBUG>: '),  
});

const API = Object.create(null);

/**
 * Utility function that ask the user a yes no question, executing a callback if passed
 * @param {string} query The question to ask the user for yes/no answer
 * @param {function} yesCallBack A callback to execute if yes (can be undefined)
 * @param {function} noCallBack A callback to execute if no (can be undefined)
 */
async function askYesNoQuestionToUser(query, yesCallBack, noCallBack) {
  while (true) {
    const RESPONSE = await READLINE.question(query + '(Y[es]/N[o]): ');

    if (process.env.GRACEFUL_SHUTDOWN) { break; }

    if (/^y(?:es)?$/i.exec(RESPONSE)) {
      if (yesCallBack) { await yesCallBack(); }
      break;
    } 
    else if (/^n(?:o)?$/i.exec(RESPONSE)) { 
      if (noCallBack) { await noCallBack(); } 
      break;
    }
  }
}

/**
 * Check if a directory is empty by opening and looking at the first element inside.
 * @param {string} path The directory path
 * @returns {booles} True if the directory is empty, false otherwise
 */
async function isEmptyDir(path) {
  try {
    const DIRECTORY = await fs.opendir(path);
    const ENTRY = await DIRECTORY.read();
    await DIRECTORY.close();

    return (ENTRY === null);
  } catch (error) {
    return false;
  }
}

/**
 * Check if a directory path exists before working with it 
 * @param {string} path directory path
 * @param {object} options 
 * @return {boolean}
 */
async function checkDirectoryExistance(path, options) {
  try {
    // Returns a directory or file stats, if is not possible to return anything then such file or directory doesn't exits.
    await fs.stat(path);
    // If the directory is not empty then ask the user if it can delete all the content inside.
    if (!await isEmptyDir(path)) { 
      console.log(`${CONSOLE_PROMPT.WARNING}The directory "${path}" already exists.`);
      await askYesNoQuestionToUser(
        `  Do you want to ${COLORS.red('erase the directory content')} before the AI start generating code?`,
        async () => {
          await fs.rm(path, { recursive: true });
          await fs.mkdir(path);
          console.log(`${CONSOLE_PROMPT.GH_AI}Directory successfully cleaned.`);
        }
      );
    }
    return false;
  }
  catch (error) {
    if (options.debug) { 
      console.error(`${CONSOLE_PROMPT.DEBUG}There is no directory with name: "${path}"`);
    }
  }
  // If the directory doesn't exists then tries to create it
  try {
    await fs.mkdir(path);
  } catch (error) {
    if (options.debug) {
      console.error(`${CONSOLE_PROMPT.DEBUG}The directory: "${path}" couldn't be created.`);
    }
    return true;
  }
}

/**
 * Parse the input file from the user and returns an object with
 * the extracted values 
 * @param   {string} inputFile The inputfile in simplex markdown format
 * @param   {object} responseObject The responseObject where the language data is going to be stored
 * @param   {object} options 
 */
async function parseInputFile(inputFile, responseObject, options) {
  const PARSER = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  const INPUT = await fs.readFile(inputFile, 'utf-8');
  PARSER.feed(INPUT);
  let inputObject = PARSER.results[0];
  
  if (options.debug) { 
    console.log(`${CONSOLE_PROMPT.DEBUG}Extracted data from inputfile ${inputFile}:`);
    console.log(PARSER.results.length, inputObject); 
  }

  // Checks if the inputObject has a correct schema
  INPUT_SCHEMA.parse(inputObject);

  // Add the script language data to the responseObject
  responseObject.config.scriptLanguage = inputObject.extension?.languageSettings.language;

  return inputObject;
}

/**
 * 
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createProgramLogs(inputObject, responseObject, inputFile, outputDirectory, options) {
  const TYPE = options.commandType.toUpperCase();

  try {
    console.log(`${CONSOLE_PROMPT.GH_AI}Generating ${outputDirectory}/user-log.md where you can find all the input information`);
    const USER_LOG = TEMPLATES[TYPE].USER_LOG(inputObject, inputFile, responseObject, options);
    await fs.writeFile(`${outputDirectory}/user-log.md`, USER_LOG);
  
    console.log(`${CONSOLE_PROMPT.GH_AI}Generating ${outputDirectory}/reponse-log.md where you can find all the output information`);
    const RESPONSE_LOG = TEMPLATES[TYPE].RESPONSE_LOG(responseObject, options);
    await fs.writeFile(`${outputDirectory}/response-log.md`, RESPONSE_LOG);  
  } 
  catch (error) {
    console.error(`${CONSOLE_PROMPT.ERROR}It was not possible to create the log files.`);
  }

}

export { 
  askYesNoQuestionToUser,
  checkDirectoryExistance,
  parseInputFile,
  createProgramLogs,
  HELP_TYPES,
  PACKAGE_DATA,
  API,
  CONSOLE_PROMPT,
};
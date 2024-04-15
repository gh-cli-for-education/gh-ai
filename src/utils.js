#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 03/02/2024
 * @name utils.js
 * @desc store any utility function or object needed by the whole program @TODO mejorar la descripción
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

/**
 * 
 * @param {string} query 
 * @param {function} yesCallBack
 * @param {function} noCallBack
 */
async function askYesNoQuestionToUser(query, yesCallBack, noCallBack) {
  while (true) {
    const RESPONSE = await READLINE.question(query + '(Y[es]/N[o]): ');

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
 * 
 * @param {string} path 
 * @returns 
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
 * 
 * @param {string} outputDirectory 
 * @param {object} options 
 */
async function checkDirectoryExistance(path, options) {
  try {
    await fs.stat(path); // Devuelve los datos de un directorio o fichero, si no es capaz de devolver nada entonces el fichero o directorio no existe
    if (await isEmptyDir(path)) { return; }
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
  catch (error) {
    if (options.debug) { 
      console.log(`${CONSOLE_PROMPT.DEBUG}There is no directory with name: "${outputDirectory}"`)
    }
  }
}

/**
 * @description Parse the input file from the user and returns an object with
 * the extracted values 
 * @param   {string} inputFile 
 * @param   {object} options
 * @returns {object} Returns the object with the the extracted values
 * @throws  {Error} If the parsed object doesn't fit the expected schema 
 * @throws  {Error} If there is an error while parsing the input file
 */
async function parseInputFile(inputFile, options) {
  const parser = new nearley.Parser(nearley.Grammar.fromCompiled(grammarModule.grammar));
  let input = await fs.readFile(inputFile, 'utf-8');
  parser.feed(input);
  let inputObject = parser.results[0];

  if (options.debug) { 
    console.log(`${CONSOLE_PROMPT.DEBUG}\n\n${inputObject}\n`); 
  }

  INPUT_SCHEMA.parse(inputObject);
  return inputObject;
}

/**
 * @description
 * @param {*} apiResponse 
 * @param {*} options 
 */
async function createProgramLogs(inputObject, responseObject, inputFile, outputDirectory, options) {
  const TYPE = options.commandType.toUpperCase();

  console.log(`${CONSOLE_PROMPT.GH_AI}Generating user-log.md where you can find all the input information`);
  const USER_LOG = TEMPLATES[TYPE].USER_LOG(inputObject, inputFile, responseObject, options);
  await fs.writeFile(`${outputDirectory}/user-log.md`, USER_LOG);

  console.log(`${CONSOLE_PROMPT.GH_AI}Generating reponse-log.md where you can find all the output information`);
  const RESPONSE_LOG = TEMPLATES[TYPE].RESPONSE_LOG(responseObject, options);
  await fs.writeFile(`${outputDirectory}/response-log.md`, RESPONSE_LOG);  
}


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
  OPENAI:  COLORS.blue(`GH-AI-OPENAI>: `),
  ERROR:   COLORS.red(`GH-AI-ERROR>: `),
  WARNING: COLORS.magenta(`GH-AI-WARNING>: `),
  DEBUG:   COLORS.green(`DEBUG>:`),  
});

const API = Object.create(null);

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
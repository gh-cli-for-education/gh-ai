#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 01/02/2024
 * @desc @TODO hacer la descripción
 */
'use strict';

import { Command, Option } from 'commander'; 
import { z } from 'zod';
import OpenAI from 'openai';
import dotEnv from 'dotenv';

import { parseInputFile, createReadme } from '../src/utils.js';
import { HELP_TYPES, PACKAGE_DATA } from '../src/utils.js';
import { API } from '../src/openai-api-call.js';
import { ERROR_HANDLER } from '../src/error-handlers.js';
import { COLORS } from '../src/colors.js';

dotEnv.config();
const PROGRAM = new Command();
const DEFAULT_LLM = 'OPENAI';

// Program data
PROGRAM
  .name(PACKAGE_DATA.name)
  .usage('<prompt-file> <output-directory> [options]')
  .description(PACKAGE_DATA.description)
  .addHelpText('after','\nAditional help:\n  If no option is passed the program will execute in \'interactive mode\' asking the user different program options one by one');

// Program options and arguments 

PROGRAM
  .allowUnknownOption()
  .version(PACKAGE_DATA.version, '-v, --version', 'Print the current version of the program')
  .argument('<input-file>', 'The input file used to feed the llm')
  .argument('<output-directory>', 'The directory path where all the files created by the llm will be stored')
  .option('-d, --debug', 'Output extra information about the execution process')
  .option('--tokens-verbose', 'Output the token usage information in each prompt')
  .option('--save-thread', 'Make the program not delete the used thread, instead it will save it inside the generated README file')
  .option('--save-assistant', 'Make the program not delete the used assistant, instead it will save it inside the generated README file')
  .option('-m --llm-model <model>', 'Specify which llm model would you want to use by the selected API')
  .addOption(new Option('-l, --llm-api <API>', 'Select the llm <API> to use').choices(Object.keys(API)).default(DEFAULT_LLM))
  .addOption(new Option('-t, --command-type <TYPE>', 'Select the command needed').choices(Object.keys(HELP_TYPES)).default(HELP_TYPES.EXTENSION));
  
// Program actions to options values
PROGRAM.action(async (inputFile, outputDirectory, options) => {

  if (options.debug) {
    await parseInputFile(inputFile, options);
    return;
  }

  try {
    const PROMPT = COLORS.yellow(`GH-AI>: `);

    console.log(`${PROMPT}Parsing the user input.`)
    let inputObject = await parseInputFile(inputFile, options);

    console.log(`${PROMPT}Starting ${options.llmApi} API call. This process may take a few seconds.`);
    let [ prompts, apiResponse ] = await API[options.llmApi](inputObject, outputDirectory, options);

    await createReadme(inputObject, prompts, apiResponse, inputFile, outputDirectory, options);
    console.log(`${PROMPT}Generated README.md file inside ${outputDirectory}/`); 

    if (options.safeAssistant) {
      console.log(`${PROMPT}The assistant id has been successfully added to the README file in ${outputDirectory}`);
    }

    if (options.safeThread) {
      console.log(`${PROMPT}The thread id has been successfully added to the README file in ${outputDirectory}`);
    }

  } catch (error) {
    if (error instanceof z.ZodError) { 
      ERROR_HANDLER.zodError(error);
    }
    else if (Object.hasOwn(error, 'token')) { // Checks if the error object has an 'offset property (It is better to create an specific Error Type)
      ERROR_HANDLER.nearleyError(error);
    }
    else if (error instanceof OpenAI.APIError) {
      ERROR_HANDLER.openaiError(error);
    } 
    else {
      console.error(`An unexpected error has ocurred\n ${error.message}`);
      console.error(error);
    }
  }
});

PROGRAM.parse(process.argv);



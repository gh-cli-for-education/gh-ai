#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 20/05/2024
 * @desc Main file of the program it parse the command line parameters 
 */
'use strict';

import { Command, Option } from 'commander'; 
import { z } from 'zod';
import OpenAI from 'openai';
import dotEnv from 'dotenv';

import { parseInputFile, createConversationLog, checkDirectoryExistance } from '../src/utils.js';
import { HELP_TYPES, PACKAGE_DATA, CONSOLE_PROMPT } from '../src/utils.js';
import { API } from '../src/openai/gh-ai-openai.js';
import { ERROR_HANDLER } from '../src/error-handlers.js';
import { PROMPT_GENERATOR } from '../src/prompt-generator.js';

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
  
/**
 * Main function of the gh-ai extension
 * @param {string} inputFile name of the input file
 * @param {string} outputDirectory name of the output directory
 * @param {object} options object with all the program options
 */
PROGRAM.action(async (inputFile, outputDirectory, options) => {
  // Contains all the data extracted from the input file
  let inputObject = {}; 

  // Contains all the data extracted from the llm response
  let responseObject = {
    systemPrompt: undefined,
    userPrompts: [],
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,      
    },
    config: {
      llm: options.llm,
      scriptLanguage: undefined
    },
    assistant: undefined,
    thread: undefined
  };

  // Before the starting the parser, it checks the output file is valid
  let errorWithDirectoryCreation = await checkDirectoryExistance(outputDirectory, options);

  if (errorWithDirectoryCreation) {
    console.error(`${CONSOLE_PROMPT.ERROR}The directory: "${outputDirectory}" couldn't be created.`);
    process.exit(1);
  }

  try {

    console.log(`${CONSOLE_PROMPT.GH_AI}Parsing the user input.`);

    inputObject = await parseInputFile(inputFile, responseObject, options);

    console.log(`${CONSOLE_PROMPT.GH_AI}Generating prompts...`);
    await PROMPT_GENERATOR[options.commandType.toUpperCase()](inputObject, responseObject, options);

    console.log(`${CONSOLE_PROMPT.GH_AI}Starting ${options.llmApi} API call. This process may take a few seconds.`);
    await API[options.llmApi](responseObject, outputDirectory, options);

  } catch (error) {
    if (error instanceof z.ZodError) { 
      ERROR_HANDLER.zodError(error);
    }
    // Checks if the error object has an 'offset property (It is better to create an specific Error Type)
    else if (Object.hasOwn(error, 'token')) { 
      ERROR_HANDLER.nearleyError(error, inputFile);
    }
    else if (error instanceof OpenAI.OpenAIError) {
      ERROR_HANDLER.openaiError(error);
    } 
    else {
      console.error(`${CONSOLE_PROMPT.ERROR}An unexpected error has ocurred\n ${error.message}`);
      if (options.debug) { console.error(error); }
    }
    process.exit(1);
  }
  
  // No matter what happens the log objects must be generated
  await createConversationLog(inputObject, responseObject, inputFile, outputDirectory, options);
  
  process.exit(0);
});

PROGRAM.parse(process.argv);

/**
 * Event that checks if CTRL+C or CTRL+D is pressed 
 */
const gracefulShutdown = () => { 
  console.log(`${CONSOLE_PROMPT.GH_AI}Cancelling the program execution...`);
  process.env.GRACEFUL_SHUTDOWN = true; 
}

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
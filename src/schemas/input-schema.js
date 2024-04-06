#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 05/02/2024
 * @desc @TODO hacer la descripción
 */
import { z } from "zod";
'use strict';

const ARGUMENT_SCHEMA = z.object({
  argument:    z.string().describe('The argument\'s name'),
  description: z.string().describe('The argument\'s description'),
}).describe('Describe the schema that an argument must follow').required().strict();

const PARAMETER_SCHEMA = z.object({
  parameter:   z.string().describe('The string value of the parameter'),
  argument:    z.nullable(ARGUMENT_SCHEMA.omit({ description: true })),
  description: z.string().describe('The parameter\'s description'),
}).describe('Describe the schema that a parameter must follow').required().strict();

const HELP_SCHEMA = z.object({
  usage:       z.string().describe('The usage block of a help function'),
  header:      z.string().describe('The string containing the usage and more useful info'),
  arguments:   z.array(ARGUMENT_SCHEMA).describe('The main file arguments').optional(),
  parameters:  z.array(PARAMETER_SCHEMA).describe('The main file parameters').optional(),
  footer:      z.string().describe('More aditional information about the program').optional()
}).describe('help fuction output expected').required({ 
  header: true
}).strict();

const FILES_SCHEMA = z.object({
  name:        z.string().describe('The expected name of the object'),
  description: z.string().describe('The description of the object'),
  functions:   z.string().describe('The description of all functions from the file').optional(),
  help:        HELP_SCHEMA.optional()
}).describe('A generic schema for any object that has a name and a description').required({
  name: true,
  description: true
}).strict();

const EXAMPLES_SCHEMA = z.object({
  command: z.string().describe('The example command to execute'),
  output:  z.string().describe('The expected example output')
}).describe('Usage example of the expected extension').required().strict();

const LANGUAGE_SETTINGS_SCHEMA = z.object({
  language:      z.string().describe('The specified language used by the extension'),
  specification: z.string().describe('The language specification').optional(),
  style:         z.string().describe('The coding style for the language').optional()
}).describe('Script language configuration').required({ language: true }).strict();

const README_SCHEMA = z.object({
  order: z.number(),
  content: z.string()
}).required().strict();

const EXTENSION_SCHEMA = z.object({
  files: z.array(FILES_SCHEMA).describe('An Array with all the files expected by the extension'),
  languageSettings: LANGUAGE_SETTINGS_SCHEMA,
  examples: z.array(EXAMPLES_SCHEMA).describe('An Array with all the usage examples of the extension').optional(),
  readme: z.array(z.string()).describe('TODO').optional(),
}).describe('The extension proposal, fill all the parameters for a better result').required({
  languageSettings: true,
  files: true,
}).strict(); 

const QUERY_SCHEMA = z.object({});

const CHAT_SETTINGS_SCHEMA = z.object({
  language: z.string().describe('The llm language response'),
}).describe('The chat settings of the llm').required().strict();

const INPUT_SCHEMA = z.object({
  extension: EXTENSION_SCHEMA.optional(),
  query: QUERY_SCHEMA.optional(),
  chatSettings: CHAT_SETTINGS_SCHEMA,
}).required({ chatSettings: true }).strict();

/**
 * @description Allow zod package to produce custom error messages 
 * @param {object} issue 
 * @param {object} ctx 
 */
const customErrorMap = (issue, ctx) => {
  if (issue.code === z.ZodIssueCode.invalid_type) {
    if (issue.path.length === 0) { return { message: 'Expected an object. Received nothing' }; }
    let amountOfHashs = 0;
    issue.path.map((path) => amountOfHashs += isNaN(path));
    let errorMsg = `Expected a ${'#'.repeat(amountOfHashs)}${issue.path[issue.path.length - 1].toString().toUpperCase()} property `;
    console.log(issue);
    if (issue.path.length > 1) {
      amountOfHashs = 1;
      errorMsg += 'in ';
      issue.path.map((path, index) => {
        if (isNaN(path)) {
          errorMsg += `${'#'.repeat(amountOfHashs)}${path.toUpperCase()}${(index < issue.path.length)? ' -> ' : ''}`;
          amountOfHashs++;
        } else {
          errorMsg += `at index ${path} inside the array -> `;
        }
      })
    }
    errorMsg += `with a ${issue.expected.toUpperCase()} value. Received `;
    errorMsg += `${(issue.received === 'undefined')? 'nothing' : `a(n) ${issue.received.toUpperCase()} value instead`}.`;
    return { message: errorMsg };
  }
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export { INPUT_SCHEMA }
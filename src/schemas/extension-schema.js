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

const NAME_DESCRIPTION_SCHEMA = z.object({
  name: z.string().describe('The expected name of the object'),
  description: z.string().describe('The description of the object')
}).describe('A generic schema for any object that has a name and a description').required().strict();

const EXAMPLES_SCHEMA = z.object({
  command: z.string().describe('The example command to execute'),
  output: z.string().describe('The expected example output')
}).describe('Usage example of the expected extension').required().strict();


const SCRIPT_LANGUAGE_SCHEMA = z.object({
  language: z.string().describe('The specified language used by the extension'),
  specification: z.string().describe('The language specification').optional(),
  style: z.string().describe('The coding style for the language').optional()
}).describe('Script language configuration').required({ language: true }).strict();

const USAGE_SCHEMA = z.object({
  usage: z.string().describe('The string containing the usage'),
  help: z.string().describe('An expected help output from the help function').optional()
}).describe('Usage expected by the extension').required({ usage: true }).strict();

/**
 * @TODO poner descripción del objeto
 * @TODO realizar cada parte del esquema por separado ya que en otros tipos de ayuda se podrán repetir las propiedades
 */
const EXTENSION_SCHEMA = z.object({
  name: z.string().describe('The extension name'),
  scriptLanguage: SCRIPT_LANGUAGE_SCHEMA,
  description: z.string().describe('The description of the proposal, put as much info as you can think'),
  usage: USAGE_SCHEMA.optional(),
  chatLanguage: z.string().describe('The Language used by the llm in the response').optional(),
  parameters: z.array(NAME_DESCRIPTION_SCHEMA).describe('An Array with all the extension parameters').optional(),
  examples: z.array(EXAMPLES_SCHEMA).describe('An Array with all the usage examples of the extension').optional(),
  arguments: z.array(NAME_DESCRIPTION_SCHEMA).describe('An Array with all the arguments expected by the extension').optional(),
  files: z.array(NAME_DESCRIPTION_SCHEMA).describe('An Array with all the files expected by the extension').optional()
}).describe('The extension proposal, fill all the parameters for a better result').required({
  name: true,
  scriptLanguage: true,
  description: true,
}).strict(); 

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
    let errorMsg = `Expected a ${'#'.repeat(amountOfHashs)}${issue.path[issue.path.length - 1].toUpperCase()} property `;
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

export { EXTENSION_SCHEMA }
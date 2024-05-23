/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 20/05/2024
 * @desc It contains the implementation of the different parts that make up the 
 * input object's schema, as well as the management of the various errors that 
 * can occur with the schema.
 */
import { z } from "zod";
'use strict';

const ARGUMENT_SCHEMA = z.object({
  argument:    z.string(),
  description: z.string().optional(),
})
.required({ argument: true }).strict();

const PARAMETER_SCHEMA = z.object({
  parameter:   z.string(),
  argument:    z.nullable(ARGUMENT_SCHEMA.omit({ description: true })),
  description: z.string().optional(),
})
.required({ parameter: true }).strict();

const HELP_SCHEMA = z.object({
  usage:      z.string(),
  header:     z.string().optional(),
  arguments:  z.array(ARGUMENT_SCHEMA).optional(),
  parameters: z.array(PARAMETER_SCHEMA).optional(),
  footer:     z.string().optional(),
})
.required({ usage: true }).strict();

const FUNCTION_SCHEMA = z.object({
  name:        z.string(),
  description: z.string(),
  query:       z.string().optional(),
  template:    z.string().optional(),
})
.required({ name: true, description: true }).strict();

const FILES_SCHEMA = z.object({
  name:        z.string(),
  description: z.string(),
  functions:   z.array(FUNCTION_SCHEMA).optional(),
  help:        HELP_SCHEMA.optional()
})
.required({ name: true, description: true }).strict();

const EXAMPLES_SCHEMA = z.object({
  command: z.string(),
  output:  z.string()
})
.required({ command: true, output: true }).strict();

const LANGUAGE_SETTINGS_SCHEMA = z.object({
  language:      z.string(),
  specification: z.string().optional(),
  style:         z.string().optional().default('Google'),
})
.required({ language: true }).strict();

const EXTENSION_SCHEMA = z.object({
  files:            z.array(FILES_SCHEMA),
  languageSettings: LANGUAGE_SETTINGS_SCHEMA,
  examples:         z.array(EXAMPLES_SCHEMA).optional(),
  readme:           FILES_SCHEMA.optional(),
})
.required({ languageSettings: true, files: true,}).strict(); 

const CHAT_SETTINGS_SCHEMA = z.object({
  language: z.string().optional().default('string'),
  nickname: z.string().optional().default('user'),
})
.required().strict();

const INPUT_SCHEMA = z.object({
  chatSettings: CHAT_SETTINGS_SCHEMA,
  extension:    EXTENSION_SCHEMA,
})
.required({ chatSettings: true, extension: true }).strict();

/**
 * @description Allow zod package to produce custom error messages 
 * @param {object} issue 
 * @param {object} ctx 
 */
const customErrorMap = (issue, ctx) => {
  let amountOfHashs = 0;
  let errorMsg = '';
  switch (issue.code) {

    case z.ZodIssueCode.invalid_type:
      if (issue.path.length === 0) { 
        return { message: 'Expected an object. Received nothing' }; 
      }
      issue.path.map((path) => amountOfHashs += isNaN(path));
      errorMsg = `Expected a ${'#'.repeat(amountOfHashs)}${issue.path[issue.path.length - 1].toString().toUpperCase()} property `;
      // console.log(issue);
      amountOfHashs = 1;
      errorMsg += 'in ';
      issue.path.forEach((path, index) => {
        const ARROW_STRING = (index < issue.path.length - 1)? ' -> ' : '';
        if (isNaN(path)) {
          errorMsg += `${'#'.repeat(amountOfHashs)}${path.toUpperCase()}${ARROW_STRING}`;
          amountOfHashs++;
        } else {
          errorMsg += `at index ${path} inside the array${ARROW_STRING}`;
        }
      });
      errorMsg += `with a ${issue.expected.toUpperCase()} value. Received `;
      errorMsg += `${(issue.received === 'undefined')? 'nothing' : `a(n) ${issue.received.toUpperCase()} value instead`}.`;
      return { message: errorMsg };

    case z.ZodIssueCode.unrecognized_keys:
      if (issue.path.length === 0) { 
        return { message: `Unrecognized Setting(s) [ ${issue.keys.join(' ')} ] at InputObject core.` }; 
      }
      errorMsg = `Unrecognized Setting(s) [ ${issue.keys.join(' ')} ] in `;
      amountOfHashs = 1;
      issue.path.forEach((path, index) => {
        const ARROW_STRING = (index < issue.path.length - 1)? ' -> ' : '';
        if (isNaN(path)) {
          errorMsg += `${'#'.repeat(amountOfHashs)}${path.toUpperCase()}${ARROW_STRING}`;
          amountOfHashs++;
        } else {
          errorMsg += `at index ${path} inside the array${ARROW_STRING}`;
        }
      });
      return { message: errorMsg };
    
    default: 
      return { message: ctx.defaultError };
  }
};

z.setErrorMap(customErrorMap);

export { INPUT_SCHEMA }
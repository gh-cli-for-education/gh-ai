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

const PARAMETERS_SCHEMA = z.object({
  name: z.string().describe('Parameter name use the format -p | --long-parameter-name'),
  description: z.string().describe('Parameter description, put useful info about the option function')
}).describe('An extension parameter, it has to describe the option').required().strict();

const EXAMPLES_SCHEMA =     z.object({
  input: z.string().describe('The example input'),
  expectedOutput: z.string().describe('The expected example output')
}).describe('Usage example of the expected extension').required().strict();

/**
 * @TODO poner descripción del objeto
 * @TODO realizar cada parte del esquema por separado ya que en otros tipos de ayuda se podrán repetir las propiedades
 */
const EXTENSION_SCHEMA = z.object({
  name: z.string().describe('The extension name'),
  scriptLanguage: z.string().describe('Language of the expected extension'),
  chatLanguage: z.string().describe('The Language used by the llm in the response').optional(),
  help: z.string().describe('An optional usage representation, can be used to tell the llm how you want the help function').optional(),
  description: z.string().describe('The description of the proposal, put as much info as you can think'),
  parameters: z.array(PARAMETERS_SCHEMA).describe('An Array with all the extension parameters').optional(),
  examples: z.array(EXAMPLES_SCHEMA).describe('An Array with all the usage examples of the extension').optional()
}).describe('The extension proposal, fill all the parameters for a better result').required({
  name: true,
  scriptLanguage: true,
  description: true,
}).strict(); 

export { EXTENSION_SCHEMA }
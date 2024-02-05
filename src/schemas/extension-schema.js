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

/**
 * 
 */
const EXTENSION_SCHEMA = z.object({
  name: z.string().describe('The extension name'),
  scriptLanguage: z.string().describe('Language of the expected extension'),
  description: z.string().describe('The description of the proposal, put as much info as you can think'),
  parameters: z.array(
    z.object({
      name: z.string().describe('Parameter name use the format -p | --long-parameter-name'),
      description: z.string().describe('Parameter description, put useful info about the option function')
    }).describe('An extension parameter, it has to describe the option')
      .required()
  ).describe('An Array with all the extension parameters'),
  examples: z.array(
    z.object({
      input: z.string().describe('The example input'),
      expectedOutput: z.string().describe('The expected example output')
    }).describe('Usage example of the expected extension')
      .required()
  ).describe('An Array with all the usage examples of the extension')
}).describe('The extension proposal, fill all the parameters for a better result').required({
  name: true,
  scriptLanguage: true,
  description: true,
  parameters: false,
  examples: false
}); 

export { EXTENSION_SCHEMA }
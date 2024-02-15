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

const FILES_SCHEMA = z.object({
  filename: z.string(),
  content: z.string().describe('The file content with all the code generated by the AI')
}).describe('The object that contains the file data to be created').required().strict();

const API_RESPONSE_SCHEMA = z.object({
  advices: z.array(z.string()).describe('An array of possible advices the AI can generate'),
  files: z.array(FILES_SCHEMA).describe('An array with all the files generated by the AI'),
  errors: z.array(z.string()).describe('An array with all the possible errors found by the AI')
}).describe('The api response, this response is expected to be the same with all the APIS').required().strict();

export { API_RESPONSE_SCHEMA };
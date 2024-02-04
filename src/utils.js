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
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

/**
 * @description Check if an object literal is empty
 * @param {*} object 
 * @returns true if the object literal is empty
 * @returns false if the object literal is not empty
 */
const isEmptyObject = (object) => {
  for (const property in object) {
    if (Object.hasOwn(object, property)) { return false; }
  }
  return true;
};

// ENUMS 
const APIS = Object.freeze({
  OPENAI: 'OPENAI' 
});
const HELP_TYPES = Object.freeze({
  EXTENSION: 'EXTENSION' 
});
const PACKAGE_DATA = Object.freeze({
  name: require('../package.json').name,
  version: require('../package.json').version,
  description: require('../package.json').description
});

export { 
  isEmptyObject,
  APIS,
  HELP_TYPES,
  PACKAGE_DATA
};
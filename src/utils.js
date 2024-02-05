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

/**
 * @description Convert an object into an Array of values(or keys if the
 *  isKeyArray flag is activated)
 * @param {object} object The object to convert to an Array
 * @param {boolean} isKeyArray If activated returns the object keys instead of the values
 * @returns {object} The new Array with the values or keys
 */
const Object2Array = (object, isKeyArray = false) => {
  return Object.entries(object).map(([key, value]) => {
    return ((isKeyArray)? key : value); 
  });
};

const CONFIG_FILES = Object.freeze({
  extension: require('./default-config-files/extension.json')
});

// ENUMS 
const APIS = Object.freeze({
  OPENAI: 'OPENAI',
  HUGGINFACE: 'HUGGINFACE'
});
const HELP_TYPES = Object.freeze({
  EXTENSION: 'extension' 
});
const PACKAGE_DATA = Object.freeze({
  name: require('../package.json').name,
  version: require('../package.json').version,
  description: require('../package.json').description
});
const SCHEMAS = Object.freeze({
  extension: require('./schemas/extension-schema.json')
});
export { 
  isEmptyObject,
  Object2Array,
  APIS,
  HELP_TYPES,
  CONFIG_FILES,
  PACKAGE_DATA,
  SCHEMAS
};
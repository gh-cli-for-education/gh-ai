#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 09/02/2024
 * @desc Contains all the semantic actions used by the grammar
 * @external Grammar
 */
'use strict';

/**
 * @TODO mejorar esto, se puede hacer mejor?
 */
const buildProperty = {
  name:           (d) => buildPropertyFunc(d, 'name'),
  scriptLanguage: (d) => buildPropertyFunc(d, 'scriptLanguage'),
  description:    (d) => buildPropertyFunc(d, 'description'),
  help:           (d) => buildPropertyFunc(d, 'help'),
  parameters:     (d) => buildPropertyFunc(d, 'parameters'),
  examples:       (d) => buildPropertyFunc(d, 'examples'),
  chatLanguage:   (d) => buildPropertyFunc(d, 'chatLanguage'),
};

/**
 * @description Convert two tokens into a key:value pair wrapped inside an object
 * @param {object} tokensArray Array with the matched tokens 
 * @param {string} propertyName tokensArray Array with the matched tokens 
 * @returns {object} A new Object with the property content value 
 */
function buildPropertyFunc([hashSymbol, propertyContent], propertyName) {
  let property = {};
  let isArray = propertyName === 'parameters' || propertyName === 'examples';
  property[propertyName] = (isArray)? propertyContent : propertyContent.value;
  return property;
}

/**
 * @description extract the property for the parameter match in the grammar
 * @param {object} tokensArray Array with the matched tokens 
 * @returns {object} Returns the property element from the array
 */
function buildPropertyList([hashSymbol, property]) {
  return property;
}

/**
 * @description build the parameter object by combining the values of the name 
 * and description
 * @param {object} tokensArray Array with the matched tokens 
 * @returns {object} Returns a new parameter object
 */
function buildParameter([
  hashSymbol1, 
  nameToken, 
  stringToken1, 
  hashSymbol2, 
  descriptionToken, 
  stringToken2
]) {
  return {
    name: stringToken1.value,
    description: stringToken2.value
  };
}

/**
 * @description build the example object by combining the values of the name 
 * and description
 * @param {object} tokensArray Array with the matched tokens 
 * @returns {object} Returns a new example object
 */
function buildExample([
  hashSymbol1, 
  input, 
  stringToken1, 
  hashSymbol2, 
  outputToken, 
  stringToken2
]) {
  return {
    input: stringToken1.value,
    expectedOutput: stringToken2.value
  };
}

/**
 * @description Create the prompt object used by the gh-ai program to generate 
 * the prompt 
 * @param {object} tokensArray Array with the matched tokens
 * @returns {obj} Returns the entire prompt object
 * @TODO poner el valor de las apariciones y la linea/columna donde aparecen
 */
function buildObject([properties, eof]) {
  let object = {};
  properties.map((property) => { // Deep merge of all property objects
    for (let key in property) {
      if(object[key]) { // Check if there is more than one property per prompt file
        throw new Error(`Duplicated properties are not allowed.\nExpected 1 #${key.toUpperCase()} property but received 2.`);
      }
      object[key] = property[key];
    }
  })
  return object;
}

export {
  buildProperty,
  buildExample,
  buildParameter,
  buildPropertyList,
  buildObject
};
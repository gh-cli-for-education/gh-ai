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

function getProperty([hashSymbol, property]) {
  return property;
}

function buildName([tag, name]) {
  const GH_NAME = /(gh-)?[a-z][a-z0-9]*(?:[-][a-z0-9]+)*/;
  if (!GH_NAME.exec(name.value)[1]) {
    name.value = 'gh-' + name.value;
  }
  return { name: name.value };
}

function buildDescription([tag, paragraph]) {
  return { description: paragraph.value };
}

function buildScriptLanguage([tag, scriptLanguage, specification, style]) {
  return {
    scriptLanguage: {
      language: scriptLanguage.value,
      specification: specification?.value,
      style: style?.value
    }
  };
}

function buildLlmLanguage([tag, language]) {
  return { chatLanguage: language.value };
}

function buildUsage([tag, usage, help]) {
  return {
    usage: {
      text: usage.value,
      help: help?.value
    }
  };
}

function buildParameter([tag, name, description]) {
  return {
    parameter: {
      name: name.value,
      description: description.value
    }
  };
}

function buildExample([tag, command, output]) {
  return {
    example: {
      command: command.value,
      output: output.value
    }
  };
}

function buildFile([tag, name, description]) {
  return {
    filename: name.value,
    description: description.value
  };
}

function buildArray(properties, targetTag) {
  let result = [];
  const checkProperty = (property) => property.hasOwnProperty(targetTag);
  while(properties.some(checkProperty)) {
    let index = properties.findIndex(checkProperty);
    result.push(properties[index][targetTag]);
    properties.splice(index, 1);
  }
  return result;
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
  object.parameters = buildArray(properties, 'parameter');
  object.examples = buildArray(properties, 'example');
  properties.map((property) => { // Deep merge of all property objects
    for (let key in property) {
      if(object[key]) { // Check if there is more than one property per prompt file  
        throw new Error(`Duplicated properties are not allowed. Expected 1 #${key.toUpperCase()} property but received 2.`); /** @TODO mover esto al error handler */
      }
      object[key] = property[key];
    }
  });
  console.log(object);
  return object;
}

export {
  getProperty,
  buildName,
  buildDescription,
  buildObject,
  buildScriptLanguage,
  buildLlmLanguage,
  buildUsage,
  buildParameter,
  buildExample,
  buildFile
};
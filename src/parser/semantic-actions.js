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

function getParameterValue([value]) {
  return (value)? value[0] : value;
}

function buildName([tag, name]) {
  const GH_NAME = /(gh-)?[a-z][a-z0-9]*(?:[-][a-z0-9]+)*/;
  if (!GH_NAME.exec(name.value)[1]) {
    name.value = 'gh-' + name.value;
  }
  return { 
    type: 'name',
    content: name.value 
  };
}

function buildDescription([tag, paragraph]) {
  return { 
    type: 'description',
    content: paragraph.value 
  };
}

function buildScriptLanguage([tag, scriptLanguage, specification, style]) {
  return {
    type: 'scriptLanguage',
    content: {
      language: scriptLanguage.value,
      specification: specification?.value,
      style: style?.value
    }
  };
}

function buildLlmLanguage([tag, language]) {
  return { 
    type: 'chatLanguage',
    content: language.value 
  };
}

function buildUsage([tag, usage, help]) {
  return {
    type: 'usage',
    content: {
      usage: usage.value,
      help: help?.value
    }
  };
}

function buildParameter([tag, name, description]) {
  return {
    type: 'parameter',
    content: {
      name: name.value,
      description: description.value
    }
  };
}

function buildArgument([tag, name, description]) {
  return {
    type: 'argument',
    content: {
      name: name.value,
      description: description.value
    }
  };
}


function buildExample([tag, command, output]) {
  return {
    type: 'example',
    content: {
      command: command.value,
      output: output.value
    }
  };
}

function buildFile([tag, name, description]) {
  return {
    type: 'file',
    content: {
      name: name.value,
      description: description.value
    }
  };
}

function buildArray(properties, targetTag) {
  let result = [];
  for (let i = 0; i < properties.length; i++) {
    if (properties[i].type === targetTag) {
      result.push(properties[i].content);
      properties.splice(i, 1);
      i--;
    }
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
  object.arguments = buildArray(properties, 'argument');
  object.parameters = buildArray(properties, 'parameter');
  object.examples = buildArray(properties, 'example');
  object.files = buildArray(properties, 'file');
  properties.map((property) => { // Deep merge of all property objects
    if(object[property.type]) { // Check if there is more than one property per prompt file  
      throw new Error(`Duplicated Tags are not allowed. Expected one #${property.type.toUpperCase()} property but received 2.`); /** @TODO mover esto al error handler */
    }
    object[property.type] = property.content;
    }
  );
  return object;
}

export {
  getProperty,
  getParameterValue,
  buildName,
  buildDescription,
  buildObject,
  buildScriptLanguage,
  buildLlmLanguage,
  buildUsage,
  buildParameter,
  buildArgument,
  buildExample,
  buildFile,
};
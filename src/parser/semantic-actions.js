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

// Check if there is more than one property per prompt file
function checkDuplicatedTags(object, tag, errorMsg = 'Found duplicated a Tag') {
  if (object[tag]) { throw new Error(errorMsg); }
}

function buildObject([properties, eof]) {
  let object = {};
  properties.forEach((property) => { // Deep merge of all property objects
    checkDuplicatedTags(
      object, 
      property.type, 
      `Duplicated Tags are not allowed. Expected one #${property.type.toUpperCase()} property but received 2.`
    );
    object[property.type] = property.content;
    }
  );
  return object;
}

function getProperty([hashSymbol, property]) {
  return property;
}

function buildExtension([tag, name, properties]) {
  let extension = {
    type: tag.type.toLowerCase(),
    content: {
      name: name.value
    }
  }
  properties.forEach((property) => {
    checkDuplicatedTags(
      extension, 
      property.type, 
      `Duplicated Tags are not allowed. Expected one ##${property.type.toUpperCase()} but received 2.`
    );
    extension.content[property.type] = property.content;
  });
  return extension;
}

function buildMainFileProperty([tag, filename, description, properties]) {
  let mainFile = {
    type: 'mainFile',
    content: {
      name: filename.value,
      description: description.value,
    }
  };
  properties.forEach((property) => {
    checkDuplicatedTags(
      mainFile, 
      property.type, 
      `Duplicated Tags are not allowed. Expected one ##${property.type.toUpperCase()} but received 2.`
    );
    mainFile.content[property.type] = property.content;
  });  
  return mainFile;
}

function buildFunctionsProperty([tag, functions]) {
  return {
    type: tag.type.toLowerCase(),
    content: functions
  };
}

function buildFunction([hyphen, name, colon, description]) {
  return { name: name.value,  description: description.value };
}

function buildParametersProperty([tag, parameters]) {
  return {
    type: tag.type.toLowerCase(),
    content: parameters
  };
}

function buildLargeParameter([hyphen, parameter, argument, description]) {
  let argumentObject = null;
  if (argument !== null) {
    argumentObject = {
      name: argument.value,
      mandatory: (argument.text[0] === '<')
    };
  }
  return { 
    parameter: parameter.value, 
    argument: argumentObject,
    description: description.value 
  };
}

function buildShortParameter([hyphen, parameter, description]) {
  return { 
    parameter: parameter.value, 
    argument: null,
    description: description.value 
  };
}

function buildArgumentsProperty([tag, argument_s]) {
  return {
    type: tag.type.toLowerCase(),
    content: argument_s
  };
}

function buildArgument([hyphen, argument, description]) {
  return { 
    argument: argument.value, 
    description: description.value,
    mandatory: (argument.text[0] === '<')
  };
}

function buildHelpProperty([tag, usage, help]) {
  return {
    type: tag.type.toLowerCase(),
    content: {
      usage: usage.value,
      help: help.value
    }
  };
}

function buildFilesProperty([tag, files]) {
  return {
    type: tag.value.toLowerCase(),
    content: files
  }
}

function buildFileProperties([name, description, functions]) {
  return {
    name: name.value,
    description: description.value,
    functions: functions
  };
}

function buildLanguageSettingsProperty([tag, mandatorySetting, optionalSettings]) {
  let languageSettings = {
    type: 'languageSettings',
    content: {},
  };
  languageSettings.content[mandatorySetting.type] = mandatorySetting.value;
  optionalSettings.forEach((setting) => {
    checkDuplicatedTags(
      languageSettings, 
      setting.type, 
      `Duplicated Settings are not allowed. Expected one ${setting.type} but received 2.`
    );
    languageSettings.content[setting.type.toLowerCase()] = setting.value;    
  });
  return languageSettings;
}

function buildSetting([hyphen, setting, colon, value]) {
  let setting_ = {
    type: setting.value,
    value: value.value.toLowerCase()
  };
  return setting_;
}

function buildExamplesProperty([tag, examples]) {
  return {
    type: tag.type.toLowerCase(),
    content: examples
  };
}

function buildExample([hyphen, command, expectedOutput]) {
  return { command: command.value, output: expectedOutput.value };
}

function buildChatSettings([tag, settings]) {
  let chatSettings = {
    type: 'chatSettings',
    content: {},
  };
  settings.forEach((setting) => {
    checkDuplicatedTags(
      chatSettings, 
      setting.type, 
      `Duplicated Settings are not allowed. Expected one ${setting.type} but received 2.`
    );
    chatSettings.content[setting.type.toLowerCase()] = setting.value;    
  });
  return chatSettings;
}

export {
  buildObject,
  getProperty,
  buildExtension,
  buildMainFileProperty,
  buildParametersProperty,
  buildLargeParameter,
  buildShortParameter,
  buildArgumentsProperty,
  buildArgument,
  buildFilesProperty,
  buildFileProperties,
  buildFunctionsProperty,
  buildFunction,
  buildLanguageSettingsProperty,
  buildSetting,
  buildExamplesProperty,
  buildExample,
  buildHelpProperty,
  buildChatSettings,
};
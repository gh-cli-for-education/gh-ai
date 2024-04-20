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

function buildPrompt([properties, eof]) {
  return {
    extension: properties.find((property) => property.type === 'extension')?.content,
    query: properties.find((property) => property.type === 'query')?.content,
    chatSettings: properties.find((property) => property.type === 'chatSettings')?.content,
  };
}

function buildExtension([extension, properties]) {
  return {
    type: 'extension',
    content: {
      files: properties.filter((property) => property.type === 'file').map((property) => property.content),
      languageSettings: properties.find((property) => property.type === 'languageSettings')?.content,
      examples: properties.find((property) => property.type === 'examples')?.content,
      readme: properties.find((property) => property.type === 'readme')?.content,      
    }
  };
}

function buildFile([file, descriptionBlocks, functions, help]) {
  return {
    type: 'file',
    content: {
      name: file.value,
      description: descriptionBlocks.map((block) => block.value).join('\n'),
      functions: functions ?? undefined,
      help: help?.content
    }
  };
}

function buildFunction([functionToken, parameters, description, orderList]) {
  return {
    name: functionToken.value,
    params: parameters.map((parameter) => { return { parameter:  parameter.value.name, type: parameter.value.value }; }),
    description: description.map((paragraph) => paragraph.value).join('\n\n'),
    orderList: orderList.map((element) => element.value.content)
  };
}

function buildHelp([help, usage, header, argumentss, parameters, footer]) {
  return {
    type: 'help',
    content: {
      usage: usage.value,
      header: header.map((paragraph) => paragraph.value).join(''),
      arguments: argumentss?.map((argument) => argument.value),
      parameters: parameters?.map((parameter) => parameter.value),
      footer: footer.map((paragraph) => paragraph.value).join('')
    } 
  };
}

function buildReadme([readme, orderedList]) {
  return {
    type: 'readme',
    content: orderedList.map((element) => element.value.content)
  };
}

function buildExample([command, output]) {
  return {
    command: command.value,
    output: output.value
  };
}

function buildExamples([examples, exampleList]) {
  return {
    type: 'examples',
    content: exampleList
  };
}

const buildSettings = {
  chatSettings: (d) => buildSetting(['chatSettings', d[1]]),
  languageSettings: (d) => buildSetting(['languageSettings', d[1]])
};

function buildSetting([type, settings]) {
  let settingsObject = {
    type: type,
    content: {},
  };
  settings.forEach((setting) => {
    let settingName = setting.value.name.toLowerCase();
    if (!settingsObject.content[settingName]) {
      settingsObject.content[settingName] = setting.value.value;  
    }
  });
  return settingsObject;
}

export {
  buildPrompt,
  buildExtension,
  buildFile,
  buildFunction,
  buildHelp,
  buildReadme,
  buildExample,
  buildExamples,
  buildSettings,
};
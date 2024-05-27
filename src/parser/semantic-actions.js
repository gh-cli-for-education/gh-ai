/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo Final de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 19/05/2024
 * @desc Contains all the semantic actions used by the grammar
 * @external Grammar
 */
'use strict';

/**
 * Return the first node of type targetType inside the properties array.
 * If there is no node of type TargetType then returns undefined.
 * @param {Array} properties 
 * @param {string} targetType 
 */
function findFirstPropertyType(properties, targetType) {
  return properties.find((property) => {
    return property.type === targetType;
  })?.content;
}

/**
 * Build the input object that is going to be used by the gh-ai extension
 * @param {[Array, object]} 
 * @returns 
 */
function buildInputObject([properties, eof]) {
  return {
    chatSettings: findFirstPropertyType(properties, 'chatSettings'),
    extension: findFirstPropertyType(properties, 'extension'),
  };
}

/**
 * Build the extension property of the prompt
 * @param {[object, object, Array]} 
 * @returns 
 */
function buildExtension([extensionToken, description, extensionProperties]) {
  
  const FUNCTIONS = extensionProperties.filter((property) => { 
    return property.type === 'function'; 
  }).map((functions) => {
    return functions.content;
  });
  const HELP = findFirstPropertyType(extensionProperties, 'help');

  return {
    type: 'extension',
    content: {
      name: extensionToken.value,
      languageSettings: findFirstPropertyType(extensionProperties, 'languageSettings'),
      files: [buildFile([extensionToken, description, FUNCTIONS, HELP])],
      examples: findFirstPropertyType(extensionProperties, 'examples'),
      readme: findFirstPropertyType(extensionProperties, 'readme'),    
    }
  };
}

/**
 * Build any function given the function name, description and optional parameters 
 * query and template
 * @param {[object, object, object, object]}
 * @returns 
 */
function buildFunction([functionToken, description, query, template]) {
  return {
    type: 'function',
    content: {
      name: functionToken.value,
      description: description.content,
      query: query?.content,
      template: template?.value,
    }
  };
}

/**
 * Build the help object of a file given the different sections
 * @param {[object, object, object, object, object, object]} 
 * @returns 
 */
function buildHelp([helpToken, usage, header, argumentss, parameters, footer]) {
  return {
    type: 'help',
    content: {
      usage: usage.value,
      header: header.map((paragraph) => paragraph.value).join('\n\n'),
      arguments: argumentss?.map((argument) => argument.value),
      parameters: parameters?.map((parameter) => parameter.value),
      footer: footer.map((paragraph) => paragraph.value).join('\n\n')
    } 
  };
}

/**
 * Build any file object given a name, description and the optional properties 
 * functions and help 
 * @param {[object, object, object, object]}
 * @returns 
 */
function buildFile([fileName, description, functions, help]) {
  return {
    name: fileName.value,
    description: description.content,
    functions: functions ?? undefined,
    help: help ?? undefined,
  };
}

/**
 * Build a file object that correspond to a readme.md 
 * @param {[object, object]}
 * @returns
 */
function buildReadme([readmeToken, sections]) {
  return {
    type: 'readme',
    content: {
      name: 'README.md',
      description: sections.content,
    }
  }
}

/**
 * Build a description object for a given section inside the input file
 * @param {[object, object]} 
 * @returns 
 */
function buildDescription([descriptionToken, descriptionBlocks]) {
  return {
    type: 'description',
    content: descriptionBlocks.map((block) => {
      if (block.type === 'ITEM_LIST') {
        return `${block.value.delimiter} ${block.value.content}`
      }
      return block.value;
    }).join('\n\n'),
  }
}

/**
 * Build a string whose content is the section name and its correspoding description
 * @param {[object, object]}
 * @returns 
 */
function buildSection([headerToken, description]) {
  const HEADER = headerToken.value;
  return `${'#'.repeat(HEADER.depth)} ${HEADER.content}\n\n ${description.content}`;
}

/**
 * Combine all the readme sections description into one big description 
 * @param {[object]} sections Array with each section string ready to be combined
 * @returns
 */
function buildSections([sections]) {
  return {
    type: 'sections',
    content: sections.flat().join('\n\n'),
  };
}

/**
 * Build an Example object given the input command and the expected output
 * @param {[object, object]}
 * @returns 
 */
function buildExample([command, output]) {
  return {
    command: command.value,
    output: output.value
  };
}

/**
 * Wrap all the examples inside the same object 
 * @param {[object, object]}
 * @returns 
 */
function buildExamples([examplesToken, exampleList]) {
  return {
    type: 'examples',
    content: exampleList
  };
}

/**
 * Object that manage the different posible executions of the buildSettings function
 */
const buildSettings = {
  chatSettings: (d) => buildSetting(['chatSettings', d[1]]),
  languageSettings: (d) => buildSetting(['languageSettings', d[1]])
};

/**
 * Build a generic settings object given the settings name and the list of key:value pairs
 * @param {[string, object]}
 * @returns 
 */
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
  buildInputObject,
  buildExtension,
  buildFunction,
  buildHelp,
  buildDescription,
  buildFile,
  buildSection,
  buildSections,
  buildExample,
  buildExamples,
  buildSettings,
  buildReadme,
};
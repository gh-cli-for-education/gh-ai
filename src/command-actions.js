#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 01/02/2024
 * @desc @TODO hacer la descripción
 */
import * as fs from 'fs';
import readline from 'readline';
import { DEFAULT_CONFIG_JSON } from './utils.js';

const ENV_PATH = './.env';

const checkJsonFileFormat = (sourceFile, debugFlag) => {

};

const readJsonFile = (sourceFile, debugFlag) => {
  const JSON_REGEX = /(.*)\.json/;
  if (JSON_REGEX.exec(sourceFile)) {
    try {
      let configFile = JSON.parse(fs.readFileSync(sourceFile));

    } catch (error) {
      console.log('Ocurrio un error durante la lectura del fichero.');
    }
  } else {
    console.log(`${sourceFile} no es un fichero con extensión .json`);
    process.exit(1);
  }
};

/**
 * @description change the current value of the selected API to the new key value @TODO mejorar esto
 * @param {Object} dotEnv Enviroment object needed to use DotEnv utils methods  
 * @param {Object} keyManager Object with all the APIkey=value pairs 
 * @param {string} selectedAPI The selected API key 
 * @param {string} newKeyValue The new value of the API key
 * @param {boolean} debugFlag Enable more output logs. 
 * @TODO (Mantener los comentarios al sobreescribir el fichero .env)
 * En caso de tener comentarios en el fichero .env estos no se guardan al 
 * sobreescribir una key. 
 */
const setNewAPIKey = (dotEnv, keyManager, selectedAPI, newKeyValue, debugFlag) => {
  if (!selectedAPI) { 
    throw Error('api is not defined'); /** @TODO Mejorar esto */ 
  }
  if (typeof newKeyValue !== 'string') {
    throw Error('the value of the key is not a string'); /** @TODO Mejorar esto */
  }
  const KEY_NAME = `${selectedAPI}_API_KEY`;
  let newKeyObject = dotEnv.parse(`${KEY_NAME}=${newKeyValue}`);
  dotEnv.populate(keyManager, newKeyObject, {override: true, debug: debugFlag});
  let newEnvFile = '';
  for (let key in keyManager) { 
    newEnvFile += `${key}=${keyManager[key]}\n`; 
  }
  fs.writeFileSync(ENV_PATH, newEnvFile);
  
};

/**
 * @description Generate a default config file
 * @param {string} helpType Indicates what type of config file to generate
 * @param {string} filePath The PATH where the file is going to be located 
 * @param {boolean} debugFlag Enable more output logs.
 * @TODO en caso de que se pase un PATH, comprobar si el fichero es JSON 
 * @TODO Preguntar si se quiere sobrescribir el fichero
 */
const generateDefaultConfigFile = (helpType, filePath, debugFlag) => {
  const PATH = filePath || `./${helpType}-config-file.json`;
  if (debugFlag) { 
    console.log(`Generating the ${helpType} configuration file in ${PATH}`);
  }
  if (fs.existsSync(PATH)) {
    // Preguntar si se quiere sobrescribir el fichero 
  }
  fs.writeFileSync(PATH, JSON.stringify(DEFAULT_CONFIG_JSON, null, 1));
};

export {
  setNewAPIKey,
  generateDefaultConfigFile
};

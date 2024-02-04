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
 * @description 
 * @param {Object} dotEnv 
 * @param {Object} keyManager 
 * @param {string} selectedAPI 
 * @param {string} newKey 
 * @param {boolean} debugFlag 
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
  if (debugFlag) { console.log('Setting the new key value'); } /** @TODO Mejorar esto */
  const KEY_NAME = `${selectedAPI}_API_KEY`;
  let newKeyObject = dotEnv.parse(`${KEY_NAME}=${newKeyValue}`);
  dotEnv.populate(keyManager, newKeyObject, {override: true, debug: debugFlag});
  let newEnvFile = '';
  for (let key in keyManager) { newEnvFile += `${key}=${keyManager[key]}\n`; }
  fs.writeFileSync(ENV_PATH, newEnvFile);
  console.log('The new Key value has been changed correctly');
};

export {
  setNewAPIKey
};
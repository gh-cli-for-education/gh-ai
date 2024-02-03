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
 * 
 * @param {*} dotEnv 
 * @param {*} api 
 * @param {*} newKey 
 * @param {*} debugFlag 
 */
const setNewAPIKey = (dotEnv, selectedAPI, newKey, debugFlag) => {
  if (!selectedAPI) { 
    throw Error('api is not defined'); /** @TODO */ 
  }
  if (typeof newKey !== 'string') {
    throw Error('the value of the key is not a string'); /** @TODO */
  }
  let apiKeyFormat = `${selectedAPI}_API_KEY`;
  if (debugFlag) { 
    console.log(process.env.OPENAI_API_KEY); // Para comprobar si las variable de .env se han añadido.
    console.log(`Setting ${apiKeyFormat}`); 
  }
  let newKeyObject = {};
  newKeyObject[apiKeyFormat] = newKey;
  dotEnv.populate(process.env, newKeyObject, {override: true, debug: debugFlag}); // Esto no cambia el valor de la clave en .env (hay que leer el fichero completo y sobreescribirlo)
  /** @see https://stackoverflow.com/questions/55660763/how-to-generically-update-an-existing-environment-variable-to-env-file */
};

export {
  setNewAPIKey
};
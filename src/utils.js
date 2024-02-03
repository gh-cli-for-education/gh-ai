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
 * @desc store any utility function needed by the whole program @TODO mejorar la descripción
 */

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


export { 
  isEmptyObject 
};
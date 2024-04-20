/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Procesadores de Lenguajes
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @since 09/02/2024
 * @desc Contains all the parser rules and the corresponding semantic actions
 * @external Grammar
 */
'use strict';

const RED     = '\x1b[31m';
const GREEN   = '\x1b[32m';
const BLUE    = '\x1b[34m';
const YELLOW  = '\x1b[33m';
const MAGENTA = '\x1b[35m';
const RESET   = '\x1b[0m';

const COLORS = {
  red:     (string) => `${RED}${string}${RESET}`,
  green:   (string) => `${GREEN}${string}${RESET}`,
  blue:    (string) => `${BLUE}${string}${RESET}`,
  yellow:  (string) => `${YELLOW}${string}${RESET}`,
  magenta: (string) => `${MAGENTA}${string}${RESET}`,
};

Object.freeze(COLORS);

export {COLORS};
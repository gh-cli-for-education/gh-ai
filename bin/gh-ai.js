#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 01/02/2024
 * @desc @TODO
 */
import { Command } from "commander";
import packageJson from '../package.json' assert { type: "json" }; // Esto se puede mejorar

'use strict';

const PROGRAM = new Command();

// IDEA: Permitir que el usuario pueda genera el fichero automaticamente desde la línea de comandos, puede ser por opción -g o ejecutar el programa sin parametros. 
//.option('-l, --llm-type', 'TODO') // IDEA: Permitir diferentes tipo de LLM

// Program data
PROGRAM
  .name(packageJson.name)
  .usage('[options]')
  .description(packageJson.description)
  .addHelpText('after',`
Aditional help:
    If no option is passed the program will execute in 'interactive mode' asking the user different program options one by one
  `);

// Program options 
PROGRAM
  .allowUnknownOption() // Obvia las opciones incorrectas
  .version(packageJson.version, '-v | -V | --version', 'Print the current version of the program')
  .option('-d | --debug', 'output extra information about the execution process') 
  .option('-f | --source-file <FILE>', 'TODO')
  .option('-g | --generate-file', 'TODO');

PROGRAM.parse(process.argv);

const executeProgram = () => {

}

executeProgram();




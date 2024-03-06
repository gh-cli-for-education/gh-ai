#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 22/02/2024
 * @desc @TODO hacer la descripción
 */
import Mustache from 'mustache';

import { TEMPLATES } from '../utils.js';
'use strict';

function parseUserPrompts() {
  return `### ${this.name}\n\n${this.content}`;
}

const README = {

  HEADER:
`# gh-ai execution log 

This file has been generated automatically by the gh-ai program and it does not lead to any increase in token usage. 
The purpose of this markdown file is to store the conversation between the gh-ai program and the selected LLM.
`,

  SYSTEM_PROMPT:
`# SYSTEM PROMPT 

This section contains the system prompt generated by the program to explain the LLM how to deal with the user input and how to output the result. 

### LLM PERSONA 

{{persona}}

### INPUT EXPLANATION

{{input}}

### OUTPUT EXPLANATION

{{output}}
`, 

  USER_PROMPT:
`# USER PROMPT 

This section contains all the prompts generated by the program using the user's input.

### MAIN FILE

{{{mainFile}}}

{{#files}}
{{{.}}}
{{/files}}

### EXAMPLES
{{#examples}}
{{{.}}}
{{/examples}}
`,

  API_RESPONSE:
`# {{llm}} API RESPONSE

This section contains the entire {{llm}} API response.
{{#response}}

{{{response}}}

{{/response}}
{{#usage}}
# USAGE

This section contains the tokens usage of the program:

tokens used by the prompts: {{usage.prompt_tokens}}.
tokens used by in the api response: {{usage.completion_tokens}}.

Total tokens usage: {{usage.total_tokens}}. 
{{/usage}}
`,

  AI_WARNING: 
`# WARNING 

poner aquí lo de tener cuidado con el código generado por la IA.
`,

};

TEMPLATES.SYSTEM['README'] = (prompts, apiResponse) => {
  prompts.parseUserPrompts = parseUserPrompts;
  let result = `
  ${README.HEADER}

  ${Mustache.render(README.SYSTEM_PROMPT, prompts.system)}

  ${Mustache.render(README.USER_PROMPT, prompts.user)}

  ${Mustache.render(README.API_RESPONSE, apiResponse)}

  ${README.AI_WARNING}
  `;
  return result;
};

export { README };
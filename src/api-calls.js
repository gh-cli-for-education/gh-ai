#!/usr/bin/env node
/**
 * Universidad de La Laguna
 * Escuela Superior de Ingeniería y Tecnología
 * Grado en Ingeniería Informática
 * Trabajo de Fin de Grado
 *
 * @author Raimon José Mejías Hernández  <alu0101390161@ull.edu.es>
 * @date 12/02/2024
 * @desc @TODO hacer la descripción
 */
import OpenAI from "openai";
'use strict';

const API = Object.create(null);

/**
 * @description OpenAI specific implementation of the call @TODO Mejorar esto
 * @param {object} prompts 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function apiCall(prompts, options) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    organization: options.org
  });
  const DEFAULT_MODEL = 'gpt-3.5-turbo-0125';
  const completions = await openai.chat.completions.create({
    messages: [
      // Aquí va el Array de los mensajes espeficicados de la siguiente manera:
      // { role: ('assistant', 'user', 'system'), content: (Contenido del mensaje)} *-> Investigar más acerca del significado del rol
      // assistant -> El tipo de mensaje que devuelve ChatGPT -> Se puede utilizar para pasar los ejemplos de como el llm debe responder 
      // System -> Permite darle información al llm para que la guarde(Aquí van las Persona, reglas y formato de salida del mensaje)
      // User -> Los mensajes del usuario al llm  
    ],
    model: DEFAULT_MODEL,
    n: 1,                                     // La cantidad de posibles respuestas, por defecto uno y es recomendado dejarlo en 1
    response_format: { type: 'json_format' }, // Comprueba que la respuesta generada por OPENAI en formato json sea valido, IMPORTANTE: SE DEBE INDICAR QUE EL OUTPUT SEA EN FORMATO JSON O EL LLM PUEDE DAR FALLOS 
    temperature: 0.2,                         // Tambien esta top_p: Ambos controlan la aleatoriedad de las respuestas. No modificar ambos a la vez.
    tools: undefined                          // Permite a ChatGPT llamar a funciones pasandoles directamente el JSON generado por el mismo. (investigar más).
  });

  // Realizar check de los posibles errores
  const response = completions.choices[0]; // Solo existe una posible respuesta
  const usage = completions.usage; /** @TODO comprobar que --tokens-verbose esta activado */
  let finishReason = response.finish_reason;
  if (finishReason !== 'stop' || finishReason !== 'tool_calls' ) {
    let errorMsg = 'There is a problem with the ChatGPT response!\nReason: ';
    if (finishReason === 'length') {
      errorMsg += 'The maximum amount of tokens was reached the llm can\'t generate more words.';
    } else {
      errorMsg += 'The prompt was omitted due to a flag in content filter.';
    }
    throw new Error(errorMsg);
  }
  let responses; // Realizar parsing de las respuestas para devolver un array de respuestas 
  /** @TODO SEGUIR POR AQUI  */
  return responses;
}

/**
 * 
 * @param {*} prompts 
 * @param {*} options 
 */
API['HUGGINGFACE'] = async function apiCall(prompts, options) {

}

Object.freeze(API); // prevent the object to be modified

export { API };
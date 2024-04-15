import OpenAI from 'openai';

import { API, CONSOLE_PROMPT } from '../utils.js';
import { createOrRetreiveAssistant, createOrRetreiveThread, call } from './call.js';
import { TOOLS, TOOLS_DESCRIPTIONS } from './tools.js';

/**
 * 
 * @param {object} promptObject 
 * @param {string} outputDirectory 
 * @param {object} options 
 * @returns 
 */
API['OPENAI'] = async function(promptObject, outputDirectory, options) {
  
  const OPENAI = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  let responseObject = {
    systemPrompt: promptObject.system,
    userPrompts: [],
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
    },
    config: undefined,
    assistant: undefined,
    thread: undefined,
  };

  let assistant = undefined;
  let thread = undefined;

  try {

    // Se obtienen el asistente y la conversación, en caso de que no existan en el env se generan unos nuevos
    assistant = await createOrRetreiveAssistant(OPENAI, promptObject.system, options.llmModel, TOOLS_DESCRIPTIONS, process.env.ASSISTANT_ID);
    thread = await createOrRetreiveThread(OPENAI, process.env.THREAD_ID);
    debugger
    // Por cada prompt del usuario
    for (const PROMPT of promptObject.user) {

      console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT.title} prompt`);

      // Por cada sección de un mismo prompt
      /** @TODO HAY UN "BUG" QUE SI PASA UN CONTENT QUE NO ES UN ARRAY SINO UNA SOLA STRING EMPEZARÁ A EJECUTAR LETRA POR LETRA DE LA STRING */
      for (const PROMPT_SECTION of PROMPT.content) {

        // Se llama a la api 
        let callResult = await call(OPENAI, PROMPT_SECTION, assistant.id, thread.id);

        // En caso de que se requiera una acción, se ejecuta y se vuelva a llamar a la API con la respuesta de la Tool todas las veces que sea necesaria 
        while (callResult.runStatus === 'requires_action') {
          let toolOutputs = await manageToolActions(OPENAI, thread.id, callResult.runID, outputDirectory, options);
          console.log(`${CONSOLE_PROMPT.GH_AI}Tool executed successfully!.`);
          callResult = await call(OPENAI, toolOutputs, assistant.id, thread.id, callResult.runID);
        }

        // Se añade el mensaje al responseObject openai, responseObject, prompt, threadID , runID, tokensVerbose = false
        await addResultToResponseObject(OPENAI, responseObject, { title: PROMPT.title, content: PROMPT_SECTION }, thread.id, callResult.runID, options.tokensVerbose);

        // En caso de error detener la ejecución
        if (callResult.status === 'failed') { return responseObject; } 

      }
      
    }

    console.log(`\n${CONSOLE_PROMPT.GH_AI}The ${options.llmApi} API call has been executed successfully!`);

    return responseObject;
  } 

  // Independientemente de lo que ocurra, sea una ejecución correcta o exista una excepción se debe limpiar o guardar la memoria
  finally {
    
    if (!options.saveAssistant && assistant) {
      await OPENAI.beta.assistants.del(assistant.id);
    }
    else if (assistant) {
      responseObject.assistant = assistant.id;
    }
  
    if (!options.saveThread && thread) {
      await OPENAI.beta.threads.del(thread?.id);
    }
    else if (thread) {
      responseObject.thread = thread.id;
    }

  }
}

/**
 * 
 * @param {OpenAI} openai 
 * @param {object} callResult 
 * @param {object} responseObject 
 * @param {object} prompt 
 * @param {string} threadID 
 * @param {bool} tokensVerbose 
 */
async function addResultToResponseObject(openai, responseObject, prompt, threadID , runID, tokensVerbose = false) {

  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  let latestAiResponse = '';

  if (RUN.status !== 'completed') {
    latestAiResponse = RUN.last_error?.message;
  }
  else {
    latestAiResponse = await openai.beta.threads.messages.list(threadID);                         // Se obtiene la lista de mensajes (Tanto de usuario como IA)
    /** @TODO ESTO ESTA BUG */
    latestAiResponse = latestAiResponse.data.find((message) => { return message.role === 'assistant';}); // Se encuentra el ultimo mensaje de la IA(assistant), que en este caso será el primer mensaje del array con role assistant
    latestAiResponse = latestAiResponse.content?.map((content) => { return content.text.value; }); // Se obtiene todos los posibles textos que haya podido generar en un solo mensaje.
  }

  if (tokensVerbose) {
    responseObject.usage.totalPromptTokens     += RUN.usage.prompt_tokens;
    responseObject.usage.totalCompletionTokens += RUN.usage.completion_tokens;
    responseObject.usage.totalTokens           += RUN.usage.total_tokens;    
  }

  responseObject.userPrompts.push({ // Se añade el mensaje al reponseObject
    title: prompt.title,
    prompt: prompt.content,
    response: latestAiResponse,
    usage: ((tokensVerbose)? RUN.usage : undefined),
  });

}

/**
 * @param {OpenAI} openai
 * @param {string} threadID 
 * @param {string} runID 
 * @param {string} outputDirectory 
 * @param {object} options 
 * @returns 
 */
async function manageToolActions(openai, threadID, runID, outputDirectory, options) {

  const RUN = await openai.beta.threads.runs.retrieve(threadID, runID);

  if (RUN.required_action.type === 'submit_tool_outputs') {

    let requiredActions = RUN.required_action.submit_tool_outputs;
    let outputs = await Promise.all(requiredActions.tool_calls.map(async (call) => {

      console.log(`${CONSOLE_PROMPT.DEBUG}Executing ${call.function.name} tool.`);
      return {
        tool_call_id: call.id,
        output: await TOOLS[call.function.name](call.function.arguments, outputDirectory, options)
      }

    }));
    return { tool_outputs: outputs };

  }

  throw new OpenAI.APIError(-3, {
    type: 'submit_tool_outputs_error',
    message: 'The action required was not a tool output submition.'
  });
}

export { API };
import OpenAI from 'openai';


import { API, CONSOLE_PROMPT } from '../utils.js';
import { createOrRetreiveAssistant, createOrRetreiveThread, call } from './call.js';
import { TOOLS_DESCRIPTIONS } from './tools.js';

/**
 * 
 * @param {*} promptObject 
 * @param {*} outputDirectory 
 * @param {*} options 
 * @returns 
 */
API['OPENAI'] = async function(promptObject, outputDirectory, options) {
  
  const OPENAI = new OpenAI({ 
    apiKey: process.env.OPENAI_API_KEY,
    organization: process.env.OPENAI_ORG
  });

  let responseObject = {
    systemPrompt: promptObject.system,
    messages: [],
    usage: {
      totalPromptTokens: 0,
      totalCompletionTokens: 0,
      totalTokens: 0,
    },
    readme: {
      prompt: promptObject.readme,
      result: undefined 
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

    // [assistant, thread] = await createAssistantAndThread(OPENAI, promptObject.system, options);
    
    if (options.saveAssistant) { responseObject.assistant = assistant.id; }
    if (options.saveThread) { responseObject.thread = thread.id; }

    for (const PROMPT of promptObject.user) {
      console.log(`${CONSOLE_PROMPT.GH_AI}Working with ${PROMPT.title} prompt`);
      // console.log(PROMPT);

      for (const PROMPT_SECTION of PROMPT.content) {
        // Llamar a la API y añadir la respuesta al reponseObject
        const CALL_RESULT = await call(OPENAI, PROMPT_SECTION, assistant.id, thread.id, outputDirectory, options);
        await addResultToResponseObject(OPENAI, CALL_RESULT, responseObject, { title: PROMPT.title, content: PROMPT_SECTION }, thread.id, options);
        if (CALL_RESULT.error) { // En caso de error detener la ejecución
          return responseObject;
        }
      }
      
    }

    if (responseObject.readme.prompt) {

      console.log(`${CONSOLE_PROMPT.GH_AI}Working with README.md prompt`);

      const CALL_RESULT = await call(OPENAI, responseObject.readme.prompt, assistant.id, thread.id, outputDirectory, options);

      if (CALL_RESULT.error) { // En caso de error detener la ejecución
        return responseObject;
      }

      let messages = await OPENAI.beta.threads.messages.list(thread.id);
      messages = messages.data.filter(message => message.role === 'assistant');

      responseObject.readme.result = messages[0].content.map((content) => { return content.text.value;});

    }

    console.log(`\n${CONSOLE_PROMPT.GH_AI}The ${options.llmApi} API call has been executed successfully!`);

    /** @TODO No tiene en cuenta los tokens usados por las tools */
    if (options.tokensVerbose) { // Calcular el total de tokens usados.
      for (const MESSAGE of responseObject.messages) {
        responseObject.usage.totalPromptTokens += MESSAGE.usage.prompt_tokens;
        responseObject.usage.totalCompletionTokens += MESSAGE.usage.completion_tokens;
        responseObject.usage.totalTokens += MESSAGE.usage.total_tokens;
      }
    }

    return responseObject;
    
  } 
  finally {
    
    if (!options.saveAssistant && assistant) {
      await OPENAI.beta.assistants.del(assistant.id);
    }
  
    if (!options.saveThread && thread) {
      await OPENAI.beta.threads.del(thread?.id);
    }

  }
}

/**
 * 
 * @param {*} openai 
 * @param {*} callResult 
 * @param {*} responseObject 
 * @param {*} threadID 
 * @param {*} options 
 */
async function addResultToResponseObject(openai, callResult, responseObject, prompt, threadID, options) {
  if (callResult.error) { // Se genera una respuesta de error y se termina la ejecución del programa
    responseObject.messages.push({
      title: prompt.title,
      prompt: prompt.content,
      response: callResult.run.last_error.message,
      usage: undefined
    });

    responseObject.usage.totalPromptTokens = callResult.run.usage.prompt_tokens;
    responseObject.usage.totalTokens = callResult.run.usage.total_tokens;
  }

  let messages = await openai.beta.threads.messages.list(threadID);
  messages = messages.data.filter(message => message.role === 'assistant');

  responseObject.messages.push({
    title: prompt.title,
    prompt: prompt.content,
    response: messages[0].content.map((content) => { return content.text.value;}),
    usage: (options.tokensVerbose)? result.run.usage : undefined,
  });
}

export { API };
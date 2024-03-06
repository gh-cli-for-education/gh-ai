/**
 * cabecera 
 */
const ERROR_HANDLER = Object.create(null);

/**
 * @description Parse and prints to stderr the content of a ZodError exception 
 * @param {object} error The zodError exception to parse
 */
ERROR_HANDLER['zodError'] = (error) => {
  let amount = (error.errors.length > 1)? 'Mutiple' : 'An';
  let errors = '';
  error.errors.map((error, index) => {
    errors += `\t${index + 1}.) ${error.message}\n`;
  });
  console.error(`${amount} error(s) ocurred while checking the input Object!\n${errors}`);
};

/**
 * @description Parse and prints to stderr the content of a nearleyError exception
 * @param {object} error An error with a token property
 */
ERROR_HANDLER['nearleyError'] = (error) => {
  let errorMsg = 'The parser found an error while reading the input file!\n';
  if (error.token) {
    errorMsg += `Unexpected ${error.token.type} token`;
  } else {
    errorMsg += 'Invalid syntax';
  }
  console.error(parser.lexer.formatError(error.token, errorMsg));
  const expectedTokenRegex = /A (.*) token based on:/g;
  const expectedTokens = [...error.message.matchAll(expectedTokenRegex)];
  console.error(`\nThe expected tokens are: ${expectedTokens.map((match) => match[1])}`);  
};

ERROR_HANDLER['apiCallError'] = (error) => {
  let errorMsg = 'An error ocurred while making the API request!';
  errorMsg += `\n\t${error.message} ${error.code}`; // Esto no esta del todo correcto, diseñar un mejor tipo de error
  console.error(errorMsg, error);
}

export { ERROR_HANDLER };
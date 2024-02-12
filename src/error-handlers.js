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
  console.error(`${amount} error(s) ocurred while checking the input Object!.\n${errors}`);
};

/**
 * @description Parse and prints to stderr the content of a nearleyError exception
 * @param {object} error An error with a token property
 */
ERROR_HANDLER['nearleyError'] = (error) => {
  const lineAndColRegex = /line (\d+) col (\d+):/;
  const expectedTokenRegex = /A (.*) token based on:/g;
  let positionMsg = `In line ${lineAndColRegex.exec(error.message)[1]} at column ${lineAndColRegex.exec(error.message)[2]}:`; // Mejorar esto al poner line y col en los tokens
  let errorMsg = '';
  if (error.token) {
    errorMsg = `The parser found an unexpected ${error.token.type} token with value: ${error.token.value}. `;
  } else {
    errorMsg = 'The parser found an invalid syntax. ';
  }
  errorMsg += `The expected tokens are: ${[...error.message.matchAll(expectedTokenRegex)].map((match) => match[1])}`;
  console.error(`An error occured while reading the input file!\n ${positionMsg}\n  ${errorMsg}`);  
};

export { ERROR_HANDLER };
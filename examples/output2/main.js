// This file contains the main program logic to orchestrate the extension

const parseInputFile = require('./parser');
const validateParsedObject = require('./schema');
const { createPrompt, generateCompletions } = require('./openai');

// Read the input txt file
const inputFile = 'input.txt';

// Parse the input file
const parsedObject = parseInputFile(inputFile);

// Validate the parsed object
const isValid = validateParsedObject(parsedObject);

if (isValid) {
  // Create a prompt for generating completions
  const prompt = createPrompt(parsedObject);

  // Generate completions using the OpenAI API
  const completions = generateCompletions(prompt);

  console.log(completions);
} else {
  console.log('Parsed object does not match the schema.');
}
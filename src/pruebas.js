import { StructuredOutputParser } from 'langchain/output_parsers';
import pkg from 'json-schema-library';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
const mySchema = require('./schemas/extension-schema.json');
const myJson = require('./default-config-files/extension.json');

const parser = StructuredOutputParser.fromNamesAndDescriptions({
  type: "The type of proposal, it depends on what you want",
  name: "The extension name",
  scriptLanguage: "Language of the expected extension",
  description: "The description of the proposal, put as much info as you can think",
  parameters: [
   {
    name: "Parameter name use the format -p | --long-parameter-name",
    description: "Parameter description, put useful info about the option function"
   }
  ],
  examples: [
   {
    example: "The example input",
    expectedOutput: "The expected output"
   }
  ]
});
const formatInstructions = parser.getFormatInstructions();

const JSON_REGEX = /```json\s*(.*)\s*```/

// console.log(JSON.parse(JSON_REGEX.exec(formatInstructions)[1]));

const schema = new pkg.Draft07(mySchema);
const errors = schema.validate(myJson);
console.log(errors);
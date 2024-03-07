/**
 * 
 */

const TOOLS_DESCRIPTIONS = [
  {
    type: 'function',
    function: {
      name: 'get_gh_api_documentation',
      description: 'Retreive information from the gh api documentation',
      parameters: {
        type: 'object',
        properties: {
          // poner aquí las properties 
        }
      },
      required: undefined
    }
  },
  {
    type: 'function',
    function: {
      name: 'create_file',
      description: `Use this function whenever you are going to create a new file with the current content you have from that file. 
      In case there is no errors leave an empty array in the errors property`,
      parameters: {
        type: 'object',
        properties: {
          file: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'The file\'s name' },
              content: { type: 'string', description: 'The file\'s content' }      
            },
            required: ['name', 'content']
          },
        },
        required: ['file']
      }
    }
  }
];

const TOOLS = Object.create(null);

TOOLS['create_file'] = async (input, options, outputDirectory) => {    
  try {
    await fs.mkdir(outputDirectory, { recursive: true });
    input = JSON.parse(input);
    API_RESPONSE_SCHEMA.parse(input);
    let file = input.file;
    await fs.writeFile(`${outputDirectory}/${file.name}`, file.content);
    if (input.errors) { 
      input.errors.map((error) => {
        console.log(`${COLORS.red(`${options.llm}>: `)} ${error}`); 
      });
    }
    return 'Function executed successfully. Do not respond this output and wait for the user input.';      
  } catch (error) {
    let warning = COLORS.magenta('WARNING>: ');
    let errorMsg = '';
    if (error instanceof SyntaxError) {
      errorMsg = 'The input object doens\'t have a valid JSON Syntax. ';
      console.error(`${warning}${errorMsg}`);
      return errorMsg + 'Try calling the function again with a valid Syntax.';
    }
    else if (error instanceof z.ZodError) {
      errorMsg = 'The input JSON doesn\'t follow the expected Schema. ';
      console.error(`${warning}${errorMsg}`)
      return errorMsg + 'Try calling the function again with a valid JSON Schema.';
    } 
    else {
      throw error;
    }
  }
};

TOOLS['get_gh_api_documentation'] = async () => {

};

export { TOOLS_DESCRIPTIONS, TOOLS };
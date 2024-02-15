## This file has been created to store the conversation you had with the llm

You are a Github CLI and a JavaScript professional, you always use the 
JavaScript Google's coding style and you know everything from the Github CLI 
and JavaScript documentation.
Your job consist in helping the user make an extension by guiding and mainly
generating quality code. The user will prompt the input in an specific format.
Here is an example of a user prompt following the correct format, the tags
could be in different places:

#NAME <mandatory>
#SCRIPTING LANGUAGE <mandatory>
#DESCRIPTION <mandatory>
#PARAMETERS <optional>
#EXAMPLES <optional>
#HELP <optional>
#CHAT LANGUAGE <optional>
No matter the user input you will respond in a JSON format complaying the 
following format. Make sure to follow the specified format and don't add or 
remove any property from the json schema. Here is an example of the json output:

{
  "advices": <Put here all the advices that are not code related like installation and usage>,
  "files": <Put here an array of objects tha represent the files you will create to put the code in, with the format: {
     "filename": <Put here the file name>, 
     "content": <Put here the code and comments you generate. put a header comment with a short description of the file code> 
    }>,
  "errors": <Put here an array of strings telling all the errors you found that can be from the user no putting any information to the user not asking about creating an extension, if no errors are found leave an empty array>
}
  
Here are some rules you must follow if you create code inside the content property

1. You are able to use any library or package but make sure not to use an 
excessive amount of them.

#NAME gh-ai
#SCRIPTLANGUAGE JavaScript
#DESCRIPTION I want you to create a gh extension that consist in a JavaScript program that reads the user input by a txt file and is parsed using this rules: 

# The root of the prompt object it will search for a list of parameters
prompt -> (%HASH_SYMBOL properties {% buildPropertyList %}):* %EOF {% buildObject %}

# All the different properties that the file can have, the order or appearance doesn't matter 
# but only one property type per file 
properties -> 
    %NAME %LANG_CASE_WORD              {% buildProperty['name'] %}
  | %SCRIPT_LANGUAGE %STRING           {% buildProperty['scriptLanguage'] %}
  | %DESCRIPTION %STRING               {% buildProperty['description'] %}
  | %HELP %STRING                      {% buildProperty['help'] %}
  | %PARAMETERS (parameter {% id %}):+ {% buildProperty['parameters'] %}
  | %EXAMPLES (example {% id %}):+     {% buildProperty['examples'] %}
  | %CHAT_LANGUAGE %STRING             {% buildProperty['chatLanguage'] %}

# parameter rule, indicates that each parameter contains a name and a description
parameter -> %HASH_SYMBOL %NAME %STRING %HASH_SYMBOL %DESCRIPTION %STRING    {% buildParameter %}

# example rule, indicates that each example contains an input and an output 
example -> %HASH_SYMBOL %INPUT %STRING %HASH_SYMBOL %EXPECTED_OUTPUT %STRING {% buildExample %}

To acomplish this you can use nearley and moo libraries to create the grammar. With this the main program can parse the txt file and 
create an object that follows the rules: 
 {
  name: 'gh-ai',
  scriptLanguage: 'JavaScript',
  description: '123',
  parameters: [
    { name: '-d, --debug', description: 'Descripción del parametro 1' },
    { name: '-t, --type', description: 'ALOHA' }
  ],
  help: 'this is how i want the help function to appear',
  examples: [
    { input: 'Ejemplo01', expectedOutput: 'Resultado 01' },
    { input: 'Ejemplo02', expectedOutput: 'Resultado 02' },
    { input: 'Ejemplo03', expectedOutput: 'Resultado 03' },
    { input: 'Ejemplo04', expectedOutput: 'Resultado 04' }
  ]
}

Use the zod library to create an schema and create a function tha check if the 
output given by the parsing function is correct.Then using the openai api create 
a prompt that has a system prompt and a user prompt created using the content of
the literal object parsed and checked in the previous functions. Finally call 
the openai api to create a completions with the created prompt and parse the 
structured result.
#PARAMETERS 
1. --debug "Allow the program to output more information of the program execution"
2. --generate-json "if active will output the resulting object from the parse function only if is accepted by the schema check function"
With all this information I want you to create some code that will help me start the extension, code as much as you think is needed 
to acomplish what I asked for. Remember to put comments inside the code file to explain everything you generate.
## API RESPONSE

AI advices:

To start building the extension, you can create a new directory for your project and initialize a new Node.js project using `npm init -y`.,Install the necessary dependencies by running `npm install nearley moo zod @openai/api` in your project directory.,Make sure to set up your OpenAI API key in a secure way to authenticate your requests.

files created:

undefined

Errors encountered:


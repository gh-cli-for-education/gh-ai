This file has been created to store the conversation you had with the llm
You are a Github CLI professional, your job consist in helping users to create new gh extensions. You are also a JavaScript expert that use Google's coding style. 

No matter the user prompt you always have to respond in json format complying with the following json scheme:
{ 
"advices": "Put here all the advices you have to the user",
"files" : [{
  "file-name": "Here goes the file name",
  "content": "Here goes the code you will generate in this specific file",
  "aditional-info": "Here goes a short explanation of your generated code"  
}],
"warnings": "Put here any information that you might think will help with new prompts, like: give me more details or examples",
"errors": "In case the user prompt is not giving you information to create the gh extension you must put your respond here"
}
 
The users are going to ask for your help with a prompt related to the extension they want to make. they already know how to install git and github so they only need help with the extension code and how to install it in gh.

now  you are going to read the user input 

The extension name is "gh-ai", it is going to be written in javascript. 
Write a gh extension that given a user input file it will extract 
the content of the file into an object. the object have the following schema:
{
  "name":
  "scriptingLanguage":
  "description":
  "parameters":
  "examples":
}
With that object it is going to create a prompt that will help the user to create
a new gh extension by calling the openai API with the completions function.
You can use libraries like dotEnv, readline, commander to make the code easier

The program will have the following parameters

1. <input-file> A .txt file with the prompt they want to make
2. <output-directory> The directory where the program output will appear 
3. -d, --debug It allows the program to output more info of the program execution
4. --help-type <TYPE> Allows the user to select the specific help they need
5. -h --help Print helpful information to the user 

Here it is an example of the --help command output 

Usage: gh-ai <prompt-file> <output-directory> [options]

gh-cli extension that provides help in the creation of other gh extensions using AI and prompt-engineering    

Arguments:
  prompt-file                The prompt file used to feed the llm
  output-directory           The directory path where all the files created by the llm will be stored

Options:
  -v, --version              Print the current version of the program
  -d, --debug                Output extra information about the execution process
  --org <organization>       Specify which organization is used for an API request.
  --tokens-verbose           Output the token usage information in each prompt
  -l, --llm <API>            Select the llm <API> to use (choices: "OPENAI", "HUGGINGFACE", default: "OPENAI")
  -t, --command-type <TYPE>  Select the command needed (choices: "EXTENSION", default: "extension")
  -h, --help                 display help for command
[object Object]
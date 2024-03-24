# gh-ai

gh extension that provides help in the creation of other gh extensions using AI and prompt-engineering 

**WRITE THIS** 

## Installation


## `.env` file

To be able to use your llm api key you need to specify them in a .env file

Here is an example of a .env file to fill with your own keys 

```
# openai env variables
OPENAI_API_KEY= Put here you openai API key
OPENAI_ORG= Put here your openai ORG

# You can use --save-assistant or --save-tread to make the program input the assisant or thread ID into the README.MD file

ASSISTANT_ID= put here your assistant ID if you want to use an existing one instead of creating a new one
THREAD_ID= put here your thread ID if you want to use an existing one instead of creating a new one
```

## Prompt File 

The gh-ai extension uses an specific parser to read the data from a file *(it is recommended to use a .md file to write the prompt)*

There are some rules that apply for all the possible tags a prompt file can have:

- The tags are case insensitive.
- There can only be one specific tag per prompt file, for example: there can only be one `# extension` in the entire file.  
- Each internal option will add a `#` to specify its identation
```md
# Primary option
## Secondary option It is an option of the primary option 
### Tertiary option IT is an option of the secondary option
### And so on...
```
For now there are three main options for the prompt file, which are: 

### `# extension`

An extension option is created using the following format: 

- The `<extension-name>` must follow a `word1-word2-wordn` format.

```markdown
# Extension gh-<extension-name>
```

### Mandatory `# extension` options 

The mandatory options for the `# extension` tag are: 

1. `## MainFile`:

Specify how the main file of the gh-extension should be, the more clear and detalied the better. 

```markdown 
# Extension <gh-extension-name>

## Main file <gh-filename> <p> 

  Here goes a detailed description of the main file 

</p>

[comment]: # ( Functions, Parameters, Arguments and Help are optional tags of the main File )

### Functions 
[comment]: # ( Then a list with all the needed functions of the main file )
[comment]: # ( The hyphen "-" and the colon ":" are necessary )

- <function-name-2>: <p> function's description </p>  
- <function-name-2>: <p> function's description </p>

### Parameters 
[comment]: # ( Then a list with all the needed parameters of the main file )
[comment]: # ( The hyphen "-" is necessary )
[comment]: # ( For now the combination of short and large options is not possible )

- --large-option                      <p> option's description </p>
- --large-option <with-one-parameter> <p> option's description </p>
- -l                                  <p> option's description </p>

### Arguments
[comment]: # ( Then a list with all the needed arguments of the main file )
[comment]: # ( The hyphen "-" is necessary )

- [optional-argument]  <p> optional argument's description </p>
- <mandatory-argument> <p> mandatory argument's description </p>

### Help "string with the usage" <p>

You can paste here a preview of how the Help function should looks like

</p>
```

2. `## Language Settings`:

It indicates the LLM about what programming language, addtionally set the 
specification and guide style to follow

```md
# Extension gh-<extension-name>
## Language Settings 
[comment]: # ( Language setting is mandatory )
[comment]: # ( specification and style are optional )
[comment]: # ( For now there are only this three settings )

- Language: <Language> 
- Specification: <Language-specification> [comment]: # ( Example: c++12 )
- Style: <Language-Code-Style>
```

### Non-mandatory `# extension` options 

You can also add more secondary files using the optional tag `## Files`

```md
# Extension gh-<extension-name>

## Files 

[comment]: # ( You can put as many secondary files as you need )

### <File1-name> <p>

File1's description 

</p>
[comment]: # ( You can optionally put a list of functions after the description )

- <function-name-2>: <p> function's description </p>  
- <function-name-2>: <p> function's description </p>

### <File2-name> <p>

File2's description 

</p>
```

### `# API Query`

Not Yet implemented 

### `# Chat Settings`

With the Chat Settings tag you can modify how the llm should respond you.

```md
# Chat Settings 
[comment]: # ( For now only is supported chat language )
[comment]: # ( by default is english )

- language: <natural-language>
```

## Help

### Usage 

`gh-ai <prompt-file> <output-directory> [options]`

### Arguments 

  - **input-file**: The input file used to extract the parsed data and feed the llm.
  - **output-directory**: The directory path where all the files created by the llm will be stored.

### Options

  - **-v, --version** Print the current version of the program
  - **-d, --debug** Output extra information about the execution process
  - **--tokens-verbose** Output the token usage information in each prompt
  - **--save-thread** Make the program not delete the used thread, instead it will save it inside the generated README file
  - **--save-assistant**  Make the program not delete the used assistant, instead it will save it inside the generated README file
  - **-m --llm-model \<model>** Specify which llm model would you want to use by the selected API
  - **-l, --llm-api \<API>** Select the llm \<API> to use (choices: "OPENAI", default: "OPENAI")
  - **-t, --command-type \<type>** Select the command needed (choices: "EXTENSION", default: "extension")
  - **-h, --help** display help for command

## Examples

**WRITE THIS** 

# **Warnings** 

**WRITE THIS** 

## Running AI generated code

**WRITE THIS** 

## Tokens usage

**WRITE THIS** 
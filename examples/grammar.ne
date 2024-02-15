// File: grammar.ne
// Description: Grammar file using nearley package to parse extension information

// Define the grammar rules to parse extension information

// Regular expressions for each tag
nameTag -> "#NAME" string
scriptingLanguageTag -> "#SCRIPTING LANGUAGE" string
descriptionTag -> "#DESCRIPTION" string
parametersTag -> "#PARAMETERS" string
examplesTag -> "#EXAMPLES" string
helpTag -> "#HELP" string
chatLanguageTag -> "#CHAT LANGUAGE" string

// Grammar rules
ExtensionInfo -> nameTag scriptingLanguageTag descriptionTag parametersTag examplesTag helpTag chatLanguageTag

// Functions to create object from parsed input

function createExtensionObject(name, scriptingLanguage, description, parameters, examples, help, chatLanguage) {
  return {
    #NAME: name,
    #SCRIPTING LANGUAGE: scriptingLanguage,
    #DESCRIPTION: description,
    #PARAMETERS: parameters,
    #EXAMPLES: examples,
    #HELP: help,
    #CHAT LANGUAGE: chatLanguage
  };
}
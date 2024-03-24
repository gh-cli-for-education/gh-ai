# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# inputObject 

Next we have the json object created from the user's submitted information located on the `{{inputFile}}` file. 

```json
{{#inputObject}}
{{parseInputObject}}
{{/inputObject}}
```

# Generated Prompts

## System prompt

The purpose of this prompt is to indicate the context in which the LLM is going to work during the conversation. 

```md
{{prompts.system}}
```

## User prompts 

For each file requested by the user, its corresponding code has been generated. 

### Main File {{inputObject.extension.mainFile.name}}

#### Petition

```md
{{prompts.user.0}}
```

#### Generated code

```{{inputObject.extension.languageSettings.language}}
{{apiResponse.response.0}}
```

{{#apiResponse.response}}
#### Petition

```md
{{prompts.user}}
```

#### Generated code

```{{inputObject.extension.languageSettings.language}}
{{apiResponse.response}}
```

{{/apiResponse.response}}
{{#apiResponse.usage}}
# Usage

To be able to execute this program have been needed **{{apiResponse.usage.total_tokens}}** Tokens, broken down this way:

Tokens used by the program gh-ai: **{{apiResponse.usage.prompt_tokens}}**.
Tokens used by the LLM to generate the answers: **{{apiResponse.usage.completion_tokens}}**.

{{/apiResponse.usage}}
# Considerations and warnings about the AI usage to generate code

Not yet written

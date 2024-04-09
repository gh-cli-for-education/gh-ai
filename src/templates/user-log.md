# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

{{#assistant}}
# Assistant ID 
{{assistant}}

{{/assistant}}
{{#thread}}
# Thread ID 
{{thread}}

{{/thread}}
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
{{systemPrompt}}
```
{{#usage}}
# Usage

To be able to execute this program have been needed **{{usage.totalTokens}}** Tokens, broken down this way:

Tokens used by the program gh-ai: **{{usage.totalPromptTokens}}**.  
Tokens used by the LLM to generate the answers: **{{usage.totalCompletionTokens}}**.

{{/usage}}
# Considerations and warnings about the AI usage to generate code

Not yet written

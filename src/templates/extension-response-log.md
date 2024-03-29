# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

{{#messages}}
## File {{title}}

### Petition

```md
{{prompt}}
```

### Response

```{{config.language}}
{{response}}
```
{{#usage}}
### Usage

Total tokens used by this file request: **{{usage.total_tokens}}** Tokens, broken down this way:

Tokens used by the prompt: **{{usage.prompt_tokens}}**.  
Tokens used by the LLM to generate the answer: **{{usage.completion_tokens}}**.
{{/usage}}
{{/messages}}
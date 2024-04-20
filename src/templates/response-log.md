# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

{{#userPrompts}}
## {{#extension}}File{{/extension}} {{title}}

{{#prompts}}
### Petition {{title}}

```md
{{text}}
```

#### Assistant Response

{{response}}

#### Petition Usage

Total tokens used: **{{usage.total_tokens}}**
Tokens used by the gh-ai generated prompt: **{{usage.prompt_tokens}}**.  
Tokens used by the LLM to generate the answer: **{{usage.completion_tokens}}**.

{{/prompts}}
### Total Usage

Total tokens used to generate the {{#extension}}file{{/extension}}: **{{usage.totalTokens}}**.
Total tokens used by the gh-ai generated prompts: **{{usage.totalPromptTokens}}**.  
Total tokens used by the LLM to generate the answer: **{{usage.totalCompletionTokens}}**.

{{/userPrompts}}
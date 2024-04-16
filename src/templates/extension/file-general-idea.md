# File {{name}}

# Description of what you have to do

Given the following *description* your job is to generate code based on what you are going to read inside the *description tag*.

<description>
{{description}}
</description>

{{#functions.length}}
In addition to the *description* the program **must** necessarily **contain** the **following functions**:

{{#functions}}
{{functionNames}}
{{/functions}}

{{/functions.length}}
## **Rules** you **must follow**:

- Make sure to generate a simple approach, implementing the most important ideas that you have been able to extract from the *description*. 
- The code must be easy to base and expand on for future improvements.
- Make sure to adress the *description* goals and rules. 

## Outputs

<Code>
Put here your generated code
</Code>

<requirements>
Write here a list of the most important ideas you have been able to extract from the *description*.
</requirements>

{{#examples.length}}
## Examples 

Here are some examples of what the program must output given certain inputs:

{{#examples}}
{{parseExamples}}
{{/examples}}
{{/examples.length}}
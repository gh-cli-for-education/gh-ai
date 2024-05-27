# Task: Generate the {{name}} function. 

Using all the information gathered in the requirements analysis task along with the information provided in the following Details section, your task is to generate the {{name}} function, meeting all the specified requirements.

## Details 

### Description 

{{description}}
{{#template}}
#### Template

Inside the codeblock you can find a template of how the function should looks like, make sure to complete and generate all the code specified in the comments.

{{template}}
{{/template}}

{{#query}}
#### Query

The function calls the GitHub APIv4 using a GraphQL query. The query must be constructed from the description inside the ''', written in natural language:

''' 
{{query}}
'''

{{/query}}


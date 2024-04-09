Now You have to generate the corresponding code using the following function description as *guide*: 

```

{{description}}

```

In addition to the function description, you must make sure to include the following information:

The *function name* is: **{{name}}**

{{#params.length}}
The function receives the following parameters:

{{#params}}
{{functionParametersParaser}}
{{/params}}
{{/params.length}}

{{#orderedList.length}}
This is the most important content of the function. You have to follow the list step by step, **generating** the corresponding code, you can also expand the step idea.

{{#orderedList}}
- {{orderedList}}
{{/orderedList}}

Specifically, for each element on the list you have to:

1. Write a comment with the element content.
2. **Generate the corresponding code below the comment.** 
{{/orderedList.length}}
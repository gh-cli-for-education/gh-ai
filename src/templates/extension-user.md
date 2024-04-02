<idea>

The file *name* is **{{name}}**

This is what the program has to do:

{{description}}

{{#functions}}
The program must contain at least the following functions:

{{functions}}

{{/functions}}
{{#help}}
This is how the *usage* section of the *help function* must be: 

{{help.header}}

At the same time, here is an initial idea of what the help function should be returning:

{{#help.arguments.length}} 
The program has to make use of the following arguments that are indicated through the command line:

{{#help.arguments}}
{{argumentParser}}
{{/help.arguments}}

{{/help.arguments.length}}
{{#help.parameters.length}}
The program has to react to the possible parameters that are indicated through the command line:

{{#help.parameters}}
{{parameterParser}}
{{/help.parameters}}
 
{{/help.parameters.length}}

{{help.footer}}

{{/help}}
{{#examples.length}}
Finally, here are some examples of how I think the program should respond to certain usage cases. 

{{#examples}}
{{exampleParser}}
{{/examples}}

{{/examples.length}}
</idea>  

<petition>

You are allowed to extend or improve it, as long as the ideas established in the <idea> section are maintained.
Using all the *ideas* that I told you, execute **generate_file** tool with the generated code from the translation of my ideas to code.
Instead of writting a response, execute **talk_with_user** to tell anything that is not code.  

</petition>

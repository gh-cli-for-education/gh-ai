<idea>

The file *name* is **{{name}}**

This is what the program has to do:

{{description}}

{{#arguments.length}} 
The program has to make use of the following arguments that are indicated through the command line:

{{#arguments}}
{{argumentParser}}
{{/arguments}}

{{/arguments.length}}
{{#parameters.length}}
The program has to react to the possible parameters that are indicated through the command line:

{{#parameters}}
{{parameterParser}}
{{/parameters}}
 
{{/parameters.length}}
{{#functions.length}}
The program must contain at least the following functions:

{{#functions}}
{{functionParser}}
{{/functions}}

{{/functions.length}}
{{#help}}
This is how the *usage* section of the *help function* must be: {{help.usage}}

At the same time, here is an initial idea of what the help function should be returning. 

{{help.help}}

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

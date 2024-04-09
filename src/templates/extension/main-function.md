{{#help}}
# Main Function
The first code you have to generate is a **main function** whose purpose is to *parse the command line*, the code must process the possible parameters and arguments the code should be able to receive. Depending on the readed information *the function should execute the corresponding action* associated to that specific parameter.

{{#help.arguments.length}}
# Arguments 

The arguments the program must support are:

{{#help.arguments}}
{{argumentParser}}
{{/help.arguments}}

**You must add this arguments to the command line processing code inside the main function**

{{/help.arguments.length}}
{{#help.parameters.length}}
# Parameters

The parameters the program must support are: 

{{#help.parameters}}
{{parameterParser}}
{{/help.parameters}}

**You must add this arguments to the command line processing code inside the main function**

{{/help.parameters.length}}
# Help function 

If the `-h, --help` parameter has not been specified you must add it to the processing, in that case it has to execute the **help function**.

What the said function `help` have to do is *print useful information to the user*. **You have to code the function to print the information**
It must be printed in the following order: 

- Print the `Usage` containing: **{{help.usage}}**
{{#help.header}}- Print the help information *header* that contains the following information:

{{help.header}}

{{/help.header}}  
{{#help.arguments.length}}- Print a list with all the previous arguments listed above in the *Arguments section*. {{/help.arguments.length}}
{{#help.parameters.length}}- Print a list with all the previous parameters listed above in the *Parameters section*. {{/help.parameters.length}}
{{#help.footer}}- Print the help information *footer* that contains the following information:

{{help.footer}}

{{/help.footer}}
- Once all the information is printed the program must finish execution.
{{/help}}
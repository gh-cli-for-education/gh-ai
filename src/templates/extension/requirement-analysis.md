# Task: Requirement Analysis.

Using the information contained in the *Details* section, you must perform a thorough analysis of the requirements for the extension {{name}} to be created. Read the description of the extension step by step and extract the crucial information that will be useful for creating the extension.

Once you have analyzed the information, you should create the following lists. Use the following text block written in markdown format as a base to write the lists:

```md
# Requirements List
Write here a markdown list with all the requirements extracted from the information inside the *Details* Section.

# Variables List
Extract and write in this list all the variables you detect within the information provided in the *Details* section. The format of the list should be as follows: <Variable Name>: <Purpose of the variable>.

# Functions List
Extract and write in this list all the functions you detect within the information provided in the *Details* section. The format of the list should be as follows: <Function Name>: <Function requirements>
```

**Once they are done, show the lists**

## Details

{{description}}

{{#examples.length}}
Here are some examples of what the program must output given certain inputs:

{{#examples}}
{{parseExamples}}
{{/examples}}
{{/examples.length}}
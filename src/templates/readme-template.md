# Creation of a `README.md` file

To conclude this conversation the last thing to write is a `README.md` file. This file must contain enough information to satisfy any use doubts.
Make sure to include information that agrees with what was *previusly generated*.

{{#readme}}
Use The following instrucctions as a guide for what you have to write:

<idea>
{{.}}
</idea>

From the idea you have to extract:

1. The section Title
2. The section depth 
3. What should be the section content

<section>
Write the corresponding section here
</section>
{{/readme}}
{{^readme}}
The file must contain the following sections:

- Description
- Installation
- Usage
- Examples
{{/readme}}
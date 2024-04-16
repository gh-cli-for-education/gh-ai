# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## {{name}} Function 

Use the following *description* as guide to generate the corresponding code.

```
{{description}}
```
{{#params.length}}

### Parameters

The function receives the following parameters:

{{#params}}
{{functionParametersParaser}}
{{/params}}
{{/params.length}}
{{#orderList.length}}

### Code Steps

Follow the list step by step and make sure to **Generate the corresponding code**

{{#orderList}}

<step>
{{.}}
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>

{{/orderList}}
{{/orderList.length}}
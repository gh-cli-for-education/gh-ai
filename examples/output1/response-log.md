# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

## File gh-poi

### Petition general idea of gh-poi.

```md
# File gh-poi

# Description of what you have to do

Given the following *description* your job is to generate code based on what you are going to read inside the *description tag*.

<description>
This gh extension determines which local branches have been merged and safely deletes them.
Daily development makes it difficult to know which branch is active when there are many unnecessary branches left locally
If you squash merge a pull request, there is no history of the merge to the default branch, so you have to force delete the branch to clean it up, and you have to be careful not to accidentally delete the active branch.
</description>

In addition to the *description* the program **must** necessarily **contain** the **following functions**:

- get_local_branches
- isFullyMerged
- mark_branches
- delete_branches

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

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition main and help functions of gh-poi.

```md
# Code expansion

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following sections.

## Main Function
Add to *previously generated code* a **new** **main function** whose purpose is to *parse the command line*, the code must process the possible parameters and arguments the code should be able to receive. Depending on the readed information *the function should execute the corresponding action* associated to that specific parameter.

In case there was already a main function parsing the command line you must overwrite the previous one.

### Parameters supported by the program

The parameters the program must support are: 

-v  Output the program version number
-h  Execute the program *help function*
--dry-run  Check what branches are going to be deleted without actually deleting them
--debug  Enable debug logs
--protect  Protect a <branchname> from deletion. It is possible to pass multiple branches
--unprotect  Unprotect a <branchname> local branch. It is possible to pass multiple branches

**You must add this arguments to the command line processing code inside the main function**

## Help function 

If the `-h, --help` parameter has not been specified you must add it to the processing, in that case it has to execute the **help function**.

What the said function `help` have to do is *print useful information to the user*. **You have to code the function to print the information**
It must be printed in the following order: 

- Print the `Usage` containing: **gh poi <command> [options]**.
- Print the help information *header* that contains the following information:

Delete the merged local branches

- Print a list with all the previous parameters listed above in the *Parameters section*. 
- Print the help information *footer* that contains the following information:

The program will stop execution if an unkown command is passed from the command line
- Once all the information is printed the program must finish execution.

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition get_local_branches of gh-poi.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## get_local_branches Function 

Use the following *description* as guide to generate the corresponding code.

```
This function must call Github API using the Github CLI tool `gh api` to make a GraphQL query to *retreive* information of the *pull request status*. 
```

### Code Steps

Follow the list step by step and make sure to **Generate the corresponding code**


<step>
GraphQL query to retreive the pull request status of the current repository local branches
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


<step>
Return query result
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition isFullyMerged of gh-poi.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## isFullyMerged Function 

Use the following *description* as guide to generate the corresponding code.

```
branch: object

pr: object

Checks if the input branch is fully merged, it checks if the pull request state is `Merged` and if the branch doesn't have any Commit ahead of the main branch
```

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition mark_branches of gh-poi.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## mark_branches Function 

Use the following *description* as guide to generate the corresponding code.

```
branches: object

Traverse the branches array, calling the function `isFullyMerged` to check if the branch is fully merged, it also check if the branch is protected or not.
```

### Code Steps

Follow the list step by step and make sure to **Generate the corresponding code**


<step>
Traverse the branches array.
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


<step>
call isFullyMerged with each branch inside the array.
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


<step>
If isFullyMerged and the branch is not protected, mark it as `deletable`
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


<step>
Else mark it as `noDeletable`
</step>

<code>
Put here the gerated code using the content from the *step tag* as a guide.
</code>


```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition delete_branches of gh-poi.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## delete_branches Function 

Use the following *description* as guide to generate the corresponding code.

```
This function must delete all the branches that are marked as `deletable`, for each deleted branch the program must print a log with the deleted branch name and a message indicating that has been deleted.
```

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition post processing of gh-poi.

```md
# Code improvement 

Using the *previously generated code* you have to make some final modification to it. 

## Error checking

**Check** the *previously generated code* to correct any syntax or semantic **error**.

## Comments

**Write quality comments** so that anyone is able to understand the generated.

## Coding style Checking 

**Check** if the *previously generated code* is formatted under the Google's coding style for JavaScript.

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Petition gh-poi file generation.

```md
# File generation 

**Generate** a new **file** called **gh-poi** whose content is all the **last** *previously generated code* using the **generate_file* tool.
```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Total Usage

Total tokens used to generate the file: **0**.
Total tokens used by the gh-ai generated prompts: **0**.  
Total tokens used by the LLM to generate the answer: **0**.

## File Readme

### Petition Readme file generation

```md
# Creation of a `README.md` file

To conclude this conversation the last thing to write is a `README.md` file. This file must contain enough information to satisfy any use doubts.
Make sure to include information that agrees with what was *previusly generated*.

The file must contain the following sections:

- Description
- Installation
- Usage
- Examples

```

#### Assistant Response



#### Petition Usage

Total tokens used: ****
Tokens used by the gh-ai generated prompt: ****.  
Tokens used by the LLM to generate the answer: ****.

### Total Usage

Total tokens used to generate the file: **0**.
Total tokens used by the gh-ai generated prompts: **0**.  
Total tokens used by the LLM to generate the answer: **0**.


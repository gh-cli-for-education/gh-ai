# chatSettings 

- language: english

# Extension

## MainFile gh-branch  

gh-branch is a Github CLI extension whose purpose is to display an interactive branch switcher listing local branches in relation of the pull request in the repository.
The selected branch is checked out.

### function list_branches 

this function should let the user: switch, delete and list all the local brances of a repository.
This function depends on fzf as a fuzzy finder. 
The function use the gh api command to make a GraphQL query to extract information from Github APIv4

1. Check if fzf is installed.
2. If fzf is not installed echo an error and exit the program.
3. If fzf is installed make a query with gh api that take a node from GraphQL with number, author, state and headRefName.
4. With the information extracted from the API implement the Switch between branches.
5. With the information extracted from the API implement the Delete branch.  
6. In case the parameter `--static` is active list all branches and exit the program.
7. The branches should have a different color depending on the pull request state and the author.login

### help

### Usage gh branch [options]

This is suppose to be a header paragraph

### Parameters

-  -v       Output the program version number
-  -h       Execute the program *help function*
-  --static Print a non-interactive list of branches 

Here Can be some footer paragraphs

## LanguageSettings

- language: Bash
- Style: Google

## Examples 

`gh branch`

```console
foo@bar:~$ gh branch --static
- inproving-parser
- markdown-like-parser
- inproving-api-call
```

## readme

1. Write how to **install** th gh-branch extension using the Github CLI program.
2. Write the **help** and usage of the gh-branch extension.
3. Write some **examples** of use.

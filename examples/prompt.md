# Extension

## MainFile gh-branch  

gh-branch is a Github CLI extension whose purpose is to display an interactive branch switcher listing local branches in relation of the pull request in the repository.
The selected branch is checked out.

The extension should be able to let the user: 

+ **Switch** between branches.
+ **Delete** branches.
+ **List** all branches of a repository.

This extension **depends on fzf** as a fuzzy finder, make sure to check if the user has installed fzf,  in case it doesn't echo an error and exit the program.

The extension should use the gh api command, making a graphQL query asking for the pull requests of an specific repository.

That query should take a node with:

* number
* author
* state
* headRefName

with that information you should be able to print a list of branches that contains the *headRefName* followed by the *number*, the *number* should have a different color depeding on the pull request *state* and the the *author.login*.

### functions 

```js 
/**
 * Help function that prints the arguments and parameters of the extension 
 */
function help() {
  // print header
  
  // print Arguments
  
  // print parameters
  
  // print footer
}
```

### help

usage: gh branch [options]

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

# ChatSettings 

- language: english 

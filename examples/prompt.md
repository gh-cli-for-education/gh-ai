# Extension gh-branch

## MainFile gh-branch <p> 

gh-branch is a Github CLI extension whose purpose is to display an interactive branch switcher listing local branches in relation of the pull request in the repository.
The selected branch is checked out.

The extension should be able to let the user: 

1. **Switch** between branches.
2. **Delete** branches.
3. **List** all branches of a repository.

This extension **depends on fzf** as a fuzzy finder, make sure to check if the user has installed fzf,  in case it doesn't echo an error and exit the program.

The extension should use the gh api command, making a graphQL query asking for the pull requests of an specific repository.

That query should take a node with:

  - number,
  - author
  - state
  - headRefName

with that information you should be able to print a list of branches that contains the *headRefName* followed by the *number*, the *number* should have a different color depeding on the pull request *state* and the the *author.login*.

</p>

### Parameters

-  -v       <p> Output the program version number </p>
-  -h       <p> Execute the program *help function* </p>
-  --static <p> Print a non-interactive list of branches </p> 

### Help "gh branch [options]" <p> 

Usage: gh branch [options]

-v       Output the program version number
-h       Execute the program *help function*
--static Print a non-interactive list of branches

</p>

## LanguageSettings

- language: Bash
- Style: Google

## Examples 

- "gh branch" <p> 
```console
foo@bar:~$ gh branch --static
- inproving-parser
- markdown-like-parser
- inproving-api-call
```
</p>

# ChatSettings 
 - language: english 

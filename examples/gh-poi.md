# chatSettings 

- language: english

# Extension

## MainFile gh-poi  

This gh extension determines which local branches have been merged and safely deletes them.

Daily development makes it difficult to know which branch is active when there are many unnecessary branches left locally

If you squash merge a pull request, there is no history of the merge to the default branch, so you have to force delete the branch to clean it up, and you have to be careful not to accidentally delete the active branch.

### function get_local_branches

This function must call Github API using the Github CLI tool `gh api` to make a GraphQL query to *retreive* information of the *pull request status*. 

1. GraphQL query to retreive the pull request status of the current repository local branches
2. Return query result

### function isFullyMerged

branch: object
pr: object

Checks if the input branch is fully merged, it checks if the pull request state is `Merged` and if the branch doesn't have any Commit ahead of the main branch

### function mark_branches

branches: object

Traverse the branches array, calling the function `isFullyMerged` to check if the branch is fully merged, it also check if the branch is protected or not.

1. Traverse the branches array.
2. call isFullyMerged with each branch inside the array.
3. If isFullyMerged and the branch is not protected, mark it as `deletable`
4. Else mark it as `noDeletable`

### function delete_branches

This function must delete all the branches that are marked as `deletable`, for each deleted branch the program must print a log with the deleted branch name and a message indicating that has been deleted.

### help

### Usage gh poi <command> [options]

Delete the merged local branches

### Parameters

-  -v           Output the program version number
-  -h           Execute the program *help function*
-  --dry-run    Check what branches are going to be deleted without actually deleting them
-  --debug      Enable debug logs
-  --protect    Protect a <branchname> from deletion. It is possible to pass multiple branches
-  --unprotect  Unprotect a <branchname> local branch. It is possible to pass multiple branches

The program will stop execution if an unkown command is passed from the command line

## LanguageSettings

- language: JavaScript
- Style: Google

## Examples 

`gh branch; gh poi; gh branch`

```console
foo@bar:~$ gh branch
- inproving-parser
- markdown-like-parser
- inproving-api-call
- main

foo@bar:~$ gh poi
# Fetching pull requests...
# Deleting Branches...

foo@bar:~$ gh branch
- inproving-api-call
- main
```

## readme

1. Write how to **install** th gh-poi extension using the Github CLI program.
2. Write the **help** and usage of the gh-poi extension.
3. Write some **examples** of use `Don't use any provided example from the prompt`.

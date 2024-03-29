## gh-branch

### Description

**gh-branch** is a Github CLI extension that allows users to interactively switch branches, delete branches, and list all branches of a repository based on the pull requests.

### Installation

Make sure you have the following prerequisites:
- Github CLI installed
- fzf installed

To install the extension, download the 'gh-branch.sh' script and place it in a directory included in your PATH.

### Usage

```bash
gh branch [options]

-v       Output the program version number
-h       Execute the program help function
--static Print a non-interactive list of branches
```

### Examples

#### Example 1: Switch Branch
```bash
gh branch
# Interactive branch switcher
```
#### Example 2: List Branches
```bash
gh branch --static
# Non-interactive list of branches
```

```js functions 
/*
you can put here any kind of comment as the function description   
*/
function name(param1, param2, param3) {
  // Each comment is suppose to be a "requirement"

  // Example: Initialize a matrix 
}
```

now I want you to add more functionalities to the already written code.

<code>
```js 
/**
 * This function should use the fzf program to let the user interact with a list of 
 * branches, those branches are found by searching in the github API using GraphQL and the github command line interface program
 * 
 * The list of branches should contain the branch's author, number, pull request status and the headRefName
 */
function interactiveWithListOfBranches() {

  // Check if fzf is installed, if not log a error an exit the program

  // Make the Query
  
  // Show the interactive list
}
```
</code>
# GitHub CLI Extension - gh-poi

## Description
This GitHub CLI extension helps determine which local branches have been merged and safely deletes them. It aims to simplify the process of cleaning up unnecessary local branches left after daily development, especially after squash merging pull requests without history to the default branch.

## Installation
1. Ensure you have GitHub CLI installed on your system.
2. Clone this repository to your local machine.
3. Run `npm install` to install any required dependencies.

## Usage
- Run the command `gh poi <command> [options]` to interact with the extension.

## Examples
- To view the version number:
  ```
  gh poi -v
  ```
- To execute the help function:
  ```
  gh poi -h
  ```
- To perform a dry run to check branches to be deleted:
  ```
  gh poi --dry-run
  ```
- To enable debug logs:
  ```
  gh poi --debug
  ```
- To protect a branch from deletion:
  ```
  gh poi --protect <branchname>
  ```
- To unprotect a branch previously protected:
  ```
  gh poi --unprotect <branchname>
  ```

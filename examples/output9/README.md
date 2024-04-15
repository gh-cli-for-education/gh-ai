# Github CLI Extension - gh-branch

## Overview
This Github CLI extension, `gh-branch`, allows users to interactively switch, delete, and list local branches of a repository. It leverages fzf as a fuzzy finder and utilizes the gh api command to make GraphQL queries to extract information from Github APIv4.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Functions](#functions)
- [Contributing](#contributing)

## Installation
Provide instructions on how to install and set up the `gh-branch` Github CLI extension.

## Usage
Guide users on how to use the extension, including command line options and parameters.

## Functions
### List Branches

- The `list_branches` function allows users to switch, delete, and list all local branches of a repository interactively.

### Interactive Branch Switcher

- The `gh_branch_interactive` function displays an interactive branch switcher for users to select branches in relation to pull requests in the repository.

### Main Function

- The `main` function parses command line arguments and executes the corresponding actions based on user input.

### Help Function

- The `help` function provides information about the program and its usage.

## Contributing
Include guidelines for contributors, how they can contribute to the project, and how to submit changes.
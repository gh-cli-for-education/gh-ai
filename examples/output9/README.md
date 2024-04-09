# Github CLI Extension - gh-branch

## Overview
This Github CLI Extension, `gh-branch`, provides a convenient interactive branch switcher that lists local branches in relation to the pull request in the repository. Users can select a branch to be checked out.

## Features
- Switch, delete, and list all local branches of a repository
- Interactive branch selection using a fuzzy finder tool
- Making GraphQL queries to Github APIv4 using `gh api` command

## Usage
To use this extension, follow these steps:

1. Ensure you have `fzf` installed as the fuzzy finder tool.
2. Run the `gh_branch` command in your Github repository to access the interactive branch switcher.

## Example
```bash
gh_branch
```

## Dependencies
- `fzf` - Fuzzy Finder Tool
- Github CLI tool (`gh`) for API communication

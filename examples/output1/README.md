# GitHub CLI Extension: gh-branch

## Description
gh-branch is a GitHub CLI extension that allows users to interactively switch between branches, delete branches, and list all branches of a repository based on the pull requests. It utilizes fzf as a fuzzy finder and integrates with the GitHub API to fetch pull request details for branch management.

## Installation
To use the gh-branch extension, ensure that you have fzf installed on your system. You can install fzf by following the instructions on the [fzf GitHub repository](https://github.com/junegunn/fzf).

## Usage
Execute the following command to use the gh-branch extension:

```
gh branch [options]
```

- **-v**: Output the program version number
- **-h**: Execute the program help function
- **--static**: Print a non-interactive list of branches

## Examples

### Example 1: Switch Between Branches

```bash
gh branch
```

### Example 2: List All Branches

```bash
gh branch --static
```

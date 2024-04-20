# GitHub Branch Cleanup CLI (gh-poi)

## Description

This GitHub CLI extension helps determine which local branches have been merged and safely deletes them. It utilizes the GitHub API to fetch pull request status information and checks if branches are fully merged before deletion.

## Installation

Make sure you have the GitHub CLI installed.

To install this extension, clone the repository and run the following command:

```bash
gh extension install ./gh-poi
```

## Usage

Use the following command to delete merged local branches:

```bash
gh poi
```

Additional options:
- `-v`: Output the program version number
- `-h`: Execute the program help function
- `--dry-run`: Check what branches are going to be deleted without actually deleting them
- `--debug`: Enable debug logs
- `--protect <branchname>`: Protect a <branchname> from deletion
- `--unprotect <branchname>`: Unprotect a <branchname> local branch

## Examples

1. Basic usage: Delete merged local branches
```bash
gh poi
```

2. Protect a branch from deletion
```bash
gh poi --protect feature-branch
```

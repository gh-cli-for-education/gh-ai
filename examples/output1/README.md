# gh-poi

## Description

This extension allows you to determine and delete merged local branches. It helps in keeping your local branches clean by identifying branches that have been merged and safely deleting them.

Daily development can lead to multiple unnecessary branches left locally, making it hard to manage. This extension simplifies the process by identifying which branches are ready for deletion.

## Installation

1. Clone the repository to your local machine.
2. Ensure you have the Github CLI tool 'gh' installed.
3. Run the extension script by executing `node gh-poi.js` in the terminal.

## Usage

- Use the command line options to execute different functionalities of the extension.
- Follow the instructions for protecting and unprotecting branches to prevent accidental deletions.

## Examples

### Get Version Number

```bash
node gh-poi.js -v
```

### Run Help Function

```bash
node gh-poi.js -h
```

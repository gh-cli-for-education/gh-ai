# ChatSettings

- language: english

# Extension gh-cpissues

gh-cpissues is an extension of the Github Command Line Interface (Github CLI) whose purpose is to  to copy GitHub Issues from one repository to another based on a specified label.

The program has a **Prerequisite**: 

+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed. The script uses the Github CLI `gh` program to interact to interact with Github repositories. The issues are copied with the same title and body, if an issue with the same title already exists in the target repository, it won't be copied again.
+ It is necessary to have `js installed`, so the program is able to execute it.

This is a small and uncomplete skeleton that you should use as a guide for generating the code.

```bash 

main() {
  # Check `Prerequisites`
  # Processes the command line and activates the different flags specified in the help function section. 
  # Call help function if no paramater is given
  # Echo an error if an unknown command is parsed
  # Check if the <git-repo> and and the <label> variables are assigned, if not echo an error and exit the program
}

```

## LanguageSettings

- language: bash
- style: Google

## function copy_issues

The first thing the function should do is check if Git is installed. If it is, it should save the root of the **current repository** as `current_repo_root` and the current commit it is on. Then, it should inform the user that issues with the label `label` will be copied from `git_repo` to the **current repository**.

To obtain the issues, the appropriate **`gh` command is executed** to list all issues from `git_repo` with the label `label`, extracting them as JSON and saving them in a variable. If this JSON file is empty, the function should inform the user that there are no issues with the label `label` in `git_repo`.

For each line in the JSON file (using the `jq` command), the function should: Extract the `title` of the issue and *check if it does not already exist in the current repository*. If it does, inform the user that it already exists and discard the issue. Otherwise, create a new issue with the same `title` and `content`.

## help

### usage gh-cpissues <git-repo> --label <label> [--verbose]

### Arguments 

- git-repo  The target repository in the format `"<owner>/<repository>"` (Modifies the value of the variable `git_repo`).

### Parameters 

- --label Specify the <label> of the issue to copy (Modifies the value of the variable `label`).
- --verbose Activates the verbose execution and will keep the .tmp and .json file. (Activates the `verbose` flag).

# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

## File gh-cpissues

### Petition general idea of gh-cpissues.

# File gh-cpissues

# Description of what you have to do

Given the following *description* your job is to generate code based on what you are going to read inside the *description tag*.

<description>
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

</description>

In addition to the *description* the program **must** necessarily **contain** the **following functions**:

- copy_issues

## **Rules** you **must follow**:

- Make sure to generate a simple approach, implementing the most important ideas that you have been able to extract from the *description*. 
- The code must be easy to base and expand on for future improvements.
- Make sure to adress the *description* goals and rules. 

## Outputs

<Code>
Put here your generated code
</Code>

<requirements>
Write here a list of the most important ideas you have been able to extract from the *description*.
</requirements>


#### Assistant Response

# File gh-cpissues

```bash 
#!/bin/bash

# Function to copy GitHub issues from one repository to another based on a specified label
copy_issues() {
  local source_repo=$1
  local target_repo=$2
  local label=$3

  # Check if source repo, target repo, and label are provided
  if [ -z "$source_repo" ] || [ -z "$target_repo" ] || [ -z "$label" ]; then
    echo "Error: Source repository, target repository, and label must be provided."
    exit 1
  fi

  # Check if gh is installed
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this script."
    exit 1
  fi

  # Check if js is installed
  if ! command -v js &> /dev/null; then
    echo "Error: js is not installed. Please install it before running this script."
    exit 1
  fi

  # Verify if the source repository and target repository exist
  gh repo view $source_repo &> /dev/null
  gh repo view $target_repo &> /dev/null

  if [ $? -ne 0 ]; then
    echo "Error: Source repository or target repository does not exist."
    exit 1
  fi

  # Copy issues with the specified label
  issues=$(gh issue list -R $source_repo -l "$label" --json title,body)

  for row in $(echo "${issues}" | jq -r '.[] | @base64'); do
    _jq() {
      echo ${row} | base64 --decode | jq -r ${1}
    }

    issue_title=$(_jq '.title')
    issue_body=$(_jq '.body')

    # Check if issue already exists in target repository
    gh issue list -R $target_repo --json title | grep -q "\"$issue_title\""

    if [ $? -ne 0 ]; then
      gh issue create -R $target_repo -t "$issue_title" -b "$issue_body" -l "$label"
      echo "Issue '$issue_title' copied successfully."
    else
      echo "Issue '$issue_title' already exists in the target repository. Skipped."
    fi
  done

  echo "Copying issues with label '$label' from $source_repo to $target_repo completed."
}

main() {
  copy_issues "$1" "$2" "$3"
}

# Check Prerequisites
# Check `Prerequisites`
# Processes the command line and activates the different flags specified in the help function section. 
# Call help function if no paramater is given
# Echo an error if an unknown command is parsed
# Check if the <git-repo> and and the <label> variables are assigned, if not echo an error and exit the program

main "$@"

```

<requirements>
- Copy GitHub issues from one repository to another based on a specified label.
- Verify that Github CLI (gh) and js are installed.
- Verify that source repository, target repository, and label are provided.
- Copy issues with the same title and body, skip ones that already exist in the target repository.
</requirements>

#### Petition Usage

Total tokens used: **2000**
Tokens used by the gh-ai generated prompt: **1309**.  
Tokens used by the LLM to generate the answer: **691**.

### Petition main and help functions of gh-cpissues.

```md
# Code expansion

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following sections.

## Main Function
Add to *previously generated code* a **new** **main function** whose purpose is to *parse the command line*, the code must process the possible parameters and arguments the code should be able to receive. Depending on the readed information *the function should execute the corresponding action* associated to that specific parameter.

In case there was already a main function parsing the command line you must overwrite the previous one.

### Arguments supported by the program 

The arguments the program must support are:

git-repo The target repository in the format `"<owner>/<repository>"` (Modifies the value of the variable `git_repo`).

**You must add this arguments to the command line processing code inside the main function**

### Parameters supported by the program

The parameters the program must support are: 

--label  Specify the <label> of the issue to copy (Modifies the value of the variable `label`).
--verbose  Activates the verbose execution and will keep the .tmp and .json file. (Activates the `verbose` flag).

**You must add this arguments to the command line processing code inside the main function**

## Help function 

If the `-h, --help` parameter has not been specified you must add it to the processing, in that case it has to execute the **help function**.

What the said function `help` have to do is *print useful information to the user*. **You have to code the function to print the information**
It must be printed in the following order: 

- Print the `Usage` containing: **gh-cpissues <git-repo> --label <label> [--verbose]**.
- Print a list with all the previous arguments listed above in the *Arguments section*. 
- Print a list with all the previous parameters listed above in the *Parameters section*. 
- Once all the information is printed the program must finish execution.

```

#### Assistant Response

```bash
#!/bin/bash

# Function to copy GitHub issues from one repository to another based on a specified label
copy_issues() {
  local source_repo=$1
  local target_repo=$2
  local label=$3

  # Check if source repo, target repo, and label are provided
  if [ -z "$source_repo" ] || [ -z "$target_repo" ] || [ -z "$label" ]; then
    echo "Error: Source repository, target repository, and label must be provided."
    exit 1
  fi

  # Check if gh is installed
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this script."
    exit 1
  fi

  # Check if js is installed
  if ! command -v js &> /dev/null; then
    echo "Error: js is not installed. Please install it before running this script."
    exit 1
  fi

  # Verify if the source repository and target repository exist
  gh repo view $source_repo &> /dev/null
  gh repo view $target_repo &> /dev/null

  if [ $? -ne 0 ]; then
    echo "Error: Source repository or target repository does not exist."
    exit 1
  fi

  # Copy issues with the specified label
  issues=$(gh issue list -R $source_repo -l "$label" --json title,body)

  for row in $(echo "${issues}" | jq -r '.[] | @base64'); do
    _jq() {
      echo ${row} | base64 --decode | jq -r ${1}
    }

    issue_title=$(_jq '.title')
    issue_body=$(_jq '.body')

    # Check if issue already exists in target repository
    gh issue list -R $target_repo --json title | grep -q "\"$issue_title\""

    if [ $? -ne 0 ]; then
      gh issue create -R $target_repo -t "$issue_title" -b "$issue_body" -l "$label"
      echo "Issue '$issue_title' copied successfully."
    else
      echo "Issue '$issue_title' already exists in the target repository. Skipped."
    fi
  done

  echo "Copying issues with label '$label' from $source_repo to $target_repo completed."
}

# Function to display help information
help() {
  echo "Usage: gh-cpissues <git-repo> --label <label> [--verbose]"
  echo "Arguments:"
  echo "  git-repo     The target repository in the format '<owner>/<repository>'"
  echo "Parameters:"
  echo "  --label      Specify the <label> of the issue to copy"
  echo "  --verbose    Activates the verbose execution and will keep the .tmp and .json file"
  exit 0
}

main() {
  # Parse command line arguments
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -h|--help)
        help
        ;;
      --label)
        label=$2
        shift
        ;;
      --verbose)
        verbose=true
        ;;
      *)
        git_repo=$1
        ;;
    esac
    shift
  done

  # Check prerequisites
  if [ -z "$git_repo" ] || [ -z "$label" ]; then
    echo "Error: Required arguments missing. Use -h or --help for usage."
    exit 1
  }

  copy_issues "$git_repo" "$label"
}

main "$@"
```

#### Petition Usage

Total tokens used: **3213**
Tokens used by the gh-ai generated prompt: **2442**.  
Tokens used by the LLM to generate the answer: **771**.

### Petition copy_issues of gh-cpissues.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## copy_issues Function 

Use the following *description* as guide to generate the corresponding code.

```
The first thing the program should do is check if Git is installed. If it is, it should save the root of the **current repository** as `current_repo_root` and the current commit it is on. Then, it should inform the user that issues with the label `label` will be copied from `git_repo` to the **current repository**.

To obtain the issues, the appropriate **`gh` command is executed** to list all issues from `git_repo` with the label `label`, extracting them as JSON and saving them in a variable. If this JSON file is empty, the program should inform the user that there are no issues with the label `label` in `git_repo`.

For each line in the JSON file (using the `jq` command), the program should: Extract the `title` of the issue and *check if it does not already exist in the current repository*. If it does, inform the user that it already exists and discard the issue. Otherwise, create a new issue with the same `title` and `content`.

```

```

#### Assistant Response

```bash
#!/bin/bash

# Function to copy GitHub issues from one repository to the current repository based on a specified label
copy_issues() {
  local source_repo=$1
  local target_repo=$2
  local label=$3

  # Check if source repo, target repo, and label are provided
  if [ -z "$source_repo" ] || [ -z "$target_repo" ] || [ -z "$label" ]; then
    echo "Error: Source repository, target repository, and label must be provided."
    exit 1
  fi

  # Check if gh is installed
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this script."
    exit 1
  fi

  # Check if git is installed
  if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install it before running this script."
    exit 1
  fi

  # Save the root of the current repository
  current_repo_root=$(git rev-parse --show-toplevel)
  current_commit=$(git rev-parse HEAD)

  echo "Copying issues with label '$label' from $source_repo to the current repository."

  # Get issues with the specified label from source repository
  issues=$(gh issue list -R $source_repo -l "$label" --json title,body)

  if [ -z "$issues" ]; then
    echo "No issues with label '$label' found in $source_repo."
  else
    for row in $(echo "${issues}" | jq -r '.[] | @base64'); do
      _jq() {
        echo ${row} | base64 --decode | jq -r ${1}
      }

      issue_title=$(_jq '.title')
      issue_body=$(_jq '.body')

      # Check if issue already exists in the current repository
      if ! gh issue list --json title | grep -q "\"$issue_title\""; then
        gh issue create -t "$issue_title" -b "$issue_body" -l "$label"
        echo "Issue '$issue_title' copied successfully to the current repository."
      else
        echo "Issue '$issue_title' already exists in the current repository. Skipped."
      fi
    done
  fi

  echo "Copying issues with label '$label' from $source_repo to the current repository completed."
}

# Function to display help information
help() {
  echo "Usage: gh-cpissues <git-repo> --label <label> [--verbose]"
  echo "Arguments:"
  echo "  git-repo     The target repository in the format '<owner>/<repository>'"
  echo "Parameters:"
  echo "  --label      Specify the <label> of the issue to copy"
  echo "  --verbose    Activates the verbose execution and will keep the .tmp and .json file"
  exit 0
}

main() {
  # Parse command line arguments
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -h|--help)
        help
        ;;
      --label)
        label=$2
        shift
        ;;
      --verbose)
        verbose=true
        ;;
      *)
        git_repo=$1
        ;;
    esac
    shift
  done

  # Check prerequisites
  if [ -z "$git_repo" ] || [ -z "$label" ]; then
    echo "Error: Required arguments missing. Use -h or --help for usage."
    exit 1
  }

  copy_issues "$git_repo" "$label"
}

main "$@"
```

#### Petition Usage

Total tokens used: **4282**
Tokens used by the gh-ai generated prompt: **3505**.  
Tokens used by the LLM to generate the answer: **777**.

### Petition post processing of gh-cpissues.

```md
# Code improvement 

Using the *previously generated code* you have to make some final modification to it. 

## Error checking

**Check** the *previously generated code* to correct any syntax or semantic **error**.

## Comments

**Write quality comments** so that anyone is able to understand the generated.

## Coding style Checking 

**Check** if the *previously generated code* is formatted under the Google's coding style for bash.

```

#### Assistant Response

```bash
#!/bin/bash

# Function to copy GitHub issues from one repository to the current repository based on a specified label
copy_issues() {
  local source_repo=$1
  local target_repo=$2
  local label=$3

  # Check if source repo, target repo, and label are provided
  if [ -z "$source_repo" ] || [ -z "$target_repo" ] || [ -z "$label" ]; then
    echo "Error: Source repository, target repository, and label must be provided."
    exit 1
  fi

  # Check if gh is installed
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this script."
    exit 1
  fi

  # Check if git is installed
  if ! command -v git &> /dev/null; then
    echo "Error: Git is not installed. Please install it before running this script."
    exit 1
  fi

  # Save the root of the current repository
  current_repo_root=$(git rev-parse --show-toplevel)
  current_commit=$(git rev-parse HEAD)

  echo "Copying issues with label '$label' from $source_repo to the current repository."

  # Get issues with the specified label from source repository
  issues=$(gh issue list -R $source_repo -l "$label" --json title,body)

  if [ -z "$issues" ]; then
    echo "No issues with label '$label' found in $source_repo."
  else
    for row in $(echo "${issues}" | jq -r '.[] | @base64'); do
      _jq() {
        echo ${row} | base64 --decode | jq -r ${1}
      }

      issue_title=$(_jq '.title')
      issue_body=$(_jq '.body')

      # Check if issue already exists in the current repository
      if ! gh issue list --json title | grep -q "\"$issue_title\""; then
        gh issue create -t "$issue_title" -b "$issue_body" -l "$label"
        echo "Issue '$issue_title' copied successfully to the current repository."
      else
        echo "Issue '$issue_title' already exists in the current repository. Skipped."
      fi
    done
  fi

  echo "Copying issues with label '$label' from $source_repo to the current repository completed."
}

# Function to display help information
help() {
  echo "Usage: gh-cpissues <git-repo> --label <label> [--verbose]"
  echo "Arguments:"
  echo "  git-repo     The target repository in the format '<owner>/<repository>'"
  echo "Parameters:"
  echo "  --label      Specify the <label> of the issue to copy"
  echo "  --verbose    Activates the verbose execution and will keep the .tmp and .json file"
  exit 0
}

main() {
  # Parse command line arguments
  while [ "$#" -gt 0 ]; do
    case "$1" in
      -h|--help)
        help
        ;;
      --label)
        label=$2
        shift
        ;;
      --verbose)
        verbose=true
        ;;
      *)
        git_repo=$1
        ;;
    esac
    shift
  done

  # Check prerequisites
  if [ -z "$git_repo" ] || [ -z "$label" ]; then
    echo "Error: Required arguments missing. Use -h or --help for usage."
    exit 1
  fi

  copy_issues "$git_repo" "$label"
}

main "$@"
```

#### Petition Usage

Total tokens used: **5159**
Tokens used by the gh-ai generated prompt: **4381**.  
Tokens used by the LLM to generate the answer: **778**.

### Petition gh-cpissues file generation.

```md
# File generation 

**Generate** a new **file** called **gh-cpissues** whose content is all the **last** *previously generated code* using the **generate_file* tool.
```

#### Assistant Response

# File generated

The file *gh-cpissues* has been successfully generated with the provided code.

#### Petition Usage

Total tokens used: **5592**
Tokens used by the gh-ai generated prompt: **5570**.  
Tokens used by the LLM to generate the answer: **22**.

### Total Usage

Total tokens used to generate the file: **20246**.
Total tokens used by the gh-ai generated prompts: **17207**.  
Total tokens used by the LLM to generate the answer: **3039**.


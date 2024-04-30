# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

## File gh-rate-limit

### Petition general idea of gh-rate-limit.

```md
# File gh-rate-limit

# Description of what you have to do

Given the following *description* your job is to generate code based on what you are going to read inside the *description tag*.

<description>
gh-rate-limit is an extension of the Github Command Line Interface (Github CLI) whose purpose is to show the user their existing rate limits and when its resets. The program does exactly the same as executing the following command:
```bash
curl -fSsL -H "Authorization: token $(github_pat)" -X GET \
  https://api.github.com/rate_limit \
  | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
  | column -t
```
The program has some **Prerequisites** that are: 
+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed.
+ It is necessary to have `js installed`, so the program is able to execute it.
The program must use the *"X-GitHub-Api-Version: 2022-11-28"* version of the gh REST API and save it as a global variable inside the program. It also contains a HTTP header with the value *Accept: application/vnd.github+json* inside a global variable.
This is a small skeleton that you should use as a guide for generating the code.
```bash
help() {
  # Here goes all the program usage and the parameters and arguments list.
  # Exit the program with code 1
}

main () {
  # Processes the command line and activates the different flags specified in the main function section.
  # Check `Prerequisites`
}
```
Make sure the program is executable.
</description>

In addition to the *description* the program **must** necessarily **contain** the **following functions**:

- call

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

```

### Assistant Response

```bash
#!/bin/bash

X_GITHUB_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"

help() {
  echo "Usage: gh-rate-limit"
  echo "Shows the user their existing rate limits and when it resets."
  exit 1
}

# Function to verify if GitHub CLI (gh) is installed
check_gh_installed() {
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this program."
    exit 1
  fi
}

# Function to verify if jq is installed
check_jq_installed() {
  if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install it before running this program."
    exit 1
  fi
}

# Function to display rate limit
display_rate_limit() {
  if ! github_pat=$(gh auth status --show-token); then
    echo "Error: Github authentication token not found. Please authenticate with gh before running this program."
    exit 1
  fi
  
  rate_limit=$(curl -fSsL -H "Authorization: token $github_pat" -H "$ACCEPT_HEADER" -H "X-GitHub-Api-Version: $X_GITHUB_API_VERSION" -X GET \
    https://api.github.com/rate_limit \
    | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
    | column -t)
  
  echo "$rate_limit"
}

main() {
  check_gh_installed
  check_jq_installed
  display_rate_limit
}

main
```

<requirements>
- Verify if Github CLI (gh) is installed.
- Verify if jq is installed.
- Display the user's existing rate limits and when it resets.
- Use Github authentication token.
- Use the X-GitHub-Api-Version: 2022-11-28 header.
- Use the Accept: application/vnd.github+json header.
</requirements>
```

### Petition Usage

Total tokens used: **1875**
* Tokens used by the gh-ai generated prompt: **1404**.  
* Tokens used by the LLM to generate the answer: **471**.

### Petition main and help functions of gh-rate-limit.

```md
# Code expansion

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following sections.

## Main Function
Add to *previously generated code* a **new** **main function** whose purpose is to *parse the command line*, the code must process the possible parameters and arguments the code should be able to receive. Depending on the readed information *the function should execute the corresponding action* associated to that specific parameter.

In case there was already a main function parsing the command line you must overwrite the previous one.

### Parameters supported by the program

The parameters the program must support are: 

-u  Show the 'used' rather than 'remaining' limit (Activates the `usage` flag).
-h  Prints the help information of the program.

**You must add this arguments to the command line processing code inside the main function**

## Help function 

If the `-h, --help` parameter has not been specified you must add it to the processing, in that case it has to execute the **help function**.

What the said function `help` have to do is *print useful information to the user*. **You have to code the function to print the information**
It must be printed in the following order: 

- Print the `Usage` containing: **gh-rate-limit [options]**.

- Print a list with all the previous parameters listed above in the *Parameters section*. 
- Once all the information is printed the program must finish execution.

```

### Assistant Response

```bash
#!/bin/bash

X_GITHUB_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"
USAGE="Usage: gh-rate-limit [options]
Options:
  -u  Show the 'used' rather than 'remaining' limit
  -h  Prints the help information of the program"

help() {
  echo "$USAGE"
  exit 1
}

check_gh_installed() {
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this program."
    exit 1
  fi
}

check_jq_installed() {
  if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install it before running this program."
    exit 1
  fi
}

display_rate_limit() {
  if ! github_pat=$(gh auth status --show-token); then
    echo "Error: Github authentication token not found. Please authenticate with gh before running this program."
    exit 1
  fi
  
  rate_limit=$(curl -fSsL -H "Authorization: token $github_pat" -H "$ACCEPT_HEADER" -H "X-GitHub-Api-Version: $X_GITHUB_API_VERSION" -X GET \
    https://api.github.com/rate_limit \
    | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
    | column -t)
  
  echo "$rate_limit"
}

main() {
  while getopts ":uh" opt; do
    case ${opt} in
      u)
        display_rate_limit
        ;;
      h)
        help
        ;;
      \?)
        echo "Invalid option: -$OPTARG" 1>&2
        help
        ;;
    esac
  done
}

main "$@"
```

### Petition Usage

Total tokens used: **2643**
* Tokens used by the gh-ai generated prompt: **2204**.  
* Tokens used by the LLM to generate the answer: **439**.

### Petition call of gh-rate-limit.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## call Function 

Use the following *description* as guide to generate the corresponding code.

```
The function makes a call to the Github REST API using the `gh api` command, utilizing local variables as headers for the call. This function translates the content in the following code block, taking into account the `usage` flag to check the remaining or percentage of usage.

curl -fSsL -H "Authorization: token $(github_pat)" -X GET https://api.github.com/rate_limit | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' | column -t
```

```

### Assistant Response

```bash
call() {
  local endpoint="rate_limit"
  local method="GET"
  local headers="-H 'Authorization: token $(gh auth status --show-token)' -H '$ACCEPT_HEADER' -H 'X-GitHub-Api-Version: $X_GITHUB_API_VERSION'"

  if [[ $usage == true ]]; then
    jq_query='.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.used) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"'
  else
    jq_query='.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"'
  fi

  gh api -X $method $endpoint --headers $headers | jq --raw-output "$jq_query" | column -t
}
```

### Petition Usage

Total tokens used: **3067**
* Tokens used by the gh-ai generated prompt: **2856**.  
* Tokens used by the LLM to generate the answer: **211**.

### Petition post processing of gh-rate-limit.

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

### Assistant Response

```bash
#!/bin/bash

# Global variables
X_GITHUB_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"
USAGE="Usage: gh-rate-limit [options]
Options:
  -u  Show the 'used' rather than 'remaining' limit
  -h  Prints the help information of the program"

# Function to display usage information
help() {
  echo "$USAGE"
  exit 1
}

# Function to check if Github CLI (gh) is installed
check_gh_installed() {
  if ! command -v gh &> /dev/null; then
    echo "Error: Github CLI (gh) is not installed. Please install it before running this program."
    exit 1
  fi
}

# Function to check if jq is installed
check_jq_installed() {
  if ! command -v jq &> /dev/null; then
    echo "Error: jq is not installed. Please install it before running this program."
    exit 1
  fi
}

# Function to display rate limit
display_rate_limit() {
  if ! github_pat=$(gh auth status --show-token); then
    echo "Error: Github authentication token not found. Please authenticate with gh before running this program."
    exit 1
  fi
  
  rate_limit=$(curl -fSsL -H "Authorization: token $github_pat" -H "$ACCEPT_HEADER" -H "X-GitHub-Api-Version: $X_GITHUB_API_VERSION" -X GET \
    https://api.github.com/rate_limit \
    | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
    | column -t)
  
  echo "$rate_limit"
}

# Function to make a call to the Github REST API
call() {
  local endpoint="rate_limit"
  local method="GET"
  local headers="-H 'Authorization: token $(gh auth status --show-token)' -H '$ACCEPT_HEADER' -H 'X-GitHub-Api-Version: $X_GITHUB_API_VERSION'"
  
  if [[ $usage == true ]]; then
    jq_query='.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.used) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"'
  else
    jq_query='.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"'
  fi
  
  gh api -X $method $endpoint --headers $headers | jq --raw-output "$jq_query" | column -t
}

# Main function to parse command line options
main() {
  while getopts ":uh" opt; do
    case ${opt} in
      u)
        display_rate_limit
        ;;
      h)
        help
        ;;
      \?)
        echo "Invalid option: -$OPTARG" 1>&2
        help
        ;;
    esac
  done
}

# Check prerequisites
check_gh_installed
check_jq_installed

# Parse command line options
main "$@"
```

### Petition Usage

Total tokens used: **3890**
* Tokens used by the gh-ai generated prompt: **3164**.  
* Tokens used by the LLM to generate the answer: **726**.

### Petition gh-rate-limit file generation.

```md
# File generation 

**Generate** a new **file** called **gh-rate-limit** whose content is all the **last** *previously generated code* using the **generate_file* tool.
```

### Assistant Response

Done. I have generated the code for the `gh-rate-limit` file as per the requirements.

### Petition Usage

Total tokens used: **4331**
* Tokens used by the gh-ai generated prompt: **4310**.  
* Tokens used by the LLM to generate the answer: **21**.

### Total Usage

Total tokens used to generate the file: **15806**.
* Total tokens used by the gh-ai generated prompts: **13938**.  
* Total tokens used by the LLM to generate the answer: **1868**.


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
gh-notify is an extension of the Github Command Line Interface (Github CLI) whose purpose is to show the user their existing rate limits and when its resets. The program does exactly the same as executing the following command:
``
` bash
curl -fSsL -H "Authorization: token $(github_pat)" -X GET \
https://api.github.com/rate_limit \
| jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
| column -t
``
`
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
  # Execute the gh_api function with the value of the usage flag as argument.
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

#### Assistant Response

```bash
#!/bin/bash

# Global variables
GH_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"

help() {
  echo "Usage: gh-rate-limit [COMMAND]"
  echo "Command:"
  echo "    -h, --help    Show help and usage information"
  exit 1
}

check_prerequisites() {
  command -v gh >/dev/null 2>&1 || { echo >&2 "Github CLI (gh) is not installed. Please install it to proceed."; exit 1; }
  command -v jq >/dev/null 2>&1 || { echo >&2 "jq is not installed. Please install it to proceed."; exit 1; }
}

get_rate_limit() {
  gh api -X GET "rate_limit" --header "X-GitHub-Api-Version: $GH_API_VERSION" --header "$ACCEPT_HEADER" | jq '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S"))"' | column -t
}

# Main function
main() {
  check_prerequisites

  if [[ "$1" == "--help" || "$1" == "-h" ]]; then
    help
  else
    get_rate_limit
  fi
}

main "$@"
```

### Requirements:
- The program checks if Github CLI (gh) and jq are installed.
- The program uses the X-GitHub-Api-Version header with the specified version.
- The program makes a call to the `rate_limit` endpoint to get the rate limits.
- The program has a usage function and main function structure.
```

#### Petition Usage

Total tokens used: **3223**
Tokens used by the gh-ai generated prompt: **2842**.  
Tokens used by the LLM to generate the answer: **381**.

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

#### Assistant Response

```bash
#!/bin/bash

# Global variables
GH_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"

help() {
  echo "Usage: gh-rate-limit [COMMAND]"
  echo "Command:"
  echo "    -u  Show the 'used' rather than 'remaining' limit"
  echo "    -h, --help  Show help and usage information"
  exit 0
}

check_prerequisites() {
  command -v gh >/dev/null 2>&1 || { echo >&2 "Github CLI (gh) is not installed. Please install it to proceed."; exit 1; }
  command -v jq >/dev/null 2>&1 || { echo >&2 "jq is not installed. Please install it to proceed."; exit 1; }
}

get_rate_limit() {
  local keyType=".remaining"
  if [[ "$USAGE_FLAG" == "used" ]]; then
    keyType=".used"
  fi
  gh api -X GET "rate_limit" --header "X-GitHub-Api-Version: $GH_API_VERSION" --header "$ACCEPT_HEADER" | jq ".resources | to_entries[] | {name: .key} + .value | \"\(.name)  \(.resources.[0]$keyType)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S"))\"" | column -t
}

parse_arguments() {
  USAGE_FLAG="remaining"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -u)
        USAGE_FLAG="used"
        shift
        ;;
      -h|--help)
        help
        ;;
      *)
        echo "Invalid option: $1"
        help
        exit 1
        ;;
    esac
  done
}

# Main function
main() {
  check_prerequisites
  parse_arguments "$@"

  get_rate_limit
}

main "$@"
```

### Requirements:
- The program supports the `-u` flag to show the 'used' rather than 'remaining' limit.
- The program supports the `-h, --help` flag to show the help information.
- The program updates the `get_rate_limit` function to handle the `used` flag.

#### Petition Usage

Total tokens used: **2598**
Tokens used by the gh-ai generated prompt: **2125**.  
Tokens used by the LLM to generate the answer: **473**.

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

#### Assistant Response

```bash
# Remaining code from previous expansion...

call() {
  local keyType=".remaining"
  if [[ "$USAGE_FLAG" == "used" ]]; then
    keyType=".used"
  fi
  gh api -X GET "rate_limit" --header "X-GitHub-Api-Version: $GH_API_VERSION" --header "$ACCEPT_HEADER" | jq ".resources | to_entries[] | {name: .key} + .value | \"\(.name)  \(.resources.[0]$keyType)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S"))\"" | column -t
}

# Main function
main() {
  check_prerequisites
  parse_arguments "$@"

  call
}

main "$@"
```

### Requirements:
- The program now includes a `call` function that makes a call to the Github REST API using the `gh api` command.
- The `call` function uses local variables for headers and translates the curl command provided in the description.

#### Petition Usage

Total tokens used: **3026**
Tokens used by the gh-ai generated prompt: **2811**.  
Tokens used by the LLM to generate the answer: **215**.

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

#### Assistant Response

```bash
#!/bin/bash

# Global variables
GH_API_VERSION="2022-11-28"
ACCEPT_HEADER="Accept: application/vnd.github+json"

# Function to display usage information
help() {
  echo "Usage: gh-rate-limit [OPTIONS]"
  echo "Options:"
  echo "  -u           Show the 'used' rather than 'remaining' limit"
  echo "  -h, --help   Show help and usage information"
  exit 0
}

# Function to check prerequisites
check_prerequisites() {
  command -v gh > /dev/null 2>&1 || { echo >&2 "Github CLI (gh) is not installed. Please install it to proceed."; exit 1; }
  command -v jq > /dev/null 2>&1 || { echo >&2 "jq is not installed. Please install it to proceed."; exit 1; }
}

# Function to make the API call based on parameters
call() {
  local keyType=".remaining"
  if [[ "$USAGE_FLAG" == "used" ]]; then
    keyType=".used"
  fi

  gh api -X GET "rate_limit" \
    --header "X-GitHub-Api-Version: $GH_API_VERSION" \
    --header "$ACCEPT_HEADER" | 
    jq ".resources | to_entries[] | {name: .key} + .value | \"\(.name)  \(.resources.[0]$keyType)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S"))\"" | 
    column -t
}

# Function to parse command line arguments
parse_arguments() {
  USAGE_FLAG="remaining"
  while [[ $# -gt 0 ]]; do
    case "$1" in
      -u)
        USAGE_FLAG="used"
        shift
        ;;
      -h|--help)
        help
        ;;
      *)
        echo "Invalid option: $1"
        help
        exit 1
        ;;
    esac
  done
}

# Main function to control program flow
main() {
  check_prerequisites
  parse_arguments "$@"
  
  call
}

main "$@"
```

### Comments:
- Added comments for each function to explain their purpose.
- Comments are clear and concise for better understanding of the code flow.

### Code Style Checking:
The code follows the Google's coding style for bash, with proper indentation and readability.

#### Petition Usage

Total tokens used: **3628**
Tokens used by the gh-ai generated prompt: **3125**.  
Tokens used by the LLM to generate the answer: **503**.

### Petition gh-rate-limit file generation.

```md
# File generation 

**Generate** a new **file** called **gh-rate-limit** whose content is all the **last** *previously generated code* using the **generate_file* tool.
```

#### Assistant Response

I have successfully generated the file called "gh-rate-limit" with the last version of the code.

#### Petition Usage

Total tokens used: **4328**
Tokens used by the gh-ai generated prompt: **4307**.  
Tokens used by the LLM to generate the answer: **21**.

### Total Usage

Total tokens used to generate the file: **16803**.
Total tokens used by the gh-ai generated prompts: **15210**.  
Total tokens used by the LLM to generate the answer: **1593**.


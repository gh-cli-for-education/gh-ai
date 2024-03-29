#!/bin/bash

# Check if fzf is installed, if not, exit the program
if ! command -v fzf &> /dev/null
then
    echo "Error: fzf is not installed. Please install fzf to use this extension."
    exit 1
fi

# Function to handle the help function
function help_function() {
    echo "Usage: gh branch [options]"
    echo "
-v       Output the program version number"
    echo "-h       Execute the program help function"
    echo "--static Print a non-interactive list of branches"
}

# Parse command-line parameters
while [[ $# -gt 0 ]]
do
    key="$1"
    case $key in
        -v)
            # Output the program version number
            echo "gh-branch v1.0"
            ;;
        -h)
            # Execute the program help function
            help_function
            ;;
        --static)
            # Print a non-interactive list of branches
            git branch
            ;;
        *)
            echo "Invalid option: $1. Use -h for help."
            exit 1
            ;;
    esac
    shift
done

# Using gh API command to make a GraphQL query for pull requests
gh api graphql -f query='{repository(owner: "owner", name: "repo_name") {pullRequests(states: OPEN, first: 100) {nodes {number author {login} state headRefName}}}}'

# Parsing the GraphQL response to display branch information
# Your code to parse the response and format the branch list goes here

# Additional code for branch switching, deletion, and interactive branch listing can be added here

# This is the basic structure of the gh-branch Github CLI extension

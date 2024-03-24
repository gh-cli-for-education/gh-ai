# Bash script for the gh-branch Github CLI extension

#!/bin/bash

# Check if fzf is installed
if ! command -v fzf &> /dev/null
then
    echo "Error: fzf is not installed. Please install fzf to use this extension."
    exit 1
fi

# Function to display the help function
function display_help() {
    echo "Usage: gh branch [options]"
    echo "-v       Output the program version number"
    echo "-h       Execute the program help function"
    echo "--static Print a non-interactive list of branches"
}

# Parse command line options
while [[ "$1" == -* ]]; do
    case "$1" in
        -v)
            echo "gh-branch version 1.0"
            ;;
        -h)
            display_help
            ;;
        --static)
            # Print non-interactive list of branches
            # Add code here to print static list
            ;;
        *)
            echo "Invalid option: $1"
            display_help
            exit 1
            ;;
    esac
    shift
done

# Check if the user is in a git repository
if ! git rev-parse --is-inside-work-tree &>/dev/null
then
    echo "Error: Not in a Git repository"
    exit 1
fi

# Make a GraphQL query to get pull requests
# Add code here to make the GraphQL query with gh api command

# Display branches based on pull request information
# Add code here to display branches

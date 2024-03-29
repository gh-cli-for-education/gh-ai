#!/bin/bash

# Check if fzf is installed
if [[ ! -x "$(command -v fzf)" ]]; then
  echo "Error: fzf is not installed. Please install fzf to use this extension."
  exit 1
fi

# Function to display the help message
function display_help() {
  echo "Usage: gh branch [options]"
  echo "-v       Output the program version number"
  echo "-h       Execute the program help function"
  echo "--static Print a non-interactive list of branches"
}

# Main function
function gh_branch() {
  # Parse command line options
  while [[ "$1" != "" ]]; do
    case "$1" in
      -v)
        echo "Version: 1.0"
        ;;
      -h)
        display_help
        ;;
      --static)
        # Print non-interactive list of branches
        gh api graphql --paginate -f query='{\"query\": \"query { repository(owner:\"owner\", name:\"repo_name\") { pullRequests(first:100) { nodes { number author { login } state headRefName } } } }\"}' | jq '.data.repository.pullRequests.nodes[] | "Branch: \(.headRefName) Pull Request: \(.number) Author: \(.author.login) State: \(.state)"'
        ;;
      *)
        echo "Invalid option: $1"
        ;;
    esac
    shift
  done
}

# Execute the gh_branch function
gh_branch "$@"

#!/bin/bash

# Function to check if fzf is installed
check_fzf() {
  if ! command -v fzf &> /dev/null; then
    echo "Error: fzf is not installed. Please install fzf to use this extension."
    exit 1
  fi
}

# Function to display the interactive branch switcher
switch_branches() {
  gh api graphql -f query="
    query {
      repository(owner: \"owner_name\", name: \"repo_name\") {
        pullRequests(first: 10) {
          nodes {
            number
            author {
              login
            }
            state
            headRefName
          }
        }
      }
    }
  " | jq -r '.data.repository.pullRequests.nodes[] | "\(.headRefName) \u001b[1;33mPR-\(.number) \u001b[0m(\(.state) - \(.author.login))"' | fzf
}

# Function to list all branches of a repository
list_branches() {
  gh api graphql -f query="
    query {
      repository(owner: \"owner_name\", name: \"repo_name\") {
        pullRequests(first: 10) {
          nodes {
            number
            author {
              login
            }
            state
            headRefName
          }
        }
      }
    }
  " | jq -r '.data.repository.pullRequests.nodes[] | "\(.headRefName) \u001b[1;33mPR-\(.number) \u001b[0m \u001b[0m(\(.state) - \(.author.login))'
}

# Main function to handle different command line options
main() {
  case "$1" in
    -v) echo "gh-branch version 1.0";;
    -h) echo "Usage: gh branch [options]"
        echo
        echo "-v        Output the program version number"
        echo "-h        Execute the program help function"
        echo "--static  Print a non-interactive list of branches";;
    --static) list_branches;;
    *) switch_branches;;
  esac
}

# Check if fzf is installed
check_fzf

# Execute main function with command line arguments
main "$@"

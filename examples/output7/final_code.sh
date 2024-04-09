#!/bin/bash

#######################################
# Function: list_branches
# Description: List, switch, and delete local branches using GitHub API
#######################################
list_branches() {
  # Use fzf as a fuzzy finder
  local selected_branch=$(git branch | fzf)

  # Check if a branch is selected
  if [ -n "$selected_branch" ]; then
    echo "Selected branch: $selected_branch"
    read -p "Do you want to switch (s), delete (d), or list all (l) branches? " choice

    case "$choice" in
      s)
        git checkout $selected_branch
        ;;
      d)
        git branch -D $selected_branch
        ;;
      l)
        git branch
        ;;
      *)
        echo "Invalid choice"
        ;;
    esac
  else
    echo "No branch selected"
  fi

  # Make a GraphQL query using gh api command
  gh api graphql -f query='query { viewer { login } }'
}

#######################################
# Function: gh_branch
# Description: Display an interactive branch switcher based on pull requests
#######################################
gh_branch() {
  echo "Github CLI Extension: gh-branch"
  echo "Interactive branch switcher listing local branches"

  # Call the list_branches function
  list_branches
}

#######################################
# Function: main
# Description: Main function for command line parsing and actions
#######################################
main() {
  while [[ $# -gt 0 ]]; do
    key="$1"
    case $key in
        -v)
        echo "Version number: 1.0"
        ;;
        -h|--help)
        help
        exit
        ;;
        --static)
        echo "Non-interactive list of branches"
        ;;
        *)
        echo "Invalid option: $1"
        exit 1
        ;;
    esac
    shift
  done
}

#######################################
# Function: help
# Description: Print useful information
#######################################
help() {
  echo "Usage: gh branch [options]"
  echo ""
  echo "This is suppose to be a header paragraph"
  echo ""
  echo "Parameters:" 
  echo "-v: Output the program version number" 
  echo "-h: Execute the program help function" 
  echo "--static: Print a non-interactive list of branches" 
  echo ""
  echo "Here Can be some footer paragraphs"
}

#######################################
# Execution Flow
#######################################

# Execute the main function
main

# Execute the gh_branch function
gh_branch

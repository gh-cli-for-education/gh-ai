#!/bin/bash

# Function to list, switch, and delete local branches using GitHub API
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

# Execute the list_branches function
list_branches

#!/bin/bash

# Check if fzf is installed
if ! command -v fzf &> /dev/null
then
    echo "Error: fzf is not installed. Please install fzf to use this extension."
    exit 1
fi

# Function to display the branch switcher
display_branch_switcher() {
    # Make a GraphQL query using gh api command to get pull requests information
    pull_requests=$(gh api graphql -f query='
    query($owner: String!, $repo: String!) {
        repository(owner: $owner, name: $repo) {
            pullRequests(first: 10, states: [OPEN]) {
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
    }' --owner OWNER --repo REPO)

    # Parse the JSON response and display the branch switcher
    branches=$(echo $pull_requests | jq -r '.data.repository.pullRequests.nodes[] | "\(.headRefName) #\(.number) (\(.state) - \(.authr.login))"')

    # Use fzf for interactive branch selection
    selected_branch=$(echo "$branches" | fzf --preview 'echo {}')

    # Check out the selected branch
    git checkout $(echo $selected_branch | awk '{print $1}')
}

# Function to list all branches in the repository
list_branches() {
    git branch --all
}

# Function to delete a branch
delete_branch() {
    echo "Enter the branch name to delete:"
    read branch_name
    git branch -D $branch_name
}

# Main script
case "$1" in
    -v)
        echo "gh-branch version 1.0"
        ;;
    -h)
        echo "Usage: gh branch [options]"
        echo "-v       Output the program version number"
        echo "-h       Execute the program help function"
        echo "--static Print a non-interactive list of branches"
        ;;
    --static)
        list_branches
        ;;
    *)
        display_branch_switcher
        ;;
esac

# Additional Extensions:
# - Implement a function to handle branch switching and checkout
# - Add error handling for invalid inputs
# - Enhance the output formatting for better user experience

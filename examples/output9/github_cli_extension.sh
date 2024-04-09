#!/bin/bash

# Main function to parse command line arguments
main() {
    # Check if the '-h, --help' flag is present
    if [[ "$1" == "-h" || "$1" == "--help" ]]; then
        help
    elif [[ "$1" == "-v" ]]; then
        echo "Version: 1.0"
    elif [[ "$1" == "--static" ]]; then
        echo "Static branches:"
        # Call a function to print non-interactive list of branches
    fi
}

# Help function to print information to the user
help() {
    echo "Usage: gh branch [options]"
    echo ""
    echo "This is suppose to be a header paragraph"
    echo ""
    echo "Parameters:"
    echo "-v     Output the program version number"
    echo "-h     Execute the program help function"
    echo "--static     Print a non-interactive list of branches"
    echo ""
    echo "Here Can be some footer paragraphs"
}

# Function to switch, delete, and list all local branches of a repository
list_branches() {
    # Dependency check for fzf
    if ! command -v fzf &> /dev/null; then
        echo "Error: This function requires 'fzf' as a fuzzy finder tool, please install it."
        exit 1
    fi

    # Make a GraphQL query using the gh api command to extract information from Github APIv4
    gh api graphql -F query='query {
        repository(owner: "owner_name", name: "repository_name") {
            refs(refPrefix: "refs/heads/", first: 100) {
                nodes {
                    name
                }
            }
        }
    }' | jq -r '.data.repository.refs.nodes[].name' | fzf
}

# Github CLI extension to display an interactive branch switcher
gh_branch() {
    list_branches
}

# Call the main function with the provided command line arguments
main "$@"

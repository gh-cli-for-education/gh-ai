#!/bin/bash

# Function to parse the command line arguments and execute the corresponding actions
main() {
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        key="$1"
        # Check for different options and execute corresponding actions
        case $key in
            -v)
                # Output the program version number
                echo "Program version number: 1.0"
                ;;
            -h|--help)
                # Execute the help function
                help
                ;;
            --static)
                # Print a non-interactive list of branches
                echo "Static list of branches"
                ;;
            *)
                # Unknown option
                echo "Unknown option: $key"
                ;;
        esac
        shift
    done
}

# Function to switch, delete, and list local branches using fzf and GitHub APIv4
list_branches() {
    gh api graphql --field query="""
        query {
            repository(owner: \"owner\", name: \"repository\") {
                refs(refPrefix: \"refs/heads/\", first: 100) {
                    nodes {
                        name
                    }
                }
            }
        }
    """ | jq '.data.repository.refs.nodes | .[] | .name' | fzf
}

# Print help information to the user
help() {
    echo "Usage: gh branch [options]"
    echo "This is suppose to be a header paragraph"
    echo -e "-v        Output the program version number"
    echo -e "-h, --help        Execute the program help function"
    echo -e "--static        Print a non-interactive list of branches"
    echo "Here Can be some footer paragraphs"
    # Exit the program after printing help information
    exit 0
}

# Call the main function to start parsing command line arguments
main

# Call the list_branches function to interactively switch, delete, and list branches
list_branches
#!/bin/bash

# Function to list branches interactively using fzf
list_branches() {
    local repository_path="<add_repository_path_here>"
    
    # Switch to the repository directory
    cd $repository_path
    
    # List all local branches with fzf for interactive selection
    git branch | fzf --preview="git log --oneline {}" --preview-window=:wrap --bind="enter:execute(git checkout {})" --bind="ctrl-d:execute(git branch -D {})"
}

# Main function for command line argument parsing
main() {
    while [[ "$1" != "" ]]; do
        case $1 in
            -v ) 
                echo "Program version number"
                ;;
            -h | --help ) 
                help
                exit
                ;;
            --static ) 
                echo "Non-interactive list of branches"
                ;;
            * )
                echo "Invalid option: $1"
                ;;
        esac
        shift
    done
}

# Help function providing information on command usage
help() {
    echo "Usage: gh branch [options]"
    echo ""
    echo "This is supposed to be a header paragraph"
    echo ""
    echo "Parameters:"
    echo "-v    Output the program version number"
    echo "-h, --help    Execute the program help function"
    echo "--static    Print a non-interactive list of branches"
    echo ""
    echo "Here can be some footer paragraphs"
}

# New feature: Interactive branch switcher
interactive_branch_switcher() {
    echo "Interactive branch switcher - Select a branch to check out"
    list_branches
}

# Execute the main function with command line arguments
main "$@"
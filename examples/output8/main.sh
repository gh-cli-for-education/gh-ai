#!/bin/bash

main() {
    # Parse command line arguments
    while [[ $# -gt 0 ]]; do
        key="$1"
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

help() {
    # Print help information
    echo "Usage: gh branch [options]"
    echo "This is suppose to be a header paragraph"
    echo -e "-v        Output the program version number"
    echo -e "-h, --help        Execute the program help function"
    echo -e "--static        Print a non-interactive list of branches"
    echo "Here Can be some footer paragraphs"
    # Exit the program after printing help information
    exit 0
}

# Call the main function
main
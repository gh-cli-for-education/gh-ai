#!/bin/bash

# Main function for command line parsing and actions
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

# Help function for printing useful information
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

# Execute the main function
main

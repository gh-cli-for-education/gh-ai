#!/bin/bash

# Initialize variables with default values
organization=""
default_org=""
version="1.0"
fullname=false
json=false
regexp=""
url=false
login=false
orgurl=false
site=false
help=false

# Function to display help
show_help() {
    echo "Usage: gh-org-members [options] [organization]"
    echo "Options:"
    echo "  -V, --version: Output the version number"
    echo "  -f, --fullname: Show name of the user (if available)"
    echo "  -j, --json: returns the full json object"
    echo "  -r, --regexp <regexp>: Only members with some field matching <regexp> will be shown"
    echo "  -u, --url: Show github user url"
    echo "  -l, --login: Show github user login"
    echo "  -w, --orgurl: Show github user url as a member of the org"
    echo "  -s, --site: Show url of the members github pages web sites"
    echo "  -o --org <org>: Default organization"
    echo "  --default: Set selected \"org\" as default organization for future uses"
    echo "  -h, --help: Display help for command"
}

# Interactive selection of organization using fzf if not provided
if [ -z "$organization" ]; then
    echo "No organization provided. Select from your organizations:"
    # Logic to fetch user's organizations and use fzf for selection
    # Your logic here...
fi

# Parse command line options
while [[ $1 =~ ^- && ! $1 == "" ]]; do
    case $1 in
        -V | --version )
            echo "$version"
            exit 0
            ;;
        -f | --fullname )
            fullname=true
            shift
            ;;
        -j | --json )
            json=true
            shift
            ;;
        -r | --regexp )
            regexp="$2"
            shift
            shift
            ;;
        -u | --url )
            url=true
            shift
            ;;
        -l | --login )
            login=true
            shift
            ;;
        -w | --orgurl )
            orgurl=true
            shift
            ;;
        -s | --site )
            site=true
            shift
            ;;
        -o | --org )
            default_org="$2"
            shift
            shift
            ;;
        --default )
            default_org="$organization"
            shift
            ;;
        -h | --help )
            show_help
            exit 0
            ;;
        * ) 
            show_help
            exit 1
    esac
done

echo "Organization: $organization"
# Further logic to obtain info about org members
# Your logic here...

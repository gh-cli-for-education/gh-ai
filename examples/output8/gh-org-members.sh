#!/bin/bash

# Default organization
DEFAULT_ORG=""

# Function to show help message
show_help() {
    echo "gh org-members [options] [organization]"
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
    echo "  --default: Set selected 'org' as default organization for future uses"
    echo "  -h, --help: Display help for command"
}

# Interactive selection of organization if not specified
select_organization_interactively() {
    # Implement interactive selection here using 'fzf' or any suitable tool
    echo "Interactive selection of organization"
}

# Retrieve info about the members of the organization
retrieve_org_members_info() {
    org="$1"
    # Implement the logic to retrieve organization members info
    echo "Retrieving organization members info for $org"
}

# Main script logic
while [[ $# -gt 0 ]]; do
    key="$1"

    case $key in
        -V|--version)
            echo "Version 1.0"
            exit 0
            ;;
        -f|--fullname)
            SHOW_FULLNAME=true
            ;;
        -j|--json)
            SHOW_JSON=true
            ;;
        -r|--regexp)
            REGEX="$2"
            shift
            ;;
        -u|--url)
            SHOW_URL=true
            ;;
        -l|--login)
            SHOW_LOGIN=true
            ;;
        -w|--orgurl)
            SHOW_ORG_URL=true
            ;;
        -s|--site)
            SHOW_SITE_URL=true
            ;;
        -o|--org)
            DEFAULT_ORG="$2"
            shift
            ;;
        --default)
            DEFAULT_ORG="$2"
            echo "Default organization set to: $DEFAULT_ORG"
            exit 0
            ;;
        -h|--help)
            show_help
            exit 0
            ;;
        *)
            # Assume it's the organization
            ORG="$1"
            ;;
    esac
    shift
done

# Check if organization is provided or select interactively
if [ -z "$ORG" ]; then
    ORG=$(select_organization_interactively)
fi

# Retrieve organization members info
retrieve_org_members_info "$ORG"
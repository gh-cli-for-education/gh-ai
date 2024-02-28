#!/bin/bash

# Constants
DEFAULT_ORG=""
ORG=""
SHOW_VERSION=false
SHOW_FULLNAME=false
SHOW_JSON=false
REGEXP=""
SHOW_URL=false
SHOW_LOGIN=false
SHOW_ORGURL=false
SHOW_SITE=false
SET_DEFAULT=false

# Functions

show_help() {
  echo "Usage: gh org-members [options] [organization]"
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

# Main script

while [[ "$#" -gt 0 ]]; do
  case $1 in
    -V|--version )
      SHOW_VERSION=true
      ;;
    -f|--fullname )
      SHOW_FULLNAME=true
      ;;
    -j|--json )
      SHOW_JSON=true
      ;;
    -r|--regexp )
      shift
      REGEXP="$1"
      ;;
    -u|--url )
      SHOW_URL=true
      ;;
    -l|--login )
      SHOW_LOGIN=true
      ;;
    -w|--orgurl )
      SHOW_ORGURL=true
      ;;
    -s|--site )
      SHOW_SITE=true
      ;;
    -o|--org )
      shift
      ORG="$1"
      ;;
    --default )
      SET_DEFAULT=true
      ;;
    -h|--help )
      show_help
      exit 0
      ;;
    * )
      break
  esac
  shift
done

# Business logic

if $SHOW_VERSION; then
  echo "gh-org-members version 1.0.0"
  exit 0
fi

# Fetch organization if not provided or set as default
if [ -z "$ORG" ]; then
  echo "Fetching organizations..."
  ORG=$(github-cli orgs -fzf)
fi

# Set organization as default if requested
if $SET_DEFAULT; then
  DEFAULT_ORG="$ORG"
fi

# Rest of the logic to fetch and display member information

# Placeholder until actual logic is implemented
echo "Fetching member information for organization: $ORG"

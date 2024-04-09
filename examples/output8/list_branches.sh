#!/bin/bash

list_branches() {
    # Function to switch, delete, and list local branches using fzf and GitHub APIv4
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

# Call the list_branches function
list_branches
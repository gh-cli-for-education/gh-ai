# GitHub CLI Extension: gh-poi

## Description
This GitHub CLI extension helps in managing and cleaning up local branches by identifying merged branches and safely deleting them. Daily development can lead to a clutter of unnecessary branches, and this extension aims to streamline the branch cleanup process.

## Installation
1. Make sure you have GitHub CLI installed on your system.
2. Clone this repository to your local machine.
3. Run the extension by executing the provided scripts.

## Usage
- Use the provided functions to get local branch information, check if branches are fully merged, mark branches for deletion, and delete branches.
- Utilize command-line arguments to control the program flow (e.g., -v for version, -h for help, --dry-run to preview deletions, --debug for debugging, --protect to protect branches, --unprotect to unprotect branches).
- Follow the on-screen prompts and logs for guidance on branch management.

## Examples
```bash
# Get local branches and their status
gh poi get_local_branches

# Mark branches for deletion
gh poi mark_branches

# Delete branches that are marked for deletion
gh poi delete_branches
```

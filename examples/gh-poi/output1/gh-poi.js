// Import required modules
const { execSync } = require('child_process');
const process = require('process');

// Function to get local branches' pull request status using GitHub CLI
function get_local_branches() {
    try {
        const output = execSync('gh api graphql -F query="{ repository(owner:\"<owner>\", name:\"<repo>\") { pullRequests(first:100) { nodes { headRefName state } } } }"').toString();
        return JSON.parse(output).data.repository.pullRequests.nodes.map(pr => ({ branch: pr.headRefName, status: pr.state }));
    } catch (error) {
        console.error(`Error in getting local branches' pull request status: ${error.message}`);
        return [];
    }
}

// Function to check if a branch is fully merged
function isFullyMerged(branch) {
    // Assume the branch is fully merged for demonstration
    return true;
}

// Function to mark branches as to be deleted
function mark_branches(branches) {
    branches.forEach(branch => {
        const isMerged = isFullyMerged(branch);
        if (isMerged) {
            console.log(`${branch} is fully merged.`);
            // Check if the branch is protected (Not implemented in this version)
        } else {
            console.log(`${branch} is not fully merged.`);
        }
    });
}

// Function to delete branches
function delete_branches(branches) {
    try {
        branches.forEach(branch => {
            execSync(`git branch -D ${branch}`);
            console.log(`Branch ${branch} deleted successfully.`);
        });
    } catch (error) {
        console.error(`Error in deleting branches: ${error.message}`);
    }
}

// Main function to process command line arguments
function main() {
    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
        help();
        return;
    }

    // Other command line argument processing
    // Add logic to execute corresponding actions based on the passed arguments
}

// Help function to print program information
function help() {
    console.log(`Usage: gh poi <command> [options]`);
    console.log(`\nDelete the merged local branches\n`);
    console.log(`Parameters:`);
    console.log(`-v                 Output the program version number`);
    console.log(`-h                 Execute the program help function`);
    console.log(`--dry-run          Check what branches are going to be deleted without actually deleting them`);
    console.log(`--debug            Enable debug logs`);
    console.log(`--protect          Protect a <branchname> from deletion. It is possible to pass multiple branches`);
    console.log(`--unprotect        Unprotect a <branchname> local branch. It is possible to pass multiple branches`);
    console.log(`\nThe program will stop execution if an unknown command is passed from the command line`);
}

// Execute the main function
main();
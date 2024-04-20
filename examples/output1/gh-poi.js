// Function to get the list of local branches by querying GitHub API for pull request status
function get_local_branches() {
    const { stdout, stderr } = require('child_process').execSync('gh api graphql -f query=pullRequestStatus');

    if (stderr) {
        console.error(`Error executing Github API query: ${stderr}`);
        return [];
    }

    const localBranches = JSON.parse(stdout);
    return localBranches;
}

// Function to check if a branch is fully merged by examining the pull request status
function isFullyMerged(branch, pr) {
    // Check if the pull request state is Merged and if the branch is not ahead of the main branch
    if (pr.state === "Merged" && branch.commitsAhead === 0) {
        return true;
    }
    return false;
}

// Function to mark branches based on merge status and protection
function mark_branches(branches) {
    branches.forEach(branch => {
        const merged = isFullyMerged(branch, branch.pr);
        if (merged && !branch.protected) {
            branch.status = "deletable";
        } else {
            branch.status = "noDeletable";
        }
    });
}

// Function to delete branches that are marked as deletable
function delete_branches(branches) {
    branches.forEach(branch => {
        if (branch.status === "deletable") {
            // Logic to delete branch
            console.log(`Deleted branch: ${branch.name}`);
        }
    });
}

// Main function to parse command line arguments and execute corresponding actions
function main() {
    const args = process.argv.slice(2);

    if (args.includes("-v")) {
        console.log("Version 1.0");
    } else if (args.includes("-h") || args.includes("--help")) {
        help();
    } else if (args.includes("--dry-run")) {
        // Logic for dry-run
    } else if (args.includes("--debug")) {
        // Enable debug logs
    } else if (args.includes("--protect")) {
        // Logic to protect branches
    } else if (args.includes("--unprotect")) {
        // Logic to unprotect branches
    } else {
        console.log("Unknown command. Use -h or --help for program usage.");
    }
}

// Help function to display program information
function help() {
    console.log("\nUsage: gh poi <command> [options]\n");
    console.log("Delete the merged local branches\n");

    console.log("Options:");
    console.log("-v                          Output the program version number");
    console.log("-h, --help                  Execute the program help function");
    console.log("--dry-run                   Check what branches are going to be deleted without actually deleting them");
    console.log("--debug                     Enable debug logs");
    console.log("--protect <branchname>      Protect a <branchname> from deletion. Multiple branches allowed");
    console.log("--unprotect <branchname>    Unprotect a <branchname> local branch. Multiple branches allowed\n");

    console.log("The program will stop execution if an unknown command is passed from the command line\n");
}

main(); // Call the main function to start command line argument processing
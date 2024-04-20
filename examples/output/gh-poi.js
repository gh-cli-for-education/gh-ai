const { spawnSync } = require('child_process');

// Function to get local branches with pull request status using GitHub API
function get_local_branches() {
    const query = `
        query {
            repository(owner: "owner", name: "repo") {
                refs(first: 100, refPrefix: "refs/heads/") {
                    nodes {
                        name
                        associatedPullRequests(first: 1) {
                            nodes {
                                title
                                merged
                            }
                        }
                    }
                }
            }
        }
    `;

    const result = spawnSync('gh', ['api', 'graphql', '-f', `query=${query}`], { encoding: 'utf-8' });
    if (result.status !== 0) {
        console.error('Error retrieving local branches with pull request status:', result.stderr);
        return [];
    }

    return JSON.parse(result.stdout).data.repository.refs.nodes;
}

// Function to check if a branch is fully merged based on pull request status and commits ahead of main branch
function isFullyMerged(branch, pr) {
    const isMergedPR = pr.merged;
    const isNoCommitsAhead = !spawnSync('git', ['rev-list', '--left-only', `${branch}...main`], { encoding: 'utf-8' }).stdout.trim();

    return isMergedPR && isNoCommitsAhead;
}

// Function to mark branches as deletable or not based on pull request status
function mark_branches(branches, pullRequests) {
    return branches.map(branch => {
        const pr = pullRequests.find(pr => pr.headRefName === branch.name);
        return { name: branch.name, isMerged: isFullyMerged(branch.name, pr) };
    });
}

// Function to delete branches that are marked as deletable
function delete_branches(branches) {
    branches.forEach(branch => {
        if (branch.isDeletable) {
            const result = spawnSync('git', ['branch', '-D', branch.name], { encoding: 'utf-8' });
            if (result.status !== 0) {
                console.error('Failed to delete branch', branch.name, ':', result.stderr);
            } else {
                console.log('Deleted branch:', branch.name);
            }
        } else {
            console.log('Branch', branch.name, 'is not deletable.');
        }
    });
}

// Main function to parse command line arguments
function main() {
    const args = process.argv.slice(2);
    if (args.includes('-v')) {
        console.log('Version: 1.0.0');
    } else if (args.includes('-h')) {
        help();
    } else {
        const protectIndex = args.indexOf('--protect');
        if (protectIndex !== -1) {
            // Logic to protect branches
            const branchesToProtect = args.slice(protectIndex + 1);
            console.log('Protecting branches:', branchesToProtect);
        }

        const unprotectIndex = args.indexOf('--unprotect');
        if (unprotectIndex !== -1) {
            // Logic to unprotect branches
            const branchesToUnprotect = args.slice(unprotectIndex + 1);
            console.log('Unprotecting branches:', branchesToUnprotect);
        }

        const dryRun = args.includes('--dry-run');
        const debug = args.includes('--debug');

        const localBranches = get_local_branches();
        const markedBranches = mark_branches(localBranches);

        if (dryRun) {
            markedBranches.forEach(branch => {
                console.log(branch.name, branch.isMerged ? '(ready for deletion)' : '(not fully merged)');
            });
        } else {
            delete_branches(markedBranches);
        }
    }
}

// Help function to print program information
function help() {
    console.log('Usage: gh poi <command> [options]');
    console.log('\nDelete the merged local branches\n');
    console.log('Parameters:');
    console.log('-v                        Output the program version number');
    console.log('-h                        Execute the program help function');
    console.log('--dry-run                 Check what branches are going to be deleted without actually deleting them');
    console.log('--debug                   Enable debug logs');
    console.log('--protect <branchname>    Protect a <branchname> from deletion. It is possible to pass multiple branches');
    console.log('--unprotect <branchname>  Unprotect a <branchname> local branch. It is possible to pass multiple branches');
    console.log('\n');    
    console.log('The program will stop execution if an unknown command is passed from the command line');
    process.exit(0);
}

main();

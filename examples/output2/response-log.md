# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

## User prompts 

For each file requested by the user, its corresponding code has been generated. 

### File gh-branch

#### Petition

```md
<idea>

The file *name* is **gh-branch**

This is what the program has to do:

gh-branch is a Github CLI extension whose purpose is to display an interactive branch switcher listing local branches in relation of the pull request in the repository.
The selected branch is checked out.

The extension should be able to let the user: 

1. **Switch** between branches.
2. **Delete** branches.
3. **List** all branches of a repository.

This extension **depends on fzf** as a fuzzy finder, make sure to check if the user has installed fzf,  in case it doesn't echo an error and exit the program.

The extension should use the gh api command, making a graphQL query asking for the pull requests of an specific repository.

That query should take a node with:

  - number,
  - author
  - state
  - headRefName

with that information you should be able to print a list of branches that contains the *headRefName* followed by the *number*, the *number* should have a different color depeding on the pull request *state* and the the *author.login*.

The program has to react to the possible parameters that are indicated through the command line:

- -v: Output the program version number

- -h: Execute the program *help function*

- --static: Print a non-interactive list of branches

 
This is how the *usage* section of the *help function* must be: gh branch [options]

At the same time, here is an initial idea of what the help function should be returning. 

Usage: gh branch [options]

-v       Output the program version number
-h       Execute the program *help function*
--static Print a non-interactive list of branches

</idea>

<petition>
You are allowed to extend or improve it, as long as the ideas established in the <idea> section are maintained.
Using all the *ideas* that I told you, execute **generate_file** tool with the generated code from the translation of my ideas to code.
Instead of writting a response, execute **talk_with_user** to tell anything that is not code.  
</petition>

```

#### Response

```bash
I have successfully generated the code for the gh-branch Github CLI extension. It includes the functionalities you requested along with additional features. You can now review the code and test it.
```
#### Usage

Total tokens used by this file request: **2379** Tokens, broken down this way:

Tokens used by the prompt: **2341**.  
Tokens used by the LLM to generate the answer: **38**.

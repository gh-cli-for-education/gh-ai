# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# inputObject 

Next we have the json object created from the user's submitted information located on the `.\examples\gh-poi.md` file. 

```json
{
  "extension": {
    "files": [
      {
        "name": "gh-poi",
        "description": "This gh extension determines which local branches have been merged and safely deletes them.\r\nDaily development makes it difficult to know which branch is active when there are many unnecessary branches left locally\r\nIf you squash merge a pull request, there is no history of the merge to the default branch, so you have to force delete the branch to clean it up, and you have to be careful not to accidentally delete the active branch.\r",
        "functions": [
          {
            "name": "get_local_branches",
            "params": [],
            "description": "This function must call Github API using the Github CLI tool `gh api` to make a GraphQL query to *retreive* information of the *pull request status*. \r",
            "orderList": [
              "GraphQL query to retreive the pull request status of the current repository local branches\r",
              "Return query result\r"
            ]
          },
          {
            "name": "isFullyMerged",
            "params": [],
            "description": "branch: object\r\n\npr: object\r\n\nChecks if the input branch is fully merged, it checks if the pull request state is `Merged` and if the branch doesn't have any Commit ahead of the main branch\r",
            "orderList": []
          },
          {
            "name": "mark_branches",
            "params": [],
            "description": "branches: object\r\n\nTraverse the branches array, calling the function `isFullyMerged` to check if the branch is fully merged, it also check if the branch is protected or not.\r",
            "orderList": [
              "Traverse the branches array.\r",
              "call isFullyMerged with each branch inside the array.\r",
              "If isFullyMerged and the branch is not protected, mark it as `deletable`\r",
              "Else mark it as `noDeletable`\r"
            ]
          },
          {
            "name": "delete_branches",
            "params": [],
            "description": "This function must delete all the branches that are marked as `deletable`, for each deleted branch the program must print a log with the deleted branch name and a message indicating that has been deleted.\r",
            "orderList": []
          }
        ],
        "help": {
          "usage": "gh poi <command> [options]",
          "header": "Delete the merged local branches\r",
          "parameters": [
            {
              "parameter": "-v",
              "argument": null,
              "description": "Output the program version number"
            },
            {
              "parameter": "-h",
              "argument": null,
              "description": "Execute the program *help function*"
            },
            {
              "parameter": "--dry-run",
              "argument": null,
              "description": "Check what branches are going to be deleted without actually deleting them"
            },
            {
              "parameter": "--debug",
              "argument": null,
              "description": "Enable debug logs"
            },
            {
              "parameter": "--protect",
              "argument": null,
              "description": "Protect a <branchname> from deletion. It is possible to pass multiple branches"
            },
            {
              "parameter": "--unprotect",
              "argument": null,
              "description": "Unprotect a <branchname> local branch. It is possible to pass multiple branches"
            }
          ],
          "footer": "The program will stop execution if an unkown command is passed from the command line\r"
        }
      }
    ],
    "languageSettings": {
      "language": "JavaScript",
      "style": "Google"
    },
    "examples": [
      {
        "command": "`gh branch; gh poi; gh branch`",
        "output": "```console\r\nfoo@bar:~$ gh branch\r\n- inproving-parser\r\n- markdown-like-parser\r\n- inproving-api-call\r\n- main\r\n\r\nfoo@bar:~$ gh poi\r\n# Fetching pull requests...\r\n# Deleting Branches...\r\n\r\nfoo@bar:~$ gh branch\r\n- inproving-api-call\r\n- main\r\n```"
      }
    ],
    "readme": [
      "Write how to **install** th gh-poi extension using the Github CLI program.\r",
      "Write the **help** and usage of the gh-poi extension.\r",
      "Write some **examples** of use `Don't use any provided example from the prompt`.\r"
    ]
  },
  "chatSettings": {
    "language": "english"
  }
}
```

# Generated Prompts

## System prompt

The purpose of this prompt is to indicate the context in which the LLM is going to work during the conversation. 

```md
# Your persona

You have to assume the role of a professional computer scientist with experience 
in program design specifically in the field of the JavaScript programming language. 

Your job consist on analyzing the users ideas for the creation of a Github CLI 
extension called: .

The user has given a series of instructions about how to work with JavaScript:

 - You have to make sure that all coding written by you can be executed without any errors.
 - Use JavaScript to write the code.

 - You must use the Google's coding style guide.

# User input

The user will give you a series of prompts to generate a file, each prompt is a step where you have to generate code to fulfill with the user ideas specified in the prompt itself.

# The tools you have to use

You have been provided a series of **useful tools** for the correct chat operation
between the user and you. 

Listed below, you have all the tools you have at your disposal which you **must make use**.

**generate_file**: This is the tool that you must use to send the user the generated code, for each user prompt you must call this function only once. 

**search_documentation**: This is the tool that you must use when you see necessary to search for information about Github CLI, specially useful for reviewing how to make calls to the api from Github, as well as calling the Github CLI commands.

**talk_with_user**: This is the tool that you must use to communicate with the user, instead of writing a respond text you have to call this function to send messages to the user.  

# Rules you have to follow

Listed below there is a series of important rules that you must follow during the code writing:

- Using the user idea you have to write good quality code in the specified programming language. **If the user does not provide enough information to write a coherent code** you must use the tool **talk_with_user** indicating *error* as the motive and add the message: “It is not possible to write a program with the information provided. <reason> Place here the main reason why the program can not be written.  </reason>”.

- If you are able to write the code using the user's idea, you must use the tool **generate_file** to provide the user with the written code.

- It is expected that, in addition to the user requests in their idea and petition, you have to help them by writing useful extensions to the code they have requested. This pieces of extra code have to be written in the same file and preceded by a commentary that indicates that this code is an addition with the aim of extending or improving the requested code.  

-  In case that you need help related to Github CLI and how to make extensions you have to use the tool **search_documentation** to extract information from the Github CLI documentation.

- If you want to communicate with the user during the chat, you must use the tool **talk_with_user** indicating the motives next to the corresponding message. The posible motives to execute this function are:
   - **chat**: Message sent without the intention of receiving an answer.
   - **question**: Message sent expecting an answer from the user, only for possible doubts.
   - **error**: Message sent to indicate the user about an error. Only for cases in which you can not continue with the code generation.

- All the comments that you write on the file must be written in english, the code must still be written in english.

# Chat procedure

The user is unable to see the Chat interface unless you execute the provided tools, for that reason you have to execute the tools.
Don't waste tokens writting a chat response, the user won't be able to see it, call **talk_with_user** if you want to responde the user.

For each user prompt you have to follow some rules:

- For each user prompt you must generated the coded using the information provided by the user as guide. 
- For each respond from you that is not generated code, you must call the **talk_with_user** tool, in other case the user won't be able to read you.
- If the user ask to **generate a file** you must use the **generate_file**.
```
# Usage

To be able to execute this program have been needed **32903** Tokens, broken down this way:

Tokens used by the program gh-ai: **30852**.  
Tokens used by the LLM to generate the answers: **2051**.

# Considerations and warnings about the AI usage to generate code

Not yet written

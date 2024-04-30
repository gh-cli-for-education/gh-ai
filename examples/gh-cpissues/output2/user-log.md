# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# inputObject 

Next we have the json object created from the user's submitted information located on the `.\examples\gh-cpissues\gh-cpissues.md` file. 

```json
{
  "extension": {
    "files": [
      {
        "name": "gh-cpissues",
        "description": "gh-cpissues is an extension of the Github Command Line Interface (Github CLI) whose purpose is to  to copy GitHub Issues from one repository to another based on a specified label.\r\nThe program has a **Prerequisite**: \r\n+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed. The script uses the Github CLI `gh` program to interact to interact with Github repositories. The issues are copied with the same title and body, if an issue with the same title already exists in the target repository, it won't be copied again.\r\n+ It is necessary to have `js installed`, so the program is able to execute it.\r\nThis is a small and uncomplete skeleton that you should use as a guide for generating the code.\r\n```bash \r\n\r\nmain() {\r\n  # Check `Prerequisites`\r\n  # Processes the command line and activates the different flags specified in the help function section. \r\n  # Call help function if no paramater is given\r\n  # Echo an error if an unknown command is parsed\r\n  # Check if the <git-repo> and and the <label> variables are assigned, if not echo an error and exit the program\r\n}\r\n\r\n```",
        "functions": [
          {
            "name": "copy_issues",
            "params": [],
            "description": "The first thing the program should do is check if Git is installed. If it is, it should save the root of the **current repository** as `current_repo_root` and the current commit it is on. Then, it should inform the user that issues with the label `label` will be copied from `git_repo` to the **current repository**.\r\n\nTo obtain the issues, the appropriate **`gh` command is executed** to list all issues from `git_repo` with the label `label`, extracting them as JSON and saving them in a variable. If this JSON file is empty, the program should inform the user that there are no issues with the label `label` in `git_repo`.\r\n\nFor each line in the JSON file (using the `jq` command), the program should: Extract the `title` of the issue and *check if it does not already exist in the current repository*. If it does, inform the user that it already exists and discard the issue. Otherwise, create a new issue with the same `title` and `content`.\r",
            "orderList": []
          }
        ],
        "help": {
          "usage": "gh-cpissues <git-repo> --label <label> [--verbose]",
          "header": "",
          "arguments": [
            {
              "argument": "git-repo",
              "description": "The target repository in the format `\"<owner>/<repository>\"` (Modifies the value of the variable `git_repo`)."
            }
          ],
          "parameters": [
            {
              "parameter": "--label",
              "argument": null,
              "description": "Specify the <label> of the issue to copy (Modifies the value of the variable `label`)."
            },
            {
              "parameter": "--verbose",
              "argument": null,
              "description": "Activates the verbose execution and will keep the .tmp and .json file. (Activates the `verbose` flag)."
            }
          ],
          "footer": ""
        }
      }
    ],
    "languageSettings": {
      "language": "bash",
      "style": "Google"
    }
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
in program design specifically in the field of the bash programming language. 

Your job consist on analyzing the users ideas for the creation of a Github CLI 
extension called: .

The user has given a series of instructions about how to work with bash:

 - You have to make sure that all coding written by you can be executed without any errors.
 - Use bash to write the code.

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

To be able to execute this program have been needed **0** Tokens, broken down this way:

Tokens used by the program gh-ai: **0**.  
Tokens used by the LLM to generate the answers: **0**.

# Considerations and warnings about the AI usage to generate code

Not yet written

# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# inputObject 

Next we have the json object created from the user's submitted information located on the `../gh-ai/examples/gh-rate-limit/gh-rate-limit.md` file. 

```json
{
  "extension": {
    "files": [
      {
        "name": "gh-rate-limit",
        "description": "gh-rate-limit is an extension of the Github Command Line Interface (Github CLI) whose purpose is to show the user their existing rate limits and when its resets. The program does exactly the same as executing the following command:\r\n```bash\r\ncurl -fSsL -H \"Authorization: token $(github_pat)\" -X GET \\\r\n  https://api.github.com/rate_limit \\\r\n  | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | \"\\(.name)  \\(.remaining)/\\(.limit)  \\(.reset | strflocaltime(\"%H:%M:%S\") )\"' \\\r\n  | column -t\r\n```\nThe program has some **Prerequisites** that are: \r\n+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed.\r\n+ It is necessary to have `js installed`, so the program is able to execute it.\r\nThe program must use the *\"X-GitHub-Api-Version: 2022-11-28\"* version of the gh REST API and save it as a global variable inside the program. It also contains a HTTP header with the value *Accept: application/vnd.github+json* inside a global variable.\r\nThis is a small skeleton that you should use as a guide for generating the code.\r\n```bash\r\nhelp() {\r\n  # Here goes all the program usage and the parameters and arguments list.\r\n  # Exit the program with code 1\r\n}\r\n\r\nmain () {\r\n  # Processes the command line and activates the different flags specified in the main function section.\r\n  # Check `Prerequisites`\r\n}\r\n```\nMake sure the program is executable.\r",
        "functions": [
          {
            "name": "call",
            "params": [],
            "description": "The function makes a call to the Github REST API using the `gh api` command, utilizing local variables as headers for the call. This function translates the content in the following code block, taking into account the `usage` flag to check the remaining or percentage of usage.\r\n\ncurl -fSsL -H \"Authorization: token $(github_pat)\" -X GET https://api.github.com/rate_limit | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | \"\\(.name)  \\(.remaining) \\(.limit)  \\(.reset | strflocaltime(\"%H:%M:%S\") )\"' | column -t\r",
            "orderList": []
          }
        ],
        "help": {
          "usage": "gh-rate-limit [options]",
          "header": "",
          "parameters": [
            {
              "parameter": "-u",
              "argument": null,
              "description": "Show the 'used' rather than 'remaining' limit (Activates the `usage` flag)."
            },
            {
              "parameter": "-h",
              "argument": null,
              "description": "Prints the help information of the program."
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

To be able to execute this program have been needed **15806** Tokens, broken down this way:

Tokens used by the program gh-ai: **13938**.  
Tokens used by the LLM to generate the answers: **1868**.

# Considerations and warnings about the AI usage to generate code

Not yet written

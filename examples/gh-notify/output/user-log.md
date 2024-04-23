# gh-ai user log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# inputObject 

Next we have the json object created from the user's submitted information located on the `.\examples\gh-notify\gh-notify.md` file. 

```json
{
  "extension": {
    "files": [
      {
        "name": "gh-notify",
        "description": "gh-notify is an extension of the Github Command Line Interface (Github CLI) whose purpose is to allow the user to view their Github notifications through the command line\r\nThe extension has a series of prerequisites which are:\r\n+ It is necessary to have Github CLI (gh) installed, so the program must be able to verify that said program is installed.\r\n+ It is necessary to have Fuzzy Finder (fzf) installed, so the program must be able to verify that said program is installed and that it is at least in version 0.29.0.\r\n+ It is necessary to have Python installed for cases where URLs cannot be opened by Github CLI (gh).\r\nBelow are a series of global variables that the program must contain:\r\n* NotificationPerPageLimit, with a default value of 50.\r\n* InitialNestingLevel, a variable that represents the current nesting level of the shell.\r\nThis is a small skeleton that you should use as a guide for generating the code.\r\n```bash \r\n# ============== basic functions =============== #\r\n\r\ndie() {\r\n  # Execute an echo of the error variable passed as a parameter to stderr.\r\n  # Terminate the program with code 1\r\n  # ```Your code goes here```\n}\r\nprint_help_text() {\r\n# Print text from the help section\r\n# Each section of the help should be in white and bold\r\n# Parameters and arguments should be in green, while their descriptions in white.\r\n# Terminate the program with code 0\r\n# ```Your code goes here```\r\n}\r\ngh_notify() {\r\n# Checks if Github CLI is installed\r\n# If the `mark_as_read` flag is activated, then it executes the `mark_all_read` function and then echos a message to the user that notifications have been marked as read, finally it terminates the program.\r\n# If the `show_static` flag is activated, then it displays the list of notifications and terminates the program execution.\r\n# If the `show_static` flag is deactivated, then it checks if at least one version of Python is installed, if there is no Python version installed, it echoes an error and terminates the program execution. Then it checks if fzf is installed and if it is in the minimum version required by the program. Finally, it executes the `select_notif` function and terminates the program execution.\r\n# ```Your code goes here``` \r\n}\r\nmain() {\r\n# Processes the command line and activates the different flags specified in the main function section.\r\n# If all arguments and parameters are correct, the gh_notify function is executed.\r\n}\r\n``\n`\r\n**The API calls will use the `API REST`** to comunicate with Github APIv3\r",
        "functions": [
          {
            "name": "print_notifs",
            "params": [],
            "description": "The print_notifs function is responsible for printing on the command line the information obtained from the notifications after making the API call. To do this, the function constantly checks the number of pages read as well as the total number of notifications obtained, always ensuring not to exceed the limit imposed by the `num_notifications` variable. For each iteration of the loop, it calls the `get_notifs` function with the current page number as a parameter. In case of an error, the `die` function is called with the corresponding error message.\r\n\nIn each iteration, a maximum of 50 notifications can be obtained from the API. For **example**: If a user requests 56 notifications, the API must be called twice with a maximum of 50 notifications each time, and stop displaying the information once the limit set by `num_notifications` is reached. It is important to keep this in mind, otherwise the program will malfunction.\r\n\nIt is necessary to store all notifications obtained from the API in a variable called `all_notifs`. In each iteration, the previous results must be concatenated with those obtained in that iteration. Also, update the rest of the variables with the new values after the iteration. Check if the requested notification limit has been reached and exit the loop in that case.\r\n\nWith all notifications obtained, a final filter is applied using the variables `exclusion_string` and `filter_string` to execute two `grep` commands in sequence (first exclusion and then filter), followed by the execution of the `column` command. The resulting output is then returned.\r",
            "orderList": []
          },
          {
            "name": "process_page ",
            "params": [],
            "description": "Processes a page containing GitHub notifications, extracting important information and applying a specific format.\r\n\nThe function takes a variable page as a parameter. It loops through reading lines (using read) from the page variable. It assigns the obtained values to variables `iso8601`, `thread_id`, `thread_state`, `comment_url`, `repo_full_name`, `unread_symbol`, `timefmt`, and `repo_abbreviated`. Additionally, it assigns a variable type with `url`, `reason`, and `title`.\r\n\nIf the type variable contains the word \"Discussion\", it executes the `process_discussion` function.\r\n\nIf the url variable contains the word \"null\", it executes the `process_url` function. The results of the function are assigned to the variables `number` and `modified_type`.\r\n\nFinally, it prints all local variables in table form.\r",
            "orderList": []
          }
        ],
        "help": {
          "usage": "gh notify [options]",
          "header": "",
          "parameters": [
            {
              "parameter": "-a",
              "argument": null,
              "description": "Shows both read and unread notifications (activates the `include_all_flag`)."
            },
            {
              "parameter": "-e",
              "argument": null,
              "description": "Excludes all notifications that match the string passed as a parameter (Modifies the value of the variable `exclusion_string`)."
            },
            {
              "parameter": "-f",
              "argument": null,
              "description": "Filters notifications that match the string passed as a parameter (Modifies the value of the variable `filter_string`)."
            },
            {
              "parameter": "-h",
              "argument": null,
              "description": "Displays the program's help text."
            },
            {
              "parameter": "-n",
              "argument": null,
              "description": "Indicates the maximum number of notifications to show (modifies the value of the variable `num_notifications`)."
            },
            {
              "parameter": "-p",
              "argument": null,
              "description": "Shows only participation or mention notifications (Activates the `only_participating_flag`)."
            },
            {
              "parameter": "-r",
              "argument": null,
              "description": "Marks all notifications as read (Activates the `mark_read_flag`). "
            },
            {
              "parameter": "-s",
              "argument": null,
              "description": "Shows the list of notifications in a static and non-interactive way (Activates the `print_static_flag`)."
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

To be able to execute this program have been needed **37815** Tokens, broken down this way:

Tokens used by the program gh-ai: **34233**.  
Tokens used by the LLM to generate the answers: **3582**.

# Considerations and warnings about the AI usage to generate code

Not yet written

# ChatSettings

- language: english

# Extension

## LanguageSettings

- language: bash
- style: Google

## MainFile gh-notify

gh-notify is an extension of the Github Command Line Interface (Github CLI) whose purpose is to allow the user to view their Github notifications through the command line


The extension has a series of prerequisites which are:

+ It is necessary to have Github CLI (gh) installed, so the program must be able to verify that said program is installed.
+ It is necessary to have Fuzzy Finder (fzf) installed, so the program must be able to verify that said program is installed and that it is at least in version 0.29.0.
+ It is necessary to have Python installed for cases where URLs cannot be opened by Github CLI (gh).

Below are a series of global variables that the program must contain:

* NotificationPerPageLimit, with a default value of 50.
* InitialNestingLevel, a variable that represents the current nesting level of the shell.

This is a small skeleton that you should use as a guide for generating the code.

```bash 
# ============== basic functions =============== #

die() {
  # Execute an echo of the error variable passed as a parameter to stderr.
  # Terminate the program with code 1
  # ```Your code goes here```
}

print_help_text() {
  # Print text from the help section
  # Each section of the help should be in white and bold
  # Parameters and arguments should be in green, while their descriptions in white.
  # Terminate the program with code 0
  # ```Your code goes here```
}

gh_notify() {
  # Checks if Github CLI is installed
  # If the `mark_as_read` flag is activated, then it executes the `mark_all_read` function and then echos a message to the user that notifications have been marked as read, finally it terminates the program.
  # If the `show_static` flag is activated, then it displays the list of notifications and terminates the program execution.
  # If the `show_static` flag is deactivated, then it checks if at least one version of Python is installed, if there is no Python version installed, it echoes an error and terminates the program execution. Then it checks if fzf is installed and if it is in the minimum version required by the program. Finally, it executes the `select_notif` function and terminates the program execution.
  # ```Your code goes here``` 
}

main() {
  # Processes the command line and activates the different flags specified in the main function section.
  # If all arguments and parameters are correct, the gh_notify function is executed.
}
```

**The API calls will use the `API REST`** to comunicate with Github APIv3

### Function print_notifs

The print_notifs function is responsible for printing on the command line the information obtained from the notifications after making the API call. To do this, the function constantly checks the number of pages read as well as the total number of notifications obtained, always ensuring not to exceed the limit imposed by the `num_notifications` variable. For each iteration of the loop, it calls the `get_notifs` function with the current page number as a parameter. In case of an error, the `die` function is called with the corresponding error message.

In each iteration, a maximum of 50 notifications can be obtained from the API. For **example**: If a user requests 56 notifications, the API must be called twice with a maximum of 50 notifications each time, and stop displaying the information once the limit set by `num_notifications` is reached. It is important to keep this in mind, otherwise the program will malfunction.

It is necessary to store all notifications obtained from the API in a variable called `all_notifs`. In each iteration, the previous results must be concatenated with those obtained in that iteration. Also, update the rest of the variables with the new values after the iteration. Check if the requested notification limit has been reached and exit the loop in that case.

With all notifications obtained, a final filter is applied using the variables `exclusion_string` and `filter_string` to execute two `grep` commands in sequence (first exclusion and then filter), followed by the execution of the `column` command. The resulting output is then returned.

### Function process_page 

Processes a page containing GitHub notifications, extracting important information and applying a specific format.

The function takes a variable page as a parameter. It loops through reading lines (using read) from the page variable. It assigns the obtained values to variables `iso8601`, `thread_id`, `thread_state`, `comment_url`, `repo_full_name`, `unread_symbol`, `timefmt`, and `repo_abbreviated`. Additionally, it assigns a variable type with `url`, `reason`, and `title`.

If the type variable contains the word "Discussion", it executes the `process_discussion` function.

If the url variable contains the word "null", it executes the `process_url` function. The results of the function are assigned to the variables `number` and `modified_type`.

Finally, it prints all local variables in table form.


### Help

### Usage gh notify [options]

### Parameters 

- -a Shows both read and unread notifications (activates the `include_all_flag`).
- -e Excludes all notifications that match the string passed as a parameter (Modifies the value of the variable `exclusion_string`).
- -f Filters notifications that match the string passed as a parameter (Modifies the value of the variable `filter_string`).
- -h Displays the program's help text.
- -n Indicates the maximum number of notifications to show (modifies the value of the variable `num_notifications`).
- -p Shows only participation or mention notifications (Activates the `only_participating_flag`).
- -r Marks all notifications as read (Activates the `mark_read_flag`). 
- -s Shows the list of notifications in a static and non-interactive way (Activates the `print_static_flag`).

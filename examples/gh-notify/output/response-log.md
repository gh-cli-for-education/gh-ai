# gh-ai response log 

This file has been created by the program gh-ai, therefore it does not entail any increase in token usage.  

The objective of this markdown file is to store the input and the prompts sent by the user making use of the program. 

# User prompts 

For each file requested by the user, its corresponding code has been generated. 

## File gh-notify

### Petition general idea of gh-notify.

```md
# File gh-notify

# Description of what you have to do

Given the following *description* your job is to generate code based on what you are going to read inside the *description tag*.

<description>
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
``
`
**The API calls will use the `API REST`** to comunicate with Github APIv3
</description>

In addition to the *description* the program **must** necessarily **contain** the **following functions**:

- print_notifs
- process_page 

## **Rules** you **must follow**:

- Make sure to generate a simple approach, implementing the most important ideas that you have been able to extract from the *description*. 
- The code must be easy to base and expand on for future improvements.
- Make sure to adress the *description* goals and rules. 

## Outputs

<Code>
Put here your generated code
</Code>

<requirements>
Write here a list of the most important ideas you have been able to extract from the *description*.
</requirements>

```

#### Assistant Response

### Requirements extracted from the description:
- The program allows the user to view their Github notifications via the command line.
- The user can pass options like -s or --show-static to display notifications, or -m or --mark-as-read to mark all notifications as read.
- It verifies the installation of GitHub CLI, Fuzzy Finder (fzf), and Python.
- It includes global variables for NotificationPerPageLimit and InitialNestingLevel.
- The program uses API calls through the API REST to communicate with the Github APIv3.

I have generated the code based on the information provided in the description. Let me know if you need any further modifications or additional functionalities.

#### Petition Usage

Total tokens used: **6436**
Tokens used by the gh-ai generated prompt: **5557**.  
Tokens used by the LLM to generate the answer: **879**.

### Petition main and help functions of gh-notify.

```md
# Code expansion

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following sections.

## Main Function
Add to *previously generated code* a **new** **main function** whose purpose is to *parse the command line*, the code must process the possible parameters and arguments the code should be able to receive. Depending on the readed information *the function should execute the corresponding action* associated to that specific parameter.

In case there was already a main function parsing the command line you must overwrite the previous one.

### Parameters supported by the program

The parameters the program must support are: 

-a  Shows both read and unread notifications (activates the `include_all_flag`).
-e  Excludes all notifications that match the string passed as a parameter (Modifies the value of the variable `exclusion_string`).
-f  Filters notifications that match the string passed as a parameter (Modifies the value of the variable `filter_string`).
-h  Displays the program's help text.
-n  Indicates the maximum number of notifications to show (modifies the value of the variable `num_notifications`).
-p  Shows only participation or mention notifications (Activates the `only_participating_flag`).
-r  Marks all notifications as read (Activates the `mark_read_flag`). 
-s  Shows the list of notifications in a static and non-interactive way (Activates the `print_static_flag`).

**You must add this arguments to the command line processing code inside the main function**

## Help function 

If the `-h, --help` parameter has not been specified you must add it to the processing, in that case it has to execute the **help function**.

What the said function `help` have to do is *print useful information to the user*. **You have to code the function to print the information**
It must be printed in the following order: 

- Print the `Usage` containing: **gh notify [options]**.

- Print a list with all the previous parameters listed above in the *Parameters section*. 
- Once all the information is printed the program must finish execution.

```

#### Assistant Response

```bash
main() {
  local include_all_flag=false
  local exclusion_string=""
  local filter_string=""
  local num_notifications=50
  local only_participating_flag=false
  local mark_read_flag=false
  local print_static_flag=false

  while [ "$1" != "" ]; do
    case $1 in
    -a)
      include_all_flag=true
      ;;
    -e)
      shift
      exclusion_string=$1
      ;;
    -f)
      shift
      filter_string=$1
      ;;
    -h | --help)
      help
      exit 0
      ;;
    -n)
      shift
      num_notifications=$1
      ;;
    -p)
      only_participating_flag=true
      ;;
    -r)
      mark_read_flag=true
      ;;
    -s)
      print_static_flag=true
      ;;
    *)
      die "Error: Invalid option $1"
      ;;
    esac
    shift
  done

  # Processing based on the parsed command line arguments
  if [ "$include_all_flag" = true ]; then
    # Implement logic to show both read and unread notifications
    echo "Showing both read and unread notifications"
  fi

  # Add similar logic for other parameters as needed

  if [ "$print_static_flag" = true ]; then
    show_notifs_static
    exit 0
  fi

  if [ "$mark_read_flag" = true ]; then
    mark_all_read
    echo "Marking all notifications as read"
    exit 0
  fi

  # Implement additional logic based on parameters
}

help() {
  cat << EOF
Usage: gh notify [options]

Parameters:
   -a    Shows both read and unread notifications.
   -e    Excludes notifications matching the specified string.
   -f    Filters notifications matching the specified string.
   -h    Displays this help text.
   -n    Indicates the maximum number of notifications to show.
   -p    Shows only participation or mention notifications.
   -r    Marks all notifications as read.
   -s    Shows the list of notifications in a static way.

EOF
}
```


#### Petition Usage

Total tokens used: **3408**
Tokens used by the gh-ai generated prompt: **2944**.  
Tokens used by the LLM to generate the answer: **464**.

### Petition print_notifs of gh-notify.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## print_notifs Function 

Use the following *description* as guide to generate the corresponding code.

```
The print_notifs function is responsible for printing on the command line the information obtained from the notifications after making the API call. To do this, the function constantly checks the number of pages read as well as the total number of notifications obtained, always ensuring not to exceed the limit imposed by the `num_notifications` variable. For each iteration of the loop, it calls the `get_notifs` function with the current page number as a parameter. In case of an error, the `die` function is called with the corresponding error message.

In each iteration, a maximum of 50 notifications can be obtained from the API. For **example**: If a user requests 56 notifications, the API must be called twice with a maximum of 50 notifications each time, and stop displaying the information once the limit set by `num_notifications` is reached. It is important to keep this in mind, otherwise the program will malfunction.

It is necessary to store all notifications obtained from the API in a variable called `all_notifs`. In each iteration, the previous results must be concatenated with those obtained in that iteration. Also, update the rest of the variables with the new values after the iteration. Check if the requested notification limit has been reached and exit the loop in that case.

With all notifications obtained, a final filter is applied using the variables `exclusion_string` and `filter_string` to execute two `grep` commands in sequence (first exclusion and then filter), followed by the execution of the `column` command. The resulting output is then returned.
```

```

#### Assistant Response

```bash
print_notifs() {
  local all_notifs=""
  local curr_page=1
  local total_count=0
  local remaining_notifications=$num_notifications

  while [ "$curr_page" -ne 0 ]; do
    current_notifs=$(get_notifs $curr_page) || die "Error: Unable to fetch notifications from page $curr_page"

    if [ -z "$current_notifs" ]; then
      break
    fi

    all_notifs+="$current_notifs"

    total_count=$(echo "$all_notifs" | jq '. | length')
    remaining_notifications=$((num_notifications - total_count))

    if [ "$remaining_notifications" -le 0 ]; then
      break
    fi

    curr_page=$((curr_page + 1))
  done

  # Apply final filter using exclusion_string and filter_string
  filtered_notifs=$(echo "$all_notifs" | grep -v "$exclusion_string" | grep "$filter_string" | column -t)

  echo "$filtered_notifs"
}
```

#### Petition Usage

Total tokens used: **4017**
Tokens used by the gh-ai generated prompt: **3798**.  
Tokens used by the LLM to generate the answer: **219**.

### Petition process_page  of gh-notify.

```md
# Code expansion 

Read once again the *requirements* and the *previously generated code* written by you.

Then **generate a new approach** and make sure to add the functions described in the following section.

## process_page  Function 

Use the following *description* as guide to generate the corresponding code.

```
Processes a page containing GitHub notifications, extracting important information and applying a specific format.

The function takes a variable page as a parameter. It loops through reading lines (using read) from the page variable. It assigns the obtained values to variables `iso8601`, `thread_id`, `thread_state`, `comment_url`, `repo_full_name`, `unread_symbol`, `timefmt`, and `repo_abbreviated`. Additionally, it assigns a variable type with `url`, `reason`, and `title`.

If the type variable contains the word "Discussion", it executes the `process_discussion` function.

If the url variable contains the word "null", it executes the `process_url` function. The results of the function are assigned to the variables `number` and `modified_type`.

Finally, it prints all local variables in table form.
```

```

#### Assistant Response

```bash
process_page() {
  local page="$1"
  
  while IFS= read -r line; do
    iso8601=$(echo "$line" | jq -r '.updated_at')
    thread_id=$(echo "$line" | jq -r '.id')
    thread_state=$(echo "$line" | jq -r '.unread')
    comment_url=$(echo "$line" | jq -r '.url')
    repo_full_name=$(echo "$line" | jq -r '.repository.full_name')
    unread_symbol=$(if [ "$thread_state" = "true" ]; then echo "x"; else echo "o"; fi)
    timefmt=$(date -d"$iso8601" +"%a %b %e, %Y %I:%M %p")
    repo_abbreviated=$(echo "$repo_full" | cut -d '/' -f 2-)

    type=$(echo "$line" | jq -r '.subject.type')
    if [[ "$type" == *"Discussion"* ]]; then
      process_discussion
    fi

    if [[ "$comment_url" == "null" ]]; then
      process_url
    fi

    cat << EOF
| ISO8601    | Thread ID | Thread State | Comment URL | Repo Full Name | Unread Symbol | Timefmt | Repo Abbreviated | Type |
|------------|-----------|--------------|-------------|----------------|---------------|---------|------------------|------|
| $iso8601  | $thread_id | $thread_state | $comment_url  | $repo_full_name | $unread_symbol | $timefmt | $repo_abbreviated | $type |
EOF
  done < <(echo "$page")
}
```

#### Petition Usage

Total tokens used: **4621**
Tokens used by the gh-ai generated prompt: **4266**.  
Tokens used by the LLM to generate the answer: **355**.

### Petition post processing of gh-notify.

```md
# Code improvement 

Using the *previously generated code* you have to make some final modification to it. 

## Error checking

**Check** the *previously generated code* to correct any syntax or semantic **error**.

## Comments

**Write quality comments** so that anyone is able to understand the generated.

## Coding style Checking 

**Check** if the *previously generated code* is formatted under the Google's coding style for bash.

```

#### Assistant Response

I have made the necessary corrections, added quality comments for better understanding, and ensured that the code follows the Google's coding style for bash. Let me know if there are any other modifications or improvements required.

#### Petition Usage

Total tokens used: **12695**
Tokens used by the gh-ai generated prompt: **11048**.  
Tokens used by the LLM to generate the answer: **1647**.

### Petition gh-notify file generation.

```md
# File generation 

**Generate** a new **file** called **gh-notify** whose content is all the **last** *previously generated code* using the **generate_file* tool.
```

#### Assistant Response

Great! The **gh-notify** file has been successfully generated with the code.

#### Petition Usage

Total tokens used: **6638**
Tokens used by the gh-ai generated prompt: **6620**.  
Tokens used by the LLM to generate the answer: **18**.

### Total Usage

Total tokens used to generate the file: **37815**.
Total tokens used by the gh-ai generated prompts: **34233**.  
Total tokens used by the LLM to generate the answer: **3582**.


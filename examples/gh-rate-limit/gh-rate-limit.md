# ChatSettings

- language: english

# Extension

## LanguageSettings

- language: bash
- style: Google

## Main File gh-rate-limit

gh-rate-limit is an extension of the Github Command Line Interface (Github CLI) whose purpose is to show the user their existing rate limits and when its resets. The program does exactly the same as executing the following command:

```bash
curl -fSsL -H "Authorization: token $(github_pat)" -X GET \
  https://api.github.com/rate_limit \
  | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
  | column -t
```

The program has some **Prerequisites** that are: 

+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed.
+ It is necessary to have `js installed`, so the program is able to execute it.

The program must use the *"X-GitHub-Api-Version: 2022-11-28"* version of the gh REST API and save it as a global variable inside the program. It also contains a HTTP header with the value *Accept: application/vnd.github+json* inside a global variable.

This is a small skeleton that you should use as a guide for generating the code.

```bash
help() {
  # Here goes all the program usage and the parameters and arguments list.
  # Exit the program with code 1
}

main () {
  # Processes the command line and activates the different flags specified in the main function section.
  # Check `Prerequisites`
}
```

Make sure the program is executable.

### function call

The function makes a call to the Github REST API using the `gh api` command, utilizing local variables as headers for the call. This function translates the content in the following code block, taking into account the `usage` flag to check the remaining or percentage of usage.

curl -fSsL -H "Authorization: token $(github_pat)" -X GET https://api.github.com/rate_limit | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining) \(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' | column -t

### help

### usage gh-rate-limit [options]

### parameters 

- -u Show the 'used' rather than 'remaining' limit (Activates the `usage` flag).
- -h Prints the help information of the program.

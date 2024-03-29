# Extension gh-org-members

## MainFile gh-org-members <p> 

gh-org-members is a bash script to obtain info about the members of a Github organization.

keep these annotations in mind while generating the code:

  - If the organization is not explicitly specified or there is a default org, 
    the selection will be done interactively among the list of your organizations using 'fzf'
  - You can set the default organization through the "--default" option for future uses of this program
  - When in 'fzf', use CTRL-A to select all, tab to select/deselect
  - You can merge the results of the GitHub API info with info from info in a '.csv' file using the "-c" and "-p" options. For instance: "gh org-members -jr sara -c -p ./ULL-MFP-AET-2122.csv"
  - If the option '-c' is used but the '.csv' file is not specified via the '-p' option, it will use the most recent '*.csv' file in your 'Downloads' folder mathching the regular expression pattern '/<org>.*.csv/' where 'org' refers to the specified or default organization  
  - When using '-c' it can be followed by any list of field names in the '.csv' file. 
  - The '.csv' file has to have a column named 'login' having the Github login of the members

Make sure to use the <tool>create_file</tool> tool to create the expected file! 

</p>

### Parameters

-  -v          <p> Output the version number </p>
-  -f          <p> Show name of the user (if available) </p>
-  -j          <p> returns the full json object </p> 
-  -r          <p> Only members with some field matching <regexp> will be shown </p>
-  -u          <p> Show github user url </p>
-  -l          <p> Show github user login </p>
-  -w          <p> Show github user url as a member of the org </p>
-  -s          <p> Show url of the members github pages web sites </p>
-  -o          <p> Default organization </p>
-  --default   <p> Set selected "org" as default organization for future uses </p>
-  -h          <p> Display help for command </p>
          
### Arguments

- [organization]       <p> Is an optional paramater that store the organization used by the program </p>
- [optional-argument]  <p> optional argument  Description </p>

### Help "gh org-members [options] [organization]" <p> 

help Description

</p>

## Files 

### file1 <p>
  
File 1 description paragraph 

</p>

- delp: <p> delp Function description paragraph </p>
- foo:  <p> foo function description paragraph  </p>

### file2 <p>
  
File 2 description paragraph 

</p>

## LanguageSettings

- language: Bash
- Style: Google

## Examples 

- "gh org-members -jr sara -c -p ./ULL-MFP-AET-2122.csv" <p> 
```json
[
  {
    "login": "Alex100260076",
    "name": "Alejandro Glez. Sarasola",
    "url": "https://github.com/Alex100260076",
    "role": "member",
    "site": "https://Alex100260076.github.io",
    "orgurl": "https://github.com/orgs/ULL-MFP-AET-2122/people/Alex100260076",
    "fullname": "Alejandro Glez. Sarasola",
    "id": "alu0100260076",
    "orden": "8",
    "Marca temporal": "26/10/2021 18:16:30",
    "Nombre 1": "Alejandro",
    "Apellidos": "González Sarasola",
    "Nombre": "Alejandro",
    "Primer Apellido": "González",
    "Segundo Apellido": "Sarasola",
    "Grado desde el que accede": "Ingeniería industrial",
    "Experiencia previa en la Enseñanza": "2",
    "markdown": "APTO",
    "profile": "APTO",
    "web site": "APTO",
    "pandoc": "APTO+",
    "TFP DCP": "APTO",
    "Calculada": "8,8",
    "Calificador Propuesta": "9",
    "Calificador propuesta": ""
  }
] 
```
</p>

- "gh org-members -jr cas" <p>
```json
[
  {
    "login": "crguezl",
    "name": "Casiano Rodriguez-Leon",
    "url": "https://github.com/crguezl",
    "role": "admin",
    "site": "https://crguezl.github.io",
    "orgurl": "https://github.com/orgs/ULL-MFP-AET-2122/people/crguezl",
    "fullname": "Casiano Rodriguez-Leon"
  },
  {
    "login": "casiano",
    "name": "Casiano",
    "url": "https://github.com/casiano",
    "role": "member",
    "site": "https://casiano.github.io",
    "orgurl": "https://github.com/orgs/ULL-MFP-AET-2122/people/casiano",
    "fullname": "Casiano"
  }
]
```
</p>

# ChatSettings 
 - language: english 

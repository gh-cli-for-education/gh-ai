# gh-ai

gh extension that provides help in the creation of other gh extensions using AI and prompt-engineering 

gh-ai es una extension de Github CLI(gh) que busca dar soporte a la creación de nuevas extension para Github CLI (gh) gracias a la utilización de inteligencia artificial y de la ingeniería de comandos. gh-ai busca la generación de una plantilla lista y pulida para empezar a trabajar sobre ella. 

Con solo escribir un fichero similar a un Readme.md el modelo de lenguaje es capaz de generar código con el cual seguir desarrollando la extensión. Mientras más detallada y estructurada sea la descripción de la extensión a crear, mejores serán los resultados generados por la inteligencia artificial. 

## Warnings about the usage of AI generated code

El objetivo principal de la extensión es simplificar las etapas tempranas del desarrollo de una extensión para Github CLI (gh). No se recomienda utilizar el código generado por el modelo de lenguaje sin realizar una supervisión previa acerca de la calidad y validez del código generado,es bien sabido que los modelos de lenguaje tienden a sufrir alucinaciones y es posible que genere código innecesario o incorrecto si no es capaz de entender completamente los requerimientos.

El código generado por la inteligencia artificial debe ser utilizado como guía e inspiración para realizar el verdadero código de la extensión. La extensión gh-ai puede ser útil para buscar y probar distintos enfoques, nunca para generar una extensión completa y lista para ser lanzada al público. 

## Tokens usage

# Installation

La herramienta Github CLI permite la gestión de diferentes extensiones del programa
a través de su propio gestor de paquetes gh extension. El gestor de paquetes permite:
Instalar, desinstalar y actualizar las distintas extensiones de la herramienta.
Gracias a este gestor de paquetes, instalar la extensión gh-ai se puede realizar de
manera sencilla ejecutando los siguientes comandos:

**Instalar la extensión gh-ai:**

```
gh extension install https://github.com/gh-cli-for-education/gh-ai
```

**Actualizar la extensión gh-ai:**

```
gh extension upgrade gh-ai
```

**Desintalar la extensión gh-ai:**

```
gh extension remove gh-ai
```

# Usage

Una vez realizado este paso ya es posible ejecutar la extensión siempre que se requiera
utilizando el comando:

```
gh ai <Fichero de entrada> <Directorio de salida> [Options]
```

## Arguments 

  - **input-file**: The input file used to extract the parsed data and feed the llm.
  - **output-directory**: The directory path where all the files created by the llm will be stored.

## Options

  - **-v, --version** Print the current version of the program
  - **-d, --debug** Output extra information about the execution process
  - **--tokens-verbose** Output the token usage information in each prompt
  - **--save-thread** Make the program not delete the used thread, instead it will save it inside the generated README file
  - **--save-assistant**  Make the program not delete the used assistant, instead it will save it inside the generated README file
  - **-m --llm-model \<model>** Specify which llm model would you want to use by the selected API
  - **-l, --llm-api \<API>** Select the llm \<API> to use (choices: "openai", default: "openai")
  - **-t, --command-type \<type>** Select the command needed (choices: "extension", default: "extension")
  - **-h, --help** display help for command


# The `.env` file

To be able to use your llm api key you need to specify them in a .env file

Here is an example of a .env file to fill with your own keys 

```conf
# Openai env variables
OPENAI_API_KEY= # <Put here your OpenAI API key>
OPENAI_ORG= # <Put here your OpenAI org key> 

# You can use --save-assistant or --save-tread 
# to make the program input the assisant or thread ID into the user-log.md file
ASSISTANT_ID= # <Put here an assistant ID if you want to use an existing one instead of creating a new one>
THREAD_ID= # <Put here a thread ID if you want to use an existing one instead of creating a new one> 
```

# General Desing of the input file 

La extensión gh-ai utiliza un parser propio para extraer la información del fichero de entrada. Este parser propio esta programado para ser capaz de leer ficheros con un formato muy similiar a Markdown, el objetivo de este lenguaje propio es permitirle al usuario una gran expresividad para describir la extensión a generar a la vez que otorgarle al programa la capacidad de reconocer secciones especificas del fichero para poder extraer la información necesaria. 

El lenguaje Markdown se convirtió rápidamente en la mejor opción para dar completa libertad al usuario a la hora de escribir la descripción del fichero de entrada. El mayor inconveniente del lenguaje Markdown reside en su sintaxis debido a que la gran expresividad del lenguaje viene de la mano de una carencia para controlar el contenido del mismo. 

```Json
  {
    "type": "heading",
    "depth": 1,
    "children": [
      {
        "type": "text",
        "value": "Hello",
        "position": {}
      }
    ],
    "position": {}
  }
```
Un heading Token del lenguaje Markdown  

La solución a este problema se ha conseguido a través de la creación de una simplificación del lenguaje Markdown, dicha simplificación añade nuevos tipos de Tokens así como la eliminación de todos aquellos Tokens que no eran necesarios para el fichero de entrada así como otras caracteristicas del lenguaje Markdown como puede ser la capacidad de anidar listas, bloques de código, citas, etc.

## Lexer

Como se ha comentado anteriormente en el apartado [AÑADIR APARTADO] se ha buscado simplificar el lenguaje Markdown lo máximo posible. Tras un analisis exhaustivo se ha concluido que los Tokens minimos necesarios para realizar el lenguaje son:

* Header [Ver como añadir esto al texto y poner ejemplos de los tokens]
* Highlight o InlineCode
* Code o Codeblock
* List (Tanto ordered como unordered)
* Text
* Quote

Por otro lado se han añadido toda una serie de Tokens nuevos a modo de palabras clave según las necesidades de la extensión, siendo algunas de estas palabras claves: "extension", "chatSettings", "LanguageSettings". Uno de los aspectos más importantes a la hora de incluir las palabras claves dentro del lenguaje fue mantener la filosófia de libertad expresiva añadiendo la capacidad de permitir tanto mayúsculas como minúsculas. 

## Parser

Para tener un mayor control sobre la información proporcionada por el usuario se ha diseñado una serie de reglas gramáticales cuyos objetivos son estructurar la información lo máximo posible para poder almacenar los datos extraidos de forma ordenada para luego ser utilizadas por la extensión gh-ai para generar las correspondientes instrucciones. De la mano de una mayor estructuración se busca, además, una separación de los contenidos para ayudar al usuario a centrar sus esfuerzos en escribir pequeñas y detalladas descripciones que favorezcan la visión general de la extensión a crear.  

El diseño de las diferentes secciones del fichero de entrada se basan en las secciones más comunes de un fichero Readme.md, por este motivo muchos bloques buscan detallar los diferentes casos y modos de uso de la extensión a generar por parte del modelo de lenguaje.

[Hablar de como se espera una serie de secciones ya pre establecidas]

## Semantic Actions 

[Semantic Actions para la implementación]

# Writting the input File

Para poder construir las diferentes instrucciones a utilizar durante la conversación con el modelo de lenguaje es necesario que la extensión gh-ai tenga a su disposición toda la información crucial para estructurar de manera correcta el contenido de la instrucción, detallando los aspectos más importantes y eliminando toda información innecesaria.

Por este motivo es necesario que el usuario introduzca la información a través de un fichero de entrada escrito en un lenguaje al estilo Markdown[Cita]. Dicho lenguaje esta estructurado en una serie de distintas secciones o bloques que pueden ser anidadas para construir el fichero completo, los motivos y explicación del diseño realizado serán explicados más en detalle en el cápitulo 4 del trabajo.

## Bloques principales del lenguaje 

Los bloques principales del lenguaje son aquellos que poseen un nivel de anidación 1, es decir, solo contienen un header (#)[MEJORAR ESTA PARTE] y se caracterizan por influir, en gran medida, el comportamiento del programa. Actualmente existen solo dos bloques principales, siendo uno de ellos la configuración de la conversación con el modelo de lenguaje. 

[Especificar que son las "Ayudas"]
El concepto de los bloques principales busca permitir la escritura de las diferentes ayudas que el programa ha de ser capaz de permitir, aunque por temas de legibilidad no se recomienda escribir diferentes ayudas en un mismo fichero de entrada.

### Bloque Chat settings

A la hora de realizar la conversación el usuario puede indicar una serie de parámetros para modificar el comportamiento y respuesta del modelo de lenguaje ante las instrucciones generadas, estas configuraciones permiten la usuario personalizar su experiencia con la inteligencia artificial. 

Por ahora las configuraciones del bloque **Chat Settings** son puramente estéticas. Pero se espera que en proximas versiones permita al usuario modificar parámetros más importantes como pueden ser la temperatura y...[AÑADIR MÁS VARIABLES DE LA IA].

El bloque **Chat Settings** soporta actualmente las opciones "Language" y "Nickname". La inclusión del bloque es completamente opcional debido a que la configuración posee valores por defecto los cuales son: "English" y "User" respectivamente. 

El formato del bloque **Chat Settings** es el siguiente: 

![chat-settings-grammar-rule](./doc/resources/chat-settings-grammar-rule.jpg)

A modo de ejemplo se encuentra el siguiente bloque Chat Settings

```md
[comment]: # (La separación entre las palabras Chat y Settings es arbitraria)
[comment]: # (Ambas palabras son indiferentes a las mayúsculas y minúsculas)
# Chat Settings

- language: English
- Nickname: User
- Another: Option 

[comment]: # (Pese a que el Parser permita la inclusion de opciones no existentes, el Schema del objeto saltará con un error al detectarlos)
```

### Bloque Extension 

Una de las primeras acciones que el usuario debe realizar a la hora de escribir el fichero de entrada es indicar el nombre de la extensión a crear, esto se realiza añadiendo el bloque **Extension** al fichero de entrada seguido de el nombre de la extensión: `# Extension <gh-extension-name>`.

Haciendo uso de los diferentes elementos del lenguaje Markdown se deberá escribir una descripción detallada del funcionamiento del programa a crear junto con una serie de bloques secundarios que permiten incluir detalles de utilidad a la descripción de la extensión, sirviendo como puntos de apoyo para el usuario para obtener una visión clara y estructurada de la extensión deseada.

![extension-grammar-rule](./doc/resources/extension-grammar-rule.jpg)

```md
# Extension gh-rate-limit

[comment]: # (La descripción soporta parrafos de Markdown)
gh-rate-limit is an extension of the Github Command Line Interface `(Github CLI)` whose purpose is to show the user their existing **rate limits** and when its resets. The program does exactly the same as executing the *following command*... 

[comment]: # (Acepta bloques de código)

  curl -fSsL -H "Authorization: token $(github_pat)" -X GET \
    https://api.github.com/rate_limit \
    | jq --raw-output '.resources | to_entries[] | {name: .key} + .value | "\(.name)  \(.remaining)/\(.limit)  \(.reset | strflocaltime("%H:%M:%S") )"' \
    | column -t

[comment]: # (Tambien soporta listas tanto ordenadas como desordenadas)
The program has some **Prerequisites** that are: 

+ It is necessary to have `Github CLI (gh) installed`, so the program must be able to verify that said program is installed.
+ It is necessary to have `js installed`, so the program is able to execute it.

Steps:

1. Step 1
2. Step 2
```

### Bloque Language Settings

### Bloque Function

[Hablar de Query dentro de function]

### Bloque Help

[Hablar de las diferentes secciones dentro de Help]

### Bloque Examples

### Bloque Readme

## Input file Example
 

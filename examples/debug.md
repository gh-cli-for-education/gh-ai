# chatSettings 

- language: English

# Extension

## languageSettings 

- language: Bash
- Style: Google
- Specification: aiuda

## MainFile gh-ai

Este es el primer parrafo
Esto debe ser otra linea del primer parrafo, no debe existir una separación entre las líneas

Este es el segundo parrafo 
Esto debe ser otra linea del segundo parrafo, no debe existir una separación entre las líneas
Debería haber una separación entre el primer parrafo y el segundo

Lo mismo para las listas desordenadas:

+ Primer  elemento de la lista, Debería aparecer el "+"
* Segundo elemento de la lista, Debería aparecer el "*"
+ Tercer  elemento de la lista, Debería aparecer el "+"
* Cuarto  elemento de la lista, Debería aparecer el "*"

Este es el ultimo parrafo, debería haber una separación entre la lista y este parrafo.

### function nombreDeFuncion

- argument: d

Descripción de la función

1. hacer esto
2. hacer lo otro 
3. Esto otro también 

[comment]: # (comentario)

### Help

[comment]: # (Esto es un comentario, el usage debería ser parte de la información suministrada, obligando a existir siempre en un tag help)
### Usage gh-ai <input-file> <output-directory> [options]

Esto se consideraría ya el header de la función help 
Debería seguir el mismo patrón que el resto de partes que tienen parrafos 

Añadiendo un espacio en blanco entre el resto de parrafos 

### Arguments 

- argument-zero         Descripción de una sola línea del argumento
- argument-one          Descripción de una sola línea del argumento
- argument-one-two      Descripción de una sola línea del argumento
- argument-one-two-tree Descripción de una sola línea del argumento

### Parameters 

- -s                Descripción de una sola línea del parametro
- --large-parameter Descripción de una sola línea del parametro
- --med             

Esto se consideraría ya el footer de la función help
Debería seguir el mismo patrón que el resto de partes que tienen los otros parrafos

A lo mejor puedo hacer que sea multilínea lo de los parrafos en lugar de solor leer hasta el final.

## File file2

Descripción de file2
file2 también puede contener lista no ordenadas

* elemento1
* elemento2
+ elemento3
+ elemento4

pueden contener highligths: `Esto es un highlight`

```js 
// Puede contener CODEBLOCKS
```

### function funcion

Esto es una función

## File file3

Descripción de file3
file3 también puede contener lista no ordenadas

* elemento1
* elemento2
+ elemento3
+ elemento4

pueden contener highligths: `Esto es un highlight`
`Esto es un highlight`

```js 
// Puede contener CODEBLOCKS
```

## Examples 

`ejemplo 1`

```console
El contenido da un poco igual 
```

`ejemplo 2`

```console
Puede haber más de un ejemplo
```

`ejemplo 3`

```console
Puede haber más de dos ejemplos
```

## Readme

0. Esta es la primera sección del readme
1. Esta es la segunda sección del readme
2. La verdad es que no se como se haría para hacer que cree el readme solo con listas ordenadas
3. AAAAAAAAAAAAAAAAAAAAAA

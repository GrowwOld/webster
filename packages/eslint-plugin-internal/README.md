# eslint-plugin-internal
[![Node.js CI](https://github.com/Groww/eslint-plugin-internal/actions/workflows/node.js.yml/badge.svg)](https://github.com/Groww/eslint-plugin-internal/actions/workflows/node.js.yml)

ESLint Plugin with customized rules as per requirement and preferences of devs in Groww.

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint @typescript-eslint/parser --save-dev 
```

Next, install `eslint-plugin-internal`:

```
$ npm install eslint-plugin-internal --save-dev
```


## Usage

Add `internal` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "@groww-tech/eslint-plugin-internal"
    ]
}
```


Then configure the rules you want to use under the rules section.

```json
{  
    "parser": "@typescript-eslint/parser",
    "rules": {
    "@groww-tech/internal/two-line-above-function":"error",
    }
}
```

## Supported Rules

```
avoid-negation-unary-if-else  
```
```
padded-blocks-bottom-if-else-try-catch 
```

```
prefer-type-alias
```

```
two-line-above-function
```

```
two-line-between-class-members
```

<br/>

*This plugin is for use in Groww projects. Use at your own risk.*

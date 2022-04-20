# Brainfuck Compiler

## Information

This is a simple `.bf` compiler written in TypeScript, and then compiled to JavaScript.

## Installation Instructions

- Clone the repo by running `git clone https://github.com/TheCondemner/brainfuck-compiler.git` or otherwise.
- Enter the newly created folder.
- Run `npm install` to download all package dependencies.

## Utilization

Write all your `.bf` code within the `src/` directory, and then run `npm run main` within your command line. <br>


### Arguments

You can use `comp` or `run` with the file's index to immediately compile and run it, without going through the questions. <br><br>
**Example Usage**: <br>
`$ npm run main comp 0 `<br>
`> main` <br>
`> node compiler/main.js "comp" "0"`<br><br>
`example.bf was compiled` <br>

*Note: The `comp` or `run` argument only looks at the first letter, so `c` and `r` are also valid.*

## Editing

Refer to the `typescript/README.md` for general information on editing the compiler itself.

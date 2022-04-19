# Brainfuck Compiler

## Information

This is a simple `.bf` compiler written in TypeScript, and then compiled to JavaScript.


## Utilization

Write all your `.bf` code within the `source/` directory, and then run `npm run compile` within your command line.

The selected files will then appear compiled within the `out/` directory, whereby you can run `npm run exec` to select and execute the files.

### Arguments

You can pass index-based arguments to `npm run compile` and `npm run exec`. Eg: `npm run compile 0`, this program will compile the 1st file alphabetically. 

Not passing any arguments will cause the regular TUI to pop-up. 

## Editing

Refer to the `typescript/README.md` for general information on editing the compiler itself.

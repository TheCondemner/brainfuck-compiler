"use strict";
/* ---------------------------------- Notes --------------------------------- */
//TODO Add catch exceptions n stuff
Object.defineProperty(exports, "__esModule", { value: true });
/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
const readline_sync_1 = require("readline-sync");
const locate_1 = require("./locate");
const compile_1 = require("./compile");
const process_1 = require("process");
const run_1 = require("./run");
/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function main(option, args) {
    const validFiles = option == 'compile' ? (0, locate_1.getFiles)('../src', '.bf') : (0, locate_1.getFiles)('../out', '.js');
    args = args
        .slice(1)
        .filter((arg) => {
        return validFiles
            .map((file) => `${validFiles.indexOf(file)}`)
            .includes(arg);
    })
        .map((file) => validFiles[parseInt(file)].slice(0, -3));
    let pickedFiles = [];
    if (args.length > 0) {
        pickedFiles = args;
    }
    else {
        const query = `\nWhich files do you want to ${option}?\n${validFiles
            .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`)
            .join('')}\n> `;
        pickedFiles = (0, readline_sync_1.question)(query).split(' ');
        pickedFiles = pickedFiles
            .filter((index) => {
            return validFiles
                .map((file) => `${validFiles.indexOf(file)}`)
                .includes(index);
        })
            .map((file) => validFiles[parseInt(file)].slice(0, -3));
    }
    pickedFiles.forEach((file) => {
        switch (option) {
            case 'compile': {
                (0, compile_1.compile)(file);
                console.log(`${file}.bf was compiled.`);
                break;
            }
            case 'run': {
                (0, run_1.run)(file);
                break;
            }
        }
    });
}
/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
// Get arguments and format them correctly
const args = process_1.argv.slice(2).map((val) => val[0]); // Get only value of argument, not index
switch (args[0]) {
    case 'c': {
        main('compile', args);
        break;
    }
    case 'r': {
        main('run', args);
        break;
    }
    default: {
        const query = 'Do you want to compile / run?\n(0) compile\n(1) run\n\n> ';
        const ans = (0, readline_sync_1.question)(query);
        switch (ans) {
            case '0': {
                main('compile', args);
                break;
            }
            case '1': {
                main('run', args);
                break;
            }
            default: {
                break;
            }
        }
    }
}
/*
  .filter((val) => { // Filter off invalid args
    return validFiles
      .map((file) => `${validFiles.indexOf(file)}`)
      .includes(val);
  })
  .map((val) => validFiles[parseInt(val)].slice(0, -3));
*/
/*
let pickedFiles: string[] = [];

// Either query user, or just run if valid arguments present
if (!(args.length > 0)) {
  // Query to be used in question
  const query: string = `Which .bf files do you want to compile?\n${validFiles
    .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`)
    .join('')}\n> `;
  
  pickedFiles = question(query).split(' '); // Ask user to input index of files to run via cli
  // Make sure input is valid & format it for program
  pickedFiles = pickedFiles
    .filter((index) => {
      return validFiles.map((file) => `${validFiles.indexOf(file)}`).includes(index);
    })
    .map((answer) => validFiles[parseInt(answer)].slice(0, -3));
} else {
  pickedFiles = args;
}

pickedFiles.forEach((file) => {
  compile(file);
  console.log(`${file}.bf was compiled.`);
});
*/

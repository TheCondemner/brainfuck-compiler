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
    let validFiles = option == 'compile' ? (0, locate_1.getFiles)('../src', '.bf') : (0, locate_1.getFiles)('../out', '.js');
    // Add indexes of files as valid options
    validFiles.forEach((file) => {
        validFiles.push(`${validFiles.indexOf(file)}`);
    });
    args = args.slice(1).filter((arg) => {
        return validFiles.includes(arg);
    });
    // Convert valid file indexes to file names
    args.forEach((arg) => {
        //! I didn't know a better method of validating if a string can be an integer
        try {
            if (!isNaN(parseInt(arg))) {
                args[args.indexOf(arg)] = validFiles[parseInt(arg)];
            }
        }
        catch (err) {
            // Intentionally do nothing
        }
    });
    args = [...new Set(args)].map((arg) => arg.slice(0, -3)); // Remove all duplicates & remove extension
    let pickedFiles = [];
    if (args.length > 0) {
        // If valid arguments provided
        pickedFiles = args;
    }
    else {
        // If no valid arguments provided
        const query = `\nWhich files do you want to ${option}?\n${validFiles
            .slice(0, -(validFiles.length / 2)) // Only include file names in query
            .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`) // Format query to (file_index) file_name
            .join('')}\n> `;
        pickedFiles = (0, readline_sync_1.question)(query).split(' ');
        pickedFiles = pickedFiles.filter((answer) => {
            return validFiles.includes(answer);
        });
        // Convert valid file indexes to file names
        pickedFiles.forEach((answer) => {
            //! I didn't know a better method of validating if a string can be an integer
            try {
                if (!isNaN(parseInt(answer))) {
                    pickedFiles[pickedFiles.indexOf(answer)] =
                        validFiles[parseInt(answer)];
                }
            }
            catch (err) {
                // Intentionally do nothing
            }
        });
        pickedFiles = [...new Set(pickedFiles)].map((file) => file.slice(0, -3)); // Remove all duplicates & remove extension
    }
    //? Compile / run depending on passed option
    pickedFiles.forEach((file) => {
        switch (option) {
            case 'compile': {
                (0, compile_1.compile)(file);
                console.log(`${file}.bf was compiled`);
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
const args = process_1.argv.slice(2); // Get only value of argument, not index
switch (args[0][0]) {
    // If valid args provided
    case 'c': {
        main('compile', args);
        break;
    }
    case 'r': {
        main('run', args);
        break;
    }
    default: {
        // If no valid args provided
        const query = 'Do you want to compile / run?\n(0) compile\n(1) run\n\n> ';
        const ans = (0, readline_sync_1.question)(query);
        switch (ans) {
            case 'compile':
            case 'comp':
            case 'c':
            case '0': {
                main('compile', args);
                break;
            }
            case 'run':
            case 'r':
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

/* ---------------------------------- Notes --------------------------------- */
//TODO Add catch exceptions n stuff

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { question } from 'readline-sync';
import { getFiles } from './locate';
import { compile } from './compile';
import { argv } from 'process';
import { run } from './run';

/* -------------------------------------------------------------------------- */
/*                                  Functions                                 */
/* -------------------------------------------------------------------------- */
function main(option: string, args: string[]) {
  let validFiles: string[] =
    option == 'compile' ? getFiles('../src', '.bf') : getFiles('../out', '.js');

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
    } catch (err) {
      // Intentionally do nothing
    }
  });

  args = [...new Set(args)].map((arg) => arg.slice(0, -3)); // Remove all duplicates & remove extension

  let pickedFiles: string[] = [];

  if (args.length > 0) {
    // If valid arguments provided
    pickedFiles = args;
  } else {
    // If no valid arguments provided
    const query = `\nWhich files do you want to ${option}?\n${validFiles
      .slice(0, -(validFiles.length / 2)) // Only include file names in query
      .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`) // Format query to (file_index) file_name
      .join('')}\n> `;

    pickedFiles = question(query).split(' ');

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
      } catch (err) {
        // Intentionally do nothing
      }
    });

    pickedFiles = [...new Set(pickedFiles)].map((file) => file.slice(0, -3)); // Remove all duplicates & remove extension
  }

  //? Compile / run depending on passed option
  pickedFiles.forEach((file) => {
    switch (option) {
      case 'compile': {
        compile(file);
        console.log(`${file}.bf was compiled`);
        break;
      }
      case 'run': {
        run(file);
        break;
      }
    }
  });
}

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */

// Get arguments and format them correctly
const args: any[] = argv.slice(2).map((val) => val[0]); // Get only value of argument, not index

switch (args[0]) {
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
    const query: string =
      'Do you want to compile / run?\n(0) compile\n(1) run\n\n> ';
    const ans: string = question(query);

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

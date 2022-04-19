/* ---------------------------------- Notes --------------------------------- */
//TODO Add catch exceptions n stuff

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { question } from 'readline-sync';
import * as validFiles from './locate';
import { compile } from './compile';
import { argv } from 'process';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const bfFiles: string[] = validFiles.default;

const args: any[] = argv
  .slice(2)
  .map((val) => val[0]) // Get only value of argument, not index
  .filter((val) => { // Filter off invalid args
    return bfFiles
      .map((file) => `${bfFiles.indexOf(file)}`)
      .includes(val);
  })
  .map((val) => bfFiles[parseInt(val)].slice(0, -3));

let pickedFiles: string[] = [];

// Either query user, or just run if valid arguments present
if (!(args.length > 0)) {
  // Query to be used in question
  const query: string = `Which .bf files do you want to compile?\n${bfFiles
    .map((file) => ` (${bfFiles.indexOf(file)}) ${file}\n`)
    .join('')}\n> `;
  
  pickedFiles = question(query).split(' '); // Ask user to input index of files to run via cli
  // Make sure input is valid & format it for program
  pickedFiles = pickedFiles
    .filter((index) => {
      return bfFiles.map((file) => `${bfFiles.indexOf(file)}`).includes(index);
    })
    .map((answer) => bfFiles[parseInt(answer)].slice(0, -3));  
} else { 
  pickedFiles = args;
}

pickedFiles.forEach((file) => {
  compile(file);
  console.log(`${file}.bf was compiled.`);
});

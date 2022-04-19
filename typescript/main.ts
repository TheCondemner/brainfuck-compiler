/* ---------------------------------- Notes --------------------------------- */
//TODO Add catch exceptions n stuff

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { question } from 'readline-sync';
import * as validFiles from './locate';
import { compile } from './compile';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const bfFiles: string[] = validFiles.default;

// Query to be used in question
const query: string = `Which .bf files do you want to compile?\n${bfFiles
  .map((file) => ` (${bfFiles.indexOf(file)}) ${file}\n`)
  .join('')}\n> `;
  
let pickedFiles: string[] = question(query).split(' '); // Ask user to input index of files to run via cli
// Make sure input is valid & format it for program
pickedFiles = pickedFiles
  .filter(function (index) {
    return bfFiles.map((file) => `${bfFiles.indexOf(file)}`).includes(index);
  })
  .map((answer) => bfFiles[parseInt(answer)].slice(0, -3));

pickedFiles.forEach((file) => {
  compile(file);
});

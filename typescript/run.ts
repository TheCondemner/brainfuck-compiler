/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { question } from 'readline-sync';
import { exec } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const sourcePath: string = path.join(__dirname, '../out');
const files: string[] = fs.readdirSync(sourcePath);
let validFiles: string[] = new Array<string>();

// Find all files ending with .js
files.forEach((file) => {
  if (file.length >= 4 && file.endsWith('.js')) {
    validFiles.push(file);
  }
});

// Query to be used in question
const query = `Which .js files do you want to compile?\n${validFiles
  .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`)
  .join('')}\n> `;

let pickedFiles: string[] = question(query).split(' '); // Ask user to input index of files to run via cli
// Make sure input is valid & format it for program
pickedFiles = pickedFiles
  .filter(function (index) {
    return validFiles
      .map((file) => `${validFiles.indexOf(file)}`)
      .includes(index);
  })
  .map((answer) => validFiles[parseInt(answer)]);

pickedFiles.forEach((file) => {
  exec(`node out/${file}`, (err, stdout, stderr) => {
    console.log(`\nRunning: ${file}\n\n`);

    if (err) {
      console.log(`error: ${err.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout:\n${stdout}`);
  });
});

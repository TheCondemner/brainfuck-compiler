/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import { question } from 'readline-sync';
import { exec } from 'child_process';
import { argv } from 'process';
import * as path from 'path';
import * as fs from 'fs';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const sourcePath: string = path.join(__dirname, '../out');
const files: string[] = fs.readdirSync(sourcePath);
let validFiles: string[] = [];

// Find all files ending with .js
files.forEach((file) => {
  if (file.length >= 4 && file.endsWith('.js')) {
    validFiles.push(file);
  }
});

// Get arguments and format them correctly
const args: any[] = argv
  .slice(2)
  .map((val) => val[0]) // Get only value of argument, not index
  .filter((val) => { // Filter off invalid args
    return validFiles
      .map((file) => `${validFiles.indexOf(file)}`)
      .includes(val);
  })
  .map((val) => validFiles[parseInt(val)]);

let pickedFiles: string[] = [];

// Either query user, or just run if valid arguments present
if (!(args.length > 0)) {
  // Query to be used in question
  const query = `Which .js files do you want to execute?\n${validFiles
    .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`)
    .join('')}\n> `;

  pickedFiles = question(query).split(' '); // Ask user to input index of files to run via cli
  // Make sure input is valid & format it for program
  pickedFiles = pickedFiles
    .filter(function (index) {
      return validFiles
        .map((file) => `${validFiles.indexOf(file)}`)
        .includes(index);
    })
    .map((answer) => validFiles[parseInt(answer)]);
} else {
  pickedFiles = args;
}

// Run files
pickedFiles.forEach((file) => {
  exec(`node out/${file}`, (err, stdout, stderr) => {
    console.log(`\nRunning: ${file}\n`);

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

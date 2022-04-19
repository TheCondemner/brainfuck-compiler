/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import * as path from 'path';
import * as fs from 'fs';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const sourcePath: string = path.join(__dirname, '../source');
const files: string[] = fs.readdirSync(sourcePath);
let validFiles: string[] = new Array<string>();

// Find all files ending with .js
files.forEach((file) => {
  if (file.length >= 4 && file.endsWith('.bf')) {
    validFiles.push(file);
  };
});

export default validFiles;

/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import * as p from 'path';
import * as fs from 'fs';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
export function getFiles(fpath: string, suffix: string) {
  const path: string = p.join(__dirname, fpath);
  const files: string[] = fs.readdirSync(path);
  let validFiles: string[] = [];

  // Find all files ending with the suffix
  files.forEach((file) => {
    if (file.length >= 4 && file.endsWith(suffix)) {
      validFiles.push(file);
    }
  });

  return validFiles;
}

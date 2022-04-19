/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
import * as path from 'path';
import * as fs from 'fs';

/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
export function compile(name: string) {
  const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf-8'));

  const filePath = path.join(__dirname, `../source/${name}.bf`);

  const compiledFilePath = path.join(__dirname, `../out/${name}.js`);
  const validCode = ['+', '-', '.', ',', '[', ']', '<', '>'];
  // If allowRandomGeneration property in config is true, allow ? symbol
  if (config.allowRandomGeneration) {
    validCode.push('?');
  }

  const fileContent: string[] = fs
    .readFileSync(filePath, 'utf8')
    .split('')
    .filter(function (character) {
      return validCode.includes(character);
    });

  let compiledFileContent: string =
    '/* ------------------------------- Code Header ------------------------------ */ \n' +
    'const input = require("readline-sync"); \n' +
    'const fs = require("fs"); \n' +
    'const path = require("path"); \n' +
    'const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json"), "utf-8")); \n\n' +

    'const min = config.generationRange.min; \n' +
    'const max = config.generationRange.max; \n\n' +

    'let data = new Array(30000).fill(0); \n' +
    'let pointer = 0; \n\n' +

    '/* ------------------------------ Compiled Code ----------------------------- */ \n';

  const append = (code: string) => {
    compiledFileContent += code + ' \n';
  };
  fileContent.forEach((character) => {
    //? The switch case, oh god, the switch case
    switch (character) {
      case '+': {
        append('data[pointer] += 1;');
        break;
      }
      case '-': {
        append('data[pointer] -= 1;');
        break;
      }
      case '<': {
        append(
          'if (pointer -= 1 > 0) { pointer -= 1; } else { pointer = 29999; };'
        );
        break;
      }
      case '>': {
        append(
          'if (pointer += 1 < 30000) { pointer += 1; } else { pointer = 0; };'
        );
        break;
      }
      case ',': {
        append('data[pointer] = input.question("").charCodeAt(0);');
        break;
      }
      case '.': {
        append('console.log(String.fromCharCode(data[pointer]));');
        break;
      }
      case '[': {
        append('while (data[pointer] > 0) {');
        break;
      }
      case ']': {
        append('};');
        break;
      }
      case '?': {
        append('data[pointer] = Math.floor(Math.random() * (max - min + 1) ) + min;');
        break;
      }

      default: {
        break;
      }
    };
  });

  //? Final Write
  fs.writeFileSync(compiledFilePath, compiledFileContent);
}


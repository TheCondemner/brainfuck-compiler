"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compile = void 0;
/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
function compile(name) {
    const config = JSON.parse(fs.readFileSync(path.join(__dirname, '../config.json'), 'utf-8'));
    const filePath = path.join(__dirname, `../source/${name}.bf`);
    const compiledFilePath = path.join(__dirname, `../out/${name}.js`);
    const validCode = ['+', '-', '.', ',', '[', ']', '<', '>'];
    // If allowRandomGeneration property in config is true, allow ? symbol
    if (config.allowRandomGeneration) {
        validCode.push('?');
    }
    const fileContent = fs
        .readFileSync(filePath, 'utf8')
        .split('')
        .filter(function (character) {
        return validCode.includes(character);
    });
    let compiledFileContent = '/* ------------------------------- Code Header ------------------------------ */ \n' +
        'const input = require("readline-sync"); \n' +
        'const fs = require("fs"); \n' +
        'const path = require("path"); \n' +
        'const config = JSON.parse(fs.readFileSync(path.join(__dirname, "../config.json"), "utf-8")); \n\n' +
        'const min = config.generationRange.min; \n' +
        'const max = config.generationRange.max; \n\n' +
        'let data = new Array(30000).fill(0); \n' +
        'let pointer = 0; \n\n' +
        '/* ------------------------------ Compiled Code ----------------------------- */ \n';
    const append = (code) => {
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
                append('if (pointer -= 1 > 0) { pointer -= 1; } else { pointer = 29999; };');
                break;
            }
            case '>': {
                append('if (pointer += 1 < 30000) { pointer += 1; } else { pointer = 0; };');
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
        }
        ;
    });
    //? Final Write
    fs.writeFileSync(compiledFilePath, compiledFileContent);
}
exports.compile = compile;

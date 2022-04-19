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
/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
const readline_sync_1 = require("readline-sync");
const child_process_1 = require("child_process");
const process_1 = require("process");
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const sourcePath = path.join(__dirname, '../out');
const files = fs.readdirSync(sourcePath);
let validFiles = new Array();
// Find all files ending with .js
files.forEach((file) => {
    if (file.length >= 4 && file.endsWith('.js')) {
        validFiles.push(file);
    }
});
// Get arguments and run based on them
const args = process_1.argv;
args.forEach((val, index) => {
    console.log(val, index);
});
// Query to be used in question
const query = `Which .js files do you want to execute?\n${validFiles
    .map((file) => ` (${validFiles.indexOf(file)}) ${file}\n`)
    .join('')}\n> `;
let pickedFiles = (0, readline_sync_1.question)(query).split(' '); // Ask user to input index of files to run via cli
// Make sure input is valid & format it for program
pickedFiles = pickedFiles
    .filter(function (index) {
    return validFiles
        .map((file) => `${validFiles.indexOf(file)}`)
        .includes(index);
})
    .map((answer) => validFiles[parseInt(answer)]);
pickedFiles.forEach((file) => {
    (0, child_process_1.exec)(`node out/${file}`, (err, stdout, stderr) => {
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

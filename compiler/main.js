"use strict";
/* ---------------------------------- Notes --------------------------------- */
//TODO Add catch exceptions n stuff
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
const validFiles = __importStar(require("./locate"));
const compile_1 = require("./compile");
/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
const bfFiles = validFiles.default;
// Query to be used in question
const query = `Which .bf files do you want to compile?\n${bfFiles
    .map((file) => ` (${bfFiles.indexOf(file)}) ${file}\n`)
    .join('')}\n> `;
let pickedFiles = (0, readline_sync_1.question)(query).split(' '); // Ask user to input index of files to run via cli
// Make sure input is valid & format it for program
pickedFiles = pickedFiles
    .filter(function (index) {
    return bfFiles.map((file) => `${bfFiles.indexOf(file)}`).includes(index);
})
    .map((answer) => bfFiles[parseInt(answer)].slice(0, -3));
console.log('');
pickedFiles.forEach((file) => {
    (0, compile_1.compile)(file);
    console.log(`${file}.bf was compiled.`);
});

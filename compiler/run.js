"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
/* -------------------------------------------------------------------------- */
/*                                   Imports                                  */
/* -------------------------------------------------------------------------- */
const child_process_1 = require("child_process");
/* -------------------------------------------------------------------------- */
/*                                   Runtime                                  */
/* -------------------------------------------------------------------------- */
// Run files
function run(file) {
    (0, child_process_1.exec)(`node out/${file}.js`, (err, stdout, stderr) => {
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
}
exports.run = run;

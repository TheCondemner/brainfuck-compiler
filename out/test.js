const input = require('readline-sync'); 
let data = new Array(30000);
let pointer = 0; 

data[pointer]++;
data[pointer]--;
if (pointer -= 1 > 0) { pointer--; } else { pointer = 29999; };
if (pointer += 1 < 30000) { pointer++; } else { pointer = 0; };
data[pointer] = input.question("").charCodeAt(0);
console.log(data[pointer]);
while (data[pointer] >= 0) {
};
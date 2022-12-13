export {};
var fs = require("fs");

const input: string = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

console.log("input", input);

let solutionAfter: number = 0;
for (var i = 0; i < input.length; i++) {
  if (i < 4) continue;
  if (input[i] === "\n") break;
  let toCheck: string[] = [];

  toCheck.push(input[i]);
  toCheck.push(input[i - 1]);
  toCheck.push(input[i - 2]);
  toCheck.push(input[i - 3]);
  console.log("toCheck", toCheck);

  let unique = Array.from(new Set(toCheck));
  console.log("unique", unique);

  if (unique.length === 4) {
    console.log("****************");
    console.log("we have a winner!!");
    console.log("****************");
    solutionAfter = i + 1;
    break;
  }
}

console.log("solutionAfter", solutionAfter);

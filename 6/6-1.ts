export {};
var fs = require("fs");

const input: string = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

console.log("input", input);

let solutionAfter: number = 0;
for (var i = 0; i < input.length; i++) {
  if (i < 14) continue;
  if (input[i] === "\n") break;
  let toCheck: string[] = [];

  toCheck.push(input[i]);
  toCheck.push(input[i - 1]);
  toCheck.push(input[i - 2]);
  toCheck.push(input[i - 3]);
  toCheck.push(input[i - 4]);
  toCheck.push(input[i - 5]);
  toCheck.push(input[i - 6]);
  toCheck.push(input[i - 7]);
  toCheck.push(input[i - 8]);
  toCheck.push(input[i - 9]);
  toCheck.push(input[i - 10]);
  toCheck.push(input[i - 11]);
  toCheck.push(input[i - 12]);
  toCheck.push(input[i - 13]);
  console.log("toCheck", toCheck);

  let unique = Array.from(new Set(toCheck));
  console.log("unique", unique);

  if (unique.length === 14) {
    console.log("****************");
    console.log("we have a winner!!");
    console.log("****************");
    solutionAfter = i + 1;
    break;
  }
}

console.log("solutionAfter", solutionAfter);

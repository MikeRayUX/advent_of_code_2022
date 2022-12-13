export {};
var fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines: string[] = input.split("\n");

const pairs: string[][] = [];
lines.forEach((line: string) => pairs.push(line.split(",")));

let pairsThatOverlap = 0;
pairs.forEach((pair) => {
  const [first, second] = pair;

  const [min1, max1] = first.split("-");
  const [min2, max2] = second.split("-");

  const firstRange: number[] = [];
  const secondRange: number[] = [];

  for (var i = parseInt(min1); i <= parseInt(max1); i++) {
    firstRange.push(i);
  }
  for (var j = parseInt(min2); j <= parseInt(max2); j++) {
    secondRange.push(j);
  }

  let breakLoop1 = false;
  for (var i = 0; i < firstRange.length; i++) {
    for (var j = 0; j < secondRange.length; j++) {
      if (
        firstRange.includes(secondRange[i]) ||
        secondRange.includes(firstRange[i])
      ) {
        console.log("firstRange", firstRange);
        console.log("secondRange", secondRange);
        console.log("firstRange[i]", firstRange[i]);
        console.log("secondRange[i]", secondRange[i]);
        pairsThatOverlap += 1;
        breakLoop1 = true;
        break;
      }
    }
    if (breakLoop1) break;
  }
});

console.log("pairsThatOverlap", pairsThatOverlap);

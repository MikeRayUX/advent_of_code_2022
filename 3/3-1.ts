var fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let lines: string[] = input.split("\n");
const groups: string[][] = [];

while (lines.length >= 3) {
  groups.push([lines[0], lines[1], lines[2]]);
  lines.splice(0, 3);
}

let accumulator: number = 0;
const getLetterValue = (letter: string): number => {
  // 1-26
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  // 27-52
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  let lowerCaseIndex = lowerCase.indexOf(letter);

  if (lowerCaseIndex > -1) {
    return lowerCaseIndex + 1;
  }

  return upperCase.indexOf(letter) + 1 + 26;
};

groups.forEach((group: string[]) => {
  const [one, two, three] = group;

  let commonLetter = "";

  for (const i of one) {
    for (const j of two) {
      if (i === j) {
        for (const k of three) {
          if (i === k) {
            commonLetter = i;
            break;
          }
        }
      }
    }
  }
  accumulator += getLetterValue(commonLetter);
});

// Part 2: Sum all common letters amongs groups of three
console.log("accumulator", accumulator);
export {};

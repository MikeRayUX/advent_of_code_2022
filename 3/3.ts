var fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

const allItems: string[] = input.split("\n");

let accumulator: number = 0;
allItems.forEach((item: string, index: number) => {
  console.log("item", typeof item);
  let commonLetter = "";
  let left = item.slice(0, item.length / 2);
  let right = item.slice(item.length / 2, item.length);

  for (const i of left) {
    for (const o of right) {
      if (i === o) {
        commonLetter = i;
        break;
      }
    }
  }

  // 1-26
  let lowerCase = "abcdefghijklmnopqrstuvwxyz";
  // 27-52
  let upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let letterValue = 0;

  let lowerCaseIndex = lowerCase.indexOf(commonLetter);

  if (lowerCaseIndex > -1) {
    letterValue = lowerCaseIndex + 1;
  } else {
    letterValue = upperCase.indexOf(commonLetter) + 1 + 26;
  }

  accumulator += letterValue;
});

// Part 1: Sum all common letters and their values
console.log("accumulator", accumulator);

export {};

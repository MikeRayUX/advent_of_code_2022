export {};
var fs = require("fs");

// const input = fs.readFileSync(`${__dirname}/sample_input.txt`, "utf8");
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

const lines = input.split("\n").filter((string: string) => string.length > 0);

const getIsTopLine = (lineIndex: number): boolean => {
  return lineIndex === 0;
};

const getIsBottomLine = (lineIndex: number): boolean => {
  return lineIndex === lines.length - 1;
};

const getIsOuterChar = (charIndex: number, lineLength: number): boolean => {
  return charIndex === 0 || charIndex === lineLength - 1;
};

lines.forEach((line: string) => {
  console.log(line);
});

const getIsVisibleFromTop = (
  char: string,
  charIndex: number,
  lineIndex: number
): boolean => {
  const range: string[] = [];

  for (var i = 0; i < lineIndex; i++) {
    range.push(lines[i][charIndex]);
  }

  range.reverse();

  let visibleArray: boolean[] = [];
  for (var i = 0; i < range.length; i++) {
    if (parseInt(range[i]) < parseInt(char)) {
      visibleArray.push(true);
    }
  }

  console.log("fromTop");
  console.log("char", char);
  console.log("range", range);
  console.log("isVisible", visibleArray.length === range.length);
  console.log("**********************************************");

  return visibleArray.length === range.length;
};

const getIsVisibleFromBottom = (
  char: string,
  charIndex: number,
  lineIndex: number
): boolean => {
  const range: string[] = [];

  for (var i = lineIndex + 1; i < lines.length; i++) {
    range.push(lines[i][charIndex]);
  }

  let visibleArray: boolean[] = [];
  for (var i = 0; i < range.length; i++) {
    if (parseInt(range[i]) < parseInt(char)) {
      visibleArray.push(true);
    }
  }

  console.log("fromBottom");
  console.log("char", char);
  console.log("range", range);
  console.log("isVisible", visibleArray.length === range.length);
  console.log("**********************************************");

  return visibleArray.length === range.length;
};

const getIsVisibleFromRight = (
  char: string,
  charIndex: number,
  lineIndex: number
): boolean => {
  const range: string[] = [];

  for (var i = charIndex + 1; i < lines[lineIndex].length; i++) {
    range.push(lines[lineIndex][i]);
  }

  let visibleArray: boolean[] = [];
  for (var i = 0; i < range.length; i++) {
    let rangeNum = parseInt(range[i]);
    let charNum = parseInt(char);
    if (rangeNum < charNum) {
      visibleArray.push(true);
    }
  }

  console.log("fromRight");
  console.log("char", char);
  console.log("range", range);
  console.log("isVisible", visibleArray.length === range.length);
  console.log("**********************************************");

  return visibleArray.length === range.length;
};

const getIsVisibleFromLeft = (
  char: string,
  charIndex: number,
  lineIndex: number
): boolean => {
  const range: string[] = [];

  for (var i = 0; i < charIndex; i++) {
    range.push(lines[lineIndex][i]);
  }

  range.reverse();

  let visibleArray: boolean[] = [];
  console.log("range.length", range.length);
  for (var i = 0; i < range.length; i++) {
    console.log(`comparing ${parseInt(range[i])} and ${parseInt(char)}`);
    if (parseInt(range[i]) < parseInt(char)) {
      visibleArray.push(true);
    }
  }

  console.log("fromLeft");
  console.log("char", char);
  console.log("range", range);
  console.log("isVisible", visibleArray.length === range.length);
  console.log("visibleArray", visibleArray);
  console.log("**********************************************");

  return visibleArray.length === range.length;
};

let scores: number[] = [];

const getIsVisible = (
  char: string,
  charIndex: number,
  lineIndex: number
): number => {
  if (getIsVisibleFromTop(char, charIndex, lineIndex)) return 1;
  if (getIsVisibleFromBottom(char, charIndex, lineIndex)) return 1;
  if (getIsVisibleFromRight(char, charIndex, lineIndex)) return 1;
  if (getIsVisibleFromLeft(char, charIndex, lineIndex)) return 1;
  return 0;
};

let treesVisible: number = 0;
let outerCount = lines.length * 4 - 4;
lines.forEach((line: string, lineIndex: number) => {
  if (getIsTopLine(lineIndex)) return;
  if (getIsBottomLine(lineIndex)) return;

  for (var charIndex = 0; charIndex < line.length; charIndex++) {
    if (getIsOuterChar(charIndex, line.length)) continue;

    treesVisible += getIsVisible(line[charIndex], charIndex, lineIndex);
  }
});

console.log("treesVisible", treesVisible);
console.log("outerCount", outerCount);
console.log("treesVisible + outerCount", treesVisible + outerCount);

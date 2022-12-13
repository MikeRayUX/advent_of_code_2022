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

const getIsOuterTree = (numIndex: number, lineLength: number): boolean => {
  return numIndex === 0 || numIndex === lineLength - 1;
};

lines.forEach((line: string) => {
  console.log(line);
});

type getRangeTypes = {
  numIndex: number;
  lineIndex: number;
  direction: "top" | "right" | "bottom" | "left";
};
const getRange = ({
  numIndex,
  lineIndex,
  direction,
}: getRangeTypes): string[] => {
  const range: string[] = [];

  switch (direction) {
    case "top":
      for (var i = 0; i < lineIndex; i++) {
        range.push(lines[i][numIndex]);
      }
      range.reverse();
      break;
    case "bottom":
      for (var i = lineIndex + 1; i < lines.length; i++) {
        range.push(lines[i][numIndex]);
      }
      break;
    case "right":
      for (var i = numIndex + 1; i < lines[lineIndex].length; i++) {
        range.push(lines[lineIndex][i]);
      }
      break;
    case "left":
      for (var i = 0; i < numIndex; i++) {
        range.push(lines[lineIndex][i]);
      }
      range.reverse();
      break;
    default:
      break;
  }

  return range;
};

const getScore = (range: string[], num: number): number => {
  let score: number = 0;
  console.log("range.length", range.length);
  for (var i = 0; i < range.length; i++) {
    if (parseInt(range[i]) < num) {
      score += 1;
      continue;
    }

    if (parseInt(range[i]) === num) {
      score += 1;
      break;
    }

    if (parseInt(range[i]) > num) {
      score += 1;
      break;
    }
  }

  return score;
};

let visibilityScores: number[] = [];
const getVisibilityScore = (
  num: number,
  numIndex: number,
  lineIndex: number
): number => {
  let top: number = getScore(
    getRange({ numIndex, lineIndex, direction: "top" }),
    num
  );
  let left: number = getScore(
    getRange({ numIndex, lineIndex, direction: "left" }),
    num
  );
  let right: number = getScore(
    getRange({ numIndex, lineIndex, direction: "right" }),
    num
  );
  let bottom: number = getScore(
    getRange({ numIndex, lineIndex, direction: "bottom" }),
    num
  );

  return top * left * right * bottom;
};

lines.forEach((line: string, lineIndex: number) => {
  if (getIsTopLine(lineIndex)) return;
  if (getIsBottomLine(lineIndex)) return;

  for (var numIndex = 0; numIndex < line.length; numIndex++) {
    if (getIsOuterTree(numIndex, line.length)) continue;

    visibilityScores.push(
      getVisibilityScore(parseInt(line[numIndex]), numIndex, lineIndex)
    );
  }
});

console.log("visibilityScores", visibilityScores);
console.log("Math.max(...visibilityScores)", Math.max(...visibilityScores));
// answer 405769

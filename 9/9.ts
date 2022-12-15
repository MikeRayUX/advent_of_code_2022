export {};
var fs = require("fs");
const util = require("util");
// const input = fs.readFileSync(`${__dirname}/sample_input.txt`, "utf8");
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines = input
  .split("\n")
  .filter((item: string) => item.length > 0)
  .map((item: string) => item.split(" "));

// Create Grid
let grid: string[][] = [];
for (var i = 0; i < 1000; i++) {
  let line: string[] = [];

  for (var j = 0; j < 1000; j++) {
    line.push(".");
  }
  grid.push(line);
}

type Coord = number[];
const tailLocations: Coord[] = [];
let startLocation: Coord = [grid.length / 2, 500];
// let startLocation: Coord = [grid.length - 1, 0];
let hLocation: Coord = [...startLocation];
let tLocation: Coord = [...startLocation];
let moveCount = 0;

const logTailLocation = (line: number, col: number) => {
  let alreadyLogged = false;

  tailLocations.forEach((coord: Coord) => {
    if (coord[0] === line && coord[1] === col) {
      alreadyLogged = true;
    }
  });

  if (alreadyLogged) return;

  tailLocations.push([line, col]);
};

grid[startLocation[0]][startLocation[1]] = "H";
logTailLocation(startLocation[0], startLocation[1]);

type HitWallTypes = {
  direction: "U" | "D" | "L" | "R";
  lineIndex: number;
  columnIndex: number;
};

const hitWall = ({
  direction,
  lineIndex,
  columnIndex,
}: HitWallTypes): boolean => {
  if (direction === "U") return lineIndex < 0;
  if (direction === "D") return lineIndex > grid.length - 1;
  if (direction === "L") return columnIndex < 0;
  if (direction === "R") return grid[lineIndex].length - 1 < columnIndex;
  return false;
};

const adjustTail = (lastDirection: "U" | "L" | "D" | "R") => {
  // console.log("adjustTail()");
  const [hLine, hCol] = hLocation;
  const [tLine, tCol] = tLocation;

  if (grid[tLine][tCol] === ".") {
    grid[tLine][tCol] = "T";
    return;
  }

  if (hLine === tLine && hCol === tCol) return;

  // console.log("hLocation", hLocation);
  // console.log("tLocation", tLocation);
  // if h is two steps right, move T 1 spaces to right
  if (tCol + 2 === hCol && hLine === tLine) {
    grid[tLine][tCol] = "#";
    tLocation[1] = tCol + 1;
    grid[tLocation[0]][tLocation[1]] = "T";
    logTailLocation(tLocation[0], tLocation[1]);
    // console.log("after T Move (1 step to right)", grid);
    return;
  }
  // if h is two steps left, move T 1 spaces to left
  if (tCol - 2 === hCol && hLine === tLine) {
    grid[tLine][tCol] = "#";
    tLocation[1] = tCol - 1;
    grid[tLocation[0]][tLocation[1]] = "T";
    logTailLocation(tLocation[0], tLocation[1]);
    // console.log("after T Move (1 step to left)", grid);
    return;
  }
  // if h is two steps up, move T 1 spaces to up
  if (tLine - 2 === hLine && tCol === hCol) {
    grid[tLine][tCol] = "#";
    tLocation[0] = tLine - 1;
    grid[tLocation[0]][tLocation[1]] = "T";
    logTailLocation(tLocation[0], tLocation[1]);
    // console.log("after T Move (1 step up)", grid);
    return;
  }
  // if h is two steps down, move T 1 spaces to down
  if (tLine + 2 === hLine && tCol === hCol) {
    grid[tLine][tCol] = "#";
    tLocation[0] = tLine + 1;
    grid[tLocation[0]][tLocation[1]] = "T";
    logTailLocation(tLocation[0], tLocation[1]);
    // console.log("after T Move (1 step down)", grid);
    return;
  }

  if (
    tLine - 2 === hLine ||
    tLine + 2 === hLine ||
    tCol - 2 === hCol ||
    tCol + 2 === hCol
  ) {
    // if (tLine !== hLine && hCol !== tCol) {
    if (lastDirection === "U") {
      // snap to bottom of H (hLine + 1)
      grid[tLine][tCol] = "#";
      tLocation[0] = hLine + 1;
      tLocation[1] = hCol;
      grid[tLocation[0]][tLocation[1]] = "T";
      logTailLocation(tLocation[0], tLocation[1]);
      // console.log("after T Move (snap to bottom)", grid);
      return;
    }

    if (lastDirection === "D") {
      // snap to top of H
      grid[tLine][tCol] = "#";
      tLocation[0] = hLine - 1;
      tLocation[1] = hCol;
      grid[tLocation[0]][tLocation[1]] = "T";
      logTailLocation(tLocation[0], tLocation[1]);
      // console.log("after T Move (snap to top)", grid);
      return;
    }

    if (lastDirection === "L") {
      // snap to Right of H
      grid[tLine][tCol] = "#";
      tLocation[1] = hCol + 1;
      tLocation[0] = hLine;
      grid[tLocation[0]][tLocation[1]] = "T";
      logTailLocation(tLocation[0], tLocation[1]);
      // console.log("after T Move (snap to right)", grid);
      return;
    }

    if (lastDirection === "R") {
      // snap to Left of H
      grid[tLine][tCol] = "#";
      tLocation[1] = hCol - 1;
      tLocation[0] = hLine;
      grid[tLocation[0]][tLocation[1]] = "T";
      logTailLocation(tLocation[0], tLocation[1]);
      // console.log("after T Move (snap to left)", grid);
      return;
    }
  }

  // console.log("time to snap ok");

  // if(tLine + 2 === hLine) return
  // if(tCol + 1 === hCol) return
  // if(tCol - 1 === hCol) return
};

const headNotAdjacent = (hLocation: number[]): boolean => {
  return true;
  // return (
  //   grid[hLocation[0] - 1][hLocation[1]] !== "T" ||
  //   grid[hLocation[0] + 1][hLocation[1]] !== "T" ||
  //   grid[hLocation[0]][hLocation[1] + 1] !== "T" ||
  //   grid[hLocation[0]][hLocation[1] - 1] !== "T"
  // );
};

const moveHead = (line: string[]) => {
  const [direction, spaces] = line;

  // console.log("line", line);
  // console.log("before", grid);
  if (direction === "U") {
    for (var i = 0; i < parseInt(spaces); i++) {
      // handle H
      let newLineIndex = hLocation[0] - 1;

      if (
        hitWall({
          direction: "U",
          lineIndex: newLineIndex,
          columnIndex: hLocation[1],
        })
      ) {
        // console.log("can't move up breaking");
        break;
      }
      let [hline, hCol] = hLocation;
      grid[hline][hCol] = ".";

      hLocation[0] = newLineIndex;
      let [newHLine, newHCol] = hLocation;
      grid[newHLine][newHCol] = "H";
      moveCount += 1;

      if (moveCount === 1) {
        grid[grid.length - 1][0] = "T";
      }
      // console.log(`after H Move ${i + 1}`, grid);

      if (headNotAdjacent(hLocation)) {
        adjustTail("U");
      }
      // console.log("after", grid);
    }
  }
  if (direction === "D") {
    for (var i = 0; i < parseInt(spaces); i++) {
      let newLineIndex = hLocation[0] + 1;

      if (
        hitWall({
          direction: "D",
          lineIndex: newLineIndex,
          columnIndex: hLocation[1],
        })
      ) {
        // console.log("can't move down breaking");
        break;
      }

      let [hline, hCol] = hLocation;
      grid[hline][hCol] = ".";

      hLocation[0] = newLineIndex;
      let [newHLine, newHCol] = hLocation;
      grid[newHLine][newHCol] = "H";
      moveCount += 1;

      if (moveCount === 1) {
        grid[grid.length - 1][0] = "T";
      }
      // console.log(`after H Move ${i + 1}`, grid);
      // up, down, right, left
      if (headNotAdjacent(hLocation)) {
        adjustTail("D");
      }
      // console.log("after", grid);
    }
  }
  if (direction === "L") {
    for (var i = 0; i < parseInt(spaces); i++) {
      let newColumnIndex = hLocation[1] - 1;

      if (
        hitWall({
          direction: "L",
          lineIndex: hLocation[0],
          columnIndex: newColumnIndex,
        })
      ) {
        // console.log("can't move left breaking");
        break;
      }
      let [hline, hCol] = hLocation;
      grid[hline][hCol] = ".";

      hLocation[1] = newColumnIndex;
      let [newHLine, newHCol] = hLocation;
      grid[newHLine][newHCol] = "H";
      moveCount += 1;

      if (moveCount === 1) {
        grid[grid.length - 1][0] = "T";
      }
      // console.log(`after H Move ${i + 1}`, grid);
      if (headNotAdjacent(hLocation)) {
        adjustTail("L");
      }
      // console.log("after", grid);
    }
  }
  if (direction === "R") {
    for (var i = 0; i < parseInt(spaces); i++) {
      let newColumnIndex = hLocation[1] + 1;

      if (
        hitWall({
          direction: "R",
          lineIndex: hLocation[0],
          columnIndex: newColumnIndex,
        })
      ) {
        // console.log("can't move right breaking");
        break;
      }
      let [hline, hCol] = hLocation;
      grid[hline][hCol] = ".";

      hLocation[1] = newColumnIndex;
      let [newHLine, newHCol] = hLocation;
      grid[newHLine][newHCol] = "H";
      moveCount += 1;

      if (moveCount === 1) {
        grid[grid.length - 1][0] = "T";
      }

      // console.log(`after H Move ${i + 1}`, grid);
      if (headNotAdjacent(hLocation)) {
        adjustTail("R");
      }
      // console.log("after", grid);
    }
  }
  // console.log("*******************");
};

lines.forEach((line: string[]) => {
  moveHead(line);
});

// apply # to tail location history
tailLocations.forEach((coord) => {
  grid[coord[0]][coord[1]] = "#";
});

let totalHashtags = 0;

// tabulate total '#' in grid
grid.forEach((line) => {
  line.forEach((item) => {
    if (item === "#") {
      totalHashtags += 1;
    }
  });
});
//
console.log("finalGrid", grid);

console.log("totalHashtags", totalHashtags);

import {
  canMoveUp,
  canMoveDown,
  canMoveLeft,
  canMoveRight,
  getElevation,
  getIsTreadable,
} from "./helpers";
import { Coord, Grid, GridLine, Option } from "./types";
export {};
var fs = require("fs");
let grid: Grid = fs
  .readFileSync(`${__dirname}/sample_input.txt`, "utf8")
  .split("\n")
  .filter((item: string) => item.length > 0)
  .map((item: string) => item.split(""));
// let grid: string[][] = fs.readFileSync(`${__dirname}/input.txt`, "utf8").split('\n').filter((item: string) => item.length > 0).map((item: string) => item.split(''))

let visualGrid: Grid = [];
grid.forEach((line) => visualGrid.push(Array.from(line)));
console.log("grid", grid);

const logGrid = (): void => {
  console.log("-----GRID-------");
  console.log(`explored ${explored}`);
  console.log("------------");
  console.log(`sCoords`);
  console.log(sCoords);
  console.log("------------");
  grid.forEach((line: GridLine) => console.log(line.join("")));
  // console.log("-----VISUAL GRID-------");
  // visualGrid.forEach((line: GridLine) => console.log(line.join("")));
  console.log("*******************");
};

let sCoords: Coord = {
  line: 0,
  col: 0,
  elevation: getElevation("a"),
  char: "a",
};

let adjacentChar: Coord = {
  line: 0,
  col: 0,
  elevation: getElevation("a"),
  char: "a",
};

// find and set S initial location from input
grid.forEach((line: GridLine, lineIdx: number) => {
  line.forEach((col: string, colIdx: number) => {
    if (col === "S") {
      sCoords.line = lineIdx;
      sCoords.col = colIdx;
      grid[sCoords.line][sCoords.col] = 'a'
    }
  });
});

let explored = 0;
const exploreNext = () => {
  if (explored === 20) {
    logGrid();
    return;
  }
  let options: Option[] = [];
  let char: string = ''

  if (canMoveUp(sCoords, grid)) {
    char = grid[sCoords.line - 1][sCoords.col] 

    options.push(
      {
        direction: "up",
        elevation: getElevation(char),
        marker: "^",
        char,
        coords: { line: sCoords.line - 1, col: sCoords.col },
      } as Option
    );
  }

  if (canMoveDown(sCoords, grid)) {
    char = grid[sCoords.line + 1][sCoords.col] 

    options.push(
      {
        direction: "down",
        elevation: getElevation(char),
        marker: "v",
        char,
        coords: { line: sCoords.line + 1, col: sCoords.col },
      } as Option
    );
  }

  if (canMoveLeft(sCoords, grid)) {
    char = grid[sCoords.line][sCoords.col - 1] 

    options.push(
      {
        direction: "left",
        elevation: getElevation(char),
        marker: "<",
        char,
        coords: { line: sCoords.line, col: sCoords.col - 1 },
      } as Option
    );
  }

  if (canMoveRight(sCoords, grid)) {
    char = grid[sCoords.line][sCoords.col + 1] 

    options.push(
      {
        direction: "right",
        elevation: getElevation(char),
        marker: ">",
        char,
        coords: { line: sCoords.line, col: sCoords.col + 1 },
      } as Option
    );
  }

  let [destination] = options.sort( (a, b) => b.elevation - a.elevation);

  console.log("options", options)

  console.log("destination", destination);

    // mark grid
  grid[sCoords.line][sCoords.col] = destination.marker;
  console.log(`old sCoords`)
  console.log(sCoords)
  // // update current sCoords
  sCoords.line = destination.coords.line,
  sCoords.col = destination.coords.col
  sCoords.elevation = destination.elevation,
  sCoords.char = destination.char;
  console.log(`new sCoords`)
  console.log(sCoords)

  explored += 1;
  // logGrid()
  exploreNext();

  // if (canMoveUp(sCoords, grid)) {
  //   adjacentChar = {
  //     line: sCoords.line - 1,
  //     col: sCoords.col,
  //     elevation: getElevation(grid[sCoords.line - 1][sCoords.col]),
  //     char: grid[sCoords.line - 1][sCoords.col],
  //   };
  //   if(getIsTreadable(sCoords, adjacentChar.elevation)) {
  //     // mark grid
  //     grid[sCoords.line][sCoords.col] = "^";
  //     // update current sCoords
  //     sCoords = adjacentChar;
  //     explored += 1;
  //     exploreNext();
  //   }
  // }

  // if (canMoveDown(sCoords, grid)) {
  //   adjacentChar = {
  //     line: sCoords.line + 1,
  //     col: sCoords.col,
  //     elevation: getElevation(grid[sCoords.line + 1][sCoords.col]),
  //     char: grid[sCoords.line + 1][sCoords.col],
  //   };

  //   if(getIsTreadable(sCoords, adjacentChar.elevation)) {
  //     // mark grid
  //     grid[sCoords.line][sCoords.col] = "v";
  //     // update current sCoords
  //     sCoords = adjacentChar;
  //     explored += 1;
  //     exploreNext();
  //   }
  // }

  // if (canMoveLeft(sCoords, grid)) {
  //   adjacentChar = {
  //     line: sCoords.line,
  //     col: sCoords.col - 1,
  //     elevation: getElevation(grid[sCoords.line][sCoords.col - 1]),
  //     char: grid[sCoords.line][sCoords.col - 1],
  //   };

  //   if(getIsTreadable(sCoords, adjacentChar.elevation)) {
  //     // mark grid
  //     grid[sCoords.line][sCoords.col] = "<";
  //     // update current sCoords
  //     sCoords = adjacentChar;
  //     explored += 1;
  //     exploreNext();
  //   }
  // }

  // if (canMoveRight(sCoords, grid)) {
  //   adjacentChar = {
  //     line: sCoords.line,
  //     col: sCoords.col + 1,
  //     elevation: getElevation(grid[sCoords.line][sCoords.col + 1]),
  //     char: grid[sCoords.line][sCoords.col + 1],
  //   };

  //   if(getIsTreadable(sCoords, adjacentChar.elevation)) {
  //     // mark grid
  //     grid[sCoords.line][sCoords.col] = ">";
  //     // update current sCoords
  //     sCoords = adjacentChar;
  //     explored += 1;
  //     exploreNext();
  //   }
  // }

  // logGrid();
};

exploreNext();
console.log("sCoords", sCoords);

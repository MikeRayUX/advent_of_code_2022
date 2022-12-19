
export {};
var fs = require("fs");
// let directions = fs
//   .readFileSync(`${__dirname}/sample_input.txt`, "utf8")
//   .split("")
//   .filter((item: string) => item !== "\n");
let directions = fs
  .readFileSync(`${__dirname}/input.txt`, "utf8")
  .split("")
  .filter((item: string) => item !== "\n");
let directionsCopy = [...directions]
type Pixel = "." | "@" | "#";

type Coord = {
  line: number;
  column: number;
};

type Shape = {
  index: number;
  name: "hLine" | "plus" | "angle" | "vLine" | "square";
  coords: Coord[];
  height: number;
};

type Direction = "<" | ">";

const shapes: Shape[] = [
  {
    index: 0,
    name: "hLine",
    height: 1,
    coords: [
      { line: 0, column: 2 },
      { line: 0, column: 3 },
      { line: 0, column: 4 },
      { line: 0, column: 5 },
    ],
  },
  {
    index: 1,
    name: "plus",
    height: 3,
    coords: [
      { line: 0, column: 3 },
      { line: 1, column: 2 },
      { line: 1, column: 3 },
      { line: 1, column: 4 },
      { line: 2, column: 3 },
    ],
  },
  {
    index: 1,
    name: "angle",
    height: 3,
    coords: [
      { line: 0, column: 4 },
      { line: 1, column: 4 },
      { line: 2, column: 4 },
      { line: 2, column: 3 },
      { line: 2, column: 2 },
    ],
  },
  {
    index: 2,
    name: "vLine",
    height: 4,
    coords: [
      { line: 0, column: 2 },
      { line: 1, column: 2 },
      { line: 2, column: 2 },
      { line: 3, column: 2 },
    ],
  },
  {
    index: 3,
    name: "square",
    height: 2,
    coords: [
      { line: 0, column: 2 },
      { line: 0, column: 3 },
      { line: 1, column: 2 },
      { line: 1, column: 3 },
    ],
  },
];

// assemble chamber
let chamber: Pixel[][] = [];

const logChamber = () => {
  console.clear()
  chamber.forEach((line) => {
    console.log(line.join(""));
  });
  console.log(`shapes dropped: ${shapesStopped}`)
  console.log("chamber.length", chamber.length)
  console.log("**********************");
};

const solidifyPiece = (shape: Shape) => {
  shape.coords.forEach((coord) => {
    chamber[coord.line][coord.column] = "#";
  });

  // clear excess lines
  let toClear = 0;
  chamber.forEach((line) => {
    let lineString = line.join("");

    if (lineString.includes("#") || lineString.includes("@")) return;
    toClear += 1;
  });

  for (var i = 0; i < toClear; i++) {
    chamber.shift();
  }

  floor = floor + shape.height;
  // clear shape to trigger new shape to be added
  lastShape = shape.name;
  getNextShape = true;
  shapesStopped += 1
};

const shiftHorizontally = (shape: Shape, direction: Direction): Shape => {
  let newCoords: Coord[] = [];
  for (var k = 0; k < shape.coords.length; k++) {
    newCoords.push({
      line: shape.coords[k].line,
      column:
        direction === "<"
          ? shape.coords[k].column - 1
          : shape.coords[k].column + 1,
    });
  }

  let collides = false;
  // check for new coords collision
  for (var k = 0; k < newCoords.length; k++) {
    // collides with wall
    if (newCoords[k].column < 0 || newCoords[k].column > 6) {
      // console.log(`can't move ${direction} (collides with wall)`);
      collides = true;
      break;
    }

    // collides with resting block
    if (chamber[newCoords[k].line][newCoords[k].column] === "#") {
      // console.log(`can't move ${direction} (collides with block)`);
      collides = true;
      break;
    }
  }

  if (!collides) {
    // clear old pixels from chamber
    shape.coords.forEach((coord: Coord) => {
      chamber[coord.line][coord.column] = ".";
    });

    newCoords.forEach((coord: Coord) => {
      chamber[coord.line][coord.column] = "@";
    });
    // assign new pixel coords
    shape.coords = newCoords;
  }

  return shape;
};

const shiftDown = (shape: Shape) => {
  let newCoords: Coord[] = [];
  for (var k = 0; k < shape.coords.length; k++) {
    newCoords.push({
      line: shape.coords[k].line + 1,
      column: shape.coords[k].column,
    });
  }

  let collides = false;
  // check for new coords collision
  for (var k = 0; k < newCoords.length; k++) {
    // collides with floor
    if (newCoords[k].line === chamber.length) {
      // console.log("can't move down (collides with floor)");
      collides = true;
      break;
    }

    // collides with resting block
    if (chamber[newCoords[k].line][newCoords[k].column] === "#") {
      // console.log("can't move down (collides with block)");
      collides = true;
      break;
    }
  }

  if (collides) {
    solidifyPiece(shape);
  } else {
    // clear old pixels from chamber
    shape.coords.forEach((coord: Coord) => {
      chamber[coord.line][coord.column] = ".";
    });

    newCoords.forEach((coord: Coord) => {
      chamber[coord.line][coord.column] = "@";
    });
    // assign new pixel coords
    shape.coords = newCoords;
  }
};

let lastShape: string = "square";
let floor: number = chamber.length - 1;
let shapesStopped = 0;
let getNextShape = true;
let shape: Shape = shapes.filter((shape) => shape.name === "square")[0];
const max = 1000000000000
const dropShape = () => {
  if (shapesStopped === max - 2) logChamber() 
  if(!directions.length) {
    directions = [...directionsCopy]
  }

  let [ direction ] = directions

  if (getNextShape) {
    lastShape = shape.name;
    shape = {
      ...shapes.filter((shape: Shape) => {
        if (lastShape === "square") return shape.name === "hLine";
        if (lastShape === "hLine") return shape.name === "plus";
        if (lastShape === "plus") return shape.name === "angle";
        if (lastShape === "angle") return shape.name === "vLine";
        if (lastShape === "vLine") return shape.name === "square";
      })[0],
    };

    getNextShape = false;

    // expand chamber to fit incoming piece (with proper gap)
    let gap: number = 3;
    for (var j = 0; j < shape.height + gap; j++) {
      chamber.unshift([".", ".", ".", ".", ".", ".", "."]);
      floor = chamber.length - 1;
    }

    // place shape in chamber
    shape.coords.forEach((coord) => {
      chamber[coord.line][coord.column] = "@";
    });
  }

  shape = shiftHorizontally(shape, direction as Direction);
  // move down one (if collides with shape or floor, convert to '#', freeze in place and move on to next shape)
  shiftDown(shape);

  directions.shift()
}

// show results
while(shapesStopped < max) {
  dropShape()
}

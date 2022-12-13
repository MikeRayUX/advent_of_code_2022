export {};
var fs = require("fs");

const input: string = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines: string[] = input.split("\n");

type Crate = string;
type Stack = Crate[][];

type Direction = {
  move: number;
  from: number;
  to: number;
};

let stack: Stack = [
  ["B", "Q", "C"], // 1
  ["R", "Q", "W", "Z"], // 2
  ["B", "M", "R", "L", "V"], // 3
  ["C", "Z", "H", "V", "T", "W"], // 4
  ["D", "Z", "H", "B", "N", "V", "G"], // 5
  ["H", "N", "P", "C", "J", "F", "V", "Q"], // 6
  ["D", "G", "T", "R", "W", "Z", "S"], // 7
  ["C", "G", "M", "N", "B", "W", "Z", "P"], // 8
  ["N", "J", "B", "M", "W", "Q", "F", "P"], // 9
];

const directions: Direction[] = [];

for (var i = 10; i < lines.length - 1; i++) {
  let split = lines[i].split(" ");
  const direction: Direction = {
    move: parseInt(split[1]),
    from: parseInt(split[3]) - 1,
    to: parseInt(split[5]) - 1,
  };

  directions.push(direction);
}

directions.forEach((direction: Direction) => {
  // move 3 from 6 to 2
  console.log("direction", direction);
  let toMove: string[] = [];
  for (var i = 0; i < direction.move; i++) {
    toMove.push(stack[direction.from].splice(-1)[0]);
  }
  toMove.reverse().forEach((item) => {
    stack[direction.to].push(item);
  });
});

const message: string[] = [];

stack.forEach((row) => message.push(row[row.length - 1]));
console.log("message", message.join(""));

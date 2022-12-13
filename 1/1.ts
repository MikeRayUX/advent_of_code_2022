var fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

const allItems: number[] = input
  .split("\n")
  .map((item: string) => parseInt(item));

let elves: number[] = [];
let accumulator: number = 0;

allItems.forEach((item: number) => {
  if (!item) {
    elves.push(accumulator);
    accumulator = 0;
    return;
  }

  accumulator += item;
});

// Part 1: Which elf is carrying the most calories combined
const [top1, top2, top3] = elves.sort((a, b) => b - a);
console.log("top1", top1);

// Part 2: Sum the top 3 elves
console.log("top1 + top2 + top3", top1 + top2 + top3);

export {};

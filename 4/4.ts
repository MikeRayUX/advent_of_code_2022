export {};
var fs = require("fs");

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines: string[] = input.split("\n");

const pairs: string[][] = [];
lines.forEach((line: string) => pairs.push(line.split(",")));

let pairsThatFit = 0;
pairs.forEach((pair) => {
  const [first, second] = pair;

  const [min1, max1] = first.split("-");
  const [min2, max2] = second.split("-");

  // min1-max1
  // min2-max2
  // overlaps at all
  // if (parseInt(min1) === parseInt(min2) || parseInt(max1) === parseInt(max2)) {
  //   console.log("min1 >= min2", min1 >= min2);
  //   console.log("**********************");
  //   console.log("min1", min1);
  //   console.log("min2", min2);
  //   console.log("-------------");
  //   console.log("max1", max1);
  //   console.log("max2", max2);
  //   console.log(`${first} fits inside ${second}`);
  //   pairsThatFit += 1;
  //   return;
  // }

  // 7-69 fits inside 68-69
  // first fits in second
  if (parseInt(min1) >= parseInt(min2) && parseInt(max1) <= parseInt(max2)) {
    console.log("min1 >= min2", min1 >= min2);
    console.log("**********************");
    console.log("min1", min1);
    console.log("min2", min2);
    console.log("-------------");
    console.log("max1", max1);
    console.log("max2", max2);
    console.log(`${first} fits inside ${second}`);
    pairsThatFit += 1;
    return;
  }

  // second fits in first
  if (parseInt(min2) >= parseInt(min1) && parseInt(max2) <= parseInt(max1)) {
    console.log("**********************");
    console.log("min1", min1);
    console.log("min2", min2);
    console.log("-------------");
    console.log("max1", max1);
    console.log("max2", max2);
    console.log(`${second} fits inside ${first}`);
    pairsThatFit += 1;
    return;
  }
});

console.log("pairsThatFit", pairsThatFit);

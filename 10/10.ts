export {};
var fs = require("fs");
// const input = fs.readFileSync(`${__dirname}/sample_input.txt`, "utf8");
const input = fs.readFileSync(`${__dirname}/sample_input2.txt`, "utf8");
// const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines = input
  .split("\n")
  .filter((item: string) => item.length > 0)
  .map((item: string) => item.split(" "));

let lineIndex: number = 0;
let registerX: number = 1;
let cycle: number = 1;
let waitedCycles: number = 0;

// 40 cycle checks
let addToSum: number = 0;
let registerStore: number[] = [];
let stop = false
const clock = setInterval((): void => {
  if (lineIndex === lines.length  || stop) {
    clearInterval(clock);

    const summedSignalStrength = registerStore.reduce((acc, current) => {
      return acc + current;
    }, 0);
    console.log(
      `finished: the summed signal strength is: ${summedSignalStrength}`
    );
    return;
  }
  console.log("cycle", cycle);
  console.log("waitedCycles", waitedCycles);
  console.log("registerX before", registerX);

  if (cycle === 20) {
    registerStore.push(cycle * registerX);
    console.log(`adding ${registerX} to registerStore: ${registerStore}`)
    // stop = true
    console.log("registerStore", registerStore)
  }

  if (cycle > 20) {
    addToSum += 1;
  }

  if (addToSum === 40) {
    registerStore.push(cycle * registerX);
    console.log(`adding ${registerX} to registerStore: ${registerStore}`)
    addToSum = 0;
  }

  const [command, value] = lines[lineIndex];
  console.log(`command ${command} ${value}`)

  if (command === "noop") {
    console.log("noop (do nothing)");
    cycle += 1;
    lineIndex += 1;
    console.log("******************");
    return;
  }

  if (waitedCycles === 1) {
    console.log(`Now adding ${value} to registerX`);
    registerX += parseInt(value);
    cycle += 1;
    lineIndex += 1;
    waitedCycles = 0;
    console.log("registerX after", registerX);
    console.log("******************");
    return;
  } else {
    console.log(`can't run. waited cycle(${waitedCycles}) is not 2`);
    cycle += 1;
    waitedCycles += 1;
    console.log("registerX after", registerX);
    console.log("******************");
  }
}, 0);

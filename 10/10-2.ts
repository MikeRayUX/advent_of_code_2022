export {};
var fs = require("fs");
// const input = fs.readFileSync(`${__dirname}/sample_input.txt`, "utf8");
// const input = fs.readFileSync(`${__dirname}/sample_input2.txt`, "utf8");
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const lines = input
  .split("\n")
  .filter((item: string) => item.length > 0)
  .map((item: string) => item.split(" "));

type VisualPixel = "." | "#";

type Pixel = {
  position: number;
  value: VisualPixel;
};

type SpritePosition = number;
let lineIndex: number = 0;
let registerX: number = 1;
let cycle: number = 1;
let adjustedCycle: number = 1;
let waitedCycles: number = 0;

let crt: Pixel[] = [];
let visualCrt: VisualPixel[][] = [];
// assemble crt object store
for (var i = 0; i < 40; i++) {
  crt.push({ position: i, value: "." });
}

// 40 cycle checks
let addToSum: number = 0;
let registerStore: number[] = [];
let stop: boolean = false;

const clearCrt = (): void => {
  visualCrt.push(crt.map((pixel: Pixel) => pixel.value));

  for (var i = 0; i < crt.length; i++) {
    crt[i].value = ".";
  }
};

const updateSpritePosition = (): void => {
  const spritePosition: SpritePosition[] = [
    registerX - 1,
    registerX,
    registerX + 1,
  ];

  if (adjustedCycle === 40) {
    clearCrt();
    adjustedCycle = 0;
  }
  for (var i = 0; i < spritePosition.length; i++) {
    if (spritePosition[i] === adjustedCycle - 1) {
      drawPixel(spritePosition[i]);
      break;
    } else {
    }
  }
};

const drawPixel = (spritePosition: SpritePosition): void => {
  for (var i = 0; i < crt.length; i++) {
    if (crt[i].position === spritePosition) {
      crt[i].value = "#";
      break;
    }
  }
};

const clock = setInterval((): void => {
  if (lineIndex === lines.length || stop) {
    clearInterval(clock);
    visualCrt.forEach(item => console.log(item))
    return;
  }

  updateSpritePosition();

  if (cycle === 20) {
    registerStore.push(cycle * registerX);
  }

  if (cycle > 20) {
    addToSum += 1;
  }

  if (addToSum === 40) {
    registerStore.push(cycle * registerX);
    addToSum = 0;
  }

  const [command, value] = lines[lineIndex];

  if (command === "noop") {
    cycle += 1;
    adjustedCycle += 1;
    lineIndex += 1;
    return;
  }

  if (waitedCycles === 1) {
    registerX += parseInt(value);
    cycle += 1;
    adjustedCycle += 1;
    lineIndex += 1;
    waitedCycles = 0;
    return;
  } else {
    cycle += 1;
    adjustedCycle += 1;
    waitedCycles += 1;
  }
}, 0);

let result = [
  [
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    ".",
    ".",
    ".",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    "#",
    ".",
    ".",
  ],
  [
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
  ],
  [
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
  ],
  [
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    "#",
    "#",
    ".",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    "#",
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    "#",
    ".",
    "#",
    "#",
    ".",
    "#",
    "#",
    "#",
    "#",
    ".",
    "#",
    "#",
    "#",
    ".",
    ".",
  ],
  [
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
  ],
  [
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
    ".",
    "#",
    "#",
    ".",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    "#",
    "#",
    "#",
    ".",
    ".",
    "#",
    "#",
    "#",
    ".",
    "#",
    ".",
    ".",
    "#",
    ".",
    "#",
    ".",
    ".",
    ".",
    ".",
  ],
];
// RESULT: BPJAZGAP

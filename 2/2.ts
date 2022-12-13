var fs = require("fs");

type Move = {
  shape: string;
  defeats: string;
  loses_to: string;
  score: number;
};

type RoundOneOptions = {
  A: Move;
  B: Move;
  C: Move;
};

type RoundTwoOptions = {
  X: Move;
  Y: Move;
  Z: Move;
};

type Outcome = {
  status: "loss" | "draw" | "win";
  score: number;
};

type Result = {
  opponentMove: Move;
  myMove: Move;
  outcome: Outcome;
  requiredOutcome?: string;
};

const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");

let MOVE_ONE_OPTIONS: RoundOneOptions = {
  A: {
    shape: "rock",
    defeats: "scissors",
    loses_to: "paper",
    score: 1,
  },
  B: {
    shape: "paper",
    defeats: "rock",
    loses_to: "scissors",
    score: 2,
  },
  C: {
    shape: "scissors",
    defeats: "paper",
    loses_to: "rock",
    score: 3,
  },
};

let MOVE_TWO_OPTIONS: RoundTwoOptions = {
  X: {
    shape: "rock",
    defeats: "scissors",
    loses_to: "paper",
    score: 1,
  },
  Y: {
    shape: "paper",
    defeats: "rock",
    loses_to: "scissors",
    score: 2,
  },
  Z: {
    shape: "scissors",
    defeats: "paper",
    loses_to: "rock",
    score: 3,
  },
};

const possibleScores = {
  loss: 0,
  draw: 3,
  win: 6,
};

const allItems: string[] = input.split("\n");

const getOutcome = (opponentMove: Move, myMove: Move): Outcome => {
  if (myMove.defeats === opponentMove.shape) {
    return {
      status: "win",
      score: myMove.score + possibleScores.win,
    };
  }

  if (opponentMove.defeats === myMove.shape) {
    return {
      status: "loss",
      score: myMove.score + possibleScores.loss,
    };
  }

  return {
    status: "draw",
    score: myMove.score + possibleScores.draw,
  };
};

const results: Result[] = [];

allItems.forEach((item: string) => {
  const [moveOne, moveTwo] = item.split(" ");
  let opponentMove = MOVE_ONE_OPTIONS[moveOne as keyof typeof MOVE_ONE_OPTIONS];
  let myMove = MOVE_TWO_OPTIONS[moveTwo as keyof typeof MOVE_TWO_OPTIONS];

  results.push({
    opponentMove,
    myMove,
    outcome: getOutcome(opponentMove, myMove),
  });
});

// Part 1: add up all the scores
let totalScore = 0;
results.forEach((result: Result) => {
  totalScore += result.outcome.score;
});
console.log("********");
console.log("Part 1:");
console.log("totalScore", totalScore);
console.log("********");

// Part 2: X: you lose, Y: end in a draw, Z: You need to win
const getRequiredOutcome = (move: string): string => {
  let outcome = "";

  switch (move) {
    case "X":
      outcome = "lose";
      break;
    case "Y":
      outcome = "draw";
      break;
    case "Z":
      outcome = "win";
      break;
  }

  return outcome;
};

const partTwoResults: Result[] = [];

allItems.forEach((item: string) => {
  const [one, two] = item.split(" ");

  let requiredOutcome = getRequiredOutcome(two);
  let opponentMove = MOVE_ONE_OPTIONS[one as keyof typeof MOVE_ONE_OPTIONS];
  let requiredShape = "";

  if (requiredOutcome === "lose") {
    requiredShape = opponentMove.defeats;
  }

  if (requiredOutcome === "draw") {
    requiredShape = opponentMove.shape;
  }

  if (requiredOutcome === "win") {
    requiredShape = opponentMove.loses_to;
  }

  let myMove: any;
  Object.entries(MOVE_TWO_OPTIONS).forEach((item) => {
    const [_, entry] = item;
    if (entry.shape !== requiredShape) return;
    myMove = entry;
  });

  partTwoResults.push({
    opponentMove,
    requiredOutcome,
    myMove,
    outcome: getOutcome(opponentMove, myMove),
  });
});

let partTwoTotal = 0;
partTwoResults.forEach((result: Result) => {
  partTwoTotal += result.outcome.score;
});

console.log("********");
console.log("Part 2:");
console.log("partTwoTotal", partTwoTotal);
console.log("********");

export {};

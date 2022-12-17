export {};
var fs = require("fs");
// const input = fs.readFileSync(`${__dirname}/sample_input.txt`, "utf8");
const input = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const unparsedMonkeys = input.split("\n\n");

type Monkey = {
  index: number;
  starting_items: number[];
  operation: string[];
  test: {
    divisible_by: number;
    if_true: { throw_to: number };
    if_false: { throw_to: number };
  };
  inspected: number;
};

const monkeys: Monkey[] = [];
unparsedMonkeys.forEach((unparseMonkey: string) => {
  let lines = unparseMonkey.split("\n");

  let monkey: Monkey = {
    index: parseInt(lines[0][lines[0].length - 2]),
    starting_items: lines[1]
      .split("Starting items: ")[1]
      .split(", ")
      .map((item: string) => parseInt(item)),
    operation: lines[2].split("Operation: new = ")[1].split(" "),
    test: {
      divisible_by: parseInt(lines[3].split("Test: divisible by ")[1]),
      if_true: {
        throw_to: parseInt(lines[4].split("If true: throw to monkey ")[1]),
      },
      if_false: {
        throw_to: parseInt(lines[5].split("If false: throw to monkey ")[1]),
      },
    },
    inspected: 0,
  };

  monkeys.push(monkey);
});

const MAX_ROUNDS = 10000;

let divisors: number[] = monkeys.map(monkey => monkey.test.divisible_by)
let superModulo = divisors.reduce((prev, current) => prev * current)

const inspectItems = (monkeyIndex: number) => {
  if (!monkeys[monkeyIndex].starting_items.length) return;

  let item: any = monkeys[monkeyIndex].starting_items.shift();

  monkeys[monkeyIndex].inspected += 1;
  let worryLevel = item;
  let [, sign, value] = monkeys[monkeyIndex].operation;

  // worry level operation calculation
  if (sign === "+") {
    let prev = worryLevel;
    if (value === "old") {
      worryLevel = worryLevel * 2;
    } else {
      worryLevel = worryLevel + parseInt(value);
    }
  }

  if (sign === "*") {
    let prev = worryLevel;
    if (value === "old") {
      worryLevel = worryLevel * worryLevel;
    } else {
      worryLevel = worryLevel * parseInt(value);
    }
  }

  // monkey gets bored, you feel less worried
  // worryLevel = Math.floor(worryLevel / 3.0);
  worryLevel = worryLevel % superModulo
  // worryLevel = Math.floor(worryLevel * 3)
  // worryLevel = Math.floor(worryLevel / 10) * 10;
  // worryLevel = Math.floor(worryLevel);

  if (worryLevel % monkeys[monkeyIndex].test.divisible_by === 0) {
    let receiver = monkeys.filter(
      (item: Monkey) =>
        item.index === monkeys[monkeyIndex].test.if_true.throw_to
    )[0];
    receiver.starting_items.push(worryLevel);
  } else {
    let receiver = monkeys.filter(
      (item: Monkey) =>
        item.index === monkeys[monkeyIndex].test.if_false.throw_to
    )[0];
    receiver.starting_items.push(worryLevel);
  }
  inspectItems(monkeyIndex);
};

let logRoundSummary = (i: number): void => {
  console.log(`ROUND ${i} SUMMARY`)
  console.log("monkeys", monkeys)
  console.log("****************")
  console.log("****************")
}

for (var i = 0; i < MAX_ROUNDS + 1; i++) {
  for (var j = 0; j < monkeys.length; j++) {
    inspectItems(j);
  }

  if(i + 1 === MAX_ROUNDS) {
    logRoundSummary(i + 1)
    let [first, second] = monkeys
    .map((monkey: Monkey) => monkey.inspected)
    .sort((a, b) => b - a);
    console.log("first", first);
    console.log("second", second);
    console.log("first * second", first * second);
    break
  }
}

console.log("divisors", divisors)
console.log("superModulo", superModulo)
// final anser 25712998901

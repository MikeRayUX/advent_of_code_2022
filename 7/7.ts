export {};
var fs = require("fs");
const util = require("util");

// const input: string = fs.readFileSync(`${__dirname}/input.txt`, "utf8");
const input: string = fs.readFileSync(`${__dirname}/example_input.txt`, "utf8");
const lines: string[] = input.split("\n");

type Directory = {
  [key: string]: object[];
  files: object[];
};

type File = {
  name: string;
  size: number;
  type: "file";
};

type FileTree = {
  directories: Directory[];
  files: File[];
};

let fileTree: any = {};
let workingDirectory: string[] = [];
let commandHistory: string[] = [];
const handleCommand = (line: string): void => {
  // console.log(`line ${line} is a command`);
  let [, command, argument] = line.split(" ");
  commandHistory.push(`${command} ${argument}`);

  if (line.startsWith("$ cd")) {
    if (argument === "..") {
      if (!workingDirectory.length) return;
      workingDirectory.pop();
      return;
    } else {
      workingDirectory.push(argument);

      workingDirectory.forEach((dir) => {
        if (!fileTree[dir as any]) {
          fileTree[dir as any] = {
            files: [],
          };
        }
      });
      console.log(
        `${command} ${argument} wants to change to a named directory called ${argument}`
      );
    }
  }
};

const handleOutput = (line: string): void => {
  console.log("commandHistory", commandHistory);
  let [first, second] = line.split(" ");
  let currentDirectory = workingDirectory[workingDirectory.length - 1];
  // console.log("currentDirectory", currentDirectory);

  if (first === "dir") {
    if (!fileTree[second as any]) {
      fileTree[second as any] = {
        files: [],
      };
      console.log(`${first} ${second} is a directory!`);
      return;
    }
  }

  if (parseInt(first) > 0) {
    console.log(`${first} is a filesize! and ${second} is a filename!`);
    fileTree[currentDirectory as any].files.push({
      name: second,
      type: "file",
      size: parseInt(first),
    });
    return;
  }
};

lines.forEach((line) => {
  if (line.startsWith("$")) {
    handleCommand(line);
    // console.log(workingDirectory);
    // console.log(commandHistory);
    return;
  } else {
    handleOutput(line);
  }
});

const MAX_SIZE = 100000;
const totalDeletableSize: number[] = [];

console.log(util.inspect(fileTree, false, null, true /* enable colors */));
for (const dir of Object.keys(fileTree)) {
  console.log("dir", dir);
  console.log("fileTree[dir]", fileTree[dir]);

  if (!fileTree[dir].files.length) continue;

  let total: number = 0;
  fileTree[dir].files.forEach((file: File) => {
    total += file.size;
  });

  if (total <= MAX_SIZE) {
    totalDeletableSize.push(total);
  }
}
console.log("totalDeletableSize", totalDeletableSize);
let finalTotal: number = 0;

totalDeletableSize.forEach((number) => (finalTotal += number));
console.log("finalTotal", finalTotal);

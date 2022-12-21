export {};
import { Coord, Grid, GridLine, Option } from "./types";
var fs = require("fs");
let grid: Grid = fs
  .readFileSync(`${__dirname}/sample_input.txt`, "utf8")
  .split("\n")
  .filter((item: string) => item.length > 0)
  .map((item: string) =>
    item.split("").map((item: string) => {
      if (item === "S") return item;
      if (item === "E") return 27;
      return "abcdefghijklmnopqrstuvwxyz".indexOf(item) + 1;
    })
  );

const logGrid = () => {
  grid.forEach(item => console.log(item.join(', ')))
  console.log("s", s)
  console.log("visited", visited)
  console.log("visited.length", visited.length)
}

let s: any = { val: 0, x: 0, y: 0 }

// get 'S' position
grid.forEach((line: GridLine, lineIdx: number) => line.forEach((y: number | string, colIdx: number) => y === 'S' ? s = {val: 1, x: lineIdx, y: colIdx} : null))


type Node = {
  direction: "up" | "down" | "left" | "right"
  marker: "^" | "v" | "<" | ">"
  val: any,
  x: number
  y: number
}

let visited: Node[] = []
let foundE = false
const traverseGrid = () => {
  if(foundE){
    console.log("we found E!!!! Game over")
    console.log("************************")
    logGrid()
    return
  } 

  let nodes: Node[] = []
  s.x - 1 >= 0 ? nodes.push({direction: "up", marker: "^", val: grid[s.x - 1][s.y], x: s.x - 1, y: s.y}) : null
  s.x + 1 < grid.length ? nodes.push({direction: "down",marker: "v",val: grid[s.x + 1][s.y], x: s.x + 1, y: s.y}) : null
  s.y + 1 < grid[s.x].length ? nodes.push({direction: "right",marker: ">", val: grid[s.x][s.y + 1], x: s.x, y: s.y + 1}) : null
  s.y - 1 >= 0 ? nodes.push({direction: "left", marker: "<", val: grid[s.x][s.y - 1], x: s.x, y: s.y - 1}) : null

  nodes = nodes.filter(node => typeof node.val === 'number')

  if(!nodes.length) {
    console.log("no nodes left to traverse")
    return
  }

  for(var i = 0; i < nodes.length; i++) {
    if(visited.filter((item: Node) => item.x === nodes[i].x && item.y === nodes[i].y).length > 0) continue

    let val: any = nodes[i].val

    if(nodes[i].val === 27 && nodes[i].val - s.val === 1) {
      grid[s.x][s.y] = nodes[i].marker
      foundE = true 
      visited.push(nodes[i])
      break
    }

    if(val - s.val === 1) {
      console.log("moving up one elevation")
      // apply ><^v
      grid[s.x][s.y] = nodes[i].marker
      // update s
      s.val = nodes[i].val
      s.x = nodes[i].x
      s.y = nodes[i].y
    visited.push(nodes[i])
      logGrid()
      break
    }
    if(val === s.val) {
      console.log("both are equal moving to next")
      // apply ><^v
      grid[s.x][s.y] = nodes[i].marker
      // update s
      s.val = nodes[i].val
      s.x = nodes[i].x
      s.y = nodes[i].y
    visited.push(nodes[i])
      logGrid()
      break
    }
    if(val < s.val) {
      console.log("node is lower than s.val moving to lower one")
      grid[s.x][s.y] = nodes[i].marker
      s.val = nodes[i].val
      s.x = nodes[i].x
      s.y = nodes[i].y
      visited.push(nodes[i])
      logGrid()
      break
    }
  }


  traverseGrid()
}

traverseGrid()

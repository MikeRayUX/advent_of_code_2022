export type Grid = GridLine[];
export type GridLine = string[];
export type Coord = {
  line: number;
  col: number;
  elevation: number;
  char: string;
};

export type Option = {
  direction: "up" | "down" | "left" | "right";
  elevation: number;
  marker: "^" | "v" | "<" | ">";
  char: string;
  coords: Coord;
};

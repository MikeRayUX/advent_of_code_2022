import { Coord, Grid } from "./types";

export const canMoveUp = (sCoords: Coord, grid: Grid): boolean => {
  if (sCoords.line - 1 < 0) return false;

  return spaceNotExplored(grid[sCoords.line - 1][sCoords.col]);
};

export const canMoveDown = (sCoords: Coord, grid: Grid): boolean => {
  if (sCoords.line + 1 > grid.length - 1) return false;

  return spaceNotExplored(grid[sCoords.line + 1][sCoords.col]);
};

export const canMoveLeft = (sCoords: Coord, grid: Grid): boolean => {
  if (sCoords.col - 1 < 0) return false;

  return spaceNotExplored(grid[sCoords.line][sCoords.col - 1]);
};

export const canMoveRight = (sCoords: Coord, grid: Grid): boolean => {
  if (sCoords.col + 1 > grid[sCoords.line].length - 1) return false;

  return spaceNotExplored(grid[sCoords.line][sCoords.col + 1]);
};

export const spaceNotExplored = (char: string): boolean => {
  return "v<>^".indexOf(char) === -1;
};

// -1 if not found
export const getElevation = (char: string | null): number => {
  if(char === null) return -1
  return "abcdefghijklmnopqrstuvwxyz".indexOf(char);
};

export const getIsTreadable = (sCoords: Coord, elevation: number): boolean => {
  console.log("getIsTreadable()")
  console.log("sCoords", sCoords)
  console.log("elevation", elevation)
  return ( elevation > -1 ) && (sCoords.elevation + 1 === elevation || sCoords.elevation === elevation) ;
};

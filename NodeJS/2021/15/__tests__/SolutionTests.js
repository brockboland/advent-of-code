import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { parseProblemInput, maxCorner, firstChallenge, canGoRight, canGoDown } from "../index";

describe("Grid parsing", () => {
  test("Basics", () => {
    let grid = parseProblemInput(mockInput);
    expect(grid.length).toEqual(10);
    expect(grid[0].length).toEqual(10);
    expect(grid[1][1]).toEqual(3);
    expect(grid[9][9]).toEqual(1);
  });

  test("Max corner", () => {
    let grid = parseProblemInput(mockInput);
    let corner = maxCorner(grid);
    expect(corner.y).toEqual(9);
    expect(corner.x).toEqual(9);
  });

  test("Edge detection", () => {
    let grid = parseProblemInput(mockInput);
    
    let rightPoint = {x: 9, y: 4};
    expect(canGoRight(rightPoint, grid)).toBeFalsy();
    expect(canGoDown(rightPoint, grid)).toBeTruthy();

    let bottomPoint = {x: 2, y: 9};
    expect(canGoRight(bottomPoint, grid)).toBeTruthy();
    expect(canGoDown(bottomPoint, grid)).toBeFalsy();

    let midPoint = {x: 5, y: 5};
    expect(canGoRight(midPoint, grid)).toBeTruthy();
    expect(canGoDown(midPoint, grid)).toBeTruthy();
  });
});

describe("Part 1", () => {
  // Sample input
  test("Sample", () => {
    let result = firstChallenge(mockInput);
    expect(result).toEqual(40);
  });
});

// describe("Part 2", () => {
//   // ACTUAL problem input
//   test("Problem part 2", () => {
//     let input = fileContents(realInputPath());
//     let result = secondChallenge(input);
//     // expect(result).toEqual(4775);
//   });
// });

const mockFilePath = (filename) => {
  return `${__dirname}/${filename}`;
};

const realInputPath = () => {
  return `${__dirname}/puzzleInput.txt`;
};

const mockInput = fileContents(mockFilePath("sampleInput.txt"));
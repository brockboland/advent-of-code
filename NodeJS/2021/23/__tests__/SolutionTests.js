import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, secondChallenge } from "../index";

describe("Grid parsing", () => {
  test("Cave validation", () => {
    // expect(isBigCave("OKTHEN")).toBe(true);
  });
});

describe("Part 1", () => {
  // ACTUAL problem input
  test("Problem part 1", () => {
    let input = fileContents(realInputPath());
    let result = firstChallenge(input);
    // expect(result).toEqual(4775);
  });
});

describe("Part 2", () => {
  // ACTUAL problem input
  test("Problem part 2", () => {
    let input = fileContents(realInputPath());
    let result = secondChallenge(input);
    // expect(result).toEqual(4775);
  });
});

const mockFilePath = (filename) => {
  return `${__dirname}/${filename}`;
};

const realInputPath = () => {
  return `${__dirname}/puzzleInput.txt`;
};

const mockInput = fileContents(mockFilePath("sampleInput.txt"));
import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, processCaveSystem, smallCavesInSystem, isBigCave, isStartOrEnd, validPathsThrough, secondChallenge, secondChallengePaths } from "../index";


describe("General Cave Stuff",() => {
  test("Cave validation", () => {
    expect(isBigCave("start")).toBe(false);
    expect(isBigCave("end")).toBe(false);
    expect(isBigCave("a")).toBe(false);
    expect(isBigCave("b")).toBe(false);
    expect(isBigCave("c")).toBe(false);
    expect(isBigCave("A")).toBe(true);
    expect(isBigCave("B")).toBe(true);
    expect(isBigCave("OKTHEN")).toBe(true);
  });

  test("Start and end caves", () => {
    expect(isStartOrEnd("start")).toBe(true);
    expect(isStartOrEnd("end")).toBe(true);
    expect(isStartOrEnd("A")).toBe(false);
    expect(isStartOrEnd("b")).toBe(false);
    expect(isStartOrEnd("C")).toBe(false);
    expect(isStartOrEnd("literally anything else")).toBe(false);
    expect(isStartOrEnd("START")).toBe(false);
    expect(isStartOrEnd("END")).toBe(false);
  });

  test("Small caves", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    let caves = processCaveSystem(input);
    let smallOnes = smallCavesInSystem(caves);
    expect(smallOnes.length).toBe(3);
    expect(smallOnes).toEqual(["b", "c", "d"]);
  });
})

describe("Part 1", ()=> {

  test("Valid path structure for a small cave system", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    let caves = processCaveSystem(input);
    expect(caves.A).toEqual(["start", "c", "b", "end"]);
    expect(caves.b).toEqual(["start", "A", "d", "end"]);
    expect(caves.start).toEqual(["A", "b"]);
    expect(caves.end).toEqual(["A", "b"]);
  })
  
  test("Valid paths to end", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    let caves = processCaveSystem(input);
    let paths = validPathsThrough(caves, "b", []);

    expect(paths.length).toEqual(3);
    expect(paths[0]).toEqual(["A", "c", "A", "end"])
    expect(paths[1]).toEqual(["A", "end"])
    expect(paths[2]).toEqual(["end"])
  })

  test("Cave with 10 paths", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    expect(input.length).toEqual(7);
    let result = firstChallenge(input);
    expect(result).toEqual(10);
  });

  test("Cave with 19 paths", () => {
    let input = fileContents(mockFilePath("sample19.txt"));
    expect(input.length).toEqual(10);
    let result = firstChallenge(input);
    expect(result).toEqual(19);
  });

  test("Cave with 226 paths", () => {
    let input = fileContents(mockFilePath("sample226.txt"));
    expect(input.length).toEqual(18);
    let result = firstChallenge(input);
    expect(result).toEqual(226);
  });


  // ACTUAL problem input
  test("Problem part 1 cave", () => {
    let input = fileContents(realInputPath());
    expect(input.length).toEqual(25);
    let result = firstChallenge(input);
    expect(result).toEqual(4775);
  });
});

describe("Part 2", () => {

  test("Valid paths to end", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    let caves = processCaveSystem(input);
    let paths = validPathsThrough(caves, "b", [], "c");

    expect(paths.length).toEqual(4);
    expect(paths[0]).toEqual(["A", "c", "A", "c", "A", "end"])
    expect(paths[1]).toEqual(["A", "c", "A", "end"])
    expect(paths[2]).toEqual(["A", "end"])
    expect(paths[3]).toEqual(["end"])
  })

  test("Cave with 36 paths", () => {
    let input = fileContents(mockFilePath("sample10.txt"));
    let paths = secondChallengePaths(input);
    
    expect(paths.length).toEqual(36);
    let result = secondChallenge(input);
    expect(result).toEqual(36);
  });

  test("Cave with 103 paths", () => {
    let input = fileContents(mockFilePath("sample19.txt"));
    let result = secondChallenge(input);
    expect(result).toEqual(103);
  });

  test("Cave with 3509 paths", () => {
    let input = fileContents(mockFilePath("sample226.txt"));
    let result = secondChallenge(input);
    expect(result).toEqual(3509);
  });

    // ACTUAL problem input
    test("Problem part 2 cave", () => {
      let input = fileContents(realInputPath());
      let result = secondChallenge(input);
      expect(result).toEqual(152480);
    });
});


const mockFilePath = (filename) => { 
  return `${__dirname}/sampleInputs/${filename}` 
}

const realInputPath = () => { 
  return `${__dirname}/puzzleInput.txt` 
}
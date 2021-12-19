import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, processCaveSystem, isBigCave, validPathsThrough, secondChallenge } from "../index";

describe("Part 1", ()=> {
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

    console.log("Valid paths", paths);

    expect(paths.length).toEqual(3);
    expect(paths[0]).toEqual(["A", "c", "A", "end"])
    expect(paths[1]).toEqual(["A", "end"])
    expect(paths[2]).toEqual(["end"])
  })

  // test("Cave with 10 paths", () => {
  //   let input = fileContents(mockFilePath("sample10.txt"));
  //   expect(input.length).toEqual(7);
  //   let result = firstChallenge(input);
  //   expect(result).toEqual(10);
  // });

  // test("Cave with 19 paths", () => {
  //   let input = fileContents(mockFilePath("sample19.txt"));
  //   expect(input.length).toEqual(10);
  //   let result = firstChallenge(input);
  //   expect(result).toEqual(19);
  // });

  // test("Cave with 226 paths", () => {
  //   let input = fileContents(mockFilePath("sample226.txt"));
  //   expect(input.length).toEqual(18);
  //   let result = firstChallenge(input);
  //   expect(result).toEqual(226);
  // });
});


const mockFilePath = (filename) => { 
  return `${__dirname}/sampleInputs/${filename}` 
}
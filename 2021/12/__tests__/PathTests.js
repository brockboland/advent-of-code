import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, secondChallenge } from "../index";

describe("Part 1", ()=> {

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
});


const mockFilePath = (filename) => { 
  return `${__dirname}/sampleInputs/${filename}` 
}
import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, secondChallenge } from "../index";

test("Cave with 10 paths", () => {
  let input = fileContents("./mocks/sample10.txt");
  let result = firstChallenge(input);
  expect(result).toEqual(10);
});

test("Cave with 19 paths", () => {
  let input = fileContents("./mocks/sample19.txt");
  let result = firstChallenge(input);
  expect(result).toEqual(19);
});

test("Cave with 226 paths", () => {
  let input = fileContents("./mocks/sample226.txt");
  let result = firstChallenge(input);
  expect(result).toEqual(226);
});

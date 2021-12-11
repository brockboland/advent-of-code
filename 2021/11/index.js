import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");


// PART 1
let part1 = corruptLineScore(sampleInput);
console.log("Corrupt line score: ", part1);

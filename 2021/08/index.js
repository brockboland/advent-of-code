import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");


function uniqueOutputs(input) {
    let sum = 0;
    for(let l in input) {
        let line = input[l];
        let [signals, outputValue] = line.split(" | ");
        let outputs = outputValue.split(" ");
        outputs.forEach(val => {
            let check = val.length;
            if (check == 2 || check == 4 || check == 3 || check == 7) {
                sum++;
            }
        });
    }
    return sum;
}


function totalOutputSum(input) {
    let sum = 0;
    for(let l in input) {
        let line = input[l];
        let [signals, outputValue] = line.split(" | ");
        let outputs = outputValue.split(" ");
        outputs.forEach(val => {
            let check = val.length;
            if (check == 2 || check == 4 || check == 3 || check == 7) {
                sum++;
            }
        });
    }
    return sum;
}


// PART 1
let part1 = uniqueOutputs(fullInput);
console.log("1, 4, 7, 8 appear: ", part1);

// PART 2
let part2 = totalOutputSum(sampleInput);
console.log("Total output sums: ", part2);
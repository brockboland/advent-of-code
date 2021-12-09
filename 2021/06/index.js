import { fileContents } from "advent-of-code-2021-a1329730-utils";

// let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function populationSize(input, days) {
    var school = input[0].split(",").map(n => parseInt(n));
    for(let d = 0; d < days; d++){
        let startingPopulation = school.length;
        console.log(`On day ${d} we have ${startingPopulation} fish`);
        for(let f = 0; f < startingPopulation; f++) {
            if (school[f] == 0) {
                school[f] = 6;
                school.push(8);
            } else {
                school[f]--;
            }
        }
    }
    return school.length;
}


// PART 1
// let population = populationSize(fullInput, 80);
// console.log("After 80 days", population);

// PART 2
let bigPopulation = populationSize(sampleInput, 200);
console.log("After 256 days", bigPopulation);
import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

const maxFishDayCount = 8;

function populationSize(input, days) {
    var school = input[0].split(",").map(n => parseInt(n));
    let fishPerDay = listToPopulationCount(school);

    for(let d = 0; d < days; d++){
        let newFishToCreate = fishPerDay[0];
        let fishForTomorrow = {};
        for(let i = 1; i <= maxFishDayCount; i++) {
            fishForTomorrow[i - 1] = fishPerDay[i];
        }
        // Create the new babies
        fishForTomorrow[maxFishDayCount] = newFishToCreate;
        // Reset the new moms
        fishForTomorrow[6] += newFishToCreate;

        fishPerDay = fishForTomorrow;
    }

    return totalFishCount(fishPerDay);
}

function listToPopulationCount(list) {
    let fishPerDay = {};
    for(let i = 0; i <= maxFishDayCount; i++) {
        fishPerDay[i] = 0;
    }

    for(let f in list) {
        let dayCount = list[f];
        fishPerDay[dayCount]++;
    }
    return fishPerDay;
}

function totalFishCount(fishPerDay) {
    let sum = 0;
    for(let i = 0; i <= maxFishDayCount; i++) {
        sum += fishPerDay[i];
    }
    return sum;
}


// PART 1
// let population = populationSize(sampleInput, 80);
// console.log("After 80 days", population);

// PART 2
let bigPopulation = populationSize(fullInput, 256);
console.log("After 256 days", bigPopulation);
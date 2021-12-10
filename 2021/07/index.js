import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function linearFuelUsed(inputs) {
    let crabPositions = inputs.split(',').map(n => parseInt(n));
    crabPositions.sort((a, b) => a - b);

    let medianPosition = crabPositions[Math.floor(crabPositions.length / 2)];
    
    let fuelSum = 0;
    for(let c in crabPositions) {
        fuelSum += Math.abs(crabPositions[c] - medianPosition);
    }
    return fuelSum;
}

function increasingFuelUsed(inputs) {
    let crabPositions = inputs.split(',').map(n => parseInt(n));
    crabPositions.sort((a, b) => a - b);

    let averagePosition = Math.floor(arrayAverage(crabPositions));
    
    let fuelSum = 0;
    for(let c in crabPositions) {
        let spotsMoved = Math.abs(crabPositions[c] - averagePosition);
        let fuelUse = ((spotsMoved+1) * spotsMoved) / 2
        fuelSum += fuelUse;
    }
    return fuelSum;
}

function arrayAverage(arr) {
    let sum = arr.reduce((a,b) => a+b, 0);
    return sum / arr.length;
}


// PART 1
let fuel = linearFuelUsed(fullInput[0]);
console.log("Fuel used linearly: ", fuel);

// PART 2
let fuel2 = increasingFuelUsed(sampleInput[0]);
console.log("Fuel used that grows: ", fuel2);
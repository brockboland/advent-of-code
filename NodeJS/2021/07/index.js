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
    let range = 50;
    let start = Math.max(0, averagePosition - range);
    let end = Math.min(crabPositions[crabPositions.length-1], averagePosition + range);

    let fuelPerSpot = {};
    for(let position = start; position < end; position++) {
        let fuelUse = increasingFuelToMove(crabPositions, position);
        fuelPerSpot[position] = fuelUse;
    }

    let lowestFuel = fuelPerSpot[averagePosition];
    for (let p in fuelPerSpot) {
        lowestFuel = Math.min(fuelPerSpot[p], lowestFuel);
    }
    console.log("Discoveries: ", fuelPerSpot);
    return lowestFuel;
}

function arrayAverage(arr) {
    let sum = arr.reduce((a,b) => a+b, 0);
    return sum / arr.length;
}

function increasingFuelToMove(crabPositions, desiredPosition) {
    let fuelSum = 0;
    for(let c in crabPositions) {
        let spotsMoved = Math.abs(crabPositions[c] - desiredPosition);
        let fuelUse = ((spotsMoved+1) * spotsMoved) / 2
        fuelSum += fuelUse;
    }
    return fuelSum;
}


// PART 1: 343468, I think (forgot to note)
let fuel = linearFuelUsed(fullInput[0]);
console.log("Fuel used linearly: ", fuel);

// PART 2: 96086265
let fuel2 = increasingFuelUsed(fullInput[0]);
console.log("Fuel used that grows: ", fuel2);
import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function totalRiskPoints(input) {
    let maxX = input.length;
    let maxY = input[0].length;

    let lowPoints = [];
    outer:
    for (let x = 0; x < input.length; x++) {
        inner:
        for (let y = 0; y < input[x].length; y++) {
            let thisPointValue = parseInt(input[x][y]);
            let surroundingPoints = validPointsSurrounding({x, y}, maxX, maxY);
            for (let i in surroundingPoints) {
                let p = surroundingPoints[i];
                if (parseInt(input[p.x][p.y]) <= thisPointValue) {
                    continue inner;
                }
            }
            // If we get down here, this is a low point
            lowPoints.push({x, y});
        }
    }

    let riskLevelSum = 0;
    for(let p in lowPoints) {
        let {x, y} = lowPoints[p];
        riskLevelSum += parseInt(input[x][y]) + 1;
    }
    
    return riskLevelSum;
}

function validPointsSurrounding(point, maxX, maxY) {
    let pointsToConsider = [
        {x: point.x - 1, y: point.y},
        {x: point.x + 1, y: point.y},
        {x: point.x, y: point.y - 1},
        {x: point.x, y: point.y + 1}
    ];

    let validPoints = pointsToConsider.filter(point => {
        if (point.x < 0 || point.y < 0) {
            return false;
        }
        if (point.x >= maxX || point.y >= maxY) {
            return false;
        }
        return true;
    });

    return validPoints;
}

// PART 1
let part1 = totalRiskPoints(fullInput);
console.log("Risk value: ", part1);

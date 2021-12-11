import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

// PART 1
function totalRiskPoints(input) {
    let lows = lowPoints(input);

    let riskLevelSum = 0;
    for(let p in lows) {
        let {x, y} = lows[p];
        riskLevelSum += parseInt(input[x][y]) + 1;
    }
    
    return riskLevelSum;
}

// PART 2
function totalBasinScore(input) {
    let lows = lowPoints(input);
    let max = maxDimensions(input);

    let basinSizes = [];
    for (let l in lows) {
        let basinSize = basinSizeAround(lows[l], input, max);
        basinSizes.push(basinSize);
        console.log(`Basin size ${basinSize} around` ,lows[l]);
    }

    // Find 3 biggest basins
    basinSizes.sort((a, b) => a - b);
    console.log("Sorted basin sizes:", basinSizes);
    let top3 = basinSizes.slice(0,3);
    console.log("Top 3 basin sizes:", top3);
}

function maxDimensions(input) {
    let maxX = input.length;
    let maxY = input[0].length;
    return {maxX, maxY};
}

function lowPoints(input) {
    let {maxX, maxY} = maxDimensions(input);

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
    return lowPoints;
}

function basinSizeAround(lowPoint, input, max) {
    let basinPoints = [pointToString(lowPoint)];
    let {maxX, maxY} = max;

    let pointsToCheck = validPointsSurrounding(lowPoint, maxX, maxY).map(p => pointToString(p));
    var nextPoint = pointsToCheck.pop();
    if (nextPoint === undefined) {
        return 1;
    }

    // TODO: this isn't working right. Looping infinitely.
    do {
        let pointValue = value(input, nextPoint);
        if (pointValue < 9) {
            console.log(`Keeping ${pointValue} at `, nextPoint);
            basinPoints.push(pointToString(nextPoint));
            console.log("Basin points now", basinPoints.length);

            let spreadPoints = validPointsSurrounding(stringToPoint(nextPoint), maxX, maxY);
            for (let s in spreadPoints) {
                let p = spreadPoints[s];
                console.log("p = ", p);
                let pointStr = pointToString(p);
                console.log("Have we checked?", pointStr);
                if (basinPoints.includes(pointStr) || pointsToCheck.includes(pointStr)) {
                    console.log("Yes: skipping", pointStr);
                    continue;
                } else {
                    console.log("No, adding", pointStr);
                }
                if (input[p.x][p.y] < 9) {
                    console.log()
                    pointsToCheck.push(pointStr);
                }
            }
        } else {
            console.log("Skipping basin edge at ", nextPoint);
        }
    } while (nextPoint = pointsToCheck.pop());
    return basinPoints.length;
}

function pointToString(point) {
    return point.x + "," + point.y;
}

function stringToPoint(str) {
    let [x, y] = str.split(",");
    return {x: parseInt(x), y: parseInt(y)};   
}

function value(input, pointStr) {
    let {x, y} = stringToPoint(pointStr);
    return input[x][y];
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
let part1 = totalRiskPoints(sampleInput);
console.log("Risk value: ", part1);

// PART 2
let part2 = totalBasinScore(sampleInput);
console.log("Basin size score: ", part2);
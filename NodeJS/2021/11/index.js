import { fileContents, validPointsSurrounding, maxGridDimensions, numericGridFromInput } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function firstChallenge(input, iterations) {
    var grid = numericGridFromInput(input);
    let {maxX, maxY} = maxGridDimensions(input);

    let totalFlashCount = 0;

    for (let i = 0; i < iterations; i++) {
        let {flashCount, updatedGrid} = iterateGrid(grid, maxX, maxY);
        totalFlashCount += flashCount;
        grid = updatedGrid;
    }

    return totalFlashCount;
}

function secondChallenge(input) {
    var grid = numericGridFromInput(input);
    let {maxX, maxY} = maxGridDimensions(input);

    let i = 0
    do {
        let {flashCount, updatedGrid} = iterateGrid(grid, maxX, maxY);
        grid = updatedGrid;
        i++;
    } while (areAllOctopodsFlashing(grid) == false);

    return i;
}

function iterateGrid(grid, maxX, maxY) {
    let flashCount = 0;
    let flashPoints = [];

    // Step 1: increment the power of each octopus
    for (let x = 0; x < grid.length; x++) {
        let line = grid[x];
        
        for (let y = 0; y < line.length; y++) {
            grid[x][y]++;
            if (grid[x][y] > 9) {
                flashPoints.push({x, y});
            }
        }
    }

    // Step 2: flash
    if (flashPoints.length > 0) {
        var point = flashPoints.pop();
        do {
            let {updatedGrid, newFlashPoints} = flash(point, grid, maxX, maxY);
            flashPoints = flashPoints.concat(newFlashPoints);
            grid = updatedGrid;
        } while (point = flashPoints.pop());
    }

    // Step 3: Reset flashes
    for (let x = 0; x < grid.length; x++) {
        let line = grid[x];
        
        for (let y = 0; y < line.length; y++) {
            if (grid[x][y] > 9) {
                flashCount++;
                grid[x][y] = 0;
            }
        }
    }

    return {flashCount, updatedGrid: grid};
}

function flash(point, grid, maxX, maxY) {
    let newFlashPoints = [];
    let neighbors = validPointsSurrounding(point, maxX, maxY, true);
    for (let idx in neighbors) {
        let n = neighbors[idx];
        grid[n.x][n.y]++;
        // Only flash neighbors when they first hit 10
        if (grid[n.x][n.y] == 10) {
            newFlashPoints.push(n);
        }
    }
    return {updatedGrid: grid, newFlashPoints};
}

function areAllOctopodsFlashing(grid) {
    for (let x = 0; x < grid.length; x++) {
        const row = grid[x];
        for (let y = 0; y < row.length; y++) {
            if (row[y] != 0) {
                return false;
            }
        }
    }
    return true;
}

function printGrid(grid) {
    for (let x = 0; x < grid.length; x++) {
        console.log(grid[x].join(" "));
    }
}

// PART 1
let part1 = firstChallenge(fullInput, 100);
console.log("First challenge: ", part1);

// PART 2
let part2 = secondChallenge(fullInput);
console.log("Second challenge: ", part2);
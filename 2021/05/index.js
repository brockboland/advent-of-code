import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");


function pointsOfOverlap(input, minOverlaps, considerDiagonals) {
    let lines = [];
    var maxX = 0, maxY = 0;

    for(let idx in input) {
        let line = input[idx];
        let [startCoord, endCoord] = line.split(" -> ");
        let start = splitCoord(startCoord);
        let end = splitCoord(endCoord);
        
        maxX = Math.max(maxX, start.x, end.x);
        maxY = Math.max(maxY, start.y, end.y);

        lines.push({start, end});
    }

    let grid = generateGrid(maxX, maxY);
    grid = populateGrid(grid, lines, considerDiagonals);
    
    return grid.flatMap(n => n).reduce((sum, val) => {
        if (val >= minOverlaps) {
            return sum + 1
        }
        return sum;
    }, 0);
}

function splitCoord(coord) {
    let [x, y] = coord.split(',');
    x = parseInt(x);
    y = parseInt(y);
    return {x, y};
}

function generateGrid(maxX, maxY) {
    let grid = [];
    for(let x = 0; x <= maxX; x++) {
        grid[x] = []
        for (let y = 0; y <= maxY; y++) {
            grid[x].push(0);
        }
    }
    return grid;
}

function populateGrid(grid, lines, considerDiagonals) {
    for(let l in lines) {
        let {start, end} = lines[l];

        if(start.x == end.x) {
            // Fill in line along Y axis
            let startY = Math.min(start.y, end.y);
            let endY = Math.max(start.y, end.y);
            let x = start.x;
            for (let y = startY; y <= endY; y++) {
                grid[x][y]++;
            }
        } else if (start.y == end.y) {
            // Fill in line along X axis
            let startX = Math.min(start.x, end.x);
            let endX = Math.max(start.x, end.x);
            let y = start.y;
            for (let x = startX; x <= endX; x++) {
                grid[x][y]++;
            }
        } else if (considerDiagonals) {
            let xShift = start.x < end.x ? 1 : -1;
            let yShift = start.y < end.y ? 1 : -1;

            let {x, y} = start;
            do {
                grid[x][y]++;
                x = x + xShift;
                y = y + yShift;
            } while (x != end.x && y != end.y);
            grid[end.x][end.y]++;
        } else {
            // console.error("Skipping diagonal", lines[l]);
        }
    }
    return grid;
}

// PART 1
let overlaps = pointsOfOverlap(fullInput, 2, false);
console.log("Overalpping points:", overlaps);

// PART 2
let withDiagonals = pointsOfOverlap(fullInput, 2, true);
console.log("Overalpping points with diagonals:", withDiagonals);
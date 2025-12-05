import { assert } from "console";

export const validPointsSurrounding = (point, maxX, maxY, includeDiagonals) => {
    var pointsToConsider = [
        {x: point.x - 1, y: point.y},
        {x: point.x + 1, y: point.y},
        {x: point.x, y: point.y - 1},
        {x: point.x, y: point.y + 1}
    ];

    if (includeDiagonals) {
        pointsToConsider = pointsToConsider.concat([
            {x: point.x - 1, y: point.y - 1},
            {x: point.x - 1, y: point.y + 1},
            {x: point.x + 1, y: point.y - 1},
            {x: point.x + 1, y: point.y + 1}
        ])
    }

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

export const maxGridDimensions = (input) => {
    assert(Array.isArray(input), 'Grid must be an array'); 
    assert(typeof input[0] === 'string' || Array.isArray(input[0]), 'Rows in the grid must be strings or arrays'); 
    let maxX = input.length;
    let maxY = input[0].length;
    return {maxX, maxY};
}

export const numericGridFromInput = (input) => {
    assert(Array.isArray(input), 'Grid must be an array'); 
    let finalGrid = [];
    for (let x = 0; x < input.length; x++) {
        assert(typeof input[x] === 'string' || Array.isArray(input[x]), 'Rows in the grid must be strings or arrays'); 
        finalGrid[x] = [];
        for (let y = 0; y < input[x].length; y++) {
            finalGrid[x][y] = parseInt(input[x][y]);
        }
    }
    return finalGrid;
}

export const charGridFromInput = (input) => {
    assert(Array.isArray(input), 'Grid must be an array'); 
    let finalGrid = [];
    for (let x = 0; x < input.length; x++) {
        assert(typeof input[x] === 'string' || Array.isArray(input[x]), 'Rows in the grid must be strings or arrays'); 
        finalGrid[x] = [];
        for (let y = 0; y < input[x].length; y++) {
            finalGrid[x][y] = input[x][y];
        }
    }
    return finalGrid;
}


export const coordinatesForItemsMatching = (grid, searchValue) => {
    let matchingCoordinates = [];
    for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
            if (grid[x][y] == searchValue) {
                matchingCoordinates.push({x: x, y: y});
            }
        }
    }
    return matchingCoordinates;
}

export const surroundingPointsMatching = (grid, startingPoint, includeDiagonals, searchValue) => {
    const { maxX, maxY } = maxGridDimensions(grid);

    const surrouningPoints = validPointsSurrounding(startingPoint, maxX, maxY, includeDiagonals);
    let matchingCoordinates = [];

    for (const point of surrouningPoints) {
        if (grid[point.x][point.y] == searchValue) {
            matchingCoordinates.push(point);
        }
    }

    return matchingCoordinates;
}

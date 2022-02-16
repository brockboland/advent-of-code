// Input: array of lines
// Return: {points: [], foldingInstructions: []}
export const parseProblemInput = (input) => {
    let points = [];
    let foldingInstructions = [];

    for(let i in input) {
        let line = input[i];
        if (line == "") {
            // Blank line between grid points and the folding instructions: pop out
            continue;
        }
        else if (line.startsWith("fold along")) {
            let foldBits = line.substring(11);
            let [axis, value] = foldBits.split("=");
            foldingInstructions.push({axis, value: parseInt(value)});
        }
        else {
            let [x, y] = line.split(',');
            points.push({x: parseInt(x), y: parseInt(y)});    
        }
    }
    return {points, foldingInstructions};
}

export const pointsInInput = (input) => {
    let {points} = parseProblemInput(input);
    return points.length;
};


export const pointsAfterFolding = (inputPoints, foldingInstructions) => {
    let currentPoints = [...inputPoints]
    for (let f in foldingInstructions) {
        let newPoints = [];
        for (let p in currentPoints) {
            newPoints = addPointIfUnique(newPoints, foldPointOverFold(currentPoints[p], foldingInstructions[f]))
        }
        currentPoints = newPoints;
    }

    return currentPoints;
}

export const foldPointOverFold = (point, fold) => {
    let {axis, value} = fold;
    let newPoint = {...point};
    if (point[axis] > value) {
        // Flip over the fold
        let newValue = value - (point[axis] - value);
        newPoint[axis] = newValue;
    }
    return newPoint;
}

const addPointIfUnique = (points, newPoint) => {
    let existingPoint = points.find(point => equalPoints(point, newPoint));
    if (existingPoint == undefined) {
        points.push(newPoint);
    }
    return points;
}

export const equalPoints = (a, b) => {
    return a.x == b.x && a.y == b.y;
}

export const formattedPoints = (points) => {
    let finalGrid = [];
    for (let p in points) {
        let {x, y} = points[p];
        if (finalGrid[y] == undefined) {
            finalGrid[y] = [];
        }
        finalGrid[y][x] = "#";
    }

    let size = gridSize(points);
    let overAllOutput = "";
    for(let y = 0; y <= size.y; y++) {
        let row = "";
        for(let x = 0; x <= size.x; x++) {
            if (finalGrid[y][x] == "#") {
                row += "#";
            } else {
                row += ".";
            }
        }
        overAllOutput += row + "\n";
    }
    return overAllOutput;
}

export const gridSize = (points) => {
    let allX = points.map(p => p.x);
    let allY = points.map(p => p.y);
    return {x: Math.max(...allX), y: Math.max(...allY)};
};
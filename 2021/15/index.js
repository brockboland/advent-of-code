export const parseProblemInput = (input) => {
    let grid = [];
	for (let y in input) {
        grid[y] = [];
        let line = input[y];
        for(let x in line) {
            grid[y][x] = parseInt(line[x]);
        }
    }
	return grid;
};

export const firstChallenge = (input) => {
    let grid = parseProblemInput(input);
    let finalPosition = maxCorner(grid);
    let currentPosition = {x: 0, y: 0};

    let ongoingScore = 0;

    const goDown = () => {
        let nextPosition = positionToDown(currentPosition);
        let nextPositionValue = valueAt(grid, nextPosition);
        ongoingScore += nextPositionValue;
        currentPosition = nextPosition;
        console.log(`Moved down to ${nextPosition.x},${nextPosition.y}, adding ${nextPositionValue} points`);
    }

    const goRight = () => {
        let nextPosition = positionToRight(currentPosition);
        let nextPositionValue = valueAt(grid, nextPosition);
        ongoingScore += nextPositionValue;
        currentPosition = nextPosition;
        console.log(`Moved right to ${nextPosition.x},${nextPosition.y}, adding ${nextPositionValue} points`);
    }

    // TODO: this pathfinding logic isn't good enough. It finds the next best move, but not the best path.
    do {
        let rightOK = canGoRight(currentPosition, grid);
        let downOK = canGoDown(currentPosition, grid);
        if (rightOK && downOK) {
            // Check both right and down and determine which is better
            let rightValue = valueAt(grid, positionToRight(currentPosition));
            let downValue = valueAt(grid, positionToDown(currentPosition));
            if (rightValue > downValue) {
                goDown();
            } else {
                goRight();
            }
        } else if (rightOK) {
            // Can only go right
            goRight();
        } else if (downOK) {
            // Can only go down
            goDown();
        } else {
            // Can't move at all?
            console.log("UNEXPECTED SITUATION HERE");
        }
    } while (!equalPoints(currentPosition, finalPosition))
    return ongoingScore;
};

export const maxCorner = (grid) => {
    let y = grid.length-1;
    let x = grid[y].length-1;
    return {x, y};
};

export const equalPoints = (a, b) => {
    return a.x == b.x && a.y == b.y;
}

export const canGoRight = (fromPoint, grid) => {
    return fromPoint.x < maxCorner(grid).x;
}

export const canGoDown = (fromPoint, grid) => {
    return fromPoint.y < maxCorner(grid).y;
}

const positionToRight = (startingPoint) => {
    return {x: startingPoint.x + 1, y: startingPoint.y};
}

const positionToDown = (startingPoint) => {
    return {x: startingPoint.x, y: startingPoint.y + 1};
}

const valueAt = (grid, point) => {
    return grid[point.y][point.x];
}
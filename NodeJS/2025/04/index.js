// Day 04 solution stubs (ES6 modules)
import { assert } from "console";

import { charGridFromInput, gridReplacingAtPoint, coordinatesForItemsMatching, surroundingPointsMatching } from '../utils/grid.js';

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
    assert(input.length > 0, 'Input cannot be empty');
    assert(Array.isArray(input), 'Input must be an array');

    const grid = charGridFromInput(input);
    const rollsToMove = rollsWithFewNeighbors(grid);
    return rollsToMove.length;
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array)
 */
export const part2 = (input) => {
    assert(input.length > 0, 'Input cannot be empty');
    assert(Array.isArray(input), 'Input must be an array');

    let numberOfRollsRemove = 0
    let grid = charGridFromInput(input);

    while (true) {
        const rollsToMove = rollsWithFewNeighbors(grid);
        if (rollsToMove.length > 0) {
            numberOfRollsRemove += rollsToMove.length;

            // Remove the rolls that can be moved
            for (const point of rollsToMove) {
                const newGrid = gridReplacingAtPoint(grid, point, 'x');
                grid = newGrid
            }

        } else {
            // No rolls to move, so we're done
            break
        }
    }

    return numberOfRollsRemove
};


const rollsWithFewNeighbors = (grid) => {
    const rollLocations = coordinatesForItemsMatching(grid, '@')
    let chosenRolls = [];

    for (const point of rollLocations) {
        const matchingNeighbors = surroundingPointsMatching(grid, point, true, '@');
        if (matchingNeighbors.length < 4) {
            chosenRolls.push(point);
        }
    }
    return chosenRolls
}

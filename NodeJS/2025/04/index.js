// Day 04 solution stubs (ES6 modules)
import { assert } from "console";

import { charGridFromInput, maxGridDimensions, coordinatesForItemsMatching, surroundingPointsMatching } from '../utils/grid.js';

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
    assert(input.length > 0, 'Input cannot be empty');
    assert(Array.isArray(input), 'Input must be an array');

    const grid = charGridFromInput(input);

    const rollsToMove = rollsWithFewNeighbors(grid)

    return rollsToMove.length;
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array)
 */
export const part2 = (input) => {
  assert(input.length > 0, 'Input cannot be empty');
  assert(Array.isArray(input), 'Input must be an array');
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

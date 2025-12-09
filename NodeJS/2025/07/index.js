// Day 07 solution stubs (ES6 modules)
import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array) or raw string
 */
export const part1 = (input) => {
  assert(Array.isArray(input), 'Input must be an array');

  const startingIndex = input[0].indexOf('S');
  assert(startingIndex >= 0, 'Input must contain starting point "S" on the first line');

  let beamColumnIndices = new Set([startingIndex])
  let splitCounter = 0

  for (let rowIndex = 1; rowIndex < input.length; rowIndex++) {
    const line = input[rowIndex];
    for (let colIndex = 0; colIndex < line.length; colIndex++) {
      const char = line[colIndex];

      if (char === '^' && beamColumnIndices.has(colIndex)) {
        splitCounter++

        beamColumnIndices.delete(colIndex)
        beamColumnIndices.add(colIndex - 1)
        beamColumnIndices.add(colIndex + 1)
      }
    }
  }

  return splitCounter

};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array) or raw string
 */
export const part2 = (input) => {
  assert(Array.isArray(input), 'Input must be an array');

  const startingIndex = input[0].indexOf('S');
  assert(startingIndex >= 0, 'Input must contain starting point "S" on the first line');

  return checkRoutesForSubset(startingIndex, input.slice(1), new Map());
};


const checkRoutesForSubset = (beamIndex, remainingRows, routeCache) => {
  if (remainingRows.length <= 1) {
    return 1
  }

  const cacheKey = beamIndex + '|' + remainingRows.length;
  if (routeCache.has(cacheKey)) {
    return routeCache.get(cacheKey);
  }

  const thisRow = remainingRows[0];
  const followingRows = remainingRows.slice(1);

  const charBelowBeam = thisRow[beamIndex];
  let returnValue = 0
  if (charBelowBeam === '^') {
    // Check left and right paths
    const leftBranches = checkRoutesForSubset(beamIndex - 1, followingRows, routeCache);
    const rightBranches = checkRoutesForSubset(beamIndex + 1, followingRows, routeCache);
    returnValue = leftBranches + rightBranches
  } else {
    // Continue straight
    returnValue = checkRoutesForSubset(beamIndex, followingRows, routeCache)
  }
  routeCache.set(cacheKey, returnValue);
  return returnValue
}
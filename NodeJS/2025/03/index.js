// Day 03 solution stubs (ES6 modules)

import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
    assert(Array.isArray(input));

    let runningTotal = 0;
    for (const line of input) {
        let indexOfLargestFirstDigit = 0;
        for (let i = 1; i < line.length-1; i++) {
            if (line[i] > line[indexOfLargestFirstDigit]) {
                indexOfLargestFirstDigit = i;
                if (line[i] === '9') {
                    break; // can't do better than a 9
                }
            }
        }

        let indexOfSecondLargestDigit = indexOfLargestFirstDigit + 1;
        for (let i = indexOfSecondLargestDigit; i < line.length; i++) {
            if (line[i] > line[indexOfSecondLargestDigit]) {
                indexOfSecondLargestDigit = i;
                if (line[i] === '9') {
                    break; // can't do better than a 9
                }
            }
        }

        let joltage = line[indexOfLargestFirstDigit] + line[indexOfSecondLargestDigit];
        runningTotal += parseInt(joltage);
    }
    return runningTotal
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array)
 */
export const part2 = (input) => {
  // TODO: implement Part 2
};

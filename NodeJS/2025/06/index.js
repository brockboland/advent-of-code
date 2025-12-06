// Day 06 solution stubs (ES6 modules)

import { charGridFromInput, maxGridDimensions } from '../utils/grid.js';

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
    const rows = input.map(line => line.match(/\S+/g));

    let runningTotal = 0

    for (let colIndex = 0; colIndex < rows[0].length; colIndex++) {
        let colValues = rows.map(row => row[colIndex]);
        const operand = colValues.pop()

        let colTotal = 0
        if (operand === '+') {
            colTotal += colValues.reduce((a, b) => parseInt(a) + parseInt(b), 0);
        } else if (operand === '*') {
            colTotal += colValues.reduce((a, b) => parseInt(a) * parseInt(b), 1);
        } else {
            throw new Error(`Unknown operand: ${operand}`);
        }

        runningTotal += colTotal;
    }

    return runningTotal;
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array) 
 */
export const part2 = (input) => {
    const grid = charGridFromInput(input);
    const colCount = maxGridDimensions(grid).maxY

    let runningTotal = 0
    let runningRegister = [];
    for (let colIndex = colCount - 1; colIndex >= 0; colIndex--) {
        let colValues = grid.map(row => row[colIndex]);

        const colAsString = colValues.join('').trim()
        if (colAsString === '') {
            continue;
        }

        const lastChar = colValues.slice(-1)[0]
        if (lastChar === '+') {
            colValues.pop(); // remove operand
            runningRegister.push(parseInt(colValues.join('')))
            const colTotal = runningRegister.reduce((a, b) => a + b, 0);
            runningTotal += colTotal;
            runningRegister = [];
        } else if (lastChar === '*') {
            colValues.pop(); // remove operand
            runningRegister.push(parseInt(colValues.join('')))
            const colTotal = runningRegister.reduce((a, b) => a * b, 1);
            runningTotal += colTotal;
            runningRegister = [];
        } else {
            runningRegister.push(parseInt(colAsString))
        }
    }

    return runningTotal
};

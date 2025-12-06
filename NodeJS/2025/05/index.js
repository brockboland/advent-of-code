// Day 05 solution stubs (ES6 modules)

import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
  const {ranges, ids} = parseInput(input);

    let freshIngredientCount = 0;

    for (let i = 0; i < ids.length; i++) {
        const currentID = parseInt(ids[i]);
        
        for (const range of ranges) {
            if (rangeContainsItem(range, currentID)) {
                freshIngredientCount++;
                break;
            }
        }
    }

    return freshIngredientCount;
};

/**
 * part2 - solve part 2
 * @param {string[]|string} input - input lines (array)
 */
export const part2 = (input) => {
    const {ranges, _} = parseInput(input);
    
    // Find and merge overlapping ranges
    for (let i = 0; i < ranges.length - 1; i++) {
        for (let j = i + 1; j < ranges.length; j++) {
            if (rangesOverlap(ranges[i], ranges[j])) {
                const mergedRange = rangesMerged(ranges[i], ranges[j]);
                ranges.splice(j, 1);
                ranges.splice(i, 1, mergedRange);
                i = 0; // restart outer loop
                break;
            }
        }
    }

    // Calculate total covered IDs
    let totalCovered = 0;
    for (const range of ranges) {
        totalCovered += (range.end - range.start + 1);
    }
    return totalCovered
};



const parseInput = (input) => {
    assert(Array.isArray(input));
    const inputSplitIndex = input.indexOf("");
    assert(inputSplitIndex >= 0, "Need a valid index to split the input between ranges and IDs");

    const rangeStrings = input.slice(0, inputSplitIndex);
    const ids = input.slice(inputSplitIndex + 1);

    const ranges = rangeStrings.map(rangeStr => {
        const [minStr, maxStr] = rangeStr.split("-");
        return { start: parseInt(minStr), end: parseInt(maxStr) };
    });
    return { ranges, ids };
}


const rangeContainsItem = (range, item) => {
    return item >= range.start && item <= range.end;
}

const rangesOverlap = (range1, range2) => {
    return rangeContainsItem(range1, range2.start) || rangeContainsItem(range1, range2.end) ||
        rangeContainsItem(range2, range1.start) || rangeContainsItem(range2, range1.end)
}

const rangesMerged = (range1, range2) => {
    return {
        start: Math.min(range1.start, range2.start),
        end: Math.max(range1.end, range2.end)
    };
}
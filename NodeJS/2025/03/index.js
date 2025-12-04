// Day 03 solution stubs (ES6 modules)

import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array)
 */
export const part1 = (input) => {
    return batteryPicker(input, 2);
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array)
 */
export const part2 = (input) => {
  return batteryPicker(input, 12);
};



const batteryPicker = (input, numberOfBatteries) => {
    assert(Array.isArray(input));

    let runningTotal = 0;
    for (const line of input) {
        let indexOfBestDigits = []
        let startIndexForNextBatterySearch = 0;

        for (let batterySelectionCounter = 0; batterySelectionCounter < numberOfBatteries; batterySelectionCounter++) {
            let indexOfNextBatteryToUse = startIndexForNextBatterySearch;
            let endingIndexForSearch = line.length - (numberOfBatteries - indexOfBestDigits.length);
            // console.log(`Searching for battery ${batterySelectionCounter} between ${startIndexForNextBatterySearch} and ${endingIndexForSearch}`);

            for (let i = startIndexForNextBatterySearch+1; i <= endingIndexForSearch; i++) {
                if (line[i] > line[indexOfNextBatteryToUse]) {
                    indexOfNextBatteryToUse = i;
                    if (line[i] === '9') {
                        break; // can't do better than a 9
                    }
                }
            }
            indexOfBestDigits.push(indexOfNextBatteryToUse)
            startIndexForNextBatterySearch = indexOfNextBatteryToUse + 1;
        }

        let joltage = indexOfBestDigits.map(index => line[index]).join('');
        // console.log(`Joltage for ${line}: ${joltage}, ${indexOfBestDigits}`);
        runningTotal += parseInt(joltage);
    }
    return runningTotal
}
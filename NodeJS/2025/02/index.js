import { arrayAllSame } from '../utils/arrays.js';
import assert from 'assert';

export const part1 = (input) => {
    assert(typeof input === 'string', 'Input must be a string');
    let chunks = input.split(',')

    var runningTotal = 0;

    for (let i = 0; i < chunks.length; i++) {
        let range = chunks[i].split('-').map(x => parseInt(x));
        let start = range[0];
        let end = range[1];

        for (let j = start; j <= end; j++) {
            let s = j.toString();
            // We're checking for numbers that have a pattern of numbers twice, which means it'll have to be an even-numbered length
            if (s.length % 2 == 0) {
                let stringFirstHalf = s.slice(0, s.length / 2);
                let stringSecondHalf = s.slice(s.length / 2);
                if (stringFirstHalf === stringSecondHalf) {
                    runningTotal += j;
                }
            }
        }
    }
    return runningTotal
};

export const part2 = (input) => {
    assert(typeof input === 'string', 'Input must be a string');
    let idRanges = input.split(',')

    var runningTotal = 0;

    for (let i = 0; i < idRanges.length; i++) {
        let range = idRanges[i].split('-').map(x => parseInt(x));
        let rangeStartingID = range[0];
        let rangeEndingID = range[1];

        for (let currentID = rangeStartingID; currentID <= rangeEndingID; currentID++) {
            let currentIDString = currentID.toString();

            // Chunk the string into pieces of each length from 1, up to half the overall string length.
            // Then, check if all of those chunks are equal.

            let maxChunkSize = Math.floor(currentIDString.length / 2);

            for (let chunkSize = 1; chunkSize <= maxChunkSize; chunkSize++) {
                // The overall string needs to be evenly divisible into chunks
                if (!(currentIDString.length % chunkSize === 0)) {
                    continue
                }

                let currentIDChunks = [];
                for (let k = 0; k < currentIDString.length; k += chunkSize) {
                    currentIDChunks.push(currentIDString.slice(k, k + chunkSize));
                }
                if (arrayAllSame(currentIDChunks)) {
                    runningTotal += currentID;
                    break; // No need to check larger chunk sizes
                }
            }
        }
    }
    return runningTotal
};

const assert = (condition, message) => {
        if (!condition) {
            throw new Error(message || "Assertion failed");
        }
    }

const part1 = (input) => {
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

const part2 = (input) => {
        assert(typeof input === 'string', 'Input must be a string');
    let chunks = input.split(',')

    var runningTotal = 0;

    for (let i = 0; i < chunks.length; i++) {
        let range = chunks[i].split('-').map(x => parseInt(x));
        let start = range[0];
        let end = range[1];

        for (let j = start; j <= end; j++) {
            let s = j.toString();

            // Chunk the string into pieces of each length from 1, up to half the overall string length. Then, check if all of those chunks are equal.
            // TODO: add a utility method that takes an array of strings and returns true if all of them are teh same value
            // TODO: keep the length % chunk_length == 0 check to to make sure we only check IDs that would be valid for that number of chunks
        }
    }
    return runningTotal
};

module.exports = {
  part1,
  part2
};

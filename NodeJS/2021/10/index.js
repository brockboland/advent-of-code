import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function corruptLineScore(input) {
    let score = 0;

    for(let l in input) {
        let line = input[l];
        let lineCheck = parseLine(line);
        if (lineCheck.corrupt) {
            score += corruptCloserScore(lineCheck.corrupt);
        }
    }
    return score;
}

function incompleteLineScore(input) {
    let scores = [];

    for(let l in input) {
        let line = input[l];
        let lineCheck = parseLine(line);
        if (lineCheck.incomplete) {
            let lineScore = 0;
            let completion = closureCompletion(lineCheck.incomplete);
            for (let i in completion) {
                let s = incompleteCloserScore(completion[i]);
                lineScore *= 5;
                lineScore += s;
            }
            scores.push(lineScore);
        }
    }

    scores.sort((a, b) => a - b);
    return scores[Math.floor(scores.length/2)];
}

// If the line is corrupt, it returns the incorrect closing tag
// If the line is NOT corrupt, returns false
function parseLine(line) {
    let chunkStack = [];

    for(let cIdx in line) {
        let c = line[cIdx];
        if (isOpener(c)) {
            chunkStack.push(c);
        } else {
            let opener = chunkStack.pop();
            if (isMatchingCloser(opener, c)) {
                //Good to go
            } else {
                // Corrupted chunk
                return {corrupt: c};
            }
        }
    }
    return {incomplete: chunkStack};
}

function isOpener(c) {
    return c == '(' || c == '[' || c == '{' || c == '<';
}

function isMatchingCloser(opener, closer) {
    return closer == matchingCloser(opener)
}

function matchingCloser(opener) {
    switch (opener) {
        case '(':
            return ')';
        case '[':
            return ']';
        case '{':
            return '}';
        case '<':
            return '>';
    }
    return undefined;
}

function corruptCloserScore(closer) {
    switch (closer) {
        case ')':
            return 3;
        case ']':
            return 57;
        case '}':
            return 1197;
        case '>':
            return 25137;
    }
    return 0;
}

function incompleteCloserScore(closer) {
    switch (closer) {
        case ')':
            return 1;
        case ']':
            return 2;
        case '}':
            return 3;
        case '>':
            return 4;
    }
    return 0;
}

function closureCompletion(chunks) {
    let ret = [];
    let c = chunks.pop();
    do {
        ret.push(matchingCloser(c));
    }
    while (c = chunks.pop());
    return ret;
}

// PART 1
let part1 = corruptLineScore(sampleInput);
console.log("Corrupt line score: ", part1);

// PART 2
let part2 = incompleteLineScore(fullInput)
console.log("Incomplete line score: ", part2);
var fs = require("fs");
var problemInput = fs.readFileSync("./input.txt").toString("utf-8").split("\n");

let sampleInput = [
    "L68",
    "L30",
    "R48",
    "L5",
    "R60",
    "L55",
    "L1",
    "L99",
    "R14",
    "L82"
]



const zeroChecks = (start, input) => {
    let position = start
    let zeroCounter = 0
    for (let line of input) {
        let direction = line[0]
        let amount = parseInt(line.slice(1))
        if (direction === "L") {
            position -= amount
        } else if (direction === "R") {
            position += amount
        }
        position = position % 100;
        if (position === 0) {
            zeroCounter += 1
        }
    }
    return zeroCounter
}

const complicated = (start, input) => {
    let position = parseInt(start)
    let zeroCounter = 0
    let previousAtZero = false
    for (let line of input) {
        let direction = line[0]
        let amount = parseInt(line.slice(1))
        if (direction === "L") {
            position -= amount
        } else if (direction === "R") {
            position += amount
        }

        // If a rotation stats at 0, and does not cross 0 again, it should not count again
        if (previousAtZero && (position < 100 && position > -100)) {
            // No z-counts
            previousAtZero = false
        } else {

            if (position < 0) {
                zeroCounter += Math.floor(Math.abs(position) / 100) + 1
                console.log("Updated to ", zeroCounter, " after ", line, ", new position: ", position)
            } else if (position % 100 == 0) {
                zeroCounter += 1
                console.log("Landed on zero ", zeroCounter, " after ", line, ", new position: ", position)
                previousAtZero = true
            } else if (position > 100) {
                zeroCounter += Math.floor(position / 100)
                console.log("Updated to ", zeroCounter, " after ", line, ", new position: ", position)
            } else {
                console.log("No crossing after ", line, ", new position: ", position)
            }
        }
        while (position < 0) {
            position = position + 100
        }
        position = position % 100;
        console.log("Normalized position: ", position, "\n")
    }
    return zeroCounter
}

console.log("First part:")
console.log("Sample Check:", zeroChecks(50, sampleInput))
console.log("Real Check:", zeroChecks(50, problemInput))


console.log("Second part:")
console.log("Sample Check:", complicated(50, sampleInput))
// console.log("Real Check:", complicated(50, problemInput))

// NOT these values
// 6614
// 6394

var fs = require("fs");
var sampleInput = fs.readFileSync("./input-sample.txt").toString("utf-8").split("\n");
var problemInput = fs.readFileSync("./input-real.txt").toString("utf-8").split("\n");

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
    
    for (let line of input) {
        let direction = line[0]
        let amount = parseInt(line.slice(1))

        for (let i = 0; i < amount; i++) {
            if (direction === "L") {
                position -= 1
            } else if (direction === "R") {
                position += 1
            }

            if (position < 0) {
                position = position + 100
            } else if (position >= 100) {
                position = position - 100
            }

            if (position === 0) {
                zeroCounter += 1
                console.log("Landed on zero, counter now at ", zeroCounter, " during step ", line)
            }
        }
    }
    return zeroCounter
}

console.log("First part:")
console.log("Sample Check:", zeroChecks(50, sampleInput))
console.log("Real Check:", zeroChecks(50, problemInput)) // 1180


console.log("Second part:")
console.log("Sample Check:", complicated(50, sampleInput))
console.log("Real Check:", complicated(50, problemInput)) // 6892

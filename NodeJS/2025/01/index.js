export const part1 = (start, input) => {
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

export const part2 = (start, input) => {
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
            }
        }
    }
    return zeroCounter
}

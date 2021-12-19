export const firstChallenge = (input) => {
    let caves = processCaveSystem(input);
    let paths = validPathsThrough(caves);
    console.log("Valid paths:", paths);
    return paths.length;
}

export const processCaveSystem = (input) => {
    let caves = {};

    const addPath = (start, finish) => {
        if (caves[start] != undefined) {
            caves[start].push(finish);
        } else {
            caves[start] = [finish];
        }
    }

    for (let i in input) {
        let path = input[i];
        let [a, b] = path.split("-");
        addPath(a, b);
        addPath(b, a);
    }
    return caves;
}

export const validPathsThrough = (caves, startingAt, pathSoFar) => {
    const endNode = "end";

    // pathSoFar can't be empty: at the very least, it includes the starting node
    if (pathSoFar.length == 0) {
        pathSoFar = [startingAt];
    }

    let branchingOptions = caves[startingAt];
    if (branchingOptions.length == 0) {
        return [];
    } else if (branchingOptions.length == 1 && branchingOptions[0] == endNode) {
        return [endNode];
    } else {
        let endingPathsFromHere = [];
        for (let b in branchingOptions) {
            let nextNode = branchingOptions[b];

            // If the next node is an "end", stop there
            if (nextNode == endNode) {
                endingPathsFromHere.push([endNode]);
            }
            // If the next node is the start, you cna't go there
            else if (nextNode == "start") {
                continue;
            }
            // If the next one is a small cave we've already visited, don't go back
            else if (!isBigCave(nextNode) && pathSoFar.includes(nextNode)) {
                continue;
            }
            else {
                let pathForNext = pathSoFar.concat(nextNode);
                let pathsFromHere = validPathsThrough(caves, nextNode, pathForNext);
                for(let p in pathsFromHere) {
                    endingPathsFromHere.push([nextNode].concat(pathsFromHere[p]));
                }
            }
        }
        return endingPathsFromHere;
    }
}

export const isBigCave = (name) => {
    return name === name.toUpperCase();
}







export const secondChallenge = (input) => {
    return 8;
}

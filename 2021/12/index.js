export const firstChallenge = (input) => {
    let caves = processCaveSystem(input);
    let paths = validPathsThrough(caves, "start", []);
    return paths.length;
}

export const secondChallenge = (input) => {
    return secondChallengePaths(input).length;
}

export const secondChallengePaths = (input) => {
    let caves = processCaveSystem(input);
    let smallCaves = smallCavesInSystem(caves);
    let paths = [];
    for(let s in smallCaves) {
        let smallCave = smallCaves[s];
        let newPaths = validPathsThrough(caves, "start", [], smallCave);
        if (newPaths.length > 0) {
            for(let n in newPaths) {
                let newPathStr = newPaths[n].join(',');
                if (!paths.includes(newPathStr)) {
                    paths.push(newPathStr)
                }
            }
        }
    }

    return paths;
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

export const smallCavesInSystem = (caves) => {
    let smallCaves = [];
    for (let c in caves) {
        if (!isBigCave(c) && !isStartOrEnd(c)) {
            smallCaves.push(c);
        }
    }
    return smallCaves;
}

export const validPathsThrough = (caves, startingAt, pathSoFar, smallCaveToRevisit) => {
    const endNode = "end";

    // pathSoFar can't be empty: at the very least, it includes the starting node
    if (pathSoFar.length == 0) {
        pathSoFar = [startingAt];
    }

    // Helper to determine if a small cave can be revisited
    const isSmallCaveWeCannotRevisit = (caveInQuestion) => {
        // If it's a big cave or a small one that hasn't come up already, it's fine
        if (isBigCave(caveInQuestion) || !pathSoFar.includes(caveInQuestion)) {
            return false;
        } else {
            let existingVisits = pathSoFar.filter((v) => v == caveInQuestion);
            if (caveInQuestion == smallCaveToRevisit && existingVisits.length < 2) {
                // We CAN revisit this small cave, since we've only been there once
                return false;
            }
            // If we got this far, it's either a small cave we've been to once and cannot revisit, or the one we CAN revisit, but we've already been there twice
            return true;
        }
    };

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
            // If the next one is a small cave we've already visited, don't go back there
            else if (isSmallCaveWeCannotRevisit(nextNode)) {
                continue;
            }
            else {
                let pathForNext = pathSoFar.concat(nextNode);
                let pathsFromHere = validPathsThrough(caves, nextNode, pathForNext, smallCaveToRevisit);
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

export const isStartOrEnd = (name) => {
    return name == "start" || name == "end";
};
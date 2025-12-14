// Day 08 solution stubs (ES6 modules)

import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]} input - input lines (array) or raw string
 * @param {number} connectionsToMake - number of connections to make
 */
export const part1 = (input, connectionsToMake) => {
  // Parse the junction boxes from the input
  const boxes = parseJunctionBoxes(input)
  // Create a separate circuit for each junction box, since none are connected initially
  let circuits = boxes.map((_, index) => {
    return { connectedBoxes: [index] }
  })

  // Deetermine how far all the junction boxes are from one another
  const distances = computeAllDistances(boxes)
  const sortedDistances = sortByDistance(distances)

  // Make the desired number of connections between junction boxes
  for (let i = 0; i < connectionsToMake; i++) {
    const nextConnection = sortedDistances.splice(0, 1).pop()

    // Determine which circuits the two boxes are on
    const circuitAIndex = circuits.findIndex(circuit => circuit.connectedBoxes.includes(nextConnection.aIndex));
    const circuitBIndex = circuits.findIndex(circuit => circuit.connectedBoxes.includes(nextConnection.bIndex));

    // If the boxes are not already connected, merge the circuits they are on
    if (circuitAIndex !== circuitBIndex) {
      circuits[circuitAIndex].connectedBoxes.push(...circuits[circuitBIndex].connectedBoxes);
      circuits.splice(circuitBIndex, 1);
    }
  }

  // Sort the circuits by the number of connected boxes on them
  const circuitsBySize = circuits.toSorted((a, b) => b.connectedBoxes.length - a.connectedBoxes.length);

  // Multiple the size of the three biggest circuits
  return circuitsBySize[0].connectedBoxes.length * circuitsBySize[1].connectedBoxes.length * circuitsBySize[2].connectedBoxes.length;
};

/**
 * part2 - solve part 2
 * @param {string[]} input - input lines (array) or raw string
 */
export const part2 = (input) => {
  // TODO: implement Part 2
};


const junctionBoxPrint = (box) => {
  return `(${box.x},${box.y},${box.z})`;
}

const parseJunctionBoxes = (input) => {
  assert(Array.isArray(input));

  return input.map(line => {
    const [x, y, z] = line.split(',')
    return {
      x: parseInt(x),
      y: parseInt(y),
      z: parseInt(z),
      distanceToOtherBoxes: new Map()
    };
  });
}

const distanceBetweenBoxes = (boxA, boxB) => {
  return Math.sqrt(
    Math.pow(boxA.x - boxB.x, 2) +
    Math.pow(boxA.y - boxB.y, 2) +
    Math.pow(boxA.z - boxB.z, 2)
  );
}

/**
 * Determine all the distances between boxes
 * @param {array} boxes 
 * @returns Array of objects, each with an aIndex, bIndex, and distance
 */
const computeAllDistances = (boxes) => {
  const distances = new Map();

  for (let aIndex = 0; aIndex < boxes.length; aIndex++) {

    for (let bIndex = 0; bIndex < boxes.length; bIndex++) {
      if (aIndex === bIndex) continue;

      const distanceIndex = Math.min(aIndex, bIndex) + '|' + Math.max(aIndex, bIndex);

      // If we have already calculated this index, then skip this one
      if (distances.has(distanceIndex)) {
        continue
      }

      const boxA = boxes[aIndex];
      const boxB = boxes[bIndex];

      // Calculate the distance and set it in our map
      const distance = distanceBetweenBoxes(boxA, boxB);
      distances.set(distanceIndex, distance);
    }
  }

  // Move the mapped values into an object
  const distancesAsObjects = []
  distances.forEach((distance, indices) => {
    const [aIndex, bIndex] = indices.split('|').map(i => parseInt(i));
    distancesAsObjects.push({ aIndex, bIndex, distance })
  })

  return distancesAsObjects
}

const sortByDistance = (distanceObjects) => {
  return distanceObjects.toSorted((a, b) => a.distance - b.distance);
}
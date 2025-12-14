// Day 08 solution stubs (ES6 modules)

import { assert } from "console";

/**
 * part1 - solve part 1
 * @param {string[]|string} input - input lines (array) or raw string
 */
export const part1 = (input) => {
  const boxes = parseJunctionBoxes(input)
  const distances = computeAllDistances(boxes)
  const sortedDistances = sortByDistance(distances)


  // const sortedDistanceDebugOutput = sortedDistances.map(distanceObj => {
  //   const boxA = boxes[distanceObj.aIndex];
  //   const boxB = boxes[distanceObj.bIndex];

  //   return `From ${boxA.x},${boxA.y},${boxA.z} to ${boxB.x},${boxB.y},${boxB.z} = ${distanceObj.distance.toFixed(2)}`;
  // })
  // console.log(sortedDistanceDebugOutput.join('\n'))


  
};

/**
 * part2 - solve part 2
 * @param {string[]|string} input - input lines (array) or raw string
 */
export const part2 = (input) => {
  // TODO: implement Part 2
};


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
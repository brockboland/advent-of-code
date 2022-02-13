export const parseProblemInput = (input) => {
  let template = input[0];

  let pairReplacementsArr = input.slice(2);
  let pairReplacements = {};
  for (let p in pairReplacementsArr) {
    let [pair, replace] = pairReplacementsArr[p].split(" -> ");
    pairReplacements[pair] = replace;
  }
  return { template, pairReplacements };
};

export const extractedPairs = (str) => {
  let pairs = [];
  for (let i = 0; i < str.length - 1; i++) {
    pairs.push(str.substring(i, i + 2));
  }
  return pairs;
};

export const templateAfterReplacingPairs = (template, pairReplacements) => {
  // Add the first two characters of each new trio, since the third character overlaps with the first of the next one
  return extractedPairs(template).map((pair) => {
    let newMiddle = pairReplacements[pair];
    return pair[0] + newMiddle;
  }).join("") + template[template.length - 1];
};

export const polymerAfterUpdating = (
  template,
  pairReplacements,
  numberOfTimes
) => {
  let nextTemplate = template;
  for (let i = 0; i < numberOfTimes; i++) {
    nextTemplate = templateAfterReplacingPairs(nextTemplate, pairReplacements);
  }
  return nextTemplate;
};

export const mostCommonElement = (polymer) => {
    let counts = sortedElementCounts(polymer);
    return counts[counts.length - 1].element;
};

export const mostCommonElementCount = (polymer) => {
    let counts = sortedElementCounts(polymer);
    return counts[counts.length - 1].count;
};

export const leastCommonElement = (polymer) => {
    return sortedElementCounts(polymer)[0].element;
};

export const leastCommonElementCount = (polymer) => {
    return sortedElementCounts(polymer)[0].count;
};

export const sortedElementCounts = (polymer) => {
  let counts = {};
  for (let i = 0; i < polymer.length; i++) {
    let element = polymer[i];
    if (counts[element] == undefined) {
      counts[element] = 1;
    } else {
      counts[element]++;
    }
  }
  
  let elements = Object.keys(counts);
  let elementCounts = elements.map(element => {
      return {element, count: counts[element]}
  });
  let sortedElements = elementCounts.sort((a,b) => a.count - b.count);
  
  return sortedElements;
};

export const firstChallenge = (template, pairReplacements) => {
    return calculate(template, pairReplacements, 10);
};

export const secondChallenge = (template, pairReplacements) => {
    return calculate(template, pairReplacements, 40);
};

const calculate = (template, pairReplacements, iterations) => {
    let finalPolymer = polymerAfterUpdating(template, pairReplacements, iterations);
    let counts = sortedElementCounts(finalPolymer);
    let most = counts[counts.length - 1].count;
    let least = counts[0].count;
    return most - least;
}
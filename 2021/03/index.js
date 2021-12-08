var fs = require("fs");
var text = fs.readFileSync("./input.txt").toString("utf-8").split("\n");

// Find the most common bit at the given index, for each row in the data
function mostCommonBit(idx, data) {
  let bitSum = 0;
  for (let r = 0; r < data.length; r++) {
    let row = data[r];
    if (row.length > idx) {
      bitSum += parseInt(row[idx]);
    }
  }
  if (bitSum >= data.length / 2) {
    return 1;
  } else {
    return 0;
  }
}

function leastCommonBit(idx, data) {
  return 1 - mostCommonBit(idx, data);
}

// binValue is a string. Returns an int.
function binaryToDecimal(binValue) {
  let total = 0;
  let currentVal = 1;

  for (let i = binValue.length - 1; i >= 0; i--) {
    let bit = binValue[i];
    total += currentVal * bit;
    currentVal = currentVal * 2;
  }
  return total;
}

// PART 1
function powerConsumption(data) {
  let bitCount = data[0].length;

  let gamma = [];
  let epsilon = [];

  for (let b = 0; b < bitCount; b++) {
    let nextGammaBit = mostCommonBit(b, data);
    gamma.push(nextGammaBit);
    let nextEpsilonBit = 1 - nextGammaBit;
    epsilon.push(nextEpsilonBit);
  }

  let gammaString = gamma.join("");
  let epsilonString = epsilon.join("");
  return binaryToDecimal(gammaString) * binaryToDecimal(epsilonString);
}

// PART 2
function o2Rating(data) {
  let bitCount = data[0].length;
  var remainingData = data;
  for (let b = 0; b < bitCount; b++) {
    if (data.length == 1) {
      return data[0];
    }
    let keeperBit = mostCommonBit(b, data);
    data = filterData(data, keeperBit, b);
  }
  return data[0];
}

function co2ScrubberRating(data) {
  let bitCount = data[0].length;
  var remainingData = data;
  for (let b = 0; b < bitCount; b++) {
    if (data.length == 1) {
      return data[0];
    }
    let keeperBit = leastCommonBit(b, data);
    data = filterData(data, keeperBit, b);
  }
  return data[0];
}

function filterData(data, expectedValue, idx) {
  return data.filter((bits) => {
    let bit = parseInt(bits[idx]);
    return bit == expectedValue;
  });
}

let smallSampleSet = [
  "00100",
  "11110",
  "10110",
  "10111",
  "10101",
  "01111",
  "00111",
  "11100",
  "10000",
  "11001",
  "00010",
  "01010",
];

console.log("Power consumption", powerConsumption(text));

let o2 = binaryToDecimal(o2Rating(text));
let co2 = binaryToDecimal(co2ScrubberRating(text));
let lifeSupportRating = o2 * co2;
console.log("O2 rating ", o2);
console.log("CO2 rating ", co2);
console.log("Life support rating", lifeSupportRating);

import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { parseProblemInput, extractedPairs, templateAfterReplacingPairs, polymerAfterUpdating, mostCommonElement, mostCommonElementCount, leastCommonElement, leastCommonElementCount, firstChallenge, sortedElementCounts, secondChallenge } from "../index";

describe("Pair parsing", () => {
  test("Pair extraction", () => {
    let pairs = extractedPairs("NNCB");
    expect(pairs.length).toEqual(3);
    expect(pairs[0]).toEqual("NN");
    expect(pairs[1]).toEqual("NC");
    expect(pairs[2]).toEqual("CB");
  });

  test("Pair insertion", () => {
    let template = "NNCB";
    let pairReplacements = {
      CH: "B",
      HH: "N",
      CB: "H",
      NH: "C",
      HB: "C",
      HC: "B",
      HN: "C",
      NN: "C",
      BH: "H",
      NC: "B",
      NB: "B",
      BN: "B",
      BB: "N",
      BC: "B",
      CC: "N",
      CN: "C",
    };

    let updatedPolymer = templateAfterReplacingPairs(template, pairReplacements);
    expect(updatedPolymer).toEqual("NCNBCHB");
  });

  test("Repeated paid insertions", () => {
    let template = "NNCB";
    let pairReplacements = {
      CH: "B",
      HH: "N",
      CB: "H",
      NH: "C",
      HB: "C",
      HC: "B",
      HN: "C",
      NN: "C",
      BH: "H",
      NC: "B",
      NB: "B",
      BN: "B",
      BB: "N",
      BC: "B",
      CC: "N",
      CN: "C",
    };

    let twoSteps = polymerAfterUpdating(template, pairReplacements, 2);
    expect(twoSteps).toEqual("NBCCNBBBCBHCB");

    let threeSteps = polymerAfterUpdating(template, pairReplacements, 3);
    expect(threeSteps).toEqual("NBBBCNCCNBBNBNBBCHBHHBCHB");

    let fourSteps = polymerAfterUpdating(template, pairReplacements, 4);
    expect(fourSteps).toEqual("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB");
  })
});

describe("Input Parsing", () => {
  test("Template parsing", () => {
    let {template} = parseProblemInput(mockInput);
    expect(template).toEqual("NNCB")
  });

  test("Pair parsing", () => {
    let {pairReplacements} = parseProblemInput(mockInput);
    expect(Object.keys(pairReplacements).length).toEqual(16);
    expect(pairReplacements["NC"]).toEqual("B");
    expect(pairReplacements["CN"]).toEqual("C");
  });

  test("Sample input run through the process", () => {
    let {template, pairReplacements} = parseProblemInput(mockInput);

    let twoSteps = polymerAfterUpdating(template, pairReplacements, 2);
    expect(twoSteps).toEqual("NBCCNBBBCBHCB");

    let threeSteps = polymerAfterUpdating(template, pairReplacements, 3);
    expect(threeSteps).toEqual("NBBBCNCCNBBNBNBBCHBHHBCHB");

    let fourSteps = polymerAfterUpdating(template, pairReplacements, 4);
    expect(fourSteps).toEqual("NBBNBNBBCCNBCNCCNBBNBBNBBBNBBNBBCBHCBHHNHCBBCBHCB");
  });

  test("Template growth", () => {
    let {template, pairReplacements} = parseProblemInput(mockInput);

    let tenSteps = polymerAfterUpdating(template, pairReplacements, 10);
    expect(tenSteps.length).toEqual(3073);
  });
});

describe("Element counting", () => {
  test("Sorted counting", () => {
    let counts = sortedElementCounts("NBBBCNCCNBBNBNBBCHBHHBCHB");
    expect(counts.length).toEqual(4);

    expect(counts[0].count).toEqual(4);
    expect(counts[0].element).toEqual("H");

    expect(counts[counts.length-1].count).toEqual(11);
    expect(counts[counts.length-1].element).toEqual("B");
  });

  test("Most common element", () => {
    let {template, pairReplacements} = parseProblemInput(mockInput);

    let tenSteps = polymerAfterUpdating(template, pairReplacements, 10);
    expect(mostCommonElement(tenSteps)).toEqual("B")
    expect(mostCommonElementCount(tenSteps)).toEqual(1749)
  });

  test("Least common element", () => {
    let {template, pairReplacements} = parseProblemInput(mockInput);

    let tenSteps = polymerAfterUpdating(template, pairReplacements, 10);
    expect(leastCommonElement(tenSteps)).toEqual("H")
    expect(leastCommonElementCount(tenSteps)).toEqual(161)
  });
});

describe("Part 1", () => {
  test("Sample input", () => {
    let {template, pairReplacements} = parseProblemInput(mockInput);
    let result = firstChallenge(template, pairReplacements);
    expect(result).toEqual(1588);
  });

  test("Actual puzzle input", () => {
    let {template, pairReplacements} = parseProblemInput(fileContents(realInputPath()));
    let result = firstChallenge(template, pairReplacements);
    expect(result).toEqual(2703);
  });
});

// describe("Part 2", () => {
//   test("Sample input", () => {
//     let {template, pairReplacements} = parseProblemInput(mockInput);
//     let result = secondChallenge(template, pairReplacements);
//     expect(result).toEqual(2188189693529);
//   });

//   test("Actual puzzle input", () => {
//     let {template, pairReplacements} = parseProblemInput(fileContents(realInputPath()));
//     let result = secondChallenge(template, pairReplacements);
//     expect(result).toEqual(2703);
//   });
// });

const mockFilePath = (filename) => {
  return `${__dirname}/${filename}`;
};

const realInputPath = () => {
  return `${__dirname}/puzzleInput.txt`;
};

const mockInput = fileContents(mockFilePath("sampleInput.txt"));
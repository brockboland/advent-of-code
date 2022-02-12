import { fileContents } from "advent-of-code-2021-a1329730-utils";
import { firstChallenge, secondChallenge, parseProblemInput, pointsInInput, pointsAfterFolding, equalPoints, foldPointOverFold, formattedPoints, gridSize} from "../index";

describe("Input parsing", () => {
  test("Basic parsing", () => {
    let {points, foldingInstructions} = parseProblemInput(mockInput);
    expect(points.length).toEqual(18);
    expect(foldingInstructions.length).toEqual(2);
  });

  test("Points parsing", () => {
    let {points} = parseProblemInput(mockInput);
    expect(points[0].x).toEqual(6);
    expect(points[1].x).toEqual(0);
    expect(points[2].x).toEqual(9);
    expect(points[3].x).toEqual(0);
    expect(points[4].x).toEqual(10);

    expect(points[17].x).toEqual(9);
  });

  test("Folds parsing", () => {
    let {foldingInstructions} = parseProblemInput(mockInput);
    expect(foldingInstructions[0].axis).toEqual("y");
    expect(foldingInstructions[1].axis).toEqual("x");
    expect(foldingInstructions[0].value).toEqual(7);
    expect(foldingInstructions[1].value).toEqual(5);
  });
});

describe("Point functions", () => {
  test("Basic point counting", () => {
    expect(pointsInInput(mockInput)).toEqual(18);
  });

  test("Point counting after 1 fold", () => {
    let {points, foldingInstructions} = parseProblemInput(mockInput);
    let newFoldingInstructions = [foldingInstructions[0]];
    let singleFoldInput = {points, newFoldingInstructions};
    expect(pointsAfterFolding(points, newFoldingInstructions).length).toEqual(17);
  });

  test("Point equality", () => {
    expect(equalPoints({x:0, y:0},{x:0, y:0})).toBeTruthy();
    expect(equalPoints({x:50, y:6},{x:50, y:6})).toBeTruthy();

    expect(equalPoints({x:50, y:6},{x:6, y:50})).toBeFalsy();
    expect(equalPoints({x:50, y:6},{})).toBeFalsy();
    expect(equalPoints({x:0, y:1},{x:1, y:1})).toBeFalsy();
  });

  test("Y axis folding", () => {
    let lowDownPoint = {x: 0, y: 14};
    let farRightPoint = {x: 12, y: 2};

    let foldedOverY7 = foldPointOverFold(lowDownPoint, {axis: "y", value: 7});
    expect(foldedOverY7.x).toEqual(0);
    expect(foldedOverY7.y).toEqual(0);

    let foldedOverY9 = foldPointOverFold(lowDownPoint, {axis: "y", value: 9});
    expect(foldedOverY9.x).toEqual(0);
    expect(foldedOverY9.y).toEqual(4);

    let foldedOverY19 = foldPointOverFold(lowDownPoint, {axis: "y", value: 19});
    expect(foldedOverY19.x).toEqual(0);
    expect(foldedOverY19.y).toEqual(14);

    let foldedOverY2 = foldPointOverFold(farRightPoint, {axis: "y", value: 1});
    expect(foldedOverY2.x).toEqual(12);
    expect(foldedOverY2.y).toEqual(0);
  });

  test("X axis folding", () => {
    let farRightPoint = {x: 12, y: 2};

    let foldedOverX9 = foldPointOverFold(farRightPoint, {axis: "x", value: 9});
    expect(foldedOverX9.x).toEqual(6);
    expect(foldedOverX9.y).toEqual(2);

    let foldedOverX13 = foldPointOverFold(farRightPoint, {axis: "x", value: 13});
    expect(foldedOverX13.x).toEqual(12);
    expect(foldedOverX13.y).toEqual(2);
  });

  test("Grid sizing", () => {
    let {points, foldingInstructions} = parseProblemInput(mockInput);
    let size = gridSize(points);
    expect(size.x).toEqual(10);
    expect(size.y).toEqual(14);
  });
});

describe("Part 1", () => {
  // ACTUAL problem input: only fold once
  test("Problem part 1", () => {
    let input = fileContents(realInputPath());
    let {points, foldingInstructions} = parseProblemInput(input);
    let newFoldingInstructions = [foldingInstructions[0]];
    let singleFoldInput = {points, newFoldingInstructions};
    let singleFoldOutput = pointsAfterFolding(points, newFoldingInstructions);
    console.log(formattedPoints(singleFoldOutput));
    expect(singleFoldOutput.length).toEqual(818);
  });
});

describe("Part 2", () => {
  // ACTUAL problem input
  test("Problem part 2", () => {
    let input = fileContents(realInputPath());
    let {points, foldingInstructions} = parseProblemInput(input);
    let allFoldsOutput = pointsAfterFolding(points, foldingInstructions);
    console.log(formattedPoints(allFoldsOutput)); // => LRGPRECB
    expect(allFoldsOutput.length).toEqual(101);
  });
});


const mockFilePath = (filename) => {
  return `${__dirname}/${filename}`;
};

const realInputPath = () => {
  return `${__dirname}/puzzleInput.txt`;
};

const mockInput = fileContents(mockFilePath("sampleInput.txt"));
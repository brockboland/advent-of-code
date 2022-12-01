import Head from "next/head";
import useSWR from 'swr';

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Day1() {

  const { data, error } = useSWR('/api/puzzleInputs/1', fetcher);

  //Handle the error state
  if (error) return <div>Failed to load: {error.message}</div>;
  //Handle the loading state
  if (!data) return <div>Data not found</div>;
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  
  const input = data.split("\n");

  // BEGIN DAY 1 SPECIFIC LOGIC
	let { points, foldingInstructions } = parseProblemInput(input);
	let newFoldingInstructions = [foldingInstructions[0]];
	let singleFoldInput = { points, newFoldingInstructions };
	let finalAnswer = pointsAfterFolding(points, newFoldingInstructions).length;
  // END DAY 1 SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day 1</title>
			</Head>

			<main>Final answer: {finalAnswer}</main>
		</div>
	);
}


// Input: array of lines
// Return: {points: [], foldingInstructions: []}
const parseProblemInput = (input) => {
	let points = [];
	let foldingInstructions = [];

	for (let i in input) {
		let line = input[i];
		if (line == "") {
			// Blank line between grid points and the folding instructions: pop out
			continue;
		} else if (line.startsWith("fold along")) {
			let foldBits = line.substring(11);
			let [axis, value] = foldBits.split("=");
			foldingInstructions.push({ axis, value: parseInt(value) });
		} else {
			let [x, y] = line.split(",");
			points.push({ x: parseInt(x), y: parseInt(y) });
		}
	}
	return { points, foldingInstructions };
};

const pointsInInput = (input) => {
	let { points } = parseProblemInput(input);
	return points.length;
};

const pointsAfterFolding = (inputPoints, foldingInstructions) => {
	let currentPoints = [...inputPoints];
	for (let f in foldingInstructions) {
		let newPoints = [];
		for (let p in currentPoints) {
			newPoints = addPointIfUnique(
				newPoints,
				foldPointOverFold(currentPoints[p], foldingInstructions[f])
			);
		}
		currentPoints = newPoints;
	}

	return currentPoints;
};

const foldPointOverFold = (point, fold) => {
	let { axis, value } = fold;
	let newPoint = { ...point };
	if (point[axis] > value) {
		// Flip over the fold
		let newValue = value - (point[axis] - value);
		newPoint[axis] = newValue;
	}
	return newPoint;
};

const addPointIfUnique = (points, newPoint) => {
	let existingPoint = points.find((point) => equalPoints(point, newPoint));
	if (existingPoint == undefined) {
		points.push(newPoint);
	}
	return points;
};

const equalPoints = (a, b) => {
	return a.x == b.x && a.y == b.y;
};

const formattedPoints = (points) => {
	let finalGrid = [];
	for (let p in points) {
		let { x, y } = points[p];
		if (finalGrid[y] == undefined) {
			finalGrid[y] = [];
		}
		finalGrid[y][x] = "#";
	}

	let size = gridSize(points);
	let overAllOutput = "";
	for (let y = 0; y <= size.y; y++) {
		let row = "";
		for (let x = 0; x <= size.x; x++) {
			if (finalGrid[y][x] == "#") {
				row += "#";
			} else {
				row += ".";
			}
		}
		overAllOutput += row + "\n";
	}
	return overAllOutput;
};

const gridSize = (points) => {
	let allX = points.map((p) => p.x);
	let allY = points.map((p) => p.y);
	return { x: Math.max(...allX), y: Math.max(...allY) };
};

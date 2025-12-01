import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";

const day = 6;

export async function getServerSideProps() {
	//Find the absolute path of the puzzleInputs directory
	const puzzleInputsDirectory = path.join(process.cwd(), "puzzleInputs");

	//Read the input data file
	var sampleFileContents, realFileContents;
	try {
		sampleFileContents = await fs.readFile(
			puzzleInputsDirectory + "/" + day + "-sample.txt",
			"utf8"
		);

		realFileContents = await fs.readFile(
			puzzleInputsDirectory + "/" + day + ".txt",
			"utf8"
		);
	} catch (err) {
		return {
			props: { error: "Couldn't load data! " + JSNON.stringify(err) },
		};
	}

	return {
		props: { sampleData: sampleFileContents, realData: realFileContents },
	};
}

export default function Day({ sampleData, realData }) {
	if (!sampleData) {
		return <div>Sample data is empty</div>;
	}
	if (!realData) {
		return <div>Real data is empty</div>;
	}

	let finalDetails = {
		part1SampleExpected: "Unknown",
		part1SampleCalculated: 0,
		part1RealExpected: "Unknown",
		part1RealCalculated: 0,
		part2SampleExpected: "Unknown",
		part2SampleCalculated: 0,
		part2RealExpected: "Unknown",
		part2RealCalculated: 0,
	};



	
	// BEGIN DAY SPECIFIC LOGIC
	finalDetails.part1SampleExpected = 10;
	finalDetails.part1RealExpected = 1655;
	finalDetails.part2SampleExpected = 29;
	finalDetails.part2RealExpected = 2665;

	const isArrayOfUniqueItems = (arr) => {
		const s = new Set(arr);
		return arr.length === s.size;
	}

	const markerEndIndex = (input, markerLength) => {
		const chars = [...input];
		let markerStartIndex = 0
		for (markerStartIndex = 0; markerStartIndex < chars.length - markerLength; markerStartIndex++) {
			let potentialMarker = chars.slice(markerStartIndex, markerStartIndex + markerLength)
			if (isArrayOfUniqueItems(potentialMarker)) {
				break;
			}
		}
		return markerStartIndex + markerLength;
	}

	const part1 = (input) => {
		return markerEndIndex(input, 4);
	}
	
	const part2 = (input) => {
		return markerEndIndex(input, 14);
	}
	finalDetails.part1SampleCalculated = part1(sampleData);
	finalDetails.part1RealCalculated = part1(realData);

	finalDetails.part2SampleCalculated = part2(sampleData);
	finalDetails.part2RealCalculated = part2(realData);
	
	// END DAY SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day {day}</title>
			</Head>

			<main>
				<h1>Day {day}</h1>
				<DayStat {...finalDetails} />
			</main>
		</div>
	);
}

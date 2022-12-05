import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";

const day = 4;

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

export default function Day4({ sampleData, realData }) {
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


	// BEGIN DAY 4 SPECIFIC LOGIC
	finalDetails.part1SampleExpected = 2;
	finalDetails.part1RealExpected = 453;

	const pairsFromData = (data) => {
		return data
			.split("\n")
			.map((a) => a.split(","))
			.map((a) => {
				const [l1, r1] = a[0].split("-").map(parseFloat);
				const [l2, r2] = a[1].split("-").map(parseFloat);
				return { l1, r1, l2, r2 };
			});
		}

	const fullyContainedRanges = (pairs) => {
		let answer = 0; // 453
		pairs.forEach(a => {
			if ((a.l1 >= a.l2 && a.r1 <= a.r2) || (a.l1 <= a.l2 && a.r1 >= a.r2)) {
				answer++;
			}
		});
		return answer;
	}

	const samplePairs = pairsFromData(sampleData);
	const realPairs = pairsFromData(realData);
	finalDetails.part1SampleCalculated = fullyContainedRanges(samplePairs);
	finalDetails.part1RealCalculated = fullyContainedRanges(realPairs);

    // Part 2
	finalDetails.part2SampleExpected = 4;
	finalDetails.part2RealExpected = 919;

	const overlappingRanges = (pairs) => {
		let answer = 0;
		pairs.forEach(a => {
			if ((a.l1 >= a.l2 && a.l1 <= a.r2) || (a.r1 >= a.l2 && a.r1 <= a.r2) ||
				(a.l2 >= a.l1 && a.l2 <= a.r1) || (a.r2 >= a.l1 && a.r2 <= a.r1)) {
					answer++;
			}
		});
		return answer;
	}

	finalDetails.part2SampleCalculated = overlappingRanges(samplePairs);
	finalDetails.part2RealCalculated = overlappingRanges(realPairs);

	// END DAY 4 SPECIFIC LOGIC

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

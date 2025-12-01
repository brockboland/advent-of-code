import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";

const day = 5;

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

export default function Day5({ sampleData, realData }) {
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

	// BEGIN DAY 5 SPECIFIC LOGIC
	finalDetails.part1SampleExpected = "CMZ";
	finalDetails.part1RealExpected = "RFFFWBPNS";

	// Part 1
	const startingDetails = (data) => {
		const [startingCrateArrangement, rawMoveInstructions] = data.split("\n\n");

		let crateStacks = [];
		startingCrateArrangement.split("\n").forEach(row => {
			for (let i = 0; i < (row.length/4); i++) {
				if (row[i*4] == "[") {
					const crateName = row[i*4 + 1];
					if (!crateStacks[i+1]) crateStacks[i+1] = [];
					crateStacks[i+1].push(crateName);
				}
			}
		});
		const stacks = crateStacks.map(a => a.reverse());
		
		const moveInstructions = rawMoveInstructions.split("\n").map(l => {
			return l.split(" ").map(i => parseInt(i)).filter(i => i > 0);
		})
		return {stacks, moveInstructions};
	}

	const executeMoves = (stacks, instructions) => {
		let newStacks = [...stacks];
		instructions.forEach(i => {
			const [crateCount, moveFromStack, moveToStack] = i;
			for (let c = 0; c < crateCount; c++) {
				newStacks[moveToStack].push(newStacks[moveFromStack].pop());
			}
		})
		return newStacks;
	}

	const part1FullProcess = (data) => {
		const {stacks, moveInstructions} = startingDetails(data);
		const finish = executeMoves(stacks, moveInstructions);
		return finish.filter(a => !!a).map(a => a.at(-1)).join("");
	}

	finalDetails.part1SampleCalculated = part1FullProcess(sampleData);
	finalDetails.part1RealCalculated = part1FullProcess(realData);

	// Part 2
	finalDetails.part2SampleExpected = "MCD";
	finalDetails.part2RealExpected = "CQQBBJFCS";

	const executeMovesInBulk = (stacks, instructions) => {
		let newStacks = [...stacks];
		instructions.forEach(i => {
			const [crateCount, moveFromStack, moveToStack] = i;
			let cratesToMove = [];
			for (let c = 0; c < crateCount; c++) {
				cratesToMove.push(newStacks[moveFromStack].pop());
			}

			cratesToMove.reverse().forEach(c => newStacks[moveToStack].push(c));
		})
		return newStacks;
	}

	const part2FullProcess = (data) => {
		const {stacks, moveInstructions} = startingDetails(data);
		const finish = executeMovesInBulk(stacks, moveInstructions);
		return finish.filter(a => !!a).map(a => a.at(-1)).join("");
	}

	finalDetails.part2SampleCalculated = part2FullProcess(sampleData);
	finalDetails.part2RealCalculated = part2FullProcess(realData);

	// END DAY 5 SPECIFIC LOGIC

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

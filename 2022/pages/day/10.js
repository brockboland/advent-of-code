import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _, { head, sample } from "lodash";

const day = 10;

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
	finalDetails.part1SampleExpected = 13140;
	finalDetails.part1RealExpected = 13760;
	finalDetails.part2SampleExpected = "##..##..##..##..##..##..##..##..##..##..\n###...###...###...###...###...###...###.\n####....####....####....####....####....\n#####.....#####.....#####.....#####.....\n######......######......######......####\n#######.......#######.......#######.....";
	// RFKZCPEF
	finalDetails.part2RealExpected = "###..####.#..#.####..##..###..####.####.\n#..#.#....#.#.....#.#..#.#..#.#....#....\n#..#.###..##.....#..#....#..#.###..###..\n###..#....#.#...#...#....###..#....#....\n#.#..#....#.#..#....#..#.#....#....#....\n#..#.#....#..#.####..##..#....####.#....";

	// Part 1
	const interestingSignalStrengths = (input) => {
		let xRegister = 1;
		let cycle = 1;
		let interestingSignals = [];
		
		const firstInterestingSignalCycle = 20;
		const interestingSignalCycleFrequency = 40;

		const checkInterestingSignal = (cycle, currentX) => {
			if (cycle == firstInterestingSignalCycle || (cycle - firstInterestingSignalCycle) % interestingSignalCycleFrequency == 0) {
				interestingSignals.push(cycle * currentX);
			}
		}
		
		input.split("\n").forEach(instruction => {
			if (instruction == "noop") {
				cycle++;
				checkInterestingSignal(cycle, xRegister);
			} else {
				const addXValue = parseInt(instruction.split(" ")[1]);
				cycle++;
				checkInterestingSignal(cycle, xRegister);
				xRegister += addXValue;
				cycle++;
				checkInterestingSignal(cycle, xRegister);
			}
		});

		return interestingSignals;
	}

	finalDetails.part1SampleCalculated = interestingSignalStrengths(sampleData).reduce((a,b) => a+b);
	finalDetails.part1RealCalculated = interestingSignalStrengths(realData).reduce((a,b) => a+b);

	// Part 2
	const screenOutput = (input) => {
		let screenGrid = [];
		let currentPixelRow = "";
		const rowLength = 40;

		let xRegister = 1;
		let cycle = 1;

		const lit = "#";
		const dark = ".";

		const drawPixel = () => {
			const nextPixelIndex = currentPixelRow.length;
			if (Math.abs(nextPixelIndex - xRegister) <= 1) {
				currentPixelRow += lit;
			} else {
				currentPixelRow += dark;
			}

			if (currentPixelRow.length >= rowLength) {
				screenGrid.push(currentPixelRow);
				currentPixelRow = "";
			}
		}

		input.split("\n").forEach(instruction => {
			if (instruction == "noop") {
				drawPixel();
				cycle++;
			} else {
				drawPixel();
				cycle++;
				drawPixel();
				cycle++;

				const addXValue = parseInt(instruction.split(" ")[1]);
				xRegister += addXValue;				
			}
		});

		return screenGrid.join("\n");
	}

	finalDetails.part2SampleCalculated = screenOutput(sampleData);
	finalDetails.part2RealCalculated = screenOutput(realData);

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

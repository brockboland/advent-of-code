import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _, { head } from "lodash";

const day = 9;

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
	finalDetails.part1SampleExpected = 13;
	finalDetails.part1RealExpected = 5858;
	finalDetails.part2SampleExpected = 1;
	finalDetails.part2RealExpected = 2602;

    const numberOfTailPositions = (input, knotCount) => {
        let occupiedPositions = new Set(["0,0"]);

        let knotPositions = [];
        for (let k = 0; k < knotCount; k++) {
            knotPositions.push({x: 0, y: 0});
        }

        input.split("\n").forEach(instruction => {
            const [direction, amount] = instruction.split(" ");

            for (let i = 0; i < amount; i++) {
                if (direction == "R") knotPositions[0].x++;
                else if (direction == "L") knotPositions[0].x--;
                else if (direction == "U") knotPositions[0].y++;
                else if (direction == "D") knotPositions[0].y--;
                else console.log("UNEXPECTED DIRECTION: ", direction);
                
                for (let k = 1; k < knotCount; k++) {
                    if (!positionsAdjacent(knotPositions[k-1], knotPositions[k])) {
                        let move = moveTowards(knotPositions[k-1], knotPositions[k]);
                        knotPositions[k].x += move.x;
                        knotPositions[k].y += move.y;
                    }
                }
                const tailPosition = knotPositions.slice(-1)[0];
                occupiedPositions.add(tailPosition.x + "," + tailPosition.y);
            }
        });

        return occupiedPositions.size;
    }

    const positionsAdjacent = (p1, p2) => {
        let xDiff = Math.abs(p1.x - p2.x);
        let yDiff = Math.abs(p1.y - p2.y);
        return (xDiff <= 1 && yDiff <= 1);
    }

    const moveTowards = (target, tail) => {
        const xDiff = target.x - tail.x;
        const yDiff = target.y - tail.y;

        const xAbs = Math.abs(xDiff);
        const yAbs = Math.abs(yDiff);

        if (xDiff == 0 && yAbs > 1) {
            return {x: 0, y: yDiff / yAbs};
        } else if (yDiff == 0 && xAbs > 1) {
            return {y: 0, x: xDiff / xAbs};
        } else if (yAbs > 0 && xAbs > 0) {
            return {y: yDiff / yAbs, x: xDiff / xAbs};
        } else {
            return {x: 0, y: 0};
        }
    }

    finalDetails.part1SampleCalculated = numberOfTailPositions(sampleData, 2);
    finalDetails.part1RealCalculated = numberOfTailPositions(realData, 2);

    finalDetails.part2SampleCalculated = numberOfTailPositions(sampleData, 10);
    finalDetails.part2RealCalculated = numberOfTailPositions(realData, 10);

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

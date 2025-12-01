import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _, { head, sample } from "lodash";

const day = 12;

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
	finalDetails.part1SampleExpected = 31;
	// finalDetails.part1RealExpected = 182293;
	// finalDetails.part2SampleExpected = 2713310158;
	// finalDetails.part2RealExpected = 54832778815;


    const parseMap = (input) => {
        // Parse the input
        let startingPoint = {x:0, y:0};
        let endingPoint = {x:0, y:0};
        let spots = input.split("\n").map((line, x) => {
            return line.split("").map((c, y) => {
                let elevation = c;
                if (c == "E") {
                    elevation = "z";
                    endingPoint = {x, y};
                } else if (c == "S") {
                    elevation = "a";
                    startingPoint = {x, y};
                }
                return {
                    elevation,
                    elevationInt: elevation.charCodeAt(0),
                    validMoves: [],
                    isDestination: c == "E",
                    isStartingPoint: c == "S"
                }
            })
        });

        // Check valid moves for each spot
        for (let x = 0; x < spots.length; x++) {
            for (let y = 0; y < spots[x].length; y++) {
                const myElevation = spots[x][y].elevationInt;
                const potentialMoves = [
                    {x: x-1, y},
                    {x, y: y-1},
                    {x: x+1, y},
                    {x, y: y+1}
                ];

                const validMoves = potentialMoves.filter(potential => {
                    if (potential.x < 0 || potential.x >= spots.length) {
                        return false;
                    }
                    if (potential.y < 0 || potential.y >= spots[0].length) {
                        return false;
                    }
                    const potentialElevation = spots[potential.x][potential.y].elevationInt;
                    // console.log("Elevation at "+ potential.x + "," + potential.y + " is " + potentialElevation);
                    // console.log("My elevation is " + myElevation);
                    return (myElevation+1) >= potentialElevation;
                })
                spots[x][y].validMoves = validMoves;
            }
            
        }

        return {startingPoint, endingPoint, spots};
    }

    const part1SampleMap = parseMap(sampleData);
    console.log("Sample map:", part1SampleMap);
    

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

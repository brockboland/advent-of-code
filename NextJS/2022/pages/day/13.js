import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _, { head, sample } from "lodash";

const day = 13;

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
	// finalDetails.part1RealExpected = 182293; // NOT 4973
	// finalDetails.part2SampleExpected = 2713310158;
	// finalDetails.part2RealExpected = 54832778815;


    const parseInput = (input) => {
        return input.split("\n\n").map(chunk => {
            return chunk.split("\n").map(line => eval(line));
        })
    }

    const isPairInCorrectOrder = (leftPacket, rightPacket, indent) => {
        console.log(indent + "- Compare " + leftPacket + " vs " + rightPacket);
        indent += "  ";
        for (let leftIndex = 0; leftIndex < leftPacket.length; leftIndex++) {
            let leftItem = leftPacket[leftIndex];
            const leftIsInt = leftItem === parseInt(leftItem);
            
            if (leftIndex < rightPacket.length) {
                let rightItem = rightPacket[leftIndex];
                const rightIsInt = rightItem === parseInt(rightItem);

                if (leftIsInt && rightIsInt) {
                    console.log(indent + "- Compare " + leftItem + " vs " + rightItem);
                    // Both are ints: compare
                    const leftInt = parseInt(leftItem);
                    const rightInt = parseInt(rightItem);
                    if (leftInt == rightInt) {
                        // Equal means we check the next item
                        continue;
                    } else if (leftInt < rightInt) {
                        // Left is smaller: it's in order
                        console.log(indent + "  - Left side is smaller, so inputs are in the right order");
                        // return true;
                        continue;
                    } else if (leftInt > rightInt) {
                        // left is bigger: wrong order
                        console.log(indent + "  - Right side is smaller, so inputs are NOT in the right order");
                        return false;
                    } else {
                        // console.log("UNEXPECTED INT SITUATION: ", leftInt, rightInt);
                    }
                } else if (Array.isArray(leftItem) && Array.isArray(rightItem)) {
                    // Both are arrays: recurse
                    if (isPairInCorrectOrder(leftItem, rightItem, indent + "  ")) {
                        // Arrays are equal, continue
                        continue;
                    } else {
                        // Arrays are not in the right order, bail
                        return false;
                    }
                } else {
                    // One of them is an int: wrap it in an array and recurse
                    if (leftIsInt) {
                        console.log(indent + "- Mixed types; convert left to [" + leftItem + "] and retry comparison");
                        if (isPairInCorrectOrder([leftItem], rightItem, indent)) {
                            continue;
                        } else {
                            return false;
                        }
                    } else {
                        console.log(indent + "- Mixed types; convert right to [" + rightItem + "] and retry comparison");
                        if (isPairInCorrectOrder(leftItem, [rightItem], indent)) {
                            continue;
                        } else {
                            return false;
                        }
                    }
                }
            } else {
                // Right list ran out first: they are not in the right order
                // console.log("FAIL: right side shorter", leftPacket.length, rightPacket.length);
                console.log(indent + "- Right side ran out of items, so inputs are not in the right order");
                return false;
            }
        }

        // If we got this far, the right list might be longer
        if (rightPacket.length > leftPacket.length) {
            console.log(indent + "- Left side ran out of items, so inputs are in the right order");
            return true;
        }

        // Otherwise: they must be equal
        return true;
    }

    const comparePairs = (packetData) => {
        let pairsInCorrectOrder = [];

        for (let pairIndex = 0; pairIndex < packetData.length; pairIndex++) {
            console.log("== Pair " + (pairIndex + 1) + " ==");
            let [leftPacket, rightPacket] = packetData[pairIndex];
            if (isPairInCorrectOrder(leftPacket, rightPacket, "")) {
                // console.log("This one looks right", leftPacket, rightPacket);
                // The problem uses 1-indexed arrays, so add 1 here
                pairsInCorrectOrder.push(pairIndex+1);
            } else {
                // console.log("That one failed", leftPacket, rightPacket);
            }
        }

        // console.log("Correct pairs:", pairsInCorrectOrder);
        return pairsInCorrectOrder.reduce((a, b) => a+b);
    }
    
    finalDetails.part1SampleCalculated = comparePairs(parseInput(sampleData));
    // finalDetails.part1RealCalculated = comparePairs(parseInput(realData));

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

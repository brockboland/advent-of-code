import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _, { head, sample } from "lodash";

const day = 11;

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
	finalDetails.part1SampleExpected = 10605;
	finalDetails.part1RealExpected = 182293;
	finalDetails.part2SampleExpected = 2713310158;
	finalDetails.part2RealExpected = 54832778815;


    // Part 1
    const parseMonkeyData = (input) => {
        const monkeyRawData = input.split("\n\n");
        let monkeys = [];
        monkeyRawData.forEach(raw => {
            const lines = raw.split("\n");
            const items = lines[1].split(":")[1].split(", ").map(i => BigInt(i));
            const operation = lines[2].split("= ")[1];
            const test = BigInt(lines[3].split("divisible by ")[1]);
            const trueBehavior = parseInt(lines[4].split("true: throw to monkey")[1]);
            const falseBehavior = parseInt(lines[5].split("false: throw to monkey")[1]);
            const numberOfInspections = 0;
            monkeys.push({items, operation, test, trueBehavior, falseBehavior, numberOfInspections});
        });
        return monkeys;
    }

    const monkeyBusiness = (input, numberOfRounds, reduceWorry) => {
        const monkeys = parseMonkeyData(input);
        const modulus = BigInt(monkeys.map(m => m.test).reduce((a, b) => a*b));

        for (let round = 1; round <= numberOfRounds; round++) {
            for (let monkeyIndex = 0; monkeyIndex < monkeys.length; monkeyIndex++) {
                const monkey = monkeys[monkeyIndex];
                for (let itemIndex = 0; itemIndex < monkey.items.length; itemIndex++) {
                    // Monkey inspects: worry level goes up
                    const [_, modifier, otherNumberString] = monkey.operation.split(" ");
                    const otherNumber = otherNumberString == "old" ? monkey.items[itemIndex] : BigInt(otherNumberString);
                    
                    let oldWorryLevel = monkey.items[itemIndex];
                    let newWorryLevel = 0;
                    if (modifier == "+") {
                        newWorryLevel = oldWorryLevel + otherNumber;
                    } else if (modifier == "*") {
                        newWorryLevel = oldWorryLevel * otherNumber;
                    }
                    
                    monkeys[monkeyIndex].numberOfInspections++;
                    
                    if (reduceWorry) {
                        // Monkey gets bored: worry level comes down
                        newWorryLevel = newWorryLevel / 3n;
                    } else {
                        newWorryLevel = newWorryLevel % modulus;
                    }
                    // Monkey tests worry level
                    let throwTo = -1;
                    if (newWorryLevel % monkey.test == 0) {
                        throwTo = monkey.trueBehavior;
                    } else {
                        throwTo = monkey.falseBehavior;
                    }
                    monkeys[throwTo].items.push(newWorryLevel);
                }
                
                // Monkey has thrown all items
                monkeys[monkeyIndex].items = [];
            }

            if (round % 1000 == 0) {
                // console.log("Round " + round);
                // console.log(JSON.stringify(monkeys.map(m => m.numberOfInspections)));
            }
        }

        // After all rounds, find the two busiest monkeys
        let inspectionCounts = monkeys.map(m => m.numberOfInspections);
        // console.log("Final inspection counts:", inspectionCounts);

        // console.log("Final worry counts", monkeys.map(m => m.items));

        // console.log("Numbers of inspections", inspectionCounts);
        inspectionCounts.sort((a, b) => a - b);
        // console.log("Sorted inspections", inspectionCounts);
        const top2 = inspectionCounts.slice(-2);
        // console.log("Top2", top2);
        return top2[0] * top2[1];
    }
    
    // Part 1
    finalDetails.part1SampleCalculated = monkeyBusiness(sampleData, 20, true);
    finalDetails.part1RealCalculated = monkeyBusiness(realData, 20, true);

    // Part 2
    finalDetails.part2SampleCalculated = monkeyBusiness(sampleData, 10000, false);
    finalDetails.part2RealCalculated = monkeyBusiness(realData, 10000, false);

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

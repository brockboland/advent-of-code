import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _ from "lodash";

const day = 7;

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
	finalDetails.part1SampleExpected = 95437;
	finalDetails.part1RealExpected = 1581595;
	finalDetails.part2SampleExpected = 24933642;
	finalDetails.part2RealExpected = 1544176;

	// Part 1
	const fileStructure = (rawData) => {
        const input = rawData.split("\n");
		let structure = {isDirectory: true};
		let currentPath = [];

		for (let lineIndex = 0; lineIndex < input.length; lineIndex++) {
			const currentLine = input[lineIndex];

			if (currentLine.startsWith("$ cd")) {
				// Change directory
				const subdir = currentLine.split(" ")[2];
				if (subdir == "/") {
					currentPath = [];
				} else if (subdir == "..") {
					currentPath.pop();
				} else {
					currentPath.push(subdir);
				}
			} else if (currentLine.startsWith("$ ls")) {
				// Nothing to do here: continue to the next line
			} else if (currentLine.startsWith("dir ")) {
				const subdir = currentLine.split(" ")[1];
				const newPath = [...currentPath, subdir];
				_.set(structure, newPath, {isDirectory: true});
			} else {
				const [size, filename] = currentLine.split(" ");
				const newPath = [...currentPath, filename];
				_.set(structure, newPath, { size: parseInt(size) });
			}
        }
		return structure;
	};

    const addDirectorySizes = (structure) => {
        if (structure.isDirectory) {
            const subDirs = Object.keys(structure);
            let size = 0;
            subDirs.forEach(d => {
                if (d != "isDirectory" && d != "size") {
                    addDirectorySizes(structure[d]);
                    size += structure[d].size;
                }
            });
            structure.size = size;
        }
    }

    const sumSubDirectorySizes = (structure, maxSize) => {
        let finalSize = 0;
        if (structure.isDirectory) {
            const subDirs = Object.keys(structure);
            subDirs.forEach(d => {
                if (d != "isDirectory" && d != "size") {
                    finalSize += sumSubDirectorySizes(structure[d], maxSize);
                }
            });

            if (structure.size < maxSize) {
                finalSize += structure.size;
            }
        }
        return finalSize;
    }

	const sampleStructure = fileStructure(sampleData);
    addDirectorySizes(sampleStructure);
    finalDetails.part1SampleCalculated = sumSubDirectorySizes(sampleStructure, 100000);

    const realStructure = fileStructure(realData);
    addDirectorySizes(realStructure);
    finalDetails.part1RealCalculated = sumSubDirectorySizes(realStructure, 100000);

    // Part 2
    const totalSystemMemory = 70000000;
    const neededSystemMemory = 30000000;

    const spaceNeeded = (structure) => {
        return neededSystemMemory - (totalSystemMemory - structure.size);
    }

    const directorySizeToDelete = (structure, spaceNeeded) => {
        let directories = [];

        const directoryFinder = (name, structure) => {
            if (structure.isDirectory) {
                directories.push([name, structure.size]);

                const subDirs = Object.keys(structure);
                subDirs.forEach(d => {
                    if (d != "isDirectory" && d != "size") {
                        directoryFinder(d, structure[d]);
                    }
                });
            }
        }

        directoryFinder("/", structure);

        directories.sort((a,b) => a[1] - b[1]);
        
        for (let i = 0; i < directories.length; i++) {
            if (directories[i][1] >= spaceNeeded) {
                return directories[i][1];
            }
            
        }
    }

    finalDetails.part2SampleCalculated = directorySizeToDelete(sampleStructure, spaceNeeded(sampleStructure));
    finalDetails.part2RealCalculated = directorySizeToDelete(realStructure, spaceNeeded(realStructure));

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

import Head from "next/head";
import path from "path";
import { promises as fs } from "fs";
import DayStat from "../../components/DayState";
import _ from "lodash";

const day = 8;

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
	finalDetails.part1SampleExpected = 21;
	finalDetails.part1RealExpected = 1679;
	finalDetails.part2SampleExpected = 8;
	finalDetails.part2RealExpected = 536625;

	// Part 1
    const numberOfVisibleTrees = (input) => {
        const charGrid = input.split("\n").map(line => [...line]);
        
        // How many trees are on the perimeter?
        const outerTreeCount = 2 * (charGrid.length + charGrid[1].length - 2);

        let innerTreeCount = 0;

        // Start at 1 and go to second last to avoid checking trees on the perimeter
        for (let x = 1; x < charGrid.length-1; x++) {
            for (let y = 1; y < charGrid[x].length-1; y++) {
                innerTreeCount += isVisible(x, y, charGrid) ? 1 : 0;
            }
        }

        return outerTreeCount + innerTreeCount;
    }

    const isVisible = (x, y, grid) => {
        const treeHeight = grid[x][y];
        let visible = true;

        // Check left X
        visible = true;
        for (let loopX = 0; loopX < x; loopX++) {
            if (grid[loopX][y] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if (visible) {
            return true
        };

        // Check right X
        visible = true;
        for (let loopX = x+1; loopX < grid.length; loopX++) {
            if (grid[loopX][y] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if (visible) {
            return true
        };

        // Check above
        visible = true;
        for (let loopY = 0; loopY < y; loopY++) {
            if (grid[x][loopY] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if (visible) {
            return true
        };

        // Check below
        visible = true;
        for (let loopY = y+1; loopY < grid[0].length; loopY++) {
            if (grid[x][loopY] >= treeHeight) {
                visible = false;
                break;
            }
        }
        if (visible) {
            return true
        };


        return false;
    }

    finalDetails.part1SampleCalculated = numberOfVisibleTrees(sampleData);
    finalDetails.part1RealCalculated = numberOfVisibleTrees(realData);
	
    // Part 2

    const bestScenicScore = (input) => {
        const charGrid = input.split("\n").map(line => [...line]);
        
        let maxScenicScore = 0;

        let scenicScores = [];
        
        // Start at 1 and go to second last to avoid checking trees on the perimeter
        for (let x = 0; x < charGrid.length; x++) {
            scenicScores[x] = [];
            for (let y = 0; y < charGrid[x].length; y++) {
                const scenicScore = scenicScoreForTree(x, y, charGrid);
                scenicScores[x][y] = scenicScore;
                if (scenicScore > maxScenicScore) {
                    maxScenicScore = scenicScore;
                }
            }
        }

        // console.log("All scenic scores: ", scenicScores);
        return maxScenicScore;
    }

    const scenicScoreForTree = (x, y, grid) => {
        const treeHeight = grid[x][y];
        let visibleTrees = [0, 0, 0, 0];

        // Check left X
        for (let loopX = x-1; loopX >= 0; loopX--) {
            visibleTrees[0]++;
            if (grid[loopX][y] >= treeHeight) {
                break;
            }
        }
        

        // Check right X
        for (let loopX = x+1; loopX < grid.length; loopX++) {
            visibleTrees[1]++;
            if (grid[loopX][y] >= treeHeight) {
                break;
            }
        }
        

        // Check above
        for (let loopY = y-1; loopY >= 0; loopY--) {
            visibleTrees[2]++;
            if (grid[x][loopY] >= treeHeight) {
                break;
            }
        }


        // Check below
        for (let loopY = y+1; loopY < grid[0].length; loopY++) {
            visibleTrees[3]++;
            if (grid[x][loopY] >= treeHeight) {
                break;
            }
        }
       
        return visibleTrees[0] * visibleTrees[1] * visibleTrees[2] * visibleTrees[3];
    }

    finalDetails.part2SampleCalculated = bestScenicScore(sampleData);
    finalDetails.part2RealCalculated = bestScenicScore(realData);
    
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

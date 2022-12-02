import Head from "next/head";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Day2() {
	const { data, error } = useSWR("/api/puzzleInputs/2", fetcher);

	//Handle the error state
	if (error) return <div>Failed to load: {error.message}</div>;
	//Handle the loading state
	if (!data) return <div>No data yet</div>;
	//Handle the ready state and display the result contained in the data object mapped to the structure of the json file

	// BEGIN DAY 2 SPECIFIC LOGIC
    const Rock = "Rock";
    const Paper = "Paper";
    const Scissors = "Scissors";

    const input = data;
    // const input = "A Y\nB X\nC Z";

    const scores = {
        lose: 0,
        draw: 3,
        win: 6,
        Rock: 1,
        Paper: 2,
        Scissors: 3
    }

    const winLoseDrawScore = (them, me) => {
        if (them == me) return scores.draw;

        if (them == Rock) {
            if (me == Paper) return scores.win;
            return scores.lose;
        } else if (them == Paper) {
            if (me == Scissors) return scores.win;
            return scores.lose;
        } else if (them == Scissors) {
            if (me == Rock) return scores.win;
            return scores.lose;
        }

        // Default we shouldn't reach
        return scores.lose;
    }

    const moveMap = {
        A: Rock,
        B: Paper,
        C: Scissors,
        X: Rock,
        Y: Paper,
        Z: Scissors
    };

    const moves = input.split("\n");
    let overallScore = 0;
    for (const i in moves) {
        const [themRaw, meRaw] = moves[i].split(" ");
        const me = moveMap[meRaw];
        const them = moveMap[themRaw];
        overallScore += winLoseDrawScore(them, me) + scores[me];
    }
	const part1Answer = overallScore; // 15422


    // Part 2
    // X means you need to lose, Y means you need to end the round in a draw, and Z means you need to win
    const part2StrategicMap = {
        Rock: {
            X: Scissors,
            Y: Rock,
            Z: Paper
        },
        Paper: {
            X: Rock,
            Y: Paper,
            Z: Scissors
        },
        Scissors: {
            X: Paper,
            Y: Scissors,
            Z: Rock
        }
    }
    let part2Score = 0;
    for (const i in moves) {
        const [themRaw, meRaw] = moves[i].split(" ");
        const them = moveMap[themRaw];
        const me = part2StrategicMap[them][meRaw];
        part2Score += winLoseDrawScore(them, me) + scores[me];
    }
	const part2Answer = part2Score; // 15442
	// END DAY 2 SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day 2</title>
			</Head>

			<main>
				<div>
					Part 1 answer: <code>{part1Answer}</code>
				</div>
				<div>
					Part 2 answer: <code>{part2Answer}</code>
				</div>
			</main>
		</div>
	);
}

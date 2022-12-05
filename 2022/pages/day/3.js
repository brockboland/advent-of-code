import Head from "next/head";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Day3() {
	const { data, error } = useSWR("/api/puzzleInputs/3", fetcher);

	//Handle the error state
	if (error) return <div>Failed to load: {error.message}</div>;
	//Handle the loading state
	if (!data) return <div>No data yet</div>;
	//Handle the ready state and display the result contained in the data object mapped to the structure of the json file

	// BEGIN DAY 3 SPECIFIC LOGIC
	let part1Answer = "Coming soon";
    let part2Answer = "Coming soon";


    const characterValues = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    // Part 1
    const ruckSacks = data.split("\n")
    const ruckSackSections = ruckSacks.map(a => {
        const halfSize = a.length/2;
        return [a.slice(0, halfSize), a.slice(halfSize)]
    });
    const dupedItems = ruckSackSections.map(sack => {
        const [a, b] = sack;
        return [...a].filter(x => [...b].includes(x))[0];
    });
    const values = dupedItems.map(c => characterValues.indexOf(c)+1);
    part1Answer = values.reduce((a,b)=>a+b, 0); // 7850


    // Part 2
    let badgeCodes = [];
    for (let firstElfIndex = 0; firstElfIndex < ruckSacks.length; firstElfIndex+=3) {
        const [a,b,c] = ruckSacks.slice(firstElfIndex, firstElfIndex+3);
        badgeCodes.push([...a].filter(x => [...b].includes(x)).filter(x => [...c].includes(x))[0]);
    }
    part2Answer = badgeCodes.map(c => characterValues.indexOf(c)+1).reduce((a,b)=>a+b, 0); // 2581

	// END DAY 3 SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day 3</title>
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

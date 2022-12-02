import Head from "next/head";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Day1() {
	const { data, error } = useSWR("/api/puzzleInputs/1", fetcher);

	//Handle the error state
	if (error) return <div>Failed to load: {error.message}</div>;
	//Handle the loading state
	if (!data) return <div>Data not found</div>;
	//Handle the ready state and display the result contained in the data object mapped to the structure of the json file

	// BEGIN DAY 1 SPECIFIC LOGIC
	const summedGroups = data
		.split("\n\n")
		.map((x) =>
			x.split("\n").reduce((a, b) => parseInt(a) + parseInt(b), 0)
		);
	summedGroups.sort((a, b) => b - a);
	const part1Answer = summedGroups[0];
	const part2Answer = summedGroups.slice(0, 3).reduce((a, b) => a + b, 0);
	// END DAY 1 SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day 1</title>
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

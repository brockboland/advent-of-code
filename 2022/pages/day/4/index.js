import Head from "next/head";
import useSWR from "swr";

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.text());

export default function Day4() {
	const { data, error } = useSWR("/api/puzzleInputs/4", fetcher);

	//Handle the error state
	if (error) return <div>Failed to load: {error.message}</div>;
	//Handle the loading state
	if (!data) return <div>No data yet</div>;
	//Handle the ready state and display the result contained in the data object mapped to the structure of the json file

	// BEGIN DAY 4 SPECIFIC LOGIC
	let part1Answer = "Coming soon";
	let part2Answer = "Coming soon";

	// Part 1
	const pairs = data
		.split("\n")
		.map((a) => a.split(","))
		.map((a) => {
			const [l1, r1] = a[0].split("-").map(parseFloat);
			const [l2, r2] = a[1].split("-").map(parseFloat);
			return { l1, r1, l2, r2 };
		});

    part1Answer = 0; // 453
    pairs.forEach(a => {
        if ((a.l1 >= a.l2 && a.r1 <= a.r2) || (a.l1 <= a.l2 && a.r1 >= a.r2)) {
            part1Answer++;
        }
    });

    // Part 2
    part2Answer = 0; // 919
    pairs.forEach(a => {
        // {l1: 2, r1: 8, l2: 3, r2: 7}
        if ((a.l1 >= a.l2 && a.l1 <= a.r2) || (a.r1 >= a.l2 && a.r1 <= a.r2) ||
            (a.l2 >= a.l1 && a.l2 <= a.r1) || (a.r2 >= a.l1 && a.r2 <= a.r1)) {
            part2Answer++;
        }
    });


	// END DAY 4 SPECIFIC LOGIC

	return (
		<div>
			<Head>
				<title>Day 4</title>
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

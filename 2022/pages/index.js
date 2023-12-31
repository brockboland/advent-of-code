import Head from "next/head";
import DayStat from "../components/DayState";
import styles from "../styles/Home.module.css";

export default function Home() {
	const dayLabelClasses = "p-1 rounded-md bg-sky-500";
	const dayClasses = "p-1 rounded-md bg-gray-200";
	const day1Classes = dayClasses + " col-start-5";

	let days = [];
	for (let d = 2; d <= 25; d++) {
		days.push(d)
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

	return (
		<div>
			<Head>
				<title>Advent of Code 2022</title>
			</Head>

			<main className="flex min-h-screen mx-auto flex-col justify-center">
				<h1 className={styles.title}>Advent of Code 2022</h1>

				<div className="calendar basis-full text-center">
					<div className="grid grid-cols-7 gap-1">
						<div className={dayLabelClasses}>Sun</div>
						<div className={dayLabelClasses}>Mon</div>
						<div className={dayLabelClasses}>Tue</div>
						<div className={dayLabelClasses}>Wed</div>
						<div className={dayLabelClasses}>Thur</div>
						<div className={dayLabelClasses}>Fri</div>
						<div className={dayLabelClasses}>Sat</div>
						<div className={day1Classes}>1</div>
						{days.map((d, i) => {
							const link = "/day/" + d;
							return <DayStat {...finalDetails} key={i} />
							// return <div className={dayClasses} key={i}><a href={link}>{d}</a></div>
						})}
					</div>
				</div>
			</main>
		</div>
	);
}

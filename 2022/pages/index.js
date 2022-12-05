import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Home() {
	const dayLabelClasses = "p-1 rounded-md bg-sky-500";
	const dayClasses = "p-1 rounded-md bg-gray-200";
	const day1Classes = dayClasses + " col-start-5";

	return (
		<div>
			<Head>
				<title>Advent of Code 2022</title>
			</Head>

			<main className="flex min-h-screen mx-auto max-w-3xl flex-col justify-center">
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
						<div className={dayClasses}>2</div>
						<div className={dayClasses}>3</div>
						<div className={dayClasses}>4</div>
						<div className={dayClasses}>5</div>
						<div className={dayClasses}>6</div>
						<div className={dayClasses}>7</div>
						<div className={dayClasses}>8</div>
						<div className={dayClasses}>9</div>
						<div className={dayClasses}>10</div>
						<div className={dayClasses}>11</div>
						<div className={dayClasses}>12</div>
						<div className={dayClasses}>13</div>
						<div className={dayClasses}>14</div>
						<div className={dayClasses}>15</div>
						<div className={dayClasses}>16</div>
						<div className={dayClasses}>17</div>
						<div className={dayClasses}>18</div>
						<div className={dayClasses}>19</div>
						<div className={dayClasses}>20</div>
						<div className={dayClasses}>21</div>
						<div className={dayClasses}>22</div>
						<div className={dayClasses}>23</div>
						<div className={dayClasses}>24</div>
						<div className={dayClasses}>25</div>

						<div className={dayClasses}>26</div>
						<div className={dayClasses}>27</div>
						<div className={dayClasses}>28</div>
						<div className={dayClasses}>29</div>
						<div className={dayClasses}>30</div>
						<div className={dayClasses}>31</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default function DayStat({
	part1SampleExpected,
	part1SampleCalculated,
	part1RealExpected,
	part1RealCalculated,
	part2SampleExpected,
	part2SampleCalculated,
	part2RealExpected,
	part2RealCalculated,
}) {
	const displayValues = [
		{
			label: "part 1",
			sampleValue: part1SampleCalculated,
			realValue: part1RealCalculated,
			sampleExpected: part1SampleExpected,
			realExpected: part1RealExpected,
		},
		{
			label: "part 2",
			sampleValue: part2SampleCalculated,
			realValue: part2RealCalculated,
			sampleExpected: part2SampleExpected,
			realExpected: part2RealExpected,
		},
	];

	return (
		<div className="text-center">
			<div class="flex">
				<div class="w-1/5"></div>
				<div className="w-2/5">Sample</div>
				<div className="w-2/5">Real</div>
			</div>

			{displayValues.map((p, i) => {
				return <PartRow {...p} key={i} />;
			})}
		</div>
	);
}

function PartRow({
	label,
	sampleExpected,
	sampleValue,
	realExpected,
	realValue,
}) {
	const classes = {
		passing: "w-2/5 p-1 m-1 rounded-md bg-green-500",
		failing: "w-2/5 p-1 m-1 rounded-md bg-red-400",
		unknown: "w-2/5 p-1 m-1 rounded-md bg-neutral-200",
	};

	const determineClass = (expected, calculated) => {
		if (!!calculated) {
			return expected == calculated ? classes.passing : classes.failing;
		} else {
			return classes.unknown;
		}
	};

	const sampleClass = determineClass(sampleExpected, sampleValue);
	const realClass = determineClass(realExpected, realValue);
	const labelClass = "w-1/5 m-1 text-right";

	const sampleText =
		sampleExpected == sampleValue
			? sampleValue
			: sampleValue + " (expected " + sampleExpected + ")";
	const realText =
		realExpected == realValue
			? realValue
			: realValue + " (expected " + realExpected + ")";
	return (
		<div class="flex">
			<div className={labelClass}>{label}:</div>
			<div className={sampleClass}>{sampleText}</div>
			<div className={realClass}>{realText}</div>
		</div>
	);
}

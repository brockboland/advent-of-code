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

	console.log(displayValues);

	return (
		<div className="grid grid-cols-3 gap-1 text-center">
			<div className="col-start-2">Sample</div>
			<div>Real</div>

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
		passing: "p-1 rounded-md bg-green-500",
		failing: "p-1 rounded-md bg-red-400",
		unknown: "p-1 rounded-md bg-neutral-200",
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

	const sampleText =
		sampleExpected == sampleValue
			? sampleValue
			: sampleValue + " (expected " + sampleExpected + ")";
	const realText =
		realExpected == realValue
			? realValue
			: realValue + " (expected " + realExpected + ")";
	return (
		<>
			<div>{label}</div>
			<div className={sampleClass}>{sampleText}</div>
			<div className={realClass}>{realText}</div>
		</>
	);
}

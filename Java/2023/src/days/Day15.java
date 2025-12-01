package days;

import java.util.List;

import common.DayRunner;

public class Day15 extends DayRunner {
    public static void main(String[] args) {
        new Day15().run();
    }

    public Day15() {
        super(15);
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "1320";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "517551";
    }

    public String part1(List<String> inputFileLines) {
        String input = inputFileLines.get(0);

        String[] chunks = input.split(",");
        long runningSum = 0;

        for (int i = 0; i < chunks.length; i++) {
            String hashString = chunks[i];
            long currentValue = 0;

            char[] chars = hashString.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                currentValue += (long)chars[j];
                currentValue *= 17;
                currentValue = currentValue % 256;
            }
            // System.out.println(String.format("Chunk %s = %d", hashString, currentValue));
            runningSum += currentValue;
        }

        return String.valueOf(runningSum);
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "";
    }

    public String part2(List<String> inputFileLines) {
        return "TODO part 2";
    }

}

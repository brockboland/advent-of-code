package common;

import java.util.List;

public abstract class DayRunner {

    /**
     * Methods to implement for each day
     */

    public abstract String part1(List<String> inputFileLines);

    public abstract String part2(List<String> inputFileLines);

    // Replace these (without calling super) in implementation classes
    public String part1SampleExpectedOutput() {
        return "";
    }

    public String part1ExpectedOutput() {
        return "";
    }

    public String part2SampleExpectedOutput() {
        return "";
    }

    public String part2ExpectedOutput() {
        return "";
    }

    /**
     * Formatting constants
     */
    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    /**
     * Shared logic
     */

    private final List<String> inputFileLines;
    private final List<String> sampleInputFileLines;

    private final int day;

    public DayRunner() {
        this(0);
    }

    public DayRunner(int dayNumber) {
        inputFileLines = FileUtils.contentsFromFullInput(dayNumber);

        sampleInputFileLines = FileUtils.contentsFromSampleInput(dayNumber);
        day = dayNumber;
    }

    public void run() {
        System.out.println(String.format(" -- DAY %d --", day));

        String expectedSample1 = part1SampleExpectedOutput();
        if (expectedSample1.length() > 0) {
            partialResultOutput("Part 1 Sample", expectedSample1, part1(sampleInputFileLines));
        }
        partialResultOutput("Part 1", part1ExpectedOutput(), part1(inputFileLines));

        String expectedSample2 = part2SampleExpectedOutput();
        if (expectedSample2.length() > 0) {
            partialResultOutput("Part 2 Sample", expectedSample2, part2(sampleInputFileLines));
        }
        partialResultOutput("Part 2", part2ExpectedOutput(), part2(inputFileLines));
    }

    private void partialResultOutput(String section, String expectedResult, String actualResult) {
        String resultColor = ANSI_RESET;
        System.out.println(ANSI_BLUE + section + " result:");
        if (expectedResult.equals("")) {
            resultColor = ANSI_YELLOW;
        } else if (expectedResult.equals(actualResult)) {
            resultColor = ANSI_GREEN;
        } else {
            resultColor = ANSI_RED;
            actualResult = String.format("%s, expected:%n%s", actualResult, expectedResult);
        }
        System.out.println(resultColor + actualResult);
        System.out.println(ANSI_RESET);
    }
}

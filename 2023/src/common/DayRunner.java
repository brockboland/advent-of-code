package common;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;

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

    private List<String> inputFileLines;
    private List<String> sampleInputFileLines;

    private final int day;

    public DayRunner() {
        this(0);
    }

    public DayRunner(int dayNumber) {
        try {
            inputFileLines = FileUtils.contentsFromFullInput(dayNumber);
        } catch (IOException e) {
            System.err.println("Input file load failed:");
            e.printStackTrace();
        }

        try {
            sampleInputFileLines = FileUtils.contentsFromSampleInput(dayNumber);
        } catch (IOException e) {
            // No sample file: that's OK
            sampleInputFileLines = new ArrayList<>();
        }
        day = dayNumber;
    }

    public void run() {
        System.out.println(String.format(" -- DAY %d --", day));

        if (sampleInputFileLines.size() > 0 && part1SampleExpectedOutput().length() > 0) {
            outputResultsForPart("Part 1 Sample", part1SampleExpectedOutput(), sampleInputFileLines, this::part1);
        }
        if (inputFileLines.size() > 0) {
            outputResultsForPart("Part 1", part1ExpectedOutput(), inputFileLines, this::part1);
        }

        if (sampleInputFileLines.size() > 0 && part2SampleExpectedOutput().length() > 0) {
            outputResultsForPart("Part 2 Sample", part2SampleExpectedOutput(), sampleInputFileLines, this::part2);
        }
        if (inputFileLines.size() > 0) {
            outputResultsForPart("Part 2", part2ExpectedOutput(), inputFileLines, this::part2);
        }
    }


    private void outputResultsForPart(String partTitle, String expectedResult, List<String> input, Function<List<String>, String> method) {
        System.out.println(String.format("%sBeginning %s…", ANSI_BLUE, partTitle));
        
        final long startNanos = System.nanoTime();
        String actualResult = method.apply(input);
        final double runtimeSeconds = 1e-9d * (double)(System.nanoTime() - startNanos);

        String resultOutput = String.format("Finished in %1$,.4f seconds%n", runtimeSeconds);

        if (expectedResult.equals("")) {
            resultOutput += ANSI_YELLOW;
            resultOutput += actualResult;
        } else if (expectedResult.equals(actualResult)) {
            resultOutput += ANSI_GREEN;
            resultOutput += actualResult;
        } else {
            resultOutput += ANSI_RED;
            resultOutput += String.format("Calculated: %s%nExpected:   %s", actualResult, expectedResult);
        }

        System.out.println(resultOutput);

        System.out.println(ANSI_RESET);
    }
}

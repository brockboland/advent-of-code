package common;

import java.util.List;

public abstract class DayRunner {

    /**
     * Methods to implement for each day
     */

    public abstract String part1(List<String> inputFileLines);
    public abstract String part2(List<String> inputFileLines);

    // Replace this (without calling super) in implementation classes
    public String part1ExpectedOutput() {
        return "";
    }

    // Replace this (without calling super) in implementation classes
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

     private final int day;

    public DayRunner() {
        this(0);
    }

    public DayRunner(int dayNumber) {
        inputFileLines = FileUtils.contentsFromFullInput(dayNumber);
        day = dayNumber;
    }

    public void run() {
        String resultColor = ANSI_RESET;
        System.out.println(ANSI_RESET);

        System.out.println(String.format(" -- DAY %d --", day));

        // PART 1

        String part1Result = part1(inputFileLines);
        System.out.println(ANSI_BLUE + "Part 1 result:");
        if (part1ExpectedOutput().equals("")) {
            resultColor = ANSI_YELLOW;
        } else if (part1ExpectedOutput().equals(part1Result)) {
            resultColor = ANSI_GREEN;
        } else {
            resultColor = ANSI_RED;
            part1Result = part1Result + ", expected: " + part1ExpectedOutput();
        }
        System.out.println(resultColor + part1Result);

        System.out.println(ANSI_RESET);

        
        // PART 2

        String part2Result = part2(inputFileLines);
        System.out.println(ANSI_BLUE + "Part 2 result:");
        if (part2ExpectedOutput().equals("")) {
            resultColor = ANSI_YELLOW;
        } else if (part2ExpectedOutput().equals(part2Result)) {
            resultColor = ANSI_GREEN;
        } else {
            resultColor = ANSI_RED;
            part2Result = String.format("%s, expected:%n%s", part2Result, part2ExpectedOutput());
        }
        System.out.println(resultColor + part2Result);


        System.out.println(ANSI_RESET);
    }
}

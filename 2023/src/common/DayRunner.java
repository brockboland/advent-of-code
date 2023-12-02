package common;

import java.util.List;

public abstract class DayRunner {
    private final List<String> fileLines;

    public abstract String part1(List<String> fileLines);
    public abstract String part2(List<String> fileLines);

    public static final String ANSI_RESET = "\u001B[0m";
    public static final String ANSI_BLACK = "\u001B[30m";
    public static final String ANSI_RED = "\u001B[31m";
    public static final String ANSI_GREEN = "\u001B[32m";
    public static final String ANSI_YELLOW = "\u001B[33m";
    public static final String ANSI_BLUE = "\u001B[34m";
    public static final String ANSI_PURPLE = "\u001B[35m";
    public static final String ANSI_CYAN = "\u001B[36m";
    public static final String ANSI_WHITE = "\u001B[37m";

    public DayRunner() {
        this(0);
    }

    public DayRunner(int dayNumber) {
        fileLines = FileUtils.contentsFrom(dayNumber);
    }

    public void run() {
        String part1Result = part1(fileLines);
        String part2Result = part2(fileLines);

        System.out.println(ANSI_RESET);
        System.out.println(ANSI_GREEN + "Part 1 result:");
        System.out.println(ANSI_BLUE + part1Result);

        System.out.println(ANSI_RESET);

        System.out.println(ANSI_GREEN + "Part 2 result:");
        System.out.println(ANSI_BLUE + part2Result);

        System.out.println(ANSI_RESET);
    }
}

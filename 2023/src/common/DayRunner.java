package common;

import java.util.List;

public abstract class DayRunner {
    private final List<String> fileLines;

    public abstract String part1(List<String> fileLines);
    public abstract String part2(List<String> fileLines);

    public DayRunner() {
        this(0);
    }

    public DayRunner(int dayNumber) {
        fileLines = FileUtils.contentsFrom(dayNumber);
    }

    public void run() {
        String part1Result = part1(fileLines);
        String part2Result = part2(fileLines);
        System.out.println(String.format("Part 1 result:%n%s", part1Result));
        System.out.println(String.format("Part 2 result:%n%s", part2Result));
    }
}

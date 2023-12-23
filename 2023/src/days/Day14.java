package days;

import java.util.List;
import java.util.function.Function;

import common.Coord2D;
import common.DayRunner;
import common.Grid;

public class Day14 extends DayRunner {
    public static void main(String[] args) {
        new Day14().run();
    }

    public Day14() {
        super(14);
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "136";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "112773";
    }

    public String part1(List<String> inputFileLines) {
        Function<Character, Character> boring = x -> x;
        Grid<Character> grid = new Grid<>(inputFileLines, boring);

        boolean didRoll = false;

        // System.out.println(String.format("Starting grid:%n%s", grid));

        // Keep rolling north until everything stops moving
        do {
            didRoll = false;
            for (int y = 1; y < grid.rowCount(); y++) {
                for (int x = 0; x < grid.columnCount(); x++) {
                    Coord2D currentPoint = new Coord2D(x, y);
                    // If the current spot is a rolling rock…
                    if (grid.get(currentPoint).charValue() == 'O') {
                        // …and the spot above it is empty, then…
                        if (grid.get(currentPoint.up()).charValue() == '.') {
                            // …roll north!
                            grid.swap(currentPoint, currentPoint.up());
                            // System.out.println(String.format("Swapping %s and %s", currentPoint, currentPoint.up()));
                            didRoll = true;
                        }
                    }
                }
            }

            // System.out.println(String.format("Grid after rolling:%n%s", grid));
        } while (didRoll);

        // Scoring
        long score = 0;

        for (int y = 0; y < grid.rowCount(); y++) {
            int rowScore = grid.rowCount() - y;
            for (int x = 0; x < grid.columnCount(); x++) {
                if (grid.get(x, y).charValue() == 'O') {
                    score += rowScore;
                }
            }
        }

        return String.valueOf(score);
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

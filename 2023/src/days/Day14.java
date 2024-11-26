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

        // System.out.println(String.format("Starting grid:%n%s", grid));
        grid = roll(grid, Coord2D.Direction.UP);

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

    Grid<Character> roll(Grid<Character> grid, Coord2D.Direction direction) {
        boolean didRoll = false;
        // Keep rolling north until everything stops moving
        do {
            didRoll = false;
            for (int y = 0; y < grid.rowCount(); y++) {
                for (int x = 0; x < grid.columnCount(); x++) {
                    Coord2D currentPoint = new Coord2D(x, y);
                    // If the current spot is a rolling rock…
                    if (grid.get(currentPoint).charValue() == 'O') {
                        Coord2D nextSpot = currentPoint.move(direction, 1);
                        // …and the spot above it is empty, then…
                        if (grid.isValidPosition(nextSpot)) {
                            if (grid.get(nextSpot).charValue() == '.') {
                                // …roll north!
                                grid.swap(currentPoint, nextSpot);
                                // System.out.println(String.format("Swapping %s and %s", currentPoint,
                                // nextSpot));
                                didRoll = true;
                            }
                        }
                    }
                }
            }

            // System.out.println(String.format("Grid after rolling:%n%s", grid));
        } while (didRoll);
        return grid;
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "64";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "";
    }

    public String part2(List<String> inputFileLines) {
        Function<Character, Character> boring = x -> x;
        Grid<Character> grid = new Grid<>(inputFileLines, boring);

        // System.out.println(String.format("Starting grid:%n%s", grid));

        for (int i = 0; i < 1000000000; i++) {
            String cycleStart = grid.toString();
            grid = roll(grid, Coord2D.Direction.UP);
            grid = roll(grid, Coord2D.Direction.LEFT);
            grid = roll(grid, Coord2D.Direction.DOWN);
            grid = roll(grid, Coord2D.Direction.RIGHT);

            String cycleEnd = grid.toString();
            if (cycleStart.equals(cycleEnd)) {
                System.out.println(String.format("Grid unchanged in cycle %d", i));
            }
            // System.out.println(String.format("Grid after %d cycles:%n%s", i + 1, grid));
            // System.out.println(String.format("Cycle %d", i));
        }

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

}

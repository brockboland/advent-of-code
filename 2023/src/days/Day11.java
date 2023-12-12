package days;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import common.Coord2D;
import common.DayRunner;
import common.Grid;

public class Day11 extends DayRunner {
    public static void main(String[] args) {
        new Day11().run();
    }

    public Day11() {
        super(11);
    }

    public class Universe extends Grid {

        public List<Coord2D> knownGalaxies;

        public Universe(List<String> input) {
            super(input);

            knownGalaxies = findAll('#');
        }

        // Returns a list of column indices, in descending order
        private List<Integer> emptyColumns() {
            List<Integer> cols = new ArrayList<>();
            // Go right to left so indices work when expanding
            for (int x = columnCount() - 1; x >= 0; x--) {
                if (!colContains(x, '#')) {
                    cols.add(Integer.valueOf(x));
                    // System.out.println(String.format("Empty column: %d", x));
                }
            }
            return cols;
        }

        // Returns a list of row indices, in descending order
        private List<Integer> emptyRows() {
            List<Integer> emptyRows = new ArrayList<>();
            // Go bottom to top so indices work when expanding
            for (int y = rowCount() - 1; y >= 0; y--) {
                if (!rowContains(y, '#')) {
                    emptyRows.add(Integer.valueOf(y));
                    // System.out.println(String.format("Empty row: %d", y));
                }
            }
            return emptyRows;
        }

        public void adjustGalaxiesForExpansion(int expansionRate) {
            List<Integer> rowsToAdjust = emptyRows();
            List<Integer> columnsToAdjust = emptyColumns();

            // System.out.println(String.format("Expanding rows:%n%s", rowsToAdjust));
            for (Integer rowIndex : rowsToAdjust) {
                int row = rowIndex.intValue();
                knownGalaxies = knownGalaxies.stream().map(c -> (c.y() > row ? c.moveDown(expansionRate) : c)).collect(Collectors.toList());
            }
            // System.out.println(String.format("Galaxies after expanding rows: %n%s", knownGalaxies));

            // System.out.println(String.format("Expanding Columns:%n%s", columnsToAdjust));
            for (Integer colIndex : columnsToAdjust) {
                int col = colIndex.intValue();
                knownGalaxies = knownGalaxies.stream().map(c -> (c.x() > col ? c.moveRight(expansionRate) : c)).collect(Collectors.toList());
            }
            // System.out.println(String.format("Galaxies after expanding columns: %n%s", knownGalaxies));
        }

        public int stepsBetweenAllGalaxies() {
            int totalSteps = 0;
            for (int outer = 0; outer < knownGalaxies.size() - 1; outer++) {
                Coord2D outerGalaxy = knownGalaxies.get(outer);
                for (int inner = outer + 1; inner < knownGalaxies.size(); inner++) {
                    totalSteps += outerGalaxy.stepsTo(knownGalaxies.get(inner));
                }
            }
            return totalSteps;
        }
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "374";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "10292708";
    }

    public String part1(List<String> inputFileLines) {
        Universe universe = new Universe(inputFileLines);
        // System.out.println(String.format("Galaxies befoer expansion: %n%s", universe.knownGalaxies));
        universe.adjustGalaxiesForExpansion(1);
        // System.out.println(String.format("Galaxies after expansion: %n%s", universe.knownGalaxies));
        int totalSteps = universe.stepsBetweenAllGalaxies();
        return String.valueOf(totalSteps);
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "8410";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "";
    }

    // 17404382 is too low
    // I'm getting the wrong answers for the provided samples, too. I suspect my naive step-counting logic in Coord2D::stepsTo is the problem
    public String part2(List<String> inputFileLines) {
        Universe universe = new Universe(inputFileLines);
        // System.out.println(String.format("Galaxies befoer expansion: %n%s", universe.knownGalaxies));
        universe.adjustGalaxiesForExpansion(100);
        // System.out.println(String.format("Galaxies after expansion: %n%s", universe.knownGalaxies));
        int totalSteps = universe.stepsBetweenAllGalaxies();
        return String.valueOf(totalSteps);
    }

}

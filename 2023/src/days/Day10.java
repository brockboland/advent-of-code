package days;

import java.nio.channels.Pipe;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;

import common.Coord2D;
import common.DayRunner;
import common.Grid;

public class Day10 extends DayRunner {
    public static void main(String[] args) {
        new Day10().run();
    }

    public Day10() {
        super(10);
    }

    public class FieldSpot {
        public Character label;
        public Coord2D location;
    }

    public class PipeField {
        public Grid<Character> grid;

        public Coord2D startingPoint;

        public PipeField(List<String> input) {
            Function<Character, Character> boring = x -> x;
            grid = new Grid<>(input, boring);

            startingPoint = grid.findAll(Character.valueOf('S')).get(0);
        }

        public int stepsToLoop() {
            Coord2D previousPosition = startingPoint;
            Coord2D currentPosition = startingPoint;

            System.out.print("Starting at " + currentPosition);
            // Pick a direction to go to start
            Set<Coord2D.Direction> validStartingMoves = validMovesFromPosition(startingPoint);
            for (Coord2D.Direction direction : validStartingMoves) {
                currentPosition = startingPoint.move(direction, 1);
                System.out.println(String.format("Frist move is %s from %s to %s", direction, startingPoint, currentPosition));
                break;
            }
            int steps = 1;
            System.out.print("First move to " + currentPosition);

            outer: while (!currentPosition.isEqualTo(startingPoint)) {
                Set<Coord2D.Direction> moves = validMovesFromPosition(currentPosition);
                for (Coord2D.Direction direction : moves) {
                    Coord2D potentialNextPosition = currentPosition.move(direction, 1);
                    // If this move would take us back to the last spot, skip it
                    if (potentialNextPosition.isEqualTo(previousPosition)) {
                        continue;
                    }
                    // The other of the 2 possible moves is the one we should take
                    steps++;
                    previousPosition = currentPosition;
                    currentPosition = potentialNextPosition;
                    // System.out.println(String.format("Step %d, moved from %s to %s", steps, previousPosition, currentPosition));
                    continue outer;
                }

                System.out.println(String.format("Failed to find a move out of spot %s", currentPosition));
                break;
            }
            return steps;
        }

        public Set<Coord2D.Direction> validMovesFromPosition(Coord2D position) {
            Set<Coord2D.Direction> directions = new HashSet<>();

            Character thisPositionValue = grid.get(position);
            Map<Coord2D.Direction, Coord2D> neighborPositions = position.cardinalNeighbors();
            for (Map.Entry<Coord2D.Direction, Coord2D> entry : neighborPositions.entrySet()) {
                Coord2D.Direction direction = entry.getKey();
                try {
                    Character neighborValue = grid.get(entry.getValue());
                    if (moveIsValid(thisPositionValue, direction, neighborValue)) {
                        directions.add(direction);
                        // System.out.println(String.format("Move from %s to %s is VALID", thisPositionValue, neighborValue));
                    // } else {
                    //     System.out.println(String.format("Move from %s to %s is not valid", thisPositionValue, neighborValue));
                    }
                } catch (Exception e) {
                    // We hit this if we try to get an invalid spot on the grid - like if we try to go left from the first column
                    // System.out.println(String.format("Can't movef %s from %s", direction, position));
                }
            }

            return directions;
        }

        private boolean moveOutIsValid(Character currentChar, Coord2D.Direction movingDirection) {
            char current = currentChar.charValue();

            if (current == 'S') {
                return true;
            }

            switch (movingDirection) {
                case UP:
                    return current == '|' || current == 'L' || current == 'J';

                case DOWN:
                    return current == '|' || current == '7' || current == 'F';

                case LEFT:
                    return current == '-' || current == '7' || current == 'J';

                case RIGHT:
                    return current == '-' || current == 'F' || current == 'L';

                default:
                    return false;
            }
        }

        private boolean moveInIsValid(Character currentChar, Coord2D.Direction movingDirection) {
            return moveOutIsValid(currentChar, movingDirection.opposite());
        }

        private boolean moveIsValid(Character currentChar, Coord2D.Direction movingDirection, Character targetChar) {
            return moveOutIsValid(currentChar, movingDirection) && moveInIsValid(targetChar, movingDirection);
        }

        @Override
        public String toString() {
            return String.format("PipeField! Starting point %s, looks like: %n%s", startingPoint, grid);
        }
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "8";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "7012";
    }

    public String part1(List<String> inputFileLines) {
        PipeField field = new PipeField(inputFileLines);
        int totalSteps = field.stepsToLoop();
        int answer = totalSteps / 2;
        return String.valueOf(answer);
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

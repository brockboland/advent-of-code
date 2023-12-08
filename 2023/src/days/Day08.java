package days;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

public class Day08 extends DayRunner {
    public static void main(String[] args) {
        new Day08().run();
    }

    public Day08() {
        super(8);
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "6";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "14257";
    }

    public class CamelMap {
        char[] turns;
        Map<String, Node> nodes;

        public CamelMap(List<String> inputFileLines) {
            turns = inputFileLines.get(0).toCharArray();

            nodes = new HashMap<>();
            for (int i = 2; i < inputFileLines.size(); i++) {
                String[] parts = inputFileLines.get(i).split(" = ");
                String nodeName = parts[0];
                // Strip off the parens around the next steps
                String[] next = parts[1].substring(1, parts[1].length() - 1).split(", ");
                nodes.put(nodeName, new Node(next[0], next[1]));
            }
        }

        @Override
        public String toString() {
            return String.format("Map. Turns:%n%s %nNodes:%n%s", new String(turns), nodes);
        }
    }

    public class Node {
        String left;
        String right;

        public Node(String left, String right) {
            this.left = left;
            this.right = right;
        }

        @Override
        public String toString() {
            return String.format("L: %s, R: %s", left, right);
        }
    }

    public class Navigator {
        CamelMap map;
        
        public Navigator(CamelMap map) {
            this.map = map;
        }

        @Override
        public String toString() {
            return String.format("Navigator. Map:%n%s", map);
        }

        public int stepsToReachEnd(String currentPosition, int positionInTurns) {
            int steps = 0;

            do {
                if (positionInTurns >= map.turns.length) {
                    positionInTurns = 0;
                }
                char nextTurn = map.turns[positionInTurns];

                // System.out.println(String.format("Moving %c from %s", nextTurn,
                // currentPosition));
                if (nextTurn == 'L') {
                    currentPosition = map.nodes.get(currentPosition).left;
                } else {
                    currentPosition = map.nodes.get(currentPosition).right;
                }

                positionInTurns++;
                steps++;
            } while (!currentPosition.equals("ZZZ"));
            return steps;
        }

        public String nextStep(String currentPosition, long positionInTurns) {
            int turnIndex = (int) (positionInTurns % map.turns.length);
            char nextTurn = map.turns[turnIndex];

            // System.out.println(String.format("Moving %c from %s", nextTurn,
            // currentPosition));
            if (nextTurn == 'L') {
                return map.nodes.get(currentPosition).left;
            } else {
                return map.nodes.get(currentPosition).right;
            }
        }
    }

    public String part1(List<String> inputFileLines) {
        CamelMap map = new CamelMap(inputFileLines);
        Navigator nav = new Navigator(map);
        String position = "AAA";
        long stepsTaken = 0;

        do {
            position = nav.nextStep(position, stepsTaken);
            stepsTaken++;
        } while (!position.equals("ZZZ"));

        return String.valueOf(stepsTaken);
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

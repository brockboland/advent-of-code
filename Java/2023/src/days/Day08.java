package days;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
        return "";
    }

    @Override
    public String part1ExpectedOutput() {
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

        public List<String> ghostlyStartingPoints() {
            List<String> points = nodes.keySet().stream().collect(Collectors.toList());
            points.removeIf(s -> !s.endsWith("A"));
            return points;
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

        public String nextStep(String currentPosition, long positionInTurns) {
            int turnIndex = (int) (positionInTurns % map.turns.length);
            char nextTurn = map.turns[turnIndex];

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
        return "6";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "16187743689077";
    }

    // Wound up solving this one partly manual, and with some hints from the team Slack
    // As is, this will run for…a long time
    public String part2(List<String> inputFileLines) {
        CamelMap map = new CamelMap(inputFileLines);
        Navigator nav = new Navigator(map);

        List<String> positions = map.ghostlyStartingPoints();
        // System.out.println(String.format("Starting positions: %s", positions));
        
        long stepsTaken = 0;
        boolean allDone = false;

        do {
            // System.out.println(String.format("Step %1d, positions: %s", stepsTaken, positions));
            final long currentSteps = stepsTaken; // Need a final for the map below
            List<String> newPositions = positions.stream().map(p -> nav.nextStep(p, currentSteps)).collect(Collectors.toList());
            stepsTaken++;
            allDone = newPositions.stream().allMatch(p -> p.endsWith("Z"));
            positions = newPositions;

            // for (int i = 0; i < positions.size(); i++) {
            //     if (positions.get(i).endsWith("Z")) {
            //         System.out.println(String.format("Ghost %d hit an end point %s after %d steps", i, positions.get(i), stepsTaken));
            //     }
            // }
        } while (!allDone);

        return String.valueOf(stepsTaken);
    }

}

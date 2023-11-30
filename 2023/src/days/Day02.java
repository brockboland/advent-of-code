package days;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

public class Day02 extends DayRunner {
    public Day02() {
        super(2);
    }

    public static void main(String[] args) {
        new Day02().run();
    }

    public String part1(List<String> fileLines) {
        Map<String, Integer> scoresMap = new HashMap<>();
        // Opponent:
        // A for Rock, B for Paper, and C for Scissors
        // Self:
        // X for Rock, Y for Paper, and Z for Scissors
        scoresMap.put("A X", Integer.valueOf(4));
        scoresMap.put("A Y", Integer.valueOf(8));
        scoresMap.put("A Z", Integer.valueOf(3));
        scoresMap.put("B X", Integer.valueOf(1));
        scoresMap.put("B Y", Integer.valueOf(5));
        scoresMap.put("B Z", Integer.valueOf(9));
        scoresMap.put("C X", Integer.valueOf(7));
        scoresMap.put("C Y", Integer.valueOf(2));
        scoresMap.put("C Z", Integer.valueOf(6));

        int score = 0;
        for (String string : fileLines) {
            int thisScore = scoresMap.get(string).intValue();
            // System.out.println(String.format("Score for %s was %d", string, thisScore));
            score += thisScore;
        }
        return Integer.toString(score);
    }

    public String part2(List<String> fileLines) {
        return "pretend this is good";
    }

}

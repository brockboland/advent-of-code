package days;

import java.util.ArrayList;
import java.util.List;

import common.DayRunner;

public class Day04 extends DayRunner {

    public class ScratchCard {
        public List<Integer> winningNumbers;
        public List<Integer> myNumbers;
        public String cardNumber;

        public ScratchCard(String cardNumber, String[] winnersAsStrings, String[] myNumbersAsStrings) {
            this.winningNumbers = new ArrayList<>();
            this.myNumbers = new ArrayList<>();
            this.cardNumber = cardNumber;

            for (String n : myNumbersAsStrings) {
                if (n.trim().isEmpty()) continue;
                this.myNumbers.add(Integer.valueOf(n.trim()));
            }

            for (String n : winnersAsStrings) {
                if (n.trim().isEmpty()) continue;
                this.winningNumbers.add(Integer.valueOf(n.trim()));
            }
        }

        public int score() {
            int score = 0;

            for (Integer mine : myNumbers) {
                if (winningNumbers.contains(mine)) {
                    if (score == 0) {
                        score = 1;
                    } else {
                        score *= 2;
                    }
                }
            }

            return score;
        }

        public String toString() {
            return cardNumber + ": winners are " + winningNumbers + ", mine are " + myNumbers;
        }
    }

    public Day04() {
        super(4);
    }

    public static void main(String[] args) {
        new Day04().run();
    }

    // 23750
    public String part1(List<String> fileLines) {
        int runningTotal = 0;

        for (String line : fileLines) {
            String[] lineParts = line.split(": ");
            String cardNumber = lineParts[0];
            String[] scratchedNumbers = lineParts[1].split("\\|");

            String[] winningNumbers = scratchedNumbers[0].split("\\s+");
            String[] myNumbers = scratchedNumbers[1].split("\\s+");

            ScratchCard c = new ScratchCard(cardNumber, winningNumbers, myNumbers);
            // System.out.println(c);
            runningTotal += c.score();
        }

        return String.valueOf(runningTotal);
    }

    public String part2(List<String> fileLines) {
        return "TODO part 2";
    }

}

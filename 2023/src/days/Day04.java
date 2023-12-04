package days;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

public class Day04 extends DayRunner {

    public class CardCollection {
        public List<ScratchCard> originalCards;
        public Map<Integer, Integer> countOfCopies;

        public CardCollection(List<String> inputLines) {
            originalCards = new ArrayList<>();
            countOfCopies = new HashMap<>();

            for (String line : inputLines) {
                String[] lineParts = line.split(": ");
                String cardNumber = lineParts[0];
                String[] scratchedNumbers = lineParts[1].split("\\|");

                String[] winningNumbers = scratchedNumbers[0].split("\\s+");
                String[] myNumbers = scratchedNumbers[1].split("\\s+");

                ScratchCard c = new ScratchCard(cardNumber, winningNumbers, myNumbers);
                originalCards.add(c);
                countOfCopies.put(c.cardNumber, Integer.valueOf(0));
            }
        }
    }

    public class ScratchCard {
        public List<Integer> winningNumbers;
        public List<Integer> myNumbers;
        public Integer cardNumber;

        public ScratchCard(String cardNumberString, String[] winnersAsStrings, String[] myNumbersAsStrings) {
            this.winningNumbers = new ArrayList<>();
            this.myNumbers = new ArrayList<>();
            this.cardNumber = Integer.valueOf(cardNumberString.replaceAll("[^0-9]", ""));

            for (String n : myNumbersAsStrings) {
                if (n.trim().isEmpty()) continue;
                this.myNumbers.add(Integer.valueOf(n.trim()));
            }

            for (String n : winnersAsStrings) {
                if (n.trim().isEmpty()) continue;
                this.winningNumbers.add(Integer.valueOf(n.trim()));
            }
        }

        public int numberOfMatchingNumbers() {
            int count = 0;

            for (Integer mine : myNumbers) {
                if (winningNumbers.contains(mine)) {
                    count++;
                }
            }

            return count;
        }

        // Score 1 for the first match, then double for each additional match
        public int score() {
            int s = 0;
            for (int i = 0; i < numberOfMatchingNumbers(); i++) {
                if (s == 0) s = 1;
                else s *= 2;
            }
            return s;
        }

        public String toString() {
            return String.format("Card %s: winers are %s, mine are %s. Score %d, on %d matches", cardNumber, winningNumbers, myNumbers, this.score(), this.numberOfMatchingNumbers());
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
        CardCollection collection = new CardCollection(fileLines);

        int runningTotal = 0;
        for (ScratchCard card : collection.originalCards) {
            runningTotal += card.score();
        }

        return String.valueOf(runningTotal);
    }

    // 13261850
    public String part2(List<String> fileLines) {
        CardCollection collection = new CardCollection(fileLines);

        for (ScratchCard card : collection.originalCards) {
            int matches = card.numberOfMatchingNumbers();
            int copiesOfThisCard = collection.countOfCopies.get(card.cardNumber).intValue();

            for (int i = 1; i <= matches; i++) {
                Integer nextCardNumber = Integer.valueOf(card.cardNumber.intValue() + i);
                
                Integer existingCopies = collection.countOfCopies.get(nextCardNumber);
                // Add a copy for the match in the original card, plus a copy for each copy of the original card
                Integer newNumberOfCopies = Integer.valueOf(existingCopies.intValue() + 1 + copiesOfThisCard);
                collection.countOfCopies.put(nextCardNumber, newNumberOfCopies);
            }
        }

        int finalAnswer = collection.originalCards.size();
        for (ScratchCard card : collection.originalCards) {
            finalAnswer += collection.countOfCopies.get(card.cardNumber).intValue();
        }
        return String.valueOf(finalAnswer);
    }

}

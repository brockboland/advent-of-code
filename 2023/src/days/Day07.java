package days;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

public class Day07 extends DayRunner {
    public static void main(String[] args) {
        new Day07().run();
    }

    public Day07() {
        super(7);
    }


    public class Hand {
        private final static String cardValueOrder = "AKQJT98765432";

        char[] cards;
        int bid;
        HandType handType;

        public enum HandType {
            FIVE_OF_A_KIND (7),
            FOUR_OF_A_KIND (6),
            FULL_HOUSE (5),
            THREE_OF_A_KIND (4),
            TWO_PAIR (3),
            ONE_PAIR (2),
            HIGH_CARD (1);

            public final int comparatorValue;
            HandType(int comparatorValue) {
                this.comparatorValue = comparatorValue;;
            }
        }

        public Hand(String inputLine) {
            cards = inputLine.split(" ")[0].toCharArray();
            bid = Integer.valueOf(inputLine.split(" ")[1]).intValue();
            handType = handType(cards);
        }

        @Override
        public String toString() {
            return String.format("Hand %c %c %c %c %c, type %s, bid %1d", cards[0],cards[1],cards[2],cards[3],cards[4], handType, bid);
        }

        private HandType handType(char[] input) {
            Map<Character, Integer> cardMap = cardCount(input);
            
            if (cardMap.size() == 1) {
                // Only one type of card: it's five of a kind
                return HandType.FIVE_OF_A_KIND;
            } else if (cardMap.size() == 2) {
                // If we have two different kinds of cards, it's either a four of a kind or a full house
                Object[] counts = cardMap.values().toArray();
                Integer first = (Integer)counts[0];
                Integer second = (Integer)counts[1];

                if (first == 4 || second == 4) {
                    return HandType.FOUR_OF_A_KIND;
                } else {
                    return HandType.FULL_HOUSE;
                }
            } else if (cardMap.size() == 3) {
                // Three different cards: either 3 of a kind, or two pair
                Object[] counts = cardMap.values().toArray();
                Integer first = (Integer)counts[0];
                Integer second = (Integer)counts[1];
                Integer third = (Integer)counts[2];

                if (first == 3 || second == 3 || third == 3) {
                    return HandType.THREE_OF_A_KIND;
                } else {
                    return HandType.TWO_PAIR;
                }
            } else if (cardMap.size() == 4) {
                return HandType.ONE_PAIR;
            } else {
                // If we get this far, we got nothing
                return HandType.HIGH_CARD;
            }
        }

        private Map<Character, Integer> cardCount(char[] input) {
            Map<Character, Integer> m = new HashMap<>();
            for (char c : input) {
                Character bigC = Character.valueOf(c);
                if (m.containsKey(bigC)) {
                    m.put(bigC, m.get(bigC) + 1);
                } else {
                    m.put(bigC, Integer.valueOf(1));
                }
            }
            return m;
        }
    }

    public class HandComparator implements java.util.Comparator<Hand> {
        @Override
        public int compare(Hand a, Hand b) {
            if (a.handType.comparatorValue == b.handType.comparatorValue) {
                // Check value of cards
                for (int i = 0; i < 5; i++) {
                    int ac = Hand.cardValueOrder.indexOf(a.cards[i]);
                    int bc = Hand.cardValueOrder.indexOf(b.cards[i]);
                    if (ac == bc) continue;
                    // Lower number is better in this case, so reverse order
                    return bc - ac;
                }
                // Totally equal hands, apparently
                return 0;
            } else {
                return a.handType.comparatorValue - b.handType.comparatorValue;
            }
        }
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "6440";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "248569531";
    }

    public String part1(List<String> inputFileLines) {
        List<Hand> hands = new ArrayList<>();

        // Parse the hands
        for (String line : inputFileLines) {
            Hand h = new Hand(line);
            // System.out.println(h);
            hands.add(h);
        }

        // Sort the hands
        Collections.sort(hands, new HandComparator());
        // for (Hand hand : hands) {
        //     System.err.println(hand);
        // }

        // Determine the winnings
        int winnings = 0;
        for (int i = 0; i < hands.size(); i++) {
            int bid = hands.get(i).bid;
            int rank = i+1;
            int handScore = rank * bid;
            // System.out.println(String.format("Rank %1d, bid %1d", rank, bid));
            winnings += handScore;
        }

        return String.valueOf(winnings);
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

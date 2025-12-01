package days;

import java.util.ArrayList;
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

        public Hand(String inputLine, boolean jacksAreWild) {
            cards = inputLine.split(" ")[0].toCharArray();
            bid = Integer.valueOf(inputLine.split(" ")[1]).intValue();
            handType = handType(cards, jacksAreWild);
        }

        @Override
        public String toString() {
            return String.format("Hand %c %c %c %c %c, type %s, bid %1d", cards[0],cards[1],cards[2],cards[3],cards[4], handType, bid);
        }

        private HandType handType(char[] input, boolean jacksAreWild) {
            Map<Character, Integer> cardMap = cardCount(input);

            if (jacksAreWild) {
                cardMap.remove(Character.valueOf('J'));
            }
            
            if (cardMap.size() <= 1) {
                // Only one type of card: it's five of a kind
                return HandType.FIVE_OF_A_KIND;
            } else if (cardMap.size() == 2) {
                // If we have two different kinds of cards, it's either a four of a kind or a full house
                Object[] counts = cardMap.values().toArray();
                Integer first = (Integer)counts[0];
                Integer second = (Integer)counts[1];

                if (first == 1 || second == 1) {
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

                // If two of the cards only have a single instance, then it's a three of a kind
                if (first + second == 2 || second + third == 2 || third + first == 2) {
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
        public String cardValueOrder() {
            return "AKQJT98765432";
        }

        @Override
        public int compare(Hand a, Hand b) {
            if (a.handType.comparatorValue == b.handType.comparatorValue) {
                String cardValueOrder = this.cardValueOrder();
                // Check value of cards
                for (int i = 0; i < 5; i++) {
                    int ac = cardValueOrder.indexOf(a.cards[i]);
                    int bc = cardValueOrder.indexOf(b.cards[i]);
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

    public class JacksWildHandComparator extends HandComparator {
        @Override
        public String cardValueOrder() {
            // Jacks are ranked at the bottom when comparing high card
            return "AKQT98765432J";
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

    private List<Hand> sortedHands(List<String> inputFileLines, boolean jacksAreWild) {
        List<Hand> hands = new ArrayList<>();

        // Parse the hands
        for (String line : inputFileLines) {
            Hand h = new Hand(line, jacksAreWild);
            // System.out.println(h);
            hands.add(h);
        }

        // Sort the hands
        if (jacksAreWild) {
            Collections.sort(hands, new JacksWildHandComparator());
        } else {
            Collections.sort(hands, new HandComparator());
        }
        return hands;
    }

    private int totalWinnings(List<Hand> hands) {
        int winnings = 0;
        for (int i = 0; i < hands.size(); i++) {
            int bid = hands.get(i).bid;
            int rank = i+1;
            int handScore = rank * bid;
            // System.out.println(String.format("Rank %1d, bid %1d", rank, bid));
            winnings += handScore;
        }
        return winnings;
    }

    public String part1(List<String> inputFileLines) {
        List<Hand> hands = sortedHands(inputFileLines, false);
        return String.valueOf(totalWinnings(hands));
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "5905";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "250382098";
    }

    public String part2(List<String> inputFileLines) {
        List<Hand> hands = sortedHands(inputFileLines, true);
        return String.valueOf(totalWinnings(hands));
    }

}

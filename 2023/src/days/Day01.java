package days;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

public class Day01 extends DayRunner {
    public Day01() {
        super(1);
    }

    public static void main(String[] args) {
        new Day01().run();
    }

    private static final Map<String, Integer> numberStrings;
    static {
        Map<String, Integer> aMap = new HashMap<>();
        aMap.put("one", 1);
        aMap.put("two", 2);
        aMap.put("three", 3);
        aMap.put("four", 4);
        aMap.put("five", 5);
        aMap.put("six", 6);
        aMap.put("seven", 7);
        aMap.put("eight", 8);
        aMap.put("nine", 9);
        numberStrings = Collections.unmodifiableMap(aMap);
    }

    // 55123
    public String part1(List<String> fileLines) {
        int totalScore = 0;
        for (String string : fileLines) {
            String numbersOnly = string.replaceAll("[^0-9]", "");
            String twoDigits = String.format("%c%c", numbersOnly.charAt(0),
                    numbersOnly.charAt(numbersOnly.length() - 1));
            totalScore += Integer.valueOf(twoDigits).intValue();
        }
        return String.valueOf(totalScore);
    }

    // 55260
    public String part2(List<String> fileLines) {
        int totalScore = 0;
        for (String string : fileLines) {
            String twoDigits = String.format("%d%d", firstDigit(string), lastDigit(string));
            totalScore += Integer.valueOf(twoDigits).intValue();
        }
        return String.valueOf(totalScore);
    }

    private int firstDigit(String input) {
        // This shouldn't happen, with valid input
        if (input.isEmpty()) {
            System.err.println("BROKEN");
            return 0;
        }

        // Check if the first character is a digit
        String first = input.substring(0, 1).replaceAll("[^0-9]", "");
        if (first.length() > 0) {
            return Integer.valueOf(first).intValue();
        }

        // Does not start with a digit: check if it starts with a number word
        for (Map.Entry<String, Integer> entry : numberStrings.entrySet()) {
            if (input.startsWith(entry.getKey())) {
                return entry.getValue();
            }
        }

        // Does not start with either: check starting at the next character
        return firstDigit(input.substring(1));
    }

    private int lastDigit(String input) {
        // This shouldn't happen, with valid input
        if (input.isEmpty()) {
            System.err.println("BROKEN");
            return 0;
        }

        // Check if the current input ends with a digit
        String last = input.substring(input.length() - 1).replaceAll("[^0-9]", "");
        if (last.length() > 0) {
            return Integer.valueOf(last).intValue();
        }

        // Does not end with a digit: check if it ends with a word for a number
        for (Map.Entry<String, Integer> entry : numberStrings.entrySet()) {
            String numString = entry.getKey();

            if (input.length() >= numString.length()
                    && input.substring(input.length() - numString.length()).equals(numString)) {
                return entry.getValue().intValue();
            }
        }

        // Does not end with either: strip the last character and try again
        return lastDigit(input.substring(0, input.length() - 1));

    }

}

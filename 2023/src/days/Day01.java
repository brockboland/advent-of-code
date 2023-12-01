package days;

import java.util.ArrayList;
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

    // 55123
    public String part1(List<String> fileLines) {
        int totalScore = 0;
        for (String string : fileLines) {
        String numbersOnly = string.replaceAll("[^0-9]", "");
        String twoDigits = String.format("%c%c", numbersOnly.charAt(0),
        numbersOnly.charAt(numbersOnly.length() - 1));
        int lineValue = Integer.valueOf(twoDigits).intValue();
        totalScore += lineValue;
        }
        return String.valueOf(totalScore);
    }

    // 55260
    public String part2(List<String> fileLines) {
        int totalScore = 0;
        for (String string : fileLines) {
            int first = firstDigit(string);
            int last = lastDigit(string);
            String twoDigits = String.format("%d%d", first, last);
            // System.out.println(string + " became " + twoDigits);
            int lineValue = Integer.valueOf(twoDigits).intValue();
            totalScore += lineValue;
        }
        return String.valueOf(totalScore);
    }

    private int firstDigit(String input) {
        // This shouldn't happen, with valid input
        if (input.isEmpty()) {
            System.err.println("BROKEN");
            return 0;
        }

        String first = input.substring(0, 1).replaceAll("[^0-9]", "");
        if (first.length() > 0) {
            return Integer.valueOf(first).intValue();
        }

        if (input.startsWith("one")) {
            return 1;
        } else if (input.startsWith("two")) {
            return 2;
        } else if (input.startsWith("three")) {
            return 3;
        } else if (input.startsWith("four")) {
            return 4;
        } else if (input.startsWith("five")) {
            return 5;
        } else if (input.startsWith("six")) {
            return 6;
        } else if (input.startsWith("seven")) {
            return 7;
        } else if (input.startsWith("eight")) {
            return 8;
        } else if (input.startsWith("nine")) {
            return 9;
        } else {
            return firstDigit(input.substring(1));
        }
    }


    private int lastDigit(String input) {
        // This shouldn't happen, with valid input
        if (input.isEmpty()) {
            System.err.println("BROKEN");
            return 0;
        }

        String last = input.substring(input.length()-1).replaceAll("[^0-9]", "");
        if (last.length() > 0) {
            return Integer.valueOf(last).intValue();
        }

        if (input.length() >= 3 && input.substring(input.length()-3).equals("one")) {
            return 1;
        } else if (input.length() >= 3 && input.substring(input.length()-3).equals("two")) {
            return 2;
        } else if (input.length() >= 5 && input.substring(input.length()-5).equals("three")) {
            return 3;
        } else if (input.length() >= 4 && input.substring(input.length()-4).equals("four")) {
            return 4;
        } else if (input.length() >= 4 && input.substring(input.length()-4).equals("five")) {
            return 5;
        } else if (input.length() >= 3 && input.substring(input.length()-3).equals("six")) {
            return 6;
        } else if (input.length() >= 5 && input.substring(input.length()-5).equals("seven")) {
            return 7;
        } else if (input.length() >= 5 && input.substring(input.length()-5).equals("eight")) {
            return 8;
        } else if (input.length() >= 4 && input.substring(input.length()-4).equals("nine")) {
            return 9;
        } else {
            return lastDigit(input.substring(0, input.length()-1));
        }
    }

    
    

}

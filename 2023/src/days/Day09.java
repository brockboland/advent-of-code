package days;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import common.DayRunner;

public class Day09 extends DayRunner {
    public static void main(String[] args) {
        new Day09().run();
    }

    public Day09() {
        super(9);
    }

    public class Reading {
        List<Integer> values;

        public Reading(String inputLine) {
            values = new ArrayList<>();
            String[] nums = inputLine.split(" ");
            for (String string : nums) {
                values.add(Integer.valueOf(string));
            }
        }

        public Integer nextValue() {

            boolean allZeroes = false;
            List<Integer> workingList = values;
            List<Integer> trailingValues = new ArrayList<>();

            do {
                // System.out.println(String.format("Checking: %s", workingList));
                List<Integer> newList = new ArrayList<>();
                for (int i = 0; i < workingList.size() - 1; i++) {
                    newList.add(workingList.get(i + 1) - workingList.get(i));
                }

                // Hang on to the last one
                trailingValues.add(workingList.get(workingList.size() - 1));

                Set<Integer> valuesInNewList = new HashSet<>(newList);
                allZeroes = valuesInNewList.size() == 1 && valuesInNewList.contains(Integer.valueOf(0));
                workingList = newList;
            } while (!allZeroes);

            // Add that final zero from the last diff
            trailingValues.add(Integer.valueOf(0));

            // prep a new holding list
            Integer[] temp = new Integer[trailingValues.size()];
            Arrays.fill(temp,Integer.valueOf(0));
            List<Integer> projectedTrailingValues = Arrays.asList(temp);

            for (int i = trailingValues.size()-2; i >= 0; i--) {
                // System.out.println(String.format("Trialing %d: %s + %s", i, trailingValues.get(i), projectedTrailingValues.get(i+1)));
                projectedTrailingValues.set(i, trailingValues.get(i) + projectedTrailingValues.get(i+1));
            }

            // System.out.println(String.format("Tailing numbers: %s, projected %s%n", trailingValues, projectedTrailingValues));
            return projectedTrailingValues.get(0);
        }

    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "114";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "1992273652";
    }

    public String part1(List<String> inputFileLines) {
        List<Reading> readings = inputFileLines.stream().map(s -> new Reading(s)).collect(Collectors.toList());

        List<Integer> nextValues = readings.stream().map(r -> r.nextValue()).collect(Collectors.toList());

        Integer answer = nextValues.stream().reduce(0, Integer::sum);
        return answer.toString();
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

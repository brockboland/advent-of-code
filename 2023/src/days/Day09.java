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

        public Integer projectedValue(boolean forward) {
            boolean allZeroes = false;
            List<Integer> workingList = values;
            List<Integer> derivedValues = new ArrayList<>();

            do {
                List<Integer> newList = new ArrayList<>();
                for (int i = 0; i < workingList.size() - 1; i++) {
                    newList.add(workingList.get(i + 1) - workingList.get(i));
                }

                // Hang on to the first or last one
                if (forward) {
                    derivedValues.add(workingList.get(workingList.size() - 1));
                } else {
                    derivedValues.add(workingList.get(0));
                }

                Set<Integer> valuesInNewList = new HashSet<>(newList);
                allZeroes = valuesInNewList.size() == 1 && valuesInNewList.contains(Integer.valueOf(0));
                workingList = newList;
            } while (!allZeroes);

            // Add that final zero from the last diff
            derivedValues.add(Integer.valueOf(0));

            // prep a new holding list
            Integer[] temp = new Integer[derivedValues.size()];
            Arrays.fill(temp,Integer.valueOf(0));
            List<Integer> projectedValues = Arrays.asList(temp);

            for (int i = derivedValues.size()-2; i >= 0; i--) {
                if (forward) {
                    projectedValues.set(i, derivedValues.get(i) + projectedValues.get(i+1));
                } else {
                    projectedValues.set(i, derivedValues.get(i) - projectedValues.get(i+1));
                }
            }
            return projectedValues.get(0);
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
        return "1992273652";
    }

    public String part1(List<String> inputFileLines) {
        List<Reading> readings = inputFileLines.stream().map(s -> new Reading(s)).collect(Collectors.toList());

        List<Integer> nextValues = readings.stream().map(r -> r.projectedValue(true)).collect(Collectors.toList());

        Integer answer = nextValues.stream().reduce(0, Integer::sum);
        return answer.toString();
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "2";
    }

    @Override
    public String part2ExpectedOutput() {
        return "1012";
    }

    public String part2(List<String> inputFileLines) {
        List<Reading> readings = inputFileLines.stream().map(s -> new Reading(s)).collect(Collectors.toList());

        List<Integer> previousValues = readings.stream().map(r -> r.projectedValue(false)).collect(Collectors.toList());

        Integer answer = previousValues.stream().reduce(0, Integer::sum);
        return answer.toString();
    }

}

package days;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import common.DayRunner;

public class Day01 extends DayRunner {
    public Day01() {
        super(1);
    }

    public static void main(String[] args) {
        new Day01().run();
    }

    public String part1(List<String> fileLines) {
        return sumForTopElves(fileLines, 1);
    }

    public String part2(List<String> fileLines) {
        return sumForTopElves(fileLines, 3);
    }

    private String sumForTopElves(List<String> fileLines, int elvesToInclude) {
        List<Integer> calories = new ArrayList<Integer>();
        Integer runningTotal = Integer.valueOf(0);
        for (int i = 0; i < fileLines.size(); i++) {
            String nextItem = fileLines.get(i);
            if (nextItem.equals("")) {
                calories.add(runningTotal);
                runningTotal = Integer.valueOf(0);
            } else {
                runningTotal += Integer.valueOf(nextItem);
            }
        }

        if (runningTotal.intValue() > 0) {
            calories.add(runningTotal);
        }

        Collections.sort(calories);
        Collections.reverse(calories);
        int sum = calories.subList(0, elvesToInclude).stream().mapToInt(Integer::intValue).sum();
        return Integer.valueOf(sum).toString();
    }
}

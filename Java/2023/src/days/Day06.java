package days;

import java.util.ArrayList;
import java.util.List;

import common.DayRunner;

// To use this template, replace Day06 with the day number in 2 digits, like Day06
public class Day06 extends DayRunner {
    public static void main(String[] args) {
        new Day06().run();
    }

    public Day06() {
        super(6);
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "288";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "345015";
    }

    public String part1(List<String> inputFileLines) {
        String[] dirtyTimes = inputFileLines.get(0).split(":")[1].split("\\s");
        String[] dirtyDistances = inputFileLines.get(1).split(":")[1].split("\\s");

        List<Integer> cleanTimes = new ArrayList<>();
        for (int i = 0; i < dirtyTimes.length; i++) {
            if (dirtyTimes[i].isBlank()) continue;
            cleanTimes.add(Integer.valueOf(dirtyTimes[i]));
        }

        List<Integer> cleanDistances = new ArrayList<>();
        for (int i = 0; i < dirtyDistances.length; i++) {
            if (dirtyDistances[i].isBlank()) continue;
            cleanDistances.add(Integer.valueOf(dirtyDistances[i]));
        }

        List<Integer> validWins = new ArrayList<>();

        for (int i = 0; i < cleanTimes.size(); i++) {
            int totalRaceTime = cleanTimes.get(i).intValue();
            int waysToWin = 0;
            
            for (int holdTime = 1; holdTime < totalRaceTime - 1; holdTime++) {
                int speed = holdTime;
                int runningTime = totalRaceTime - holdTime;
                int travelled = speed * runningTime;
                if (travelled > cleanDistances.get(i).intValue()) waysToWin++;
            }
            validWins.add(Integer.valueOf(waysToWin));
        }

        Integer winProduct = 1;
        for (Integer w : validWins) {
            winProduct *= w;
        }

        return winProduct.toString();
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "71503";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "42588603";
    }

    public String part2(List<String> inputFileLines) {
        Long totalRaceTime = Long.valueOf(inputFileLines.get(0).split(":")[1].replaceAll("[^0-9]", ""));
        Long bestDistance = Long.valueOf(inputFileLines.get(1).split(":")[1].replaceAll("[^0-9]", ""));

        Long waysToWin = Long.valueOf(0);

        Long holdTime = Long.valueOf(1);
        do {
            Long speed = holdTime;
            Long runningTime = totalRaceTime - holdTime;
            Long travelled = speed * runningTime;
            if (travelled > bestDistance) waysToWin++;

            holdTime++;
        } while (holdTime < totalRaceTime);

        return waysToWin.toString();
    }

}

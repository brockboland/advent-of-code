package days;

import java.util.ArrayList;
import java.util.List;

import common.DayRunner;

public class Day05 extends DayRunner {
    public static void main(String[] args) {
        new Day05().run();
    }

    public Day05() {
        super(5);
    }

    public class GardenMap {
        public String name;
        public List<MappedRange> ranges;

        public GardenMap(String name, List<MappedRange> ranges) {
            this.name = name;
            this.ranges = ranges;
        }

        public Long mapForward(Long sourceVal) {
            Long destinationVal = sourceVal;
            for (MappedRange range : ranges) {
                if (sourceVal >= range.sourceRangeStart && sourceVal <= range.sourceRangeStart + range.rangeLength) {
                    destinationVal = sourceVal - range.sourceRangeStart + range.destinationRangeStart;
                    break;
                }
            }

            return destinationVal;
        }
    }

    public class MappedRange {
        public Long destinationRangeStart;
        public Long sourceRangeStart;
        public Long rangeLength;

        public MappedRange(String inputLine) {
            String[] vals = inputLine.split(" ");
            destinationRangeStart = Long.valueOf(vals[0]);
            sourceRangeStart = Long.valueOf(vals[1]);
            rangeLength = Long.valueOf(vals[2]);
        }

        @Override
        public String toString() {
            return String.format("Source starts at %d, destination starts at %d, length %d", sourceRangeStart,
                    destinationRangeStart, rangeLength);
        }
    }

    public class IslandAlmanac {
        public List<Long> startingSeeds;
        public List<GardenMap> mapSections;

        public IslandAlmanac(List<String> inputFileLines) {
            String[] seedStrings = inputFileLines.get(0).split(": ")[1].split(" ");
            startingSeeds = new ArrayList<>();
            for (String s : seedStrings) {
                startingSeeds.add(Long.valueOf(s));
            }

            mapSections = new ArrayList<>();

            outer: for (int row = 1; row < inputFileLines.size(); row++) {
                String line = inputFileLines.get(row);
                if (line.isBlank()) {
                    continue;
                }

                String mapName = line;
                List<MappedRange> sectionMaps = new ArrayList<>();

                // Inner loop, using the same counter. Bail out on a blank line
                while (row + 1 < inputFileLines.size()) {
                    row++;
                    String nextLine = inputFileLines.get(row);
                    if (nextLine.isBlank()) {
                        mapSections.add(new GardenMap(mapName, sectionMaps));
                        continue outer;
                    }

                    sectionMaps.add(new MappedRange(nextLine));
                }
                // Make sure the last section gets added, when we break out of the while on the
                // last line
                mapSections.add(new GardenMap(mapName, sectionMaps));
            }
        }
    }

    /**
     ********** PART 1
     */

    @Override
    public String part1SampleExpectedOutput() {
        return "35";
    }

    @Override
    public String part1ExpectedOutput() {
        // Replace this once we know the answer
        return "251346198";
    }

    public String part1(List<String> inputFileLines) {
        IslandAlmanac almanac = new IslandAlmanac(inputFileLines);

        // THIS ASSUMES THE MAPS ARE PROVIDED IN ORDER
        Long lowestLocation = Long.MAX_VALUE;
        for (Long seed : almanac.startingSeeds) {
            Long value = seed;
            // System.out.println("Starting with seed " + value);
            for (GardenMap map : almanac.mapSections) {
                value = map.mapForward(value);
            }
            // System.out.println("Final location: " + value);
            // System.out.println("");
            lowestLocation = Long.min(value, lowestLocation);
        }

        return lowestLocation.toString();
    }

    /**
     ********** PART 2
     */

    @Override
    public String part2SampleExpectedOutput() {
        return "46";
    }

    @Override
    public String part2ExpectedOutput() {
        // Replace this once we know the answer
        return "72263011";
    }

    public String part2(List<String> inputFileLines) {
        IslandAlmanac almanac = new IslandAlmanac(inputFileLines);

        // THIS ASSUMES THE MAPS ARE PROVIDED IN ORDER
        Long lowestLocation = Long.MAX_VALUE;

        for (int i = 0; i < almanac.startingSeeds.size(); i += 2) {
            Long start = almanac.startingSeeds.get(i);
            Long length = almanac.startingSeeds.get(i + 1);

            for (Long adder = 0L; adder < length; adder++) {
                Long value = start + adder;
                // System.out.println("Starting with seed " + value);
                for (GardenMap map : almanac.mapSections) {
                    value = map.mapForward(value);
                }
                // System.out.println("Final location: " + value);
                // System.out.println("");
                lowestLocation = Long.min(value, lowestLocation);
            }
        }

        return lowestLocation.toString();
    }

}

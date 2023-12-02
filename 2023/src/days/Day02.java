package days;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import common.DayRunner;

// The Elf would first like to know which games would have been possible if the bag
// contained only 12 red cubes, 13 green cubes, and 14 blue cubes?

// In the example above, games 1, 2, and 5 would have been possible if the bag had
// been loaded with that configuration. However, game 3 would have been impossible
// because at one point the Elf showed you 20 red cubes at once; similarly, game 4
// would also have been impossible because the Elf showed you 15 blue cubes at once.
// If you add up the IDs of the games that would have been possible, you get 8.

public class Day02 extends DayRunner {
    public Day02() {
        super(2);
    }

    public static void main(String[] args) {
        new Day02().run();
    }

    // 3099
    public String part1(List<String> fileLines) {
        int maxRed = 12;
        int maxGreen = 13;
        int maxBlue = 14;

        int sumOfPossibleGames = 0;

        gameLoop: for (String gameInfo : fileLines) {
            String[] x = gameInfo.split(": ");
            int gameNumber = Integer.valueOf(x[0].replaceAll("[^0-9]", "")).intValue();

            String[] reveals = x[1].split("; ");

            revealLoop: for (String reveal : reveals) {
                String[] colorsInReveal = reveal.split(", ");

                colorLoop: for (String colorDetails : colorsInReveal) {
                    String color = colorDetails.split(" ")[1];
                    int cubes = Integer.valueOf(colorDetails.split(" ")[0]).intValue();

                    if (color.equals("red")) {
                        if (cubes > maxRed)
                            continue gameLoop;
                    } else if (color.equals("green")) {
                        if (cubes > maxGreen)
                            continue gameLoop;
                    } else if (color.equals("blue")) {
                        if (cubes > maxBlue)
                            continue gameLoop;
                    } else {
                        System.err.println("FAILURE unexpected color: " + color);
                    }
                }
            }

            // If we make it to this part of the outer loop, we didn't see too many cubes
            sumOfPossibleGames += gameNumber;
        }
        return String.valueOf(sumOfPossibleGames);
    }

    // 72970
    public String part2(List<String> fileLines) {
        int sumOfPowers = 0;

        // The power of a set of cubes is equal to the numbers of red, green, and blue
        // cubes multiplied together. The power of the minimum set of cubes in game 1
        // is 48. In games 2-5 it was 12, 1560, 630, and 36, respectively. Adding up
        // these five powers produces the sum 2286.

        gameLoop: for (String gameInfo : fileLines) {
            int minRed = 0;
            int minGreen = 0;
            int minBlue = 0;

            String[] x = gameInfo.split(": ");
            int gameNumber = Integer.valueOf(x[0].replaceAll("[^0-9]", "")).intValue();

            String[] reveals = x[1].split("; ");

            revealLoop: for (String reveal : reveals) {
                String[] colorsInReveal = reveal.split(", ");

                colorLoop: for (String colorDetails : colorsInReveal) {
                    String color = colorDetails.split(" ")[1];
                    int cubes = Integer.valueOf(colorDetails.split(" ")[0]).intValue();

                    if (color.equals("red")) {
                        minRed = Math.max(minRed, cubes);
                    } else if (color.equals("green")) {
                        minGreen = Math.max(minGreen, cubes);
                    } else if (color.equals("blue")) {
                        minBlue = Math.max(minBlue, cubes);
                    } else {
                        System.err.println("FAILURE unexpected color: " + color);
                    }
                }
            }

            int gameScore = minRed * minBlue * minGreen;
            // System.out.println(String.format("Game %d score: %d", gameNumber, gameScore));
            // System.out.println(String.format("Red %d, Green %d, %d blue", minRed, minGreen, minBlue));
            sumOfPowers += gameScore;
        }
        return String.valueOf(sumOfPowers);
    }

}

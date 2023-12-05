package common;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {
    public static List<String> contentsFromSampleInput(int dayNumber) throws IOException {
        return contentsFromTxtFile(String.format("%02d-sample", dayNumber));
    }

    public static List<String> contentsFromFullInput(int dayNumber) throws IOException {
        return contentsFromTxtFile(String.format("%02d", dayNumber));
    }

    /**
     * Get the contens from the given txt file in the inputs directory. filename should only be the slug: eg, day01 rather than day01.txt
     * @throws IOException
     */
    private static List<String> contentsFromTxtFile(String filename) throws IOException {
        List<String> listOfStrings = new ArrayList<String>();

        // load the data from file
        listOfStrings = Files.readAllLines(Paths.get(String.format("inputs/day%s.txt", filename)));

        return listOfStrings;
    }
}

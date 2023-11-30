package common;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

public class FileUtils {
    public static List<String> contentsFrom(int dayNumber) {
        List<String> listOfStrings = new ArrayList<String>();

        // load the data from file
        try {
            listOfStrings = Files.readAllLines(Paths.get(String.format("inputs/day%s.txt", String.format("%02d", dayNumber))));
        } catch (IOException e) {
            System.out.println(e.toString());
            e.printStackTrace();
        }

        return listOfStrings;
    }
}

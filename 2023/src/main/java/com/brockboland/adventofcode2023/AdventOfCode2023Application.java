package com.brockboland.adventofcode2023;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Collections;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@SpringBootApplication
@RestController
public class AdventOfCode2023Application {
  public static void main(String[] args) {
    SpringApplication.run(AdventOfCode2023Application.class, args);
  }

  @GetMapping("/hello")
  public String hello(@RequestParam(value = "name", defaultValue = "World") String name) {
    return String.format("Howdy %s!", name);
  }

  @GetMapping("/day1")
  public String day1() {
    List<String> data = readInputFile("2022-day1");

    List<Integer> calories = new ArrayList<Integer>();
    Integer runningTotal = Integer.valueOf(0);
    for (int i = 0; i < data.size(); i++) {
      String nextItem = data.get(i);
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
    int sum = calories.subList(0, 3).stream().mapToInt(Integer::intValue).sum();
    return Integer.valueOf(sum).toString();
  }




  private List<String> readInputFile(String filename) {
    List<String> listOfStrings = new ArrayList<String>();

    // load the data from file
    try {
      listOfStrings = Files.readAllLines(Paths.get(String.format("inputs/%s.txt", filename)));
    } catch (IOException e) {
      System.out.println(e.toString());
      e.printStackTrace();
    }

    return listOfStrings;
  }
}
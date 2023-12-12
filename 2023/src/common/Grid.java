package common;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class Grid {

    private List<List<Character>> rows;

    public Grid(List<String> input) {
        rows = new ArrayList<>();

        for (String s : input) {
            List<Character> row = s.chars().mapToObj(i -> (char) i).map(c -> Character.valueOf(c))
                    .collect(Collectors.toList());
            rows.add(row);
        }
    }

    public int columnCount() {
        return rows.get(0).size();
    }

    public int rowCount() {
        return rows.size();
    }

    // 0-indexed x and y
    public Character get(int x, int y) {
        return rows.get(y).get(x);
    }

    public Character get(Coord2D coord) {
        return get(coord.x(), coord.y());
    }

    public boolean rowContains(int y, char c) {
        for (int x = 0; x < columnCount(); x++) {
            if (get(x, y).charValue() == c) {
                return true;
            }
        }
        return false;
    }

    public boolean colContains(int x, char c) {
        for (int y = 0; y < rowCount(); y++) {
            if (get(x, y).charValue() == c) {
                return true;
            }
        }
        return false;
    }

    public List<Coord2D> findAll(char c) {
        List<Coord2D> hits = new ArrayList<>();
        for (int y = 0; y < rowCount(); y++) {
            for (int x = 0; x < columnCount(); x++) {
                if (get(x, y).charValue() == c) {
                    hits.add(new Coord2D(x, y));
                }
            }
        }
        return hits;
    }

    public void insertRow(int newY, char fillWithChar) {
        List<Character> newRow = new ArrayList<>();
        for (int i = 0; i < columnCount(); i++) {
            newRow.add(Character.valueOf(fillWithChar));
        }
        rows.add(newY, newRow);
    }

    public void insertColumn(int newX, char fillWithChar) {
        for (int i = 0; i < rowCount(); i++) {
            rows.get(i).add(newX, Character.valueOf(fillWithChar));
        }
    }

    @Override
    public String toString() {
        StringBuilder b = new StringBuilder();
        for (List<Character> row : rows) {
            for (Character character : row) {
                b.append(character);
            }
            b.append(String.format("%n"));
        }
        return b.toString();
    }
}

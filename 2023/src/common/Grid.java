package common;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

public class Grid<T> {

    private List<List<T>> rows;

    interface ElementBuilder<T> {
        T run(Character c);
      }

    public Grid(List<String> input, Function<Character, T> builder) {
        rows = new ArrayList<>();

        for (String s : input) {
            List<T> row = s.chars().mapToObj(i -> (char) i).map(c -> Character.valueOf(c)).map(c -> builder.apply(c)).collect(Collectors.toList());
            rows.add(row);
        }
    }

    public int columnCount() {
        return rows.get(0).size();
    }

    public int rowCount() {
        return rows.size();
    }

    public boolean isValidPosition(int x, int y) {
        return (x >= 0 && x < columnCount() && y >= 0 && y < rowCount());   
    }

    public boolean isValidPosition(Coord2D coord) {
        return isValidPosition(coord.x(), coord.y());
    }

    // 0-indexed x and y
    public T get(int x, int y) {
        return rows.get(y).get(x);
    }

    public T get(Coord2D coord) {
        return get(coord.x(), coord.y());
    }

    public void set(int x, int y, T newValue) {
        if (isValidPosition(x, y)) {
            rows.get(y).set(x, newValue);
        }
    }

    public void set(Coord2D coord, T newValue) {
        set(coord.x(), coord.y(), newValue);
    }

    public void swap(Coord2D point1, Coord2D point2) {
        T first = get(point1);
        T second = get(point2);
        set(point1, second);
        set(point2, first);
    }

    public boolean rowContains(int y, T c) {
        for (int x = 0; x < columnCount(); x++) {
            if (get(x, y).equals(c)) {
                return true;
            }
        }
        return false;
    }

    public boolean colContains(int x, T c) {
        for (int y = 0; y < rowCount(); y++) {
            if (get(x, y).equals(c)) {
                return true;
            }
        }
        return false;
    }

    public List<Coord2D> findAll(T c) {
        List<Coord2D> hits = new ArrayList<>();
        for (int y = 0; y < rowCount(); y++) {
            for (int x = 0; x < columnCount(); x++) {
                if (get(x, y).equals(c)) {
                    hits.add(new Coord2D(x, y));
                }
            }
        }
        return hits;
    }

    public void insertRow(int newY, T fillValue) {
        List<T> newRow = new ArrayList<>();
        for (int i = 0; i < columnCount(); i++) {
            newRow.add(fillValue);
        }
        rows.add(newY, newRow);
    }

    public void insertColumn(int newX, T fillValue) {
        for (int i = 0; i < rowCount(); i++) {
            rows.get(i).add(newX, fillValue);
        }
    }

    @Override
    public String toString() {
        StringBuilder b = new StringBuilder();
        for (List<T> row : rows) {
            for (T item : row) {
                b.append(item.toString());
            }
            b.append(String.format("%n"));
        }
        return b.toString();
    }

    @Override
    public boolean equals(Object obj) {
        // Make sure it's a grid
        if (!(obj instanceof Grid)) {
            return false;
        }

        Grid other = (Grid) obj;

        // Make sure it's the same size
        if (other.rowCount() != rowCount() || other.columnCount() != columnCount()) {
            return false;
        }

        for (int y = 0; y < rowCount(); y++) {
            for (int x = 0; x < columnCount(); x++) {
                if (!get(x, y).equals(other.get(x, y))) {
                    return false;
                }
            }
        }

        // If we got this far, it must be the same
        return true;
    }
}

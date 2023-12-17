package common;

import java.util.HashMap;
import java.util.Map;

public class Coord2D {

    private final int x;
    private final int y;

    public enum Direction {
        UP,
        DOWN,
        LEFT,
        RIGHT;

        public Direction opposite() {
            switch (this) {
                case UP:
                    return DOWN;
                case DOWN:
                    return UP;
                case RIGHT:
                    return LEFT;
                case LEFT:
                    return RIGHT;
                default:
                    return UP; // NOT CORRECT but fine for now
            }
        }
    }

    // Grid assumes 0,0 is top left
    // Going "down" results in a higher y value
    public Coord2D(int x, int y) {
        this.x = x;
        this.y = y;
    }

    public final int x() {
        return this.x;
    }

    public final int y() {
        return this.y;
    }

    public Coord2D move(Direction d, int amount) {
        switch (d) {
            case UP:
                return moveUp(amount);

            case DOWN:
                return moveDown(amount);

            case LEFT:
                return moveLeft(amount);

            case RIGHT:
                return moveRight(amount);

        }
        return this;
    }

    public Coord2D moveUp(int amount) {
        return new Coord2D(x, y - amount);
    }

    public Coord2D moveDown(int amount) {
        return new Coord2D(x, y + amount);
    }

    public Coord2D moveRight(int amount) {
        return new Coord2D(x + amount, y);
    }

    public Coord2D moveLeft(int amount) {
        return new Coord2D(x - amount, y);
    }

    public Coord2D up() {
        return moveUp(1);
    }

    public Coord2D down() {
        return moveDown(1);
    }

    public Coord2D left() {
        return moveLeft(1);
    }

    public Coord2D right() {
        return moveRight(1);
    }

    public Map<Coord2D.Direction, Coord2D> cardinalNeighbors() {
        Map<Coord2D.Direction, Coord2D> m = new HashMap<>();
        m.put(Direction.UP, up());
        m.put(Direction.DOWN, down());
        m.put(Direction.LEFT, left());
        m.put(Direction.RIGHT, right());
        return m;
    }

    // Check if the other coordinate is in the 8 spots around this one
    public boolean isTouching(Coord2D other) {
        int xDiff = Math.abs(x - other.x());
        int yDiff = Math.abs(y - other.y());
        return xDiff <= 1 && yDiff <= 1;
    }

    public boolean isEqualTo(Coord2D other) {
        return other.x() == x && other.y() == y;
    }

    @Override
    public boolean equals(Object obj) {
        Coord2D other = (Coord2D)obj;
        return isEqualTo(other);
    }

    public int stepsTo(Coord2D other) {
        return Math.abs(x - other.x()) + Math.abs(y - other.y());
    }

    @Override
    public String toString() {
        return String.format("(%d, %d)", x, y);
    }

}

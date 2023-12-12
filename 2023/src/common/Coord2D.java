package common;

public class Coord2D {

    private final int x;
    private final int y;

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

    public Coord2D moveUp(int amount) {
        return new Coord2D(x, y - amount);
    }

    public Coord2D moveDown(int amount) {
        return new Coord2D(x, y + amount);
    }

    public Coord2D moveRight(int amount) {
        return new Coord2D(x+amount, y);
    }

    public Coord2D moveLeft(int amount) {
        return new Coord2D(x-amount, y);
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

    // Check if the other coordinate is in the 8 spots around this one
    public boolean isTouching(Coord2D other) {
        int xDiff = Math.abs(x - other.x());
        int yDiff = Math.abs(y - other.y());
        return xDiff <= 1 && yDiff <= 1;
    }

    public boolean isEqualTo(Coord2D other) {
        return other.x() == x && other.y() == y;
    }

    public int stepsTo(Coord2D other) {
        return Math.abs(x - other.x()) + Math.abs(y - other.y());
    }

    @Override
    public String toString() {
        return String.format("(%d, %d)", x, y);
    }

}

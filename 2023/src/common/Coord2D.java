package common;

public class Coord2D {
    
    private final int x;
    private final int y;

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
        public String toString() {
            return String.format("(%d, %d)", x, y);
        }

}



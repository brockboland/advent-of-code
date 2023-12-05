package days;

import java.util.ArrayList;
import java.util.List;

import common.Coord2D;
import common.DayRunner;

public class Day03 extends DayRunner {
    public Day03() {
        super(3);
    }

    public static void main(String[] args) {
        new Day03().run();
    }

    class MachinePart {
        public String partNumber;
        public Coord2D position;

        public MachinePart(String partNumber, Coord2D position) {
            this.partNumber = partNumber;
            this.position = position;
        }

        public int partNumberInt() {
            return Integer.valueOf(partNumber).intValue();
        }

        @Override
        public String toString() {
            return String.format("Part: %s, starting at: %s%n", partNumber, position);
        }

        public boolean touchingSymbol(MachineSymbol symbol) {
            for (int i = 0; i < partNumber.length(); i++) {
                Coord2D charCoord = new Coord2D(position.x() + i, position.y());
                if (charCoord.isTouching(symbol.position)) {
                    return true;
                }
            }
            return false;
        }
    }

    class MachineSymbol {
        public char symbol;
        public Coord2D position;

        public MachineSymbol(char symbol, Coord2D position) {
            this.symbol = symbol;
            this.position = position;
        }

        @Override
        public String toString() {
            return String.format("Symbol: %s, starting at: %s%n", symbol, position);
        }

        public boolean isGear() {
            return symbol == '*';
        }
    }

    class MachineRow {
        public List<MachinePart> parts;
        public List<MachineSymbol> symbols;

        public MachineRow(List<MachinePart> parts, List<MachineSymbol> symbols) {
            this.parts = parts;
            this.symbols = symbols;
        }

        @Override
        public String toString() {
            return String.format("This row has:%nParts: %s%nSymbols: %s%n", parts, symbols);
        }
    }

    @Override
    public String part1ExpectedOutput() {
        return "533784";
    }
    public String part1(List<String> fileLines) {
        List<MachineRow> rows = parseRows(fileLines);

        List<MachinePart> validParts = new ArrayList<>();

        for (int i = 0; i < rows.size(); i++) {
            MachineRow row = rows.get(i);

            List<MachineSymbol> symbolsToCheck = new ArrayList<>();
            if (i > 0)
                symbolsToCheck.addAll(rows.get(i - 1).symbols);
            symbolsToCheck.addAll(rows.get(i).symbols);
            if (i < rows.size() - 1)
                symbolsToCheck.addAll(rows.get(i + 1).symbols);

            for (MachinePart part : row.parts) {
                for (MachineSymbol symbol : symbolsToCheck) {
                    if (part.touchingSymbol(symbol)) {
                        validParts.add(part);
                    }
                }
            }
        }

        int sum = 0;
        for (MachinePart part : validParts) {
            sum += Integer.valueOf(part.partNumber).intValue();
        }

        return String.valueOf(sum);
    }

    @Override
    public String part2ExpectedOutput() {
        return "78826761";
    }

    public String part2(List<String> fileLines) {
        List<MachineRow> rows = parseRows(fileLines);

        int totalGearRatios = 0;

        for (int i = 0; i < rows.size(); i++) {
            MachineRow row = rows.get(i);

            List<MachinePart> partsToCheck = new ArrayList<>();
            if (i > 0)
                partsToCheck.addAll(rows.get(i - 1).parts);

            partsToCheck.addAll(rows.get(i).parts);

            if (i < rows.size() - 1)
                partsToCheck.addAll(rows.get(i + 1).parts);

            for (MachineSymbol symbol : row.symbols) {
                if (!symbol.isGear()) {
                    continue;
                }

                List<MachinePart> touchingParts = new ArrayList<>();
                
                for (MachinePart part : partsToCheck) {
                    if (part.touchingSymbol(symbol)) {
                        touchingParts.add(part);
                    }
                }

                if (touchingParts.size() == 2) {
                    MachinePart first = touchingParts.get(0);
                    MachinePart second = touchingParts.get(1);
                    totalGearRatios += (first.partNumberInt() * second.partNumberInt());
                }
            }
        }

        return String.valueOf(totalGearRatios);
    }

    private List<MachineRow> parseRows(List<String> fileLines) {
        List<MachineRow> rows = new ArrayList<>();
        for (int lineNum = 0; lineNum < fileLines.size(); lineNum++) {
            String line = fileLines.get(lineNum);

            MachinePart currentPart = null;
            List<MachinePart> parts = new ArrayList<>();
            List<MachineSymbol> symbols = new ArrayList<>();

            for (int charNum = 0; charNum < line.length(); charNum++) {
                char c = line.charAt(charNum);
                if (Character.isDigit(c)) {
                    // Start a new number
                    if (currentPart == null) {
                        Coord2D here = new Coord2D(charNum, lineNum);
                        currentPart = new MachinePart(String.valueOf(c), here);
                    } else {
                        // Continue the ongoing number
                        currentPart.partNumber += String.valueOf(c);
                    }
                } else {
                    // End any running number
                    if (currentPart != null) {
                        parts.add(currentPart);
                        currentPart = null;
                    }

                    // If it's not a period, it's a symbol
                    if (c != '.') {
                        Coord2D here = new Coord2D(charNum, lineNum);
                        symbols.add(new MachineSymbol(c, here));
                    }
                }
            }

            // Wrap up any number that's at the end
            if (currentPart != null) {
                parts.add(currentPart);
            }

            rows.add(new MachineRow(parts, symbols));
        }
        return rows;
    }

}

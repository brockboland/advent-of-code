import Foundation

struct Day04 {
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "04-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "04-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            let grid = CharGrid(input: input)
            
            // Find all X's in the grid
            // For each: check if XMAS follows
            
            var validFinds = 0;
            
            for x in 0...grid.maxX {
                for y in 0...grid.maxY {
                    let thisSpot = CharGrid.Position(x: x, y: y)
                    validFinds += xmases(grid: grid, startingAt: thisSpot)
                }
            }
            
            return validFinds.description
        }
        
        private static func xmases(grid: CharGrid, startingAt position: CharGrid.Position) -> Int {
            guard grid.char(at: position) == "X" else {
                return 0
            }
            
            var found = 0
            
            print("Checking the X at \(position)")
            
            if grid.char(at: position.up()) == "M" && grid.char(at: position.up().up()) == "A" && grid.char(at: position.up().up().up()) == "S" {
                print("Found going up from \(position)")
                found += 1
            }
            
            if grid.char(at: position.down()) == "M" && grid.char(at: position.down().down()) == "A" && grid.char(at: position.down().down().down()) == "S" {
                print("Found going down from \(position)")
                found += 1
            }
            
            if grid.char(at: position.right()) == "M" && grid.char(at: position.right().right()) == "A" && grid.char(at: position.right().right().right()) == "S" {
                print("Found going right from \(position)")
                found += 1
            }
            
            if grid.char(at: position.left()) == "M" && grid.char(at: position.left().left()) == "A" && grid.char(at: position.left().left().left()) == "S" {
                print("Found going left from \(position)")
                found += 1
            }
            
            if grid.char(at: position.up().left()) == "M" && grid.char(at: position.up().left().up().left()) == "A" && grid.char(at: position.up().left().up().left().up().left()) == "S" {
                print("Found going up and left from \(position)")
                found += 1
            }
            
            if grid.char(at: position.up().right()) == "M" && grid.char(at: position.up().right().up().right()) == "A" && grid.char(at: position.up().right().up().right().up().right()) == "S" {
                print("Found going up and right from \(position)")
                found += 1
            }
            
            if grid.char(at: position.down().left()) == "M" && grid.char(at: position.down().left().down().left()) == "A" && grid.char(at: position.down().left().down().left().down().left()) == "S" {
                print("Found going down and left from \(position)")
                found += 1
            }
            
            if grid.char(at: position.down().right()) == "M" && grid.char(at: position.down().right().down().right()) == "A" && grid.char(at: position.down().right().down().right().down().right()) == "S" {
                print("Found going down and right from \(position)")
                found += 1
            }
            
            return found
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "04-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "04-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            return "Not implemented yet"
        }
        
    }
}

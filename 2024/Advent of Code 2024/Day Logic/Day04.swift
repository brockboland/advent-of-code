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
            
            if grid.char(at: position.up()) == "M" && grid.char(at: position.up().up()) == "A" && grid.char(at: position.up().up().up()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.down()) == "M" && grid.char(at: position.down().down()) == "A" && grid.char(at: position.down().down().down()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.right()) == "M" && grid.char(at: position.right().right()) == "A" && grid.char(at: position.right().right().right()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.left()) == "M" && grid.char(at: position.left().left()) == "A" && grid.char(at: position.left().left().left()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.up().left()) == "M" && grid.char(at: position.up().left().up().left()) == "A" && grid.char(at: position.up().left().up().left().up().left()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.up().right()) == "M" && grid.char(at: position.up().right().up().right()) == "A" && grid.char(at: position.up().right().up().right().up().right()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.down().left()) == "M" && grid.char(at: position.down().left().down().left()) == "A" && grid.char(at: position.down().left().down().left().down().left()) == "S" {
                found += 1
            }
            
            if grid.char(at: position.down().right()) == "M" && grid.char(at: position.down().right().down().right()) == "A" && grid.char(at: position.down().right().down().right().down().right()) == "S" {
                found += 1
            }
            
            return found
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "04-example1") else {
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
            let grid = CharGrid(input: input)
            
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
            guard grid.char(at: position) == "A" else {
                return 0
            }
                        
            guard let upLeft = grid.char(at: position.up().left()),
                  let upRight = grid.char(at: position.up().right()),
                  let downLeft = grid.char(at: position.down().left()),
                  let downRight = grid.char(at: position.down().right()) else {
                return 0
            }
            
            var found = 0
            
            let top = "\(upLeft)\(upRight)"
            let bottom = "\(downLeft)\(downRight)"
                        
            if (top == "MM" && bottom == "SS") {
                found += 1
            } else if (top == "SS" && bottom == "MM") {
                found += 1
            } else if (top == "SM" && bottom == "SM") {
                found += 1
            } else if (top == "MS" && bottom == "MS") {
                found += 1
            }
            
            return found
        }
        
    }
}

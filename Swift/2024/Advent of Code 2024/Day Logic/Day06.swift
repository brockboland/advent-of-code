import Foundation

struct Day06 {
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "06-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "06-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            let grid = CharGrid(input: input)
            
            let startingSpot: CharGrid.Position
            var direction: CharGrid.Direction
            
            if let up = grid.positionOfFirst(where: { $0 == "^" }) {
                startingSpot = up
                direction = .Up
            } else if let down = grid.positionOfFirst(where: { $0 == "v" }) {
                startingSpot = down
                direction = .Down
            } else if let left = grid.positionOfFirst(where: { $0 == "<" }) {
                startingSpot = left
                direction = .Left
            } else if let right = grid.positionOfFirst(where: { $0 == ">" }) {
                startingSpot = right
                direction = .Right
            } else {
                return "Couldn't find the starting spot"
            }
            
            print("Starting at \(startingSpot) going \(direction)")
            
            var currentSpot = startingSpot
            var visitedSpots: Set<CharGrid.Position> = [currentSpot]
            
            while true {
                let nextSpot = currentSpot.move(direction: direction)
                if let nextSpotValue = grid.char(at: nextSpot) {
                    if nextSpotValue == "#" {
                        direction = direction.turnRight
                    } else {
                        currentSpot = nextSpot
                        visitedSpots.insert(currentSpot)
                    }
                } else {
                    print("I think we just exited")
                    break
                }
            }
            
            print("Done! Spots visited: \(visitedSpots.count)")
            print(visitedSpots)
            return String(visitedSpots.count)
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "06-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "06-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            return "Not implemented yet"
        }
        
    }
}

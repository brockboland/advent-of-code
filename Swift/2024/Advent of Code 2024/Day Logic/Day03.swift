import Foundation

struct Day03 {
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "03-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "03-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            var sum = 0
            
            let regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/
            
            for line in input {
                for match in line.matches(of: regex) {
                    if let l = Int(match.1), let r = Int(match.2) {
                        sum += (l * r)
                    }
                }
            }
            
            return sum.description
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "03-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "03-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            // Potential plan:
            // Step through each line one char at a time
            // For each char, check how the next 12 chars start:
            // do(): enable
            // don't(): disable
            // mul(nnn,yyy): add to total
            
            let regex = /mul\(([0-9]{1,3}),([0-9]{1,3})\)/
            
            var sum = 0
            
            var enabled = true
            
            for line in input {
                var index = line.startIndex
                while index < line.endIndex {
                    let chunkEnd: String.Index
                    if let maybeEnd: String.Index = line.index(index, offsetBy: 12, limitedBy: line.endIndex) {
                        chunkEnd = maybeEnd
                    } else {
                        chunkEnd = line.endIndex
                    }
                    let chunk = line[index..<chunkEnd]
                    
                    if chunk.hasPrefix("do()") {
                        enabled = true
                        index = line.index(index, offsetBy: 4)
                    } else if chunk.hasPrefix("don't()") {
                        enabled = false
                        index = line.index(index, offsetBy: 7)
                    } else if chunk.hasPrefix("mul("), enabled {
                        if let match = chunk.firstMatch(of: regex), let l = Int(match.1), let r = Int(match.2) {
                            // Valid mul(): do the math and advance past it
                            sum += (l * r)
                            index = line.index(index, offsetBy: match.0.count)
                        } else {
                            // Not a valid mul(): advance by 1
                            index = line.index(index, offsetBy: 1)
                        }
                    } else {
                        index = line.index(index, offsetBy: 1)
                    }
                }
            }
            
            return sum.description
        }
        
    }
}

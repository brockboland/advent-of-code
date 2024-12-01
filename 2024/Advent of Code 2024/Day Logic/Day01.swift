import Foundation

struct Day01 {
    
    static func splitIntoSides(input: [String]) -> (left: [Int], right: [Int]) {
        var leftSide: [Int] = []
        var rightSide: [Int] = []
        
        for line in input {
            guard !line.isEmpty else {continue}
            let splits = line.split(separator: "   ")
            let l = Int(splits[0].description) ?? 0
            let r = Int(splits[1].description) ?? 0
            leftSide.append(l)
            rightSide.append(r)
        }
        return (left: leftSide, right: rightSide)
    }
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            var (left, right) = splitIntoSides(input: input)
            
            left.sort()
            right.sort()
            
            var sum = 0;
            for i in 0..<left.count {
                let diff = abs(left[i] - right[i])
                sum += diff
            }
            
            
            return sum.description
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            var (left, right) = splitIntoSides(input: input)
            
            var rightCount: [Int: Int] = [:]
            for value in right {
                if let previous = rightCount[value] {
                    rightCount[value] = previous+1
                } else {
                    rightCount[value] = 1
                }
            }
            
            var similarityScore = 0
            for value in left {
                let rightValueForThis = rightCount[value] ?? 0
                similarityScore += (value * rightValueForThis)
            }
            return similarityScore.description
        }
        
    }
}

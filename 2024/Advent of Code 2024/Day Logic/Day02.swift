import Foundation

struct Day02 {
    
    static func validLevel(levels: [Int]) -> Bool {
        var firstDiff = levels[0] - levels[1]
        
        guard abs(firstDiff) < 4, abs(firstDiff) > 0 else {
            return false
        }
        
        let isIncreasing = firstDiff < 0
        
        for l in 1..<levels.count {
            var isSafe = true
            let stepDiff = levels[l-1] - levels[l]
            let stepAbsolute = abs(stepDiff)
            guard stepAbsolute < 4, stepAbsolute > 0 else {
//                print("Too big step from \(levels[l-1]) to \(levels[l])")
                return false
            }
            
            if isIncreasing {
                isSafe = stepDiff < 0
            } else {
                isSafe = stepDiff > 0
            }
            
            guard isSafe else {
//                print("Invalid step, bailing at \(levels[l-1]) to \(levels[l])")
                return false
            }
        }
        
        return true
    }
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "02-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "02-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            var safeReports = 0
            
            for line in input {
                guard line.count > 0 else {
                    continue
                }
//                print("New line: \(line)")
                let levels = line.split(separator: " ").compactMap { Int($0) }
                
                if validLevel(levels: levels) {
                    safeReports += 1
                }
            }
            
            return safeReports.description
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "02-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "02-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            var safeReports = 0
            
            for line in input {
                guard line.count > 0 else {
                    continue
                }
//                print("New line: \(line)")
                let levels = line.split(separator: " ").compactMap { Int($0) }
                
                if validLevel(levels: levels) {
                    safeReports += 1
                } else {
                    // Try removing each element in the array one at a time
                    for i in 0..<levels.count {
                        var shorterLevels = levels
                        shorterLevels.remove(at: i)
//                        print("Checking after removing at \(i), new line: \(shorterLevels)")
                        if validLevel(levels: shorterLevels) {
                            safeReports += 1
                            break
                        }
                    }
                }
            }
            
            return safeReports.description
        }
        
    }
}

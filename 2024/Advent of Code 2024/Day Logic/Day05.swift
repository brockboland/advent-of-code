import Foundation

struct Day05 {
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.chunkedContentsOf(filename: "05-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.chunkedContentsOf(filename: "05-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [[String]]) -> String {
            let rules = input[0]
            let updatedPages = input[1]
            
            var sum = 0;
            
            for updateSection in updatedPages {
                let pageNums: [String] = updateSection.split(separator: ",").map { String($0) }
                if isRowValid(rules: rules, updatedPages: pageNums) {
                    let midIndex = pageNums.count / 2
                    sum += Int(pageNums[midIndex]) ?? 0
                }
            }
            
            return sum.description
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.chunkedContentsOf(filename: "05-example1") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.chunkedContentsOf(filename: "05-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [[String]]) -> String {
            let rules = input[0]
            let updatedPages = input[1]
            
            var sum = 0;
            
            for updateSection in updatedPages {
                let pageNums: [String] = updateSection.split(separator: ",").map { String($0) }
                if !isRowValid(rules: rules, updatedPages: pageNums) {
                    // TODO: fix the row
                    // Maybe isRowValid should instead return the number of the rule that failed
                }
            }
            
            return sum.description
        }
        
    }
    
    
    private static func isRowValid(rules: [String], updatedPages: [String]) -> Bool {
        var positionMap: [String: Int] = [:]
        for i in updatedPages.indices {
            let p = String(updatedPages[i])
            positionMap[p] = i
        }
        
        for rule in rules {
            let parts = rule.split(separator: "|")
            let earlier = String(parts[0])
            let later = String(parts[1])
            
            if let positionOfEarlier = positionMap[earlier],
                let positionOfLater = positionMap[later],
               positionOfEarlier > positionOfLater {
                return false
            }
        }
        
        // If we got this far, it's good
        return true
    }
}

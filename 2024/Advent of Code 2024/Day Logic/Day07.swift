import Foundation

struct Day07 {
    
    struct Problem {
        enum MathOp: CaseIterable, CustomStringConvertible {
            case Add, Multiply
            
            var description: String {
                switch self {
                case .Add:
                    return "+"
                case .Multiply:
                    return "*"
                }
            }
        }
        
        let total: Int
        let parts: [Int]
        
        init?(input: String) {
            guard !input.isEmpty else {
                return nil
            }
            let chunks = input.split(separator: ":")
            self.total = Int(String(chunks[0]))!
            self.parts = String(chunks[1]).components(separatedBy: .whitespaces).compactMap { Int($0) }
        }
        
        
        func hasValidOperation() -> Bool {
//            print("Beginning check for: \(self)")
            return checkOperations(operations: [])
        }
        
        private func checkOperations(operations: [MathOp]) -> Bool {
            if (operations.count == parts.count-1) {
                // Check the operations
                var runningTotal = parts[0]
                for i in 1..<parts.count {
                    let nextNum = parts[i]
                    switch operations[i-1] {
                    case .Add:
                        runningTotal += nextNum
                    case .Multiply:
                        runningTotal *= nextNum
                    }
                }
//                print("Checking ops: \(operations), got: \(runningTotal) (looking for \(total))")
                return runningTotal == total
            } else {
                for op in MathOp.allCases {
                    var nextOps = operations
                    nextOps.append(op)
                    if checkOperations(operations: nextOps) {
                        return true
                    }
                }
            }
            return false
        }
    }
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "07-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "07-actual") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            let problems = input.compactMap { Problem(input: $0) }
            var sum = 0
            for problem in problems {
                if problem.hasValidOperation() {
                    sum += problem.total
                }
            }
            return sum.description
        }
    }
    

    
    struct Part2 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "07-example2") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "07-actual") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            return "Not implemented yet"
        }
        
    }
}

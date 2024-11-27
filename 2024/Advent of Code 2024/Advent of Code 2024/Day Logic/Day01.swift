//
//  Day01.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/25/24.
//

import Foundation

struct Day01 {
    private static let numberWords: [String: Character] = [
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9",
        "zero": "0"
    ]
    
    static func firstNum(sub: String, useWords: Bool = false) -> Character? {
        if (sub.isEmpty) {
            return nil
        } else if (sub.first?.isNumber == true) {
            return sub.first
        } else if (useWords) {
            for word in numberWords {
                if (sub.hasPrefix(word.key)) {
                    return word.value
                }
            }
        }
        
        let nextString = sub[sub.index(sub.startIndex, offsetBy: 1)...]
        return firstNum(sub: String(nextString), useWords: useWords);
    }
    
    static func lastNum(sub: String, useWords: Bool = false) -> Character? {
        if (sub.isEmpty) {
            return nil
        } else if (sub.last?.isNumber == true) {
            return sub.last
        } else if (useWords) {
            for word in numberWords {
                if (sub.hasSuffix(word.key)) {
                    return word.value
                }
            }
        }
        
        let nextString = sub[..<sub.index(sub.endIndex, offsetBy: -1)]
        return lastNum(sub: String(nextString), useWords: useWords);
    }
    
    struct Part1 {
        static func exampleInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01-example1") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        static func realInput() -> String {
            guard let contents = InputReader.contentsOf(filename: "01") else {
                return "Couldn't read input"
            }
            return part1Logic(input: contents)
        }
        
        private static func part1Logic(input: [String]) -> String {
            var sum = 0
            for line in input {
                let twoDigit = (firstNum(sub: line)?.description ?? "") + (lastNum(sub: line)?.description ?? "")
                if let d = Int(twoDigit) {
                    sum += d
                }
            }
            return String(sum)
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
            guard let contents = InputReader.contentsOf(filename: "01") else {
                return "Couldn't read input"
            }
            return part2Logic(input: contents)
        }
    
        
        private static func part2Logic(input: [String]) -> String {
            
            var sum = 0
            for line in input {
                let twoDigit = (firstNum(sub: line, useWords: true)?.description ?? "") + (lastNum(sub: line, useWords: true)?.description ?? "")
                if let d = Int(twoDigit) {
                    sum += d
                }
            }
            return String(sum)
        }
        
    }
}

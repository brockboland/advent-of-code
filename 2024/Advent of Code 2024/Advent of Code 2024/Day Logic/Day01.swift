//
//  Day01.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/25/24.
//

import Foundation

struct Day01 {
    static func firstNum(sub: String) -> String.Element? {
        if (sub.isEmpty) {
            return nil
        }
        if (sub.first?.isNumber == true) {
            return sub.first
        } else {
            let nextString = sub[sub.index(sub.startIndex, offsetBy: 1)...]
            return firstNum(sub: String(nextString));
        }
    }
    
    static func lastNum(sub: String) -> String.Element? {
        if (sub.isEmpty) {
            return nil
        }
        if (sub.last?.isNumber == true) {
            return sub.last
        } else {
            let nextString = sub[..<sub.index(sub.endIndex, offsetBy: -1)]
            return lastNum(sub: String(nextString));
        }
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
        
        private static let numberWords = [
            "one": 1,
            "two": 2,
            "three": 3,
            "four": 4,
            "five": 5,
            "six": 6,
            "seven": 7,
            "eight": 8,
            "nine": 9,
            "zero": 0
        ]
        
        private static func part2Logic(input: [String]) -> String {
            
            var sum = 0
            
            for line in input {
                let f = firstNum(sub: line);
            }
            
            return String(sum)
        }
        
    }
}

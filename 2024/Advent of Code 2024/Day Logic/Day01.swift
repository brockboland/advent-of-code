//
//  Day01.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/25/24.
//

import Foundation

struct Day01 {
    
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
            
            return "Not implemented yet"
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
            return "Not implemented yet"
        }
        
    }
}

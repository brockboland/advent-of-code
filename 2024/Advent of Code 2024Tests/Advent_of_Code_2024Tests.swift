//
//  Advent_of_Code_2024Tests.swift
//  Advent of Code 2024Tests
//
//  Created by Brock Boland on 11/13/24.
//

import Testing
@testable import Advent_of_Code_2024

struct Advent_of_Code_2024Tests {

    @Test func checkDay01() async throws {
        #expect(Day01.Part1.exampleInput() == "11")
        #expect(Day01.Part1.realInput() == "3246517")
        
        #expect(Day01.Part2.exampleInput() == "31")
        #expect(Day01.Part2.realInput() == "29379307")
    }
    
        

}

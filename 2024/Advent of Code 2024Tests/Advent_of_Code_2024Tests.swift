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
    
    @Test func checkDay02() async throws {
        #expect(Day02.Part1.exampleInput() == "2")
        #expect(Day02.Part1.realInput() == "502")
        
        #expect(Day02.Part2.exampleInput() == "4")
        #expect(Day02.Part2.realInput() == "544")
    }
    
    @Test func checkDay03() async throws {
        #expect(Day03.Part1.exampleInput() == "161")
        #expect(Day03.Part1.realInput() == "181345830")
        
        #expect(Day03.Part2.exampleInput() == "48")
        #expect(Day03.Part2.realInput() == "98729041")
    }

    //    @Test func checkDay03() async throws {
    //        #expect(Day03.Part1.exampleInput() == "0")
    //        #expect(Day03.Part1.realInput() == "0")
    //
    //        #expect(Day03.Part2.exampleInput() == "0")
    //        #expect(Day03.Part2.realInput() == "0")
    //    }

}

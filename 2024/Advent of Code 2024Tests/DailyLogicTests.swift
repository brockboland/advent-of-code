//
//  Advent_of_Code_2024Tests.swift
//  Advent of Code 2024Tests
//
//  Created by Brock Boland on 11/13/24.
//

import Testing
@testable import Advent_of_Code_2024

struct DailyLogicTests {

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

    @Test func checkDay04() async throws {
        #expect(Day04.Part1.exampleInput() == "18")
        #expect(Day04.Part1.realInput() == "2401")
        
        #expect(Day04.Part2.exampleInput() == "9")
        #expect(Day04.Part2.realInput() == "1822")
    }
    
    @Test func checkDay05() async throws {
        #expect(Day05.Part1.exampleInput() == "143")
        #expect(Day05.Part1.realInput() == "6498")
        
//        #expect(Day05.Part2.exampleInput() == "123")
//        #expect(Day05.Part2.realInput() == "0")
    }
    
    @Test func checkDay06() async throws {
        #expect(Day06.Part1.exampleInput() == "41")
        #expect(Day06.Part1.realInput() == "5131")
        
//        #expect(Day06.Part2.exampleInput() == "123")
//        #expect(Day06.Part2.realInput() == "0")
    }

    @Test func checkDay07() async throws {
        #expect(Day07.Part1.exampleInput() == "3749")
        #expect(Day07.Part1.realInput() == "303876485655")
        
//        #expect(Day07.Part2.exampleInput() == "123")
//        #expect(Day07.Part2.realInput() == "0")
    }
}

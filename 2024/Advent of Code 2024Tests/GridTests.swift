import Testing
@testable import Advent_of_Code_2024

struct GridTests {

    @Test func basics() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        #expect(grid.isValid(position: CharGrid.Position(x: 0, y: 0)))
        #expect(grid.isValid(position: CharGrid.Position(x: 1, y: 1)))
        #expect(grid.isValid(position: CharGrid.Position(x: 2, y: 2)))
        #expect(grid.isValid(position: CharGrid.Position(x: 3, y: 3)))
        
        #expect(grid.char(at: CharGrid.Position(x: 0, y: 0)) == "1")
        #expect(grid.char(at: CharGrid.Position(x: 1, y: 1)) == "6")
        #expect(grid.char(at: CharGrid.Position(x: 2, y: 2)) == "a")
        #expect(grid.char(at: CharGrid.Position(x: 3, y: 3)) == "f")
    }
    
    @Test func emptyGrid() async throws {
        let input: [String] = []
        let grid = CharGrid(input: input)
        #expect(grid.isValid(position: CharGrid.Position(x: 0, y: 0)) == false)
        #expect(grid.isValid(position: CharGrid.Position(x: 1, y: 1)) == false)
    }
    
    @Test func boundaries() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        #expect(grid.char(at: CharGrid.Position(x: -1, y: -1)) == nil)
        #expect(grid.char(at: CharGrid.Position(x: 4, y: 0)) == nil)
        #expect(grid.char(at: CharGrid.Position(x: 0, y: 4)) == nil)
        #expect(grid.char(at: CharGrid.Position(x: 4, y: 4)) == nil)
        #expect(grid.char(at: CharGrid.Position(x: 50, y: 23)) == nil)
    }

}

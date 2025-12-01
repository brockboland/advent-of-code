import Testing
@testable import Advent_of_Code_2024

struct GridTests {

    @Test func basics() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        #expect(grid.maxX == 3)
        #expect(grid.maxY == 3)
        
        #expect(grid.isValid(position: CharGrid.Position(x: 0, y: 0)))
        #expect(grid.isValid(position: CharGrid.Position(x: 1, y: 1)))
        #expect(grid.isValid(position: CharGrid.Position(x: 2, y: 2)))
        #expect(grid.isValid(position: CharGrid.Position(x: 3, y: 3)))
        
        #expect(grid.char(at: CharGrid.Position(x: 0, y: 0)) == "1")
        #expect(grid.char(at: CharGrid.Position(x: 3, y: 0)) == "4")
        
        #expect(grid.char(at: CharGrid.Position(x: 1, y: 1)) == "6")
        #expect(grid.char(at: CharGrid.Position(x: 2, y: 1)) == "7")
        
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
    
    @Test func moves() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        let topLeft = CharGrid.Position(x: 0, y: 0)
        let bottomRight = CharGrid.Position(x: 3, y: 3)
        
        #expect(grid.char(at: topLeft.right) == "2")
        #expect(grid.char(at: topLeft.down) == "5")
        #expect(grid.char(at: bottomRight.up) == "b")
        #expect(grid.char(at: bottomRight.left) == "e")
    }
    
    @Test func diagonals() async throws {
        let bigger: [String] = [
            "..X...",
            ".SAMX.",
            ".A..A.",
            "XMAS.S",
            ".X...."
        ]
        let grid = CharGrid(input: bigger)
        
        let start = CharGrid.Position(x: 2, y: 0)
        #expect(grid.char(at: start) == "X")
        #expect(grid.char(at: start.down.right) == "M")
        #expect(grid.char(at: start.down.right.down.right) == "A")
    }
    
    @Test func biggerDiagonals() async throws {
        let input: [String] = [
            "MMMSXXMASM",
            "MSAMXMSMSA",
            "AMXSXMAAMM",
            "MSAMASMSMX",
            "XMASAMXAMM",
            "XXAMMXXAMA",
            "SMSMSASXSS",
            "SAXAMASAAA",
            "MAMMMXMMMM",
            "MXMXAXMASX"]
        
        let grid = CharGrid(input: input)
        let start = CharGrid.Position(x: 1, y: 9)
        #expect(grid.char(at: start) == "X")
        #expect(grid.char(at: start.up.right) == "M")
        #expect(grid.char(at: start.up.right.up.right) == "A")
        #expect(grid.char(at: start.up.right.up.right.up.right) == "S")
    }
    
    
    @Test func gridIterator() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        var spots = 0
        for position in grid {
            spots += 1
        }
        #expect(spots == 16)
    }

    @Test func finder() async throws {
        let basic: [String] = ["1234", "5678", "90ab", "cdef"]
        let grid = CharGrid(input: basic)
        
        let aSpot = grid.positionOfFirst { $0 == "a" }
        #expect(aSpot!.y == 2)
        #expect(aSpot!.x == 2)
        
        let twoSpot = grid.positionOfFirst { $0 == "2" }
        #expect(twoSpot!.y == 0)
        #expect(twoSpot!.x == 1)
    }
}

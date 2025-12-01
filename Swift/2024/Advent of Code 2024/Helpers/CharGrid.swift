//
//  CharGrid.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 12/5/24.
//

import Foundation

struct CharGrid: Sequence {
    enum Direction {
        case Up
        case Down
        case Left
        case Right
        
        var turnRight: Direction {
            switch self {
            case .Down:
                return .Left
            case .Left:
                return .Up
            case .Right:
                return .Down
            case .Up:
                return .Right
            }
        }
    }

    struct Position: Hashable {
        let x: Int
        let y: Int
        
        var up: Position {
            return Position(x: x, y: y - 1)
        }
        
        var down: Position {
            return Position(x: x, y: y + 1)
        }
        
        var left: Position {
            return Position(x: x-1, y: y)
        }
        
        var right: Position {
            return Position(x: x+1, y: y)
        }
        
        func move(direction: Direction) -> Position {
            switch direction {
            case .Down:
                return down
            case .Left:
                return left
            case .Right:
                return right
            case .Up:
                return up
            }
        }
        
        // Hashable protocol
        static func == (lhs: Position, rhs: Position) -> Bool {
            return lhs.x == rhs.x && lhs.y == rhs.y
        }

        func hash(into hasher: inout Hasher) {
            hasher.combine(x)
            hasher.combine(y)
        }
    }

    private let contents: [[Character]]
    
    init(input: [String]) {
        contents = input.compactMap {
            guard !$0.isEmpty else { return nil }
            return Array($0)
        }
    }
    
    func char(at position: Position) -> Character? {
        guard isValid(position: position) else {
            return nil
        }
        return contents[position.y][position.x]
    }
    
    var maxX: Int {
        return (contents.first?.count ?? 1) - 1
    }
    
    var maxY: Int {
        return contents.count - 1
    }
        
    // Check if the given position is valid in this grid
    func isValid(position: Position) -> Bool {
        guard !contents.isEmpty,
              contents.first?.isEmpty == false,
              position.x >= 0,
              position.y >= 0 else {
            return false
        }
        
        return (position.x <= maxX && position.y <= maxY)
    }
    
    // Find the first position that matches the predicate
    func positionOfFirst(where predicate: (Character) -> Bool) -> CharGrid.Position? {
        for position in self {
            if let c = char(at: position), predicate(c) {
                return position
            }
        }
        return nil
    }
    
    // Sequence
    func makeIterator() -> GridIterator {
        return GridIterator(self)
    }
}

struct GridIterator: IteratorProtocol {
    let grid: CharGrid
    
    // Start just off to the left, so the first iteration is shifting into 0,0
    private var currentSpot = CharGrid.Position(x: -1, y: 0)
    
    init(_ grid: CharGrid) {
        self.grid = grid
    }
    
    mutating func next() -> CharGrid.Position? {
        if grid.isValid(position: currentSpot.right) {
            currentSpot = currentSpot.right
        } else {
            let nextLine = CharGrid.Position(x: 0, y: currentSpot.y + 1)
            if grid.isValid(position: nextLine) {
                currentSpot = nextLine
            } else {
                return nil
            }
        }
        return currentSpot
    }
}

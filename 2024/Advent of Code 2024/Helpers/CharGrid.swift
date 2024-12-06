//
//  CharGrid.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 12/5/24.
//

import Foundation

struct CharGrid {
    struct Position {
        let x: Int
        let y: Int
        
        func up() -> Position {
            return Position(x: x, y: y - 1)
        }
        
        func down() -> Position {
            return Position(x: x, y: y + 1)
        }
        
        func left() -> Position {
            return Position(x: x-1, y: y)
        }
        
        func right() -> Position {
            return Position(x: x+1, y: y)
        }
    }

    private let contents: [[Character]]
    
    init(input: [String]) {
        contents = input.map { Array($0) }
    }
    
    func char(at position: Position) -> Character? {
        guard isValid(position: position) else {
            return nil
        }
        return contents[position.y][position.x]
    }
    
    private var maxX: Int {
        return (contents.first?.count ?? 1) - 1
    }
    
    private var maxY: Int {
        return contents.count - 1
    }
    
    func isValid(position: Position) -> Bool {
        guard !contents.isEmpty,
              contents.first?.isEmpty == false,
              position.x >= 0,
              position.y >= 0 else {
            return false
        }
        
        return (position.x <= maxX && position.y <= maxY)
    }
    
}

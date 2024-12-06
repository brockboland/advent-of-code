//
//  CharGrid.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 12/5/24.
//

import Foundation

struct CharGrid {
    private let contents: [[Character]]
    
    init(input: [String]) {
        contents = input.map { Array($0) }
    }
    
    func char(at position: Position) -> Character? {
        guard isValid(position: position) else {
            return nil
        }
        return contents[position.x][position.y]
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
    
    struct Position {
        let x: Int
        let y: Int
    }
}

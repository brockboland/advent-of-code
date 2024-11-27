//
//  InputReader.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/25/24.
//

import Foundation

struct InputReader {
    static func contentsOf(filename: String) -> [String]? {
        do {
            if let path = Bundle.main.path(forResource: filename, ofType: "txt") {
               let data = try String(contentsOfFile: path, encoding: .utf8)
                return data.components(separatedBy: .newlines)
            }
        } catch let e {
            debugPrint("Failed to read file \(filename): ", e)
        }
        return nil;
    }
}

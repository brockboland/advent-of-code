//
//  Advent_of_Code_2024App.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/13/24.
//

import SwiftUI

@main
struct Advent_of_Code_2024App: App {
    
    struct MenuItem: Identifiable, Hashable {
        var id = UUID()
        var dateNumber: Int
    }
    
    func dateNumber(for id: MenuItem.ID) -> Int {
        guard let menuItem = dateList.first(where: { $0.id == id }) else {
            return 1
        }

        return menuItem.dateNumber
    }
    
    @State private var selectedItemId: MenuItem.ID?
    
    var dateList: [MenuItem] = Array(0...25).map { MenuItem(dateNumber: $0) }
    
    var body: some Scene {
        WindowGroup {
            NavigationSplitView {
                List(dateList, selection: $selectedItemId) { item in
                    Text(String(item.dateNumber))
                }
            } detail: {
                if let selectedItemId {
                    DayDetail(date: dateNumber(for: selectedItemId))
                } else {
                    Text("Please select a date")
                }
            }
        }
    }
}

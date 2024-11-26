//
//  Advent_of_Code_2024App.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/13/24.
//

import SwiftUI

@main
struct Advent_of_Code_2024App: App {
    var body: some Scene {
        WindowGroup {
            NavigationSplitView {
                CalendarView()
            } detail: {
                DayDetail(date: 3)
            }
        }
    }
}

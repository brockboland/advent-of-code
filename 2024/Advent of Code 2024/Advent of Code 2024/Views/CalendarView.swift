//
//  ContentView.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/13/24.
//

import SwiftUI

struct CalendarView: View {
    var body: some View {
        VStack {
            CalendarRow(startDate: 1)
            CalendarRow(startDate: 8)
            CalendarRow(startDate: 15)
            CalendarRow(startDate: 22)
            CalendarRow(startDate: 29)
        }
    }
}

#Preview {
    CalendarView()
}

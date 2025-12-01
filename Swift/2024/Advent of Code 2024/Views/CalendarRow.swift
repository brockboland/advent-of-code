//
//  CalendarRow.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/13/24.
//

import SwiftUI

struct CalendarRow: View {
    var startDate: Int
    var body: some View {
        HStack {
            NavigationLink(String(startDate), value: String(startDate))
            NavigationLink(String(startDate+1), value: String(startDate))
            NavigationLink(String(startDate+2), value: String(startDate))
            NavigationLink(String(startDate+3), value: String(startDate))
            NavigationLink(String(startDate+4), value: String(startDate))
            NavigationLink(String(startDate+5), value: String(startDate))
            NavigationLink(String(startDate+6), value: String(startDate))
        }
        .padding()
    }
    
   
    
}

#Preview {
    CalendarRow(startDate: 1)
}

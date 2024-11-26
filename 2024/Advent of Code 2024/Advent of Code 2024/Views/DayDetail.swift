//
//  DayDetail.swift
//  Advent of Code 2024
//
//  Created by Brock Boland on 11/25/24.
//

import SwiftUI

struct DayDetail: View {
    var date: Int
    var body: some View {
        Text("This is the detail view the \(date) of Dec")
    }
}

#Preview {
    DayDetail(date: 2)
}

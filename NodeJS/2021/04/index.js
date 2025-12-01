import { fileContents } from "advent-of-code-2021-a1329730-utils";

let fullInput = fileContents("./input.txt");
let sampleInput = fileContents("./sampleInput.txt");

function firstWinningBoardScore(input) {
  let ballCallOrder = input[0].split(",");
  let bingoBoards = makeBoards(input.slice(1));

  for (let i in ballCallOrder) {
    let calledBall = ballCallOrder[i];
    for (let boardIdx in bingoBoards) {
      let markedBoard = markBoard(bingoBoards[boardIdx], calledBall);
      if (isWinningBoard(markedBoard)) {
        return scoreForBoard(markedBoard, calledBall);
      } else {
        bingoBoards[boardIdx] = markedBoard;
      }
    }
  }
  return 0;
}

function finalWinningBoardScore(input) {
  let ballCallOrder = input[0].split(",");
  let bingoBoards = makeBoards(input.slice(1));

  for (let i in ballCallOrder) {
    let calledBall = ballCallOrder[i];
    let continuingBoardList = []
    for (let boardIdx in bingoBoards) {
      let markedBoard = markBoard(bingoBoards[boardIdx], calledBall);

      if (isWinningBoard(markedBoard)) {
        // The final board has finally hit a bingo: return its score
        if (bingoBoards.length <= 1) {
          return scoreForBoard(markedBoard, calledBall);
        }
      } else {
        continuingBoardList.push(markedBoard);
      }
    }

    // Swap in the new list of non-winning boards for the next ball
    bingoBoards = continuingBoardList;
  }
  return 0;
}

function makeBoards(boardData) {
  let bingoBoards = [];

  for (let i = 0; i < boardData.length; i++) {
    let line = boardData[i].trim();
    if (line == "") {
      continue;
    }

    let nextBoard = [
      makeBoardRowFromInputLine(boardData[i++]),
      makeBoardRowFromInputLine(boardData[i++]),
      makeBoardRowFromInputLine(boardData[i++]),
      makeBoardRowFromInputLine(boardData[i++]),
      makeBoardRowFromInputLine(boardData[i]), // Iterator handles incrementing for the next row
    ];
    bingoBoards.push(nextBoard);
  }
  return bingoBoards;
}

function makeBoardRowFromInputLine(row) {
  return row
    .split(" ")
    .filter((num) => num != "")
    .map((num) => parseInt(num));
}

function isWinningBoard(board) {
  for (let rowIdx in board) {
    let row = board[rowIdx];
    if (arraySum(row) == -5) {
      return true;
    }
  }

  let colCount = board[0].length;
  for (let colIdx = 0; colIdx < colCount; colIdx++) {
    let column = [];
    for (let rowIdx in board) {
      column.push(board[rowIdx][colIdx]);
    }
    if (arraySum(column) == -5) {
      return true;
    }
  }
  return false;
}

function markBoard(board, calledBall) {
  // Return a board with a -1 where the called number was
  let newBoard = [];
  for (let row in board) {
    let newRow = [];
    for (let col in board[row]) {
      let spotOnBoard = board[row][col];
      if (spotOnBoard == calledBall) {
        newRow.push(-1); // Use -1 to indicate a marked spot
      } else {
        newRow.push(spotOnBoard);
      }
    }
    newBoard.push(newRow);
  }
  return newBoard;
}

function scoreForBoard(board, lastCalledNumber) {
  let boardSum = board
    .flatMap((x) => x)
    .reduce((runningSum, nextValue) => {
      if (nextValue > 0) {
        return runningSum + nextValue;
      } else {
        return runningSum;
      }
    }, 0);
  return boardSum * lastCalledNumber;
}

function arraySum(arr) {
  return arr.reduce((a, b) => a + b, 0);
}

// PART 1
let winningScore = firstWinningBoardScore(fullInput);
console.log("First board to win score: ", winningScore);

// PART 2
let lastWinningBoard = finalWinningBoardScore(fullInput);
console.log("Last board to win score:", lastWinningBoard);

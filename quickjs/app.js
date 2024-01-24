const initialState = {
  winner: null,
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
}

function makeMove({ board, row, col, player }) {
  // Check if the move is valid
  if (board[row][col] === '' && !initialState.winner) {
    // Create a new state object with the updated board
    const newBoard = JSON.parse(JSON.stringify(board)) // Deep copy the board
    newBoard[row][col] = player

    // Check for a winner
    const newWinner = checkWinner(newBoard)

    return {
      winner: newWinner,
      board: newBoard,
    }
  }

  // If the move is invalid, return the current state
  return JSON.parse(JSON.stringify(initialState))
}

function checkWinner(board) {
  // Check rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] !== '' &&
      board[i][0] === board[i][1] &&
      board[i][1] === board[i][2]
    ) {
      return board[i][0]
    }
  }

  // Check columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] !== '' &&
      board[0][j] === board[1][j] &&
      board[1][j] === board[2][j]
    ) {
      return board[0][j]
    }
  }

  // Check diagonals
  if (
    board[0][0] !== '' &&
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2]
  ) {
    return board[0][0]
  }

  if (
    board[0][2] !== '' &&
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0]
  ) {
    return board[0][2]
  }

  return null // No winner yet
}

// const state = JSON.parse(JSON.stringify(initialState))
// const one = makeMove({ board: state.board, row: 0, col: 0, player: 'X' })
// const two = makeMove({ board: one.board, row: 1, col: 0, player: 'X' })
// const three = makeMove({ board: two.board, row: 2, col: 0, player: 'X' })

function app() {
  const input = Host.inputString()
  const output = makeMove(JSON.parse(input))
  Host.outputString(JSON.stringify(output))
  // const name = Host.inputString()
  // Host.outputString(`Helloaaa, ${name}`)
}

module.exports = { app }

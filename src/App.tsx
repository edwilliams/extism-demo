import Game from './Game'

import { CopyBlock } from 'react-code-blocks'

const App = () => (
  <div className="">
    <div className="grid-container">
      <div className="">
        <h1>Tic Tac Toe w/ WASM game engine</h1>
        <p>
          Game logic written by ChatGPT (w/ minor alterations) - see details
          below
        </p>
        <details>
          Please write a simple tic-tac-toe game engine in JavaScript.
          <br />
          There should be no HTML or CSS. The state of the game should be stored
          in an object. For example:
          <br />
          <CopyBlock
            text={`const state = {winner: 'X',board: [['','X','O'],['O','X','O'],['','X','']]}`}
            language={'javascript'}
            showLineNumbers={false}
          />
          <br />
          The game should be updated by a function, for example:
          <br />
          <CopyBlock
            text={`makeMove({ board: state.board, row: 0, col: 1, player: 'X' })`}
            language={'javascript'}
            showLineNumbers={false}
          />
          <br />
          This function should return a new state object
        </details>
        <p>
          Game logic pasted into{' '}
          <a target="_blank" href="https://github.com/extism/js-pdk">
            QuickJS
          </a>{' '}
          (see game.js below)
        </p>
        <p>
          QuickJS code compiled to WASM with{' '}
          <a target="_blank" href="https://github.com/extism/react/">
            Extism
          </a>
        </p>
        <p>WASM imported into React (see App.jsx below)</p>
      </div>
      <div className="flex justify-center">
        <Game />
      </div>
    </div>
    <div className="code-block">
      <CopyBlock
        language="javascript"
        text={`
      // game.js
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
      
      function app() {
        const input = Host.inputString()
        const output = makeMove(JSON.parse(input))
        Host.outputString(JSON.stringify(output))
      }
      
      module.exports = { app }
      
      `}
        showLineNumbers={false}
      />
    </div>
    <div className="code-block">
      <CopyBlock
        text={`
        // App.jsx
        import { useState } from 'react'
        import { usePlugin } from './extism.tsx'
        import Board from './Board.tsx'
        import './style.css'
        
        function App() {
          const { plugin, loading } = usePlugin('path/to/app.wasm', {
            useWasi: true,
          })
        
          const [state, setState] = useState({
            winner: '',
            board: [
              ['', '', ''],
              ['', '', ''],
              ['', '', ''],
            ],
            row: 0,
            col: 0,
            player: '',
          })
          const [lastPlayer, setLastPlayer] = useState('X')
        
          // this sends our stringified input to WASM and returns a new stringified object
          const callWasm = async (str: string) => {
            const val: any = await plugin?.call('app', str)
            return new TextDecoder().decode(val)
          }
        
          const handleClick = async ({ row, col }: { row: number; col: number }) => {
            const player = lastPlayer === 'X' ? 'O' : 'X'
            const input = { board: state.board, row, col, player }
            const str = await callWasm(JSON.stringify(input))
            setState(JSON.parse(str))
            setLastPlayer(player)
          }
        
          const winner = JSON.stringify(state.winner)
          const currentPlayer = lastPlayer === 'X' ? 'O' : 'X'
        
          return (
            <div>
              {loading ? (
                <p>Loading wasm...</p>
              ) : (
                <div>
                  <Board board={state.board} onClick={handleClick} />
                  {winner === '"O"' || winner === '"X"' ? (
                    <h1>Winner: {winner}</h1>
                  ) : (
                    <h3>It is {currentPlayer} players turn</h3>
                  )}
                </div>
              )}
            </div>
          )
        }
        
        export default App
        
        `}
        language={'javascript'}
        showLineNumbers={false}
      />
    </div>
  </div>
)

export default App

import { useState } from 'react'
import { usePlugin } from './extism.tsx'
import Board from './Board.tsx'
import './style.css'

function App() {
  const { plugin, loading } = usePlugin(`${window.location.origin}/app.wasm`, {
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

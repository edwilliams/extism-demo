import { usePlugin } from './extism.tsx'
import { useState, useEffect } from 'react'
import Game from './Game.tsx'
import './style.css'

const initialState = {
  board: [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ],
  row: 0,
  col: 0,
  player: '',
}

function App() {
  const { plugin, loading } = usePlugin(`${window.location.origin}/app.wasm`, {
    useWasi: true,
  })

  // output is the stringified object that comes back from WASM
  const [output, setOutput] = useState('')
  const [lastPlayer, setLastPlayer] = useState('X')

  // whenever input is changed, WASM is called which then returns a new output
  useEffect(() => {
    const main = async () => {
      const str = await callWasm(JSON.stringify(initialState))
      setOutput(str)
    }
    main()
  }, [plugin])

  // this sends our stringified input to WASM and returns a new stringified object
  const callWasm = async (str: string) => {
    const val: any = await plugin?.call('app', str)
    return new TextDecoder().decode(val)
  }

  const handleClick = async ({ row, col }: { row: number; col: number }) => {
    const player = lastPlayer === 'X' ? 'O' : 'X'
    const input = { board: display.board, row, col, player }
    const str = await callWasm(JSON.stringify(input))
    setOutput(str)
    setLastPlayer(player)
  }

  const display = output === '' ? initialState : JSON.parse(output)
  const winner = JSON.stringify(display.winner)
  const currentPlayer = lastPlayer === 'X' ? 'O' : 'X'

  return (
    <div>
      {loading ? (
        <p>Loading wasm...</p>
      ) : (
        <div>
          <Game board={display.board} onClick={handleClick} />
          {winner === 'null' ? (
            <h3>It is {currentPlayer} players turn</h3>
          ) : (
            <h1>Winner: {winner}</h1>
          )}
        </div>
      )}
    </div>
  )
}

export default App

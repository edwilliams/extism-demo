import { usePlugin } from './extism.tsx'
import { useState, useEffect } from 'react'
import Game from './Game.tsx'
import './style.css'

// todo: pass string to callWasm and remove input altogether

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

  // input is an object, which is stringified and sent to WASM
  const [input, setInput] = useState(initialState)

  // output is the stringified object that comes back from WASM
  const [output, setOutput] = useState('')
  const [lastPlayer, setLastPlayer] = useState('X')

  // whenever input is changed, WASM is called which then returns a new output
  useEffect(() => {
    const main = async () => {
      const str = await callWasm()
      setOutput(str)
    }
    main()
  }, [plugin, input])

  // this sends our stringified input to WASM and returns a new stringified object
  const callWasm = async () => {
    const val: any = await plugin?.call('app', JSON.stringify(input))
    return new TextDecoder().decode(val)
  }

  const handleClick = ({ row, col }: { row: number; col: number }) => {
    const player = lastPlayer === 'X' ? 'O' : 'X'
    setInput({ board: display.board, row, col, player })
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

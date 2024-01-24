import { usePlugin } from './extism.tsx'
import { useState, useEffect } from 'react'
// import Game from './Game'
import './style.css'

function App() {
  // return <Game />
  const [input, setInput] = useState({
    board: [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ],
    row: 0,
    col: 0,
    player: 'X',
  })
  const [str, setStr] = useState('')
  const { plugin, loading } = usePlugin(`${window.location.origin}/app.wasm`, {
    useWasi: true,
  })

  useEffect(() => {
    const _input = JSON.stringify(input)
    // console.log(_input)
    plugin?.call('app', _input).then((output: any) => {
      setStr(new TextDecoder().decode(output))
    })
  }, [plugin, input])

  return (
    <div>
      {loading ? (
        <p>Loading wasm...</p>
      ) : (
        <div>
          <input
            className="input"
            value={JSON.stringify(input)}
            onChange={(e) => setInput(JSON.parse(e.target.value))}
          />
          <br />
          <br />
          {str}
        </div>
      )}
    </div>
  )
}

export default App

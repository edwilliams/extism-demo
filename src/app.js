import { usePlugin } from './extism.tsx' // '@extism/react' is broken
import React, { useState, useEffect } from 'react'

const pluginSource = 'http://localhost:3000/greet.wasm'

function App() {
  const [hookInput, setHookInput] = useState('')
  const [str, setStr] = useState('')
  const {
    // plugin,
    // loading,
    useFunction,
  } = usePlugin(pluginSource, { useWasi: true })

  const { output, loading } = useFunction('greet', hookInput)

  useEffect(() => {
    setStr(new TextDecoder().decode(output))
    //   plugin?.call('greet', hookInput).then((output) => {
    //     setStr(new TextDecoder().decode(output))
    //   })
  }, [output, hookInput])

  return (
    <div>
      {loading ? (
        <p>Loading wasm...</p>
      ) : (
        <div>
          <input onChange={(e) => setHookInput(e.target.value)} />
          {str}
        </div>
      )}
    </div>
  )
}

export default App

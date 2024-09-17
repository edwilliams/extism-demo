# Tic Tac Toe w/ WASM game engine

https://tic-tac-toe-wasm.netlify.app/

_Game logic written by ChatGPT (w/ minor alterations) - see details below_

Details
> `Please write a simple tic-tac-toe game engine in JavaScript.`
> `There should be no HTML or CSS. The state of the game should be stored in an object. For example:`
> `const state = {winner: 'X',board: [['','X','O'],['O','X','O'],['','X','']]}`

> `The game should be updated by a function, for example:`
> `makeMove({ board: state.board, row: 0, col: 1, player: 'X' })`

> `This function should return a new state object`

Using QuickJS, Extism (WASM) & React

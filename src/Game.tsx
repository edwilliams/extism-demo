function Game({
  board,
  onClick,
}: {
  board: string[][]
  onClick: (val: any) => void
}) {
  return (
    <div className="flex">
      <div className="flex-col">
        <div onClick={() => onClick({ row: 0, col: 0 })} className="square">
          {board[0][0]}
        </div>
        <div onClick={() => onClick({ row: 1, col: 0 })} className="square">
          {board[1][0]}
        </div>
        <div onClick={() => onClick({ row: 2, col: 0 })} className="square">
          {board[2][0]}
        </div>
      </div>
      <div className="flex-col">
        <div onClick={() => onClick({ row: 0, col: 1 })} className="square">
          {board[0][1]}
        </div>
        <div onClick={() => onClick({ row: 1, col: 1 })} className="square">
          {board[1][1]}
        </div>
        <div onClick={() => onClick({ row: 2, col: 1 })} className="square">
          {board[2][1]}
        </div>
      </div>
      <div className="flex-col">
        <div onClick={() => onClick({ row: 0, col: 2 })} className="square">
          {board[0][2]}
        </div>
        <div onClick={() => onClick({ row: 1, col: 2 })} className="square">
          {board[1][2]}
        </div>
        <div onClick={() => onClick({ row: 2, col: 2 })} className="square">
          {board[2][2]}
        </div>
      </div>
    </div>
  )
}

export default Game

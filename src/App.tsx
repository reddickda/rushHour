import './App.css'
import { GameBoard } from './GameBoard'
import { ListOfPieces } from './ListOfPieces'
import { bfs } from './Utilities/boardSolver'
import { useMyContext } from './Context/ContextProvider'
import { useState } from 'react'
import { Board } from './Board'

export enum Direction{
  vertical,
  horizontal
}

function App() {
  const { state, clearBoard } = useMyContext();
  const [solvedBoard, setSolvedBoard] = useState<any>();

  const handleClickSolve = () => {
    setSolvedBoard(bfs(state.boardAsAHashedSet))
  }

  return (
    <div>
      <ListOfPieces />
      <GameBoard />
      <button onClick={handleClickSolve}>Solve it!</button>
      <button onClick={() => clearBoard()}>Clear board</button>
      {solvedBoard ? <div style={{borderRadius: 5, backgroundColor: 'green'}}><div>solved!</div> <Board pathToDisplay={solvedBoard} /></div> : <div>not solved...</div>}
    </div>
  )
}

export default App

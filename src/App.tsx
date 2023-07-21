import './App.css'
import { GameBoard } from './GameBoard'
import { ListOfPieces } from './ListOfPieces'
import { bfs } from './Utilities/boardSolver'
import { useMyContext } from './Context/ContextProvider'
import { useState } from 'react'
import { Board } from './Board'

export enum Direction {
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
    <>
      <div style={{ backgroundColor: '#6c96ac', borderRadius: 10, padding: 20 }}>
        <div><h1>This is a Rush Hour solver!</h1></div>
        <div>Instructions: Set up your board and watch it solve itself.</div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ListOfPieces />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GameBoard />
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button onClick={() => clearBoard()}>Clear board</button>
          <button onClick={handleClickSolve}>Solve it!</button>
        </div>
        {solvedBoard && <div style={{ marginTop: 10, borderRadius: 5, backgroundColor: 'green' }}><Board pathToDisplay={solvedBoard} /></div>}
      </div>
      <div><a target="_blank" href="https://www.amazon.com/gp/search?ie=UTF8&tag=dreddick-20&linkCode=ur2&linkId=9ef5790b3be96d5ea3b119733363d71d&camp=1789&creative=9325&index=toys-and-games&keywords=rushhourgame">Purchase your own Rush Hour game here!</a></div>
      <p>Like this? Let me know! </p>
      <p>reddickdav@gmail.com</p>
      <p>davidfullstack.com</p>
    </>
  )
}

export default App

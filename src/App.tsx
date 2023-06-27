import './App.css'
import { GameBoard } from './GameBoard'
import { ListOfPieces } from './ListOfPieces'

export enum Direction{
  vertical,
  horizontal
}

function App() {

  return (
    <div>
      <ListOfPieces />
      <GameBoard />
    </div>
  )
}

export default App

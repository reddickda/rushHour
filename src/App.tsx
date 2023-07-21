import './App.css'
import { GameBoard } from './GameBoard'
import { ListOfPieces } from './ListOfPieces'
import { bfs } from './Utilities/boardSolver'
import { useMyContext } from './Context/ContextProvider'
import { useState } from 'react'
import { Board } from './Board'
import imageRush from './assets/rhiourgame.jpg'

export enum Direction {
  vertical,
  horizontal
}

function App() {
  const { state, clearBoard } = useMyContext();
  const [solvedBoard, setSolvedBoard] = useState<any>();
  const [open, setOpen] = useState<boolean>(false);

  const handleClickSolve = () => {
    setSolvedBoard(bfs(state.boardAsAHashedSet))
  }

  const toggleModal = () => {
    setOpen(!open)
  }

  return (
    <>
      <div style={{ backgroundColor: '#6c96ac', borderRadius: 10, padding: 20 }}>
        <div><h1>This is a Rush Hour solver!</h1></div>
        <div style={{ marginBottom: 10 }}>Set up your board and watch it solve itself... but first
        </div>
        <div>
          <button
            style={{ textDecoration: 'none', outline: 'none', display: 'flex', alignItems: 'center', height: 25, fontSize: 15, backgroundColor: 'gray', borderRadius: 5, fontWeight: 400, marginLeft: 'auto', marginRight: 'auto', marginBottom: 10 }}
            onClick={toggleModal}>
            What is Rush Hour?
          </button>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ListOfPieces />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GameBoard />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => clearBoard()}>Clear board</button>
          <button onClick={handleClickSolve}>Solve it!</button>
        </div>
        {solvedBoard && <>
          <div style={{ marginTop: 10, borderRadius: 5 }}>
            <p>We solved it!</p>
            <Board pathToDisplay={solvedBoard} />
          </div>
        </>}
      </div>
      <div>
        <a target="_blank" href="https://www.amazon.com/ThinkFun-Rush-Traffic-Logic-Girls/dp/B00000DMER/ref=sr_1_4?camp=1789&creative=9325&keywords=rush+hour+game&linkCode=ur2&linkId=9ef5790b3be96d5ea3b119733363d71d&qid=1689951232&s=toys-and-games&sr=1-4&_encoding=UTF8&tag=dreddick-20&linkCode=ur2&linkId=966e5b78d9cf24a3e03af0082583651a&camp=1789&creative=9325">Purchase your own Rush Hour game here!</a>
      </div>
      <div>
        <a target="_blank" href="https://www.amazon.com/ThinkFun-Junior-Traffic-Logic-Girls/dp/B00GRV5JNY/ref=sr_1_4?camp=1789&creative=9325&keywords=rush+hour+game&linkCode=ur2&linkId=9ef5790b3be96d5ea3b119733363d71d&qid=1689951149&s=toys-and-games&sr=1-4&_encoding=UTF8&tag=dreddick-20&linkCode=ur2&linkId=17c1237c4c6076b99c7a463da8e7ae9f&camp=1789&creative=9325">Rush Hour Junior for kids!</a>
      </div>
      <p>Like this? Let me know! </p>
      <div style={{fontSize:14}}>reddickdav@gmail.com</div>
      <div style={{fontSize:14}}>davidfullstack.com</div>
      {open && <div style={{
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        backgroundColor: '#242424',
        opacity: .99,
        zIndex: 1,
        position: 'absolute',
        top: 200,
        height: 420,
        width: 310,
        padding: 5,
        borderRadius: 5
      }}>
        <div>
          In Rush Hour, a sliding block logic game, you have to battle the gridlock as you slide the blocking vehicles out of the way for the red car to exit
        </div>
        <img style={{ marginLeft: 'auto', marginRight: 'auto' }} height={150} width={300} src={imageRush} />
        <div>Set up your board by selecting a piece and dragging it on the board below.</div>
        <div>The red car can only be on the 3rd row!</div>
        <div>Note sometimes a solution is impossible if you set it up a certain way.</div>
        <button onClick={toggleModal}>Thanks!</button>
      </div>}
    </>
  )
}

export default App

import { useState } from "react";
import { hashPair, unhashPair } from "./Utilities/boardHelpers";
import { useMyContext } from './Context/ContextProvider';

export function GameBoard() {
  const { state, updatedSelectedBoardSpaces, updateBoard } = useMyContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [spacesFromDrag, setSpacesFromDrag] = useState(new Set<number>());

  // simple click event
  const handleCellClick = (cellIndex: number, rowIndex: number) => {

    // const newBoard = state.board;
    // newBoard[rowIndex][cellIndex] = state.selectedPiece;
    // updateBoard(newBoard)
  }

  // starting mouse down
  const handleMouseDown = (cellIndex: number, rowIndex: number) => {
    // check if board already has the piece
    setIsDragging(true);
    // const newBoard = state.board;
    // newBoard[rowIndex][cellIndex] = state.selectedPiece;
    // updateBoard(newBoard)
  }

  // dragging is true from a mouse down 
  // make sure drag isnt over 2 for two piece and 3 for three piece
  // check that the piece isnt already on the board
  const handleCellMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isDragging) {
      // if its a two piece, drag event cant exceed two, but must be more than one
      if (['A', 'B', 'C', 'D'].includes(state.selectedPiece) && spacesFromDrag.size < 2) {
        // if its A then add special constraint to have to be on row 3
        if (state.selectedPiece === 'A') {
          // if not row 3, ignore
          if (rowIndex !== 2) {
            return
          } else {
            setSpacesFromDrag(spacesFromDrag.add(hashPair(cellIndex, rowIndex)))
            // updatedSelectedBoardSpaces(hashPair(cellIndex, rowIndex));
          }
        } else {
          setSpacesFromDrag(spacesFromDrag.add(hashPair(cellIndex, rowIndex)))
          // updatedSelectedBoardSpaces(hashPair(cellIndex, rowIndex));
        }
      }
    }
  };

  // Reset the dragging state when the mouse button is released
  // iterate through spacesFromDrag event and update board from drag event
  const handleMouseUp = () => {
    setIsDragging(false);
    // if drag event was only 1 piece ie. a single click, do not update board
    if (spacesFromDrag.size < 2) {
      spacesFromDrag.clear();
      setSpacesFromDrag(spacesFromDrag)
    } else {
      const newBoard = state.board;
      spacesFromDrag.forEach((hashedPair: number) => {
        const unhashedPair = unhashPair(hashedPair);
        newBoard[unhashedPair.y][unhashedPair.x] = state.selectedPiece;
      });
      // update board and clear drag set
      updateBoard(newBoard)
      spacesFromDrag.clear();
      setSpacesFromDrag(spacesFromDrag)
    }
  };

  // update this to make use of new hashed board
  const BuildBoard = () => {
    return state.board.map((row: [], rowIndex: number) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        return <td onMouseDown={() => handleMouseDown(cellIndex, rowIndex)} onMouseUp={handleMouseUp} onMouseEnter={() => handleCellMouseEnter(rowIndex, cellIndex)} key={cellIndex + "," + rowIndex} onClick={() => handleCellClick(cellIndex, rowIndex)}><button>{td}</button></td>
      })}</tr>
    })
  }

  return (
    <table cellPadding={0}>
      <tbody>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
        </tr>
        {
          <BuildBoard />
        }
      </tbody>
    </table>)
}

// make sure there is at least one legal spot to place when clicking
// function checkSurroundingPiecesEmpty(pieceLength){

// }
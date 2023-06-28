import { useState } from "react";
import { boardAsStr, initialBoard } from "./Utilities/boardHelpers";
import { useMyContext } from './Context/ContextProvider';

export function GameBoard() {
  const { state, updatedSelectedBoardSpaces, updateBoard } = useMyContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);

  /// TODO use a set or hash map for tracking spaces
  // also wont matter because array will be small

  const handleCellClick = (cellIndex: number, rowIndex: number) => {
    console.log("selectedPiece", state.selectedPiece);
    console.log(cellIndex + ",", rowIndex);
    // if there is nothing there start the drag event
    // future: will need to check if its a two piece or a three piece
    // need to flush board spaces as well
    // 
    // if(board[cellIndex][rowIndex] === "_") {
    //   const newSelectedBoardSpaces = state.selectedBoardSpaces;
    //   newSelectedBoardSpaces.push([cellIndex, rowIndex]);
    //   updatedSelectedBoardSpaces(newSelectedBoardSpaces);
    // } else {
    //   const newSelectedBoardSpaces = state.selectedBoardSpaces.filter((entry:any) => { console.log(entry); return entry[0] === cellIndex && entry[1] === rowIndex});
    //   updatedSelectedBoardSpaces(newSelectedBoardSpaces);
    // }
    setIsDragging(true);

    const newBoard = state.board;
    newBoard[rowIndex][cellIndex] = state.selectedPiece;
    console.log("newB", boardAsStr(newBoard))
    updateBoard(newBoard)
  }

  const handleCellMouseEnter = (rowIndex: number, cellIndex: number) => {
    console.log("mouse entered")
    if (isDragging) {
      console.log("dragging")

      // Update selected cells when dragging over adjacent cells
      updatedSelectedBoardSpaces([...state.selectedBoardSpaces, [cellIndex, rowIndex]]);
    updateBoard(newBoard)

      // setSelectedCells([...selectedCells, { row: rowIndex, col: colIndex }]);
    }
  };

  const handleMouseUp = () => {
    // Reset the dragging state when the mouse button is released
    setIsDragging(false);
  };

  const BuildBoard = () => {
    return state.board.map((row: [], rowIndex: number) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        return <td onMouseEnter={() => handleCellMouseEnter(rowIndex, cellIndex)} key={cellIndex + "," + rowIndex} onClick={() => handleCellClick(cellIndex, rowIndex)}><button>{td}</button></td>
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

// click
// update board
// rerender table
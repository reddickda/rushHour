import { useState, useEffect } from "react";
import { hashPair, initialBoard, unhashPair } from "./Utilities/boardHelpers";
import { useMyContext } from './Context/ContextProvider';

export interface ITablePiece {
  key: number;
  piece: string;
}

export const TWOPIECES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
export const THREEPIECES = ['I', 'J', 'K']

export function GameBoard() {
  const { state, updateHashedBoard } = useMyContext();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [spacesFromDrag, setSpacesFromDrag] = useState(new Set<ITablePiece>());

  // handles on mouse up out of table as well
  useEffect(() => {
    document.body.addEventListener("mouseup", () => {
      handleMouseUp();
    })
  }, [])

  // starting mouse down
  const handleMouseDown = (cellIndex: number, rowIndex: number) => {
    // check if piece is red and initial seleciton isnt in row 3
    if (state.selectedPiece === 'A') {
      if (rowIndex !== 2) {
        return;
      }
    }
    setIsDragging(true);
    console.log("dragging...")
  }

  // dragging is true from a mouse down 
  // make sure drag isnt over 2 for two piece and 3 for three piece
  // check that the piece isnt already on the board
  const handleCellMouseEnter = (rowIndex: number, cellIndex: number) => {
    if (isDragging) {
      console.log("entered...")
      handlePiecePlacement(state, cellIndex, rowIndex, spacesFromDrag, setSpacesFromDrag)
    }
  };

  // Reset the dragging state when the mouse button is released
  // iterate through spacesFromDrag event and update board from drag event
  const handleMouseUp = () => {
    setIsDragging(false);

    // skip set if drag size is less than current selected piece
    if (TWOPIECES.includes(state.selectedPiece)) {
      if (spacesFromDrag.size < 2) {
        spacesFromDrag.clear();
        setSpacesFromDrag(spacesFromDrag)
        return;
      }
    } else {
      if (spacesFromDrag.size < 3) {
        spacesFromDrag.clear();
        setSpacesFromDrag(spacesFromDrag)
        return;
      }
    }
    updateHashedBoard(spacesFromDrag, state.boardAsAHashedSet)
    spacesFromDrag.clear();
    setSpacesFromDrag(spacesFromDrag)
  };

  // update this to make use of new hashed board
  const BuildBoard = () => {
    const initial2DBoard = initialBoard();
    state.boardAsAHashedSet.forEach((hashedPiece: ITablePiece) => {
      const unhashedPiece = unhashPair(hashedPiece.key);
      initial2DBoard[unhashedPiece.y][unhashedPiece.x] = hashedPiece.piece;
    })

    return initial2DBoard.map((row: [], rowIndex: number) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        return <td
          onMouseDown={() => handleMouseDown(cellIndex, rowIndex)}
          onMouseUp={handleMouseUp}
          onMouseEnter={() => handleCellMouseEnter(rowIndex, cellIndex)}
          key={cellIndex + "," + rowIndex}
        // onClick={() => handleCellClick(cellIndex, rowIndex)}
        ><button style={{ userSelect: 'none' }}>{td}</button></td>
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

function handleTwoPieceSelectionDrag(state: { selectedPiece: string; }, cellIndex: number, rowIndex: number, spacesFromDrag: { size: number; add: (arg0: ITablePiece) => any; }, setSpacesFromDrag: (arg0: () => any) => void) {
  if (TWOPIECES.includes(state.selectedPiece) && spacesFromDrag.size < 2) {
    // if its A then add special constraint to have to be on row 3
    if (state.selectedPiece === 'A') {
      // if not row 3, ignore
      // if initial cell is not in row 3, ignore
      if (rowIndex !== 2) {
        return
      } else {
        setSpacesFromDrag(spacesFromDrag.add({ key: hashPair(cellIndex, rowIndex), piece: state.selectedPiece }))
      }
    } else {
      console.log("adding two...")
      const toAdd: ITablePiece = { key: hashPair(cellIndex, rowIndex), piece: state.selectedPiece }
      setSpacesFromDrag(() => spacesFromDrag.add(toAdd))
    }
  }
}

function handleThreePieceSelectionDrag(state: { selectedPiece: string; }, cellIndex: number, rowIndex: number, spacesFromDrag: { size: number; add: (arg0: ITablePiece) => any; }, setSpacesFromDrag: (arg0: () => any) => void) {
  if (THREEPIECES.includes(state.selectedPiece) && spacesFromDrag.size < 3) {
    // if its A then add special constraint to have to be on row 3
    console.log("adding three...")
    // console.log(cellIndex, rowIndex)
    const toAdd: ITablePiece = { key: hashPair(cellIndex, rowIndex), piece: state.selectedPiece }
    console.log(toAdd)
    // spacesFromDrag.add(toAdd) // callbac
    setSpacesFromDrag(() => spacesFromDrag.add(toAdd))
    // updatedSelectedBoardSpaces(hashPair(cellIndex, rowIndex));
  }
}

function handlePiecePlacement(state: { selectedPiece: string; }, cellIndex: number, rowIndex: number, spacesFromDrag: { size: number; add: (arg0: ITablePiece) => any; }, setSpacesFromDrag: (arg0: () => any) => void) {
  // if two piece
  handleTwoPieceSelectionDrag(state, cellIndex, rowIndex, spacesFromDrag, setSpacesFromDrag);
  // if three piece
  handleThreePieceSelectionDrag(state, cellIndex, rowIndex, spacesFromDrag, setSpacesFromDrag);
}
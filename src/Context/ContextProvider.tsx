import { createContext, useContext, useState } from 'react';
import { initialBoard, initialBoardAsHashedSet } from '../Utilities/boardHelpers';
import { ITablePiece, THREEPIECES, TWOPIECES } from '../GameBoard';

const MyContext = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [state, setState] = useState({
    selectedPiece: 'A',
    selectedBoardSpaces: new Set(),
    board: initialBoard(),
    boardAsAHashedSet: initialBoardAsHashedSet()
  });

  const setSelectedPiece = (piece: string) => {
    setState(prevState => ({ ...prevState, selectedPiece: piece }));
  }

  const updateHashedBoard = (hashedPieces: Set<ITablePiece>, board: Set<ITablePiece>) => {
    // iterate through new set of dragged pieces
    // iterate through current board
    // if current board contains that piece set it to _ 
    // if key from new set = current board key, set piece

    // clear board of the piece
    hashedPieces.forEach((hashedPiece) => {
      const { key, piece } = hashedPiece;
      board.forEach((boardPiece) => {
        if (piece === boardPiece.piece) {
          boardPiece.piece = "_"
        }
      })
    })

    // set the new piece
    hashedPieces.forEach((hashedPiece) => {
      const { key, piece } = hashedPiece;
      board.forEach((boardPiece) => {
        if (key === boardPiece.key) {
          boardPiece.piece = piece
        }
      })
    })

    // handle collisions

    // count each letter on board, if a two piece is less than 2 or a 3 pieces less than 3, remove
    const pieceMap = getPieceCountsFromBoard(board);

    // if a 2 piece is less than 2 or if a 3 piece is less than 3 clear that piece
    const cleanedBoard = removeIncompletePiecesFromBoard(board, pieceMap);

    setState(prevState => (
      {
        ...prevState, boardAsAHashedSet: cleanedBoard
      }));
  }

  return (
    <MyContext.Provider value={{ state, setSelectedPiece, updateHashedBoard }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

function getPieceCountsFromBoard(board: Set<ITablePiece>) {
  const pieceMap = new Map<string, number>();
  pieceMap.set('A', 0);
  pieceMap.set('B', 0);
  pieceMap.set('C', 0);
  pieceMap.set('D', 0);
  pieceMap.set('E', 0);
  pieceMap.set('F', 0);
  pieceMap.set('G', 0);
  pieceMap.set('H', 0);
  pieceMap.set('I', 0);
  pieceMap.set('J', 0);
  pieceMap.set('K', 0);
  pieceMap.set('_', 0);

  // get counts for each piece
  board.forEach((boardPiece) => {
    let val = pieceMap.get(boardPiece.piece) || 0;
    val = val + 1;
    pieceMap.set(boardPiece.piece, val);
  })
  return pieceMap;
}

// goes through the counts of each piece and marks as to remove by adding to set
// go over entire board array and if the piece string is marked for remove, set to _
function removeIncompletePiecesFromBoard(board:Set<ITablePiece>, pieceMap:Map<string, number>) {
  const piecesToRemove: Set<string> = new Set<string>();

    pieceMap.forEach((value, key) => {
      console.log(key, value)
      if (TWOPIECES.includes(key) && value < 2 && value !== 0) {
        // remove key from board
        piecesToRemove.add(key);
        console.log("remove this from board", key)
      } else if (THREEPIECES.includes(key) && value < 3 && value !== 0) {
        console.log("remove this from board", key)
        piecesToRemove.add(key);
        // remove key from baord
      }
    })

    board.forEach((boardPiece) => {
      if(piecesToRemove.has(boardPiece.piece)) {
        boardPiece.piece = '_'
      }
    })

    return board;
}
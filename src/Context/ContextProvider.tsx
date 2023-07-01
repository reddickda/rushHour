import { createContext, useContext, useState } from 'react';
import { initialBoard, initialBoardAsHashedSet } from '../Utilities/boardHelpers';
import { ITablePiece } from '../GameBoard';

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
    setState(prevState => (
      {
        ...prevState, boardAsAHashedSet: board
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
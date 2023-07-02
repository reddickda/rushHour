import { createContext, useContext, useState } from 'react';
import { addNewPiece, initialBoard, initialBoardAsHashedSet } from '../Utilities/boardHelpers';
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

    const finalizedBoard = addNewPiece(hashedPieces, board);

    setState(prevState => (
      {
        ...prevState, boardAsAHashedSet: finalizedBoard
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

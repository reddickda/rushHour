import { createContext, useContext, useState } from 'react';
import { initialBoard, initialBoardAsHashedSet } from '../Utilities/boardHelpers';

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

  const updatedSelectedBoardSpaces = (newSpace: number, piece: string) => {
    setState(prevState => (
      {
        ...prevState, selectedBoardSpaces: prevState.selectedBoardSpaces.add(newSpace)
      }));
  }

  const updateBoard = (newBoard: any) => {
    setState(prevState => (
      {
        ...prevState, board: newBoard
      }));
  }

  const updateHashedBoard = () => {
    // send a set of hashed keys and associated string
    // check if that string exists anywhere in hashed board
    // delete where it does
    // set new spots 
  }

  return (
    <MyContext.Provider value={{ state, setSelectedPiece, updatedSelectedBoardSpaces, updateBoard }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}
import { createContext, useContext, useState } from 'react';
import { initialBoard } from '../Utilities/boardHelpers';

const MyContext = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [state, setState] = useState({
    selectedPiece: '',
    selectedBoardSpaces: [],
    board: initialBoard()
  });


  const setSelectedPiece = (piece: string) => {
    setState(prevState => ({ ...prevState, selectedPiece: piece }));
  }

  const updatedSelectedBoardSpaces = (newSelectedBoardSpaces: []) => {
    setState(prevState => (
      {
        ...prevState, selectedBoardSpaces: newSelectedBoardSpaces
      }));
  }

  const updateBoard = (newBoard: any) => {
    setState(prevState => (
      {
        ...prevState, board: newBoard
      }));
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
import { createContext, useContext, useState } from 'react';
import { BOARD_LEN, addNewPiece, convertFlatArrayTo2D, flattenBoard, initialBoard, initialBoardAsHashedSet } from '../Utilities/boardHelpers';
import { ITablePiece } from '../GameBoard';

const MyContext = createContext<any>(null);

export const ContextProvider = ({ children }: any) => {
  const [state, setState] = useState({
    selectedPiece: 'A',
    selectedBoardSpaces: new Set(),
    board: initialBoard(),
    boardAsAHashedSet: initialBoardAsHashedSet(),
    lettersOnBoard: new Set()
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

  const removePieceFromBoard = (x: number, y: number, board: any) => {
    // find what letter is at x and y and remove all occurances of it

    const boardAsArray = convertFlatArrayTo2D(board);

    const letter = boardAsArray[x][y];

    for (let i = 0; i < BOARD_LEN; i++) {
      for (let j = 0; j < BOARD_LEN; j++) {
        if (boardAsArray[i][j].toUpperCase() === letter.toUpperCase()) {
          boardAsArray[i][j] = '_';
        }
      }
    }

    const flattenedBoard = flattenBoard(boardAsArray);

    setState(prevState => (
      {
        ...prevState, boardAsAHashedSet: flattenedBoard
      }));
  }

  const clearBoard = () => {
    setState(prevState => (
      {
        ...prevState, boardAsAHashedSet: initialBoardAsHashedSet()
      }));
  }

  const addLetterOnBoard = (letter:string) => {
    
    setState(prevState => (
      {
        ...prevState, lettersOnBoard: prevState.lettersOnBoard.add(letter)
      }));
  }

  const removeLetterFromBoard = (letter:string) => {
    
    const prevLetters = state.lettersOnBoard;
    prevLetters.delete(letter)
    setState(prevState => (
      {
        ...prevState, lettersOnBoard: prevLetters
      }));
  }

  return (
    <MyContext.Provider value={{ state, setSelectedPiece, updateHashedBoard, clearBoard, removePieceFromBoard, addLetterOnBoard, removeLetterFromBoard }}>
      {children}
    </MyContext.Provider>
  );
}

export function useMyContext() {
  return useContext(MyContext);
}

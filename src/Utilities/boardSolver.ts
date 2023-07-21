import { THREEPIECES, TWOPIECES } from "../GameBoard";
import { BOARD_LEN, boardAsStr, convertFlatArrayTo2D, copyBoard } from "./boardHelpers";

let k = 0;

// TODO: double check logic and add traceback
export function bfs(start_state: any) {
  const boardAs2D = convertFlatArrayTo2D(start_state);
  const queue: any = [];
  const visitedSet = new Set();
  // add start state to queue and set
  queue.push([{board: boardAs2D, letter: ''}])
  visitedSet.add(boardAsStr(boardAs2D))

  while (queue.length !== 0) {
    // removes first
    const pathToCheck = queue.shift();
    const lastIndex = pathToCheck.length - 1;
    const stringBoard = boardAsStr(pathToCheck[lastIndex].board);
    visitedSet.add(stringBoard)



    // check if is solved
    if (isSolved(pathToCheck[lastIndex].board)) {
      // will need to implement paths/moves but just send back solved board for now
      return pathToCheck;
    }
    // if not add next states to queueue
    // make sure passin visitedSet here and adding to it is the same object
    // next states returns array 
    // iterate through array returned and append to queue
    const nextStates = getNextStates(pathToCheck[lastIndex].board, visitedSet);

    // [{ board: [], letter: a }]
    nextStates.map((nextState:any) => {
      if(!visitedSet.has(boardAsStr(nextState.board))){

        visitedSet.add(boardAsStr(nextState.board));
        queue.push([...pathToCheck, nextState])
      }
    })

    if(queue.length === 0) {
      alert("not solvable")
    }
    k=k+1
  }
}

function isSolved(board: any) {
  let aPieceFound = false;
  // Find any obstacles between the red truck and the right edge.
  for (let i = 0; i < BOARD_LEN; i++) {
    if (!aPieceFound && board[2][i] === 'A') {
      aPieceFound = true;
    }
    if (aPieceFound && board[2][i] !== '_' && board[2][i] !== 'A') {
      return false
    }
  }

  if (!aPieceFound) {
    return false;
  }

  alert('We solved it!')
  return true;
}

export function getNextStates(board: any, seenStates: any) {
  const nextStates:any = [];
  const seenLetters = new Set<string>();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      // if not a blank
      if (board[i][j] !== "_") {
        // if not already moved ie. states with this piece moved added
        // store as uppercase
        if (!seenLetters.has(board[i][j].toUpperCase())) {
          // if its uppercase
          if (board[i][j] === board[i][j].toUpperCase()) {
            // add to seen letters
            seenLetters.add(board[i][j].toUpperCase());
            horizontalStates(board, board[i][j].toUpperCase(), board[i], i, seenStates, nextStates)
            // generate all left and right cases
            // check if in seenstates
            // if not 
            // check if solved puzzle

            // add each to queue if not
          } else { // lowercase
            // add to seen letters

            seenLetters.add(board[i][j].toUpperCase());
            verticalStates(board, board[i][j].toLowerCase(), j, seenStates, nextStates)
            // generate all up and down cases
            // check if in seenstates
            // check if solved puzzle

            // add each to queue if not
          }
        }
      }
    }
  }
  return nextStates;
}

function horizontalStates(board: any, letter: any, row: any, rowIndex: number, seenStates: any, nextStates:any) {
  // count empty spaces to right and left
  // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue
  let leftMoves = 0;
  let rightMoves = 0;
  let leftSide = true;
  let blockedRight = false;
  for (let i = 0; i < BOARD_LEN; i++) {
    if (leftSide && row[i] === "_") {
      leftMoves = leftMoves + 1;
    } else if (leftSide && row[i] !== "_" && row[i] !== letter) {
      leftMoves = 0;
    } else if (leftSide && row[i] === letter) {
      leftSide = false;
    } else if (!leftSide && row[i] === "_" && !blockedRight) {
      rightMoves = rightMoves + 1;
    } else if (!leftSide && row[i] !== "_" && row[i] !== letter) {
      blockedRight = true;
    }
  }

  // now you have left and right amounts
  // loop left times
  // make a board where row where piece is shifted left piecestart - i
  // do bounds check
  // check board as str in seen boards
  // check if solved
  // add board to queue

  const firstIndex = row.indexOf(letter);
  const lastIndex = row.lastIndexOf(letter);

  for (let i = 0; i < leftMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);

    if (THREEPIECES.includes(letter)) {
      const secondIndex = lastIndex - 1;
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][secondIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex - i - 1] = letter;
        boardToAdd[rowIndex][secondIndex - i - 1] = letter;
        boardToAdd[rowIndex][lastIndex - i - 1] = letter;
      }
    } else if (TWOPIECES.includes(letter)) {
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]

        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex - i - 1] = letter;
        boardToAdd[rowIndex][lastIndex - i - 1] = letter;
      }
    }
    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // add to queue
      nextStates.push({board: boardToAdd, letter: letter})
    }
  }

  /// TODO right moves
  for (let i = 0; i < rightMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);
    // do the shift here
    if (THREEPIECES.includes(letter)) {
      const secondIndex = lastIndex - 1;
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][secondIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex + i + 1] = letter;
        boardToAdd[rowIndex][secondIndex + i + 1] = letter;
        boardToAdd[rowIndex][lastIndex + i + 1] = letter;
      }
    } else if (TWOPIECES.includes(letter)) {
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex + i + 1] = letter;
        boardToAdd[rowIndex][lastIndex + i + 1] = letter;
      }
    }

    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // add to queue
      nextStates.push({board: boardToAdd, letter: letter})
    }
  }
}

function verticalStates(board: any, letter: any, columnIndex: number, seenStates: any, nextStates:any) {
  // count empty spaces up and down
  // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue

  let upMoves = 0;
  let downMoves = 0;
  let above = true;
  let blockedDown = false;

  const columnAsArray = [];
  for (let i = 0; i < BOARD_LEN; i++) {
    columnAsArray.push(board[i][columnIndex]);
  }
  for (let i = 0; i < BOARD_LEN; i++) {
    if(above && i === 0 && board[i][columnIndex] === letter){
      above = false;
    }
    else if (above && board[i][columnIndex] === "_") {
      upMoves = upMoves + 1;
    } else if (above && board[i][columnIndex] !== "_" && board[i][columnIndex] !== letter) {
      upMoves = 0;
    } else if (above && board[i][columnIndex] === letter) {
      above = false;
    } else if (!above && board[i][columnIndex] === "_" && !blockedDown) {
      downMoves = downMoves + 1;
    } else if(!above && board[i][columnIndex] !== letter && board[i][columnIndex] !== "_") {
      blockedDown = true;
    }
    else {
      downMoves = 0;
    }
  }

  const firstIndex = columnAsArray.indexOf(letter);
  const lastIndex = columnAsArray.lastIndexOf(letter);

  /// Up moves
  for (let i = 0; i < upMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);
    // do the shift here
    if (THREEPIECES.includes(letter.toUpperCase())) {
      const secondIndex = lastIndex - 1;
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[secondIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex - i - 1][columnIndex] = letter;
        boardToAdd[secondIndex - i - 1][columnIndex] = letter;
        boardToAdd[lastIndex - i - 1][columnIndex] = letter;
      }
    } else if (TWOPIECES.includes(letter.toUpperCase())) {
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]

        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex - i - 1][columnIndex] = letter;
        boardToAdd[lastIndex - i - 1][columnIndex] = letter;
      }
    }

    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      nextStates.push({board: boardToAdd, letter: letter})
    }
  }

  // down movesd
  for (let i = 0; i < downMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);
    // do the shift here
    if (THREEPIECES.includes(letter.toUpperCase())) {
      const secondIndex = lastIndex - 1;
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[secondIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex + i + 1][columnIndex] = letter;
        boardToAdd[secondIndex + i + 1][columnIndex] = letter;
        boardToAdd[lastIndex + i + 1][columnIndex] = letter;
      }
    } else if (TWOPIECES.includes(letter.toUpperCase())) {
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]

        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex + i + 1][columnIndex] = letter;
        boardToAdd[lastIndex + i + 1][columnIndex] = letter;
      }
    }

    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // add to queue
      nextStates.push({board: boardToAdd, letter: letter})
    }
  }
}
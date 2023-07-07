import { THREEPIECES, TWOPIECES } from "../GameBoard";
import { BOARD_LEN, boardAsStr, convertFlatArrayTo2D, copyBoard } from "./boardHelpers";


// TODO: double check logic and add traceback
export function bfs(start_state: any) {
  console.log("solving...")
  const boardAs2D = convertFlatArrayTo2D(start_state);
  const queue: any = [];
  const visitedSet = new Set();
  // add start state to queue and set
  queue.push([boardAs2D])
  console.log("first queue", queue.length)
  console.log("first queue", queue[0][0])
  visitedSet.add(boardAsStr(boardAs2D))
  console.log({ boardAs2D })
  console.log({ visitedSet })

  // mark as visisted (set), store as stringified?
  while (queue.length !== 0) {
    // pop
    console.log("in while loop...")
    // removes first
    const pathToCheck = queue.shift();
    const lastIndex = pathToCheck.length - 1;
    console.log(pathToCheck[lastIndex])
    const stringBoard = boardAsStr(pathToCheck[lastIndex]);
    console.log({ stringBoard })
    visitedSet.add(stringBoard)

    console.log("visitedinWhile", visitedSet)
    // check if is solved
    if (isSolved(pathToCheck[lastIndex])) {
      // will need to implement paths/moves but just send back solved board for now
      return pathToCheck;
    }
    // if not add next states to queueue
    // make sure passin visitedSet here and adding to it is the same object
    // next states returns array 
    // iterate through array returned and append to queue
    const nextStates = getNextStates(pathToCheck[lastIndex], visitedSet, queue);

    nextStates.map((nextState:any) => {
      console.log("inmap", boardAsStr(nextState))
      console.log("has", visitedSet.has(boardAsStr(nextState)))
      if(!visitedSet.has(boardAsStr(nextState))){

        visitedSet.add(boardAsStr(nextState));
        pathToCheck.push(nextState);
        queue.push(pathToCheck)
      }
    })

    // for(let i = 0; i < queue.length; i++) {
    //   console.log(queue[i])
    // }

    console.log("nextqueue", queue.length)
  }
}

function isSolved(board: any) {
  let aPieceFound = false;
  // Find any obstacles between the red truck and the right edge.
  console.log("checking solve...")
  for (let i = 0; i < BOARD_LEN; i++) {
    if (!aPieceFound && board[2][i] === 'A') {
      aPieceFound = true;
    }
    if (aPieceFound && board[2][i] !== '_' && board[2][i] !== 'A') {
      console.log("not solved...")
      return false
    }
  }

  if (!aPieceFound) {
    return false;
  }

  console.log(boardAsStr(board))
  console.log("solved!")
  alert("Solved!")
  return true;
}


// TODO: this overwrote a letter to solve
export function getNextStates(board: any, seenStates: any, queue: any) {
  const nextStates:any = [];
  const seenLetters = new Set<string>();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      // if not a blank
      if (board[i][j] !== "_") {
        // if not already moved ie. states with this piece moved added
        // store as uppercase
        if (!seenLetters.has(board[i][j].toUpperCase())) {
          console.log("seen", board[i][j])
          // if its uppercase
          if (board[i][j] === board[i][j].toUpperCase()) {
            // add to seen letters
            seenLetters.add(board[i][j].toUpperCase());
            horizontalStates(board, board[i][j].toUpperCase(), board[i], i, seenStates, queue, nextStates)
            // generate all left and right cases
            // check if in seenstates
            // if not 
            // check if solved puzzle

            // add each to queue if not
          } else { // lowercase
            // add to seen letters

            seenLetters.add(board[i][j].toUpperCase());
            verticalStates(board, board[i][j].toLowerCase(), j, seenStates, queue, nextStates)
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

  // go through entire board position by position
  // find a letter, add it to a set as seen so we dont try to generate states again
  // if lowercase then its vertical and only check up and down moves
  // if uppercase then its horizontal and only check left and right moves
  // generate all new states, checking state by state if its solved, add to queue moving that piece wherever it can
  // continue on until next letter seen

  // if(!seenStates.has(boardAsStr(next_board))){
  //   seenStates.add(boardAsStr(next_board));
  // }
  // make sure board isnt in set?
  // find all possible states and add to queue
  // ie. a new board for each moveable piece moving once
  // will need function for making sure "next states" are in bound
  // might have that logic already in find diagonal neighbor
}

function horizontalStates(board: any, letter: any, row: any, rowIndex: number, seenStates: any, queue: any, nextStates:any) {
  console.log("horizontal...")
  // count empty spaces to right and left
  // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue

  // TODO: Need the indices in row where our letter start is
  // loop through row
  // every space increment "left" by 1
  // if you run into another letter that isnt the correct letter reset to 0
  // when you run into correct letter you set "left" to false
  // incrememnt every space until you hit another letter
  let leftMoves = 0;
  let rightMoves = 0;
  let leftSide = true;
  for (let i = 0; i < BOARD_LEN; i++) {
    // console.log(leftSide, i, row[i])
    if (leftSide && row[i] === "_") {
      // console.log("left move + 1")
      leftMoves = leftMoves + 1;
    } else if (leftSide && row[i] !== "_" && row[i] !== letter) {
      // console.log("left move 0")
      leftMoves = 0;
    } else if (leftSide && row[i] === letter) {
      // console.log("left side false")

      leftSide = false;
    } else if (!leftSide && row[i] === "_") {
      // console.log("right move + 1")

      rightMoves = rightMoves + 1;
    } else if (!leftSide && row[i] !== "_" && row[i] !== letter) {
      // console.log("other")
      rightMoves = 0;

    }
  }

  console.log({ leftMoves, rightMoves })


  // now you have left and right amounts
  // loop left times
  // make a board where row where piece is shifted left piecestart - i
  // do bounds check
  // check board as str in seen boards
  // check if solved
  // add board to queue

  const firstIndex = row.indexOf(letter);
  const lastIndex = row.lastIndexOf(letter);

  console.log({ firstIndex, lastIndex })

  for (let i = 0; i < leftMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);

    if (THREEPIECES.includes(letter)) {
      const secondIndex = lastIndex - 1;
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        console.log("three piece moving left")
        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][secondIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex - i - 1] = letter;
        boardToAdd[rowIndex][secondIndex - i - 1] = letter;
        boardToAdd[rowIndex][lastIndex - i - 1] = letter;
      }
    } else if (TWOPIECES.includes(letter)) {
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        console.log("two piece moving left")

        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex - i - 1] = letter;
        boardToAdd[rowIndex][lastIndex - i - 1] = letter;
      }
    }

    console.log("before add", boardAsStr(boardToAdd))
    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // if(isSolved())
      // add to queue
      console.log("adding left move board")
      // queue.push(boardToAdd)
      nextStates.push(boardToAdd)
      // seenStates.add(boardAsStr(boardToAdd));
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
        console.log("three piece moving right")

        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][secondIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex + i + 1] = letter;
        boardToAdd[rowIndex][secondIndex + i + 1] = letter;
        boardToAdd[rowIndex][lastIndex + i + 1] = letter;
      }
    } else if (TWOPIECES.includes(letter)) {
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        console.log("two piece moving right")

        boardToAdd[rowIndex][firstIndex] = "_";
        boardToAdd[rowIndex][lastIndex] = "_";

        boardToAdd[rowIndex][firstIndex + i + 1] = letter;
        boardToAdd[rowIndex][lastIndex + i + 1] = letter;
      }
    }

    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // if(isSolved())
      // add to queue

      // queue.push(boardToAdd)
      nextStates.push(boardToAdd)
      // seenStates.add(boardAsStr(boardToAdd));
    }
  }
}



// loop right times
// make a board where row where piece is shifted right piecestart + i
// do bounds check
// check board as str in seen boards
// check if solved
// add board to queue

// potential cases to design an algorithm for this
// [_,_,A,A,_,_]

// [_,B,A,A,_,_]

// [B,_,A,A,K,_]

// [B,_,A,A,_,K]

// [_,B,A,A,K,_]

// [A,A,B,_,_,_]

// let leftSpaces = 0;
// let rightSpaces = 0;
// let leftSide = true;
// for(let i = 0; i < BOARD_LEN; i++) {
//   if(board[row][i] === letter){
//     leftSide = false;
//   }
//   else if(leftSide && board[row][i] === "_"){
//     leftSpaces = leftSpaces + 1;
//   } else if(!leftSide && board[row][i] === "_")
// }



function verticalStates(board: any, letter: any, columnIndex: number, seenStates: any, queue: any, nextStates:any) {
  // count empty spaces up and down
  // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue
  console.log("vertical")

  let upMoves = 0;
  let downMoves = 0;
  let above = true;

  const columnAsArray = [];
  for (let i = 0; i < BOARD_LEN; i++) {
    columnAsArray.push(board[i][columnIndex]);
    if (above && board[i][columnIndex] === "_") {
      upMoves = upMoves + 1;
      // console.log("upmove + 1")
    } else if (above && board[i][columnIndex] !== "_" && board[i][columnIndex] !== letter) {
      // console.log("upmove 0", board[i][columnIndex], letter)
      upMoves = 0;
    } else if (above && board[i][columnIndex] === letter) {
      above = false;
    } else if (!above && board[i][columnIndex] === "_") {
      downMoves = downMoves + 1;
    } else {
      downMoves = 0;
    }
  }

  console.log({ upMoves, downMoves })

  const firstIndex = columnAsArray.indexOf(letter);
  const lastIndex = columnAsArray.lastIndexOf(letter);

  console.log({ firstIndex, lastIndex })

  /// Up moves
  for (let i = 0; i < upMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);
    // do the shift here
    if (THREEPIECES.includes(letter.toUpperCase())) {
      const secondIndex = lastIndex - 1;
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        console.log("three piece moving up")
        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[secondIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex - i - 1][columnIndex] = letter;
        boardToAdd[secondIndex - i - 1][columnIndex] = letter;
        boardToAdd[lastIndex - i - 1][columnIndex] = letter;
      }
    } else if (TWOPIECES.includes(letter.toUpperCase())) {
      if (firstIndex - i - 1 >= 0) { // [_,K,K,K,_,_]
        console.log("two piece moving up")

        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex - i - 1][columnIndex] = letter;
        boardToAdd[lastIndex - i - 1][columnIndex] = letter;
      }
    }
    console.log("before add up", boardAsStr(boardToAdd))

    // check new board in seen
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // if(isSolved())
      // add to queue

      // queue.push(boardToAdd)
      nextStates.push(boardToAdd)

      // seenStates.add(boardAsStr(boardToAdd));
    }
  }

  // todo DOWN moves
  for (let i = 0; i < downMoves; i++) {
    // build new board
    const boardToAdd = copyBoard(board);
    // do the shift here
    if (THREEPIECES.includes(letter.toUpperCase())) {
      const secondIndex = lastIndex - 1;
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        console.log("three piece moving down")
        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[secondIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex + i + 1][columnIndex] = letter;
        boardToAdd[secondIndex + i + 1][columnIndex] = letter;
        boardToAdd[lastIndex + i + 1][columnIndex] = letter;
      }
    } else if (TWOPIECES.includes(letter.toUpperCase())) {
      if (firstIndex + i + 1 <= BOARD_LEN) { // [_,K,K,K,_,_]
        console.log("two piece moving down")

        boardToAdd[firstIndex][columnIndex] = "_";
        boardToAdd[lastIndex][columnIndex] = "_";

        boardToAdd[firstIndex + i + 1][columnIndex] = letter;
        boardToAdd[lastIndex + i + 1][columnIndex] = letter;
      }
    }
    console.log("before add down", boardAsStr(boardToAdd))

    // check new board in seen
    // console.log(seenStates.has(boardAsStr(boardToAdd)))
    if (!seenStates.has(boardAsStr(boardToAdd))) {
      // check if solved
      // if(isSolved())
      // add to queue
      // queue.push(boardToAdd)
      nextStates.push(boardToAdd)

      // seenStates.add(boardAsStr(boardToAdd));
    }
  }

}

//1. Initialize a queue containing just the start state.
//2. Dequeue the next state from the front of the queue.
//3. Check if that’s the goal and return True if so.
//4. Otherwise, get all possible next states and enqueue them at the back of the queue.
//5. If the queue is exhausted, all states were examined and the goal was never reached, so return False.
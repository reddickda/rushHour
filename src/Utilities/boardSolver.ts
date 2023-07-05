import { BOARD_LEN, boardAsStr, convertFlatArrayTo2D } from "./boardHelpers";

export function bfs(start_state: any){
  console.log("solving...")
  const boardAs2D = convertFlatArrayTo2D(start_state);
  const queue = [];
  const visitedSet = new Set<string>();
  // add start state to queue and set
  queue.push(boardAs2D)
  visitedSet.add(boardAsStr(boardAs2D))
  console.log({boardAs2D})
  console.log({visitedSet})

  // mark as visisted (set), store as stringified?
  while(queue.length !== 0) {
    // pop
    console.log("in while loop...")
    // removes first
    const boardToCheck = queue.shift();
    console.log({boardToCheck})
    visitedSet.add(boardAsStr(boardToCheck))

    // check if is solved
    if(isSolved(boardToCheck)){
      // will need to implement paths/moves but just send back solved board for now
      return boardToCheck;
    }
    // if not add next states to queueue
    // make sure passin visitedSet here and adding to it is the same object
    const nextStates = getNextStates(boardToCheck, visitedSet, queue);
  }
}

function isSolved(board:any){
  let aPieceFound = false;
  // Find any obstacles between the red truck and the right edge.
  console.log("checking solve...")
  for(let i = 0; i < BOARD_LEN; i++) {
    if(!aPieceFound && board[2][i] === 'A'){
      aPieceFound = true;
    }
    if(aPieceFound && board[2][i] !== '_' && board[2][i] !== 'A'){
      console.log("not solved...")
      return false
    }
  }

  if(!aPieceFound) {
    return false;
  }
  console.log("solved!")
  return true;
}

// move one piece, check  add to set

function getNextStates(board: any, seenStates: Set<string>, queue: any){
  const seenLetters = new Set<string>();
  for(let i = 0; i < BOARD_LEN;i++) {
    for (let j = 0; j < BOARD_LEN;j++) {
      // if not a blank
      if(board[i][j] !== "_") {
        // if not already moved ie. states with this piece moved added
        // store as uppercase
        if(!seenLetters.has(board[i][j].toUpperCase())) {
          // if its uppercase
          if(board[i][j] === board[i][j].toUpperCase()) {
            // add to seen letters
            seenLetters.add(board[i][j].toUpperCase());
            horizontalStates(board, board[i][j].toUpperCase(), i, seenStates, queue)
            // generate all left and right cases
            // check if in seenstates
            // if not 
              // check if solved puzzle

              // add each to queue if not
          }else { // lowercase
            // add to seen letters
            seenLetters.add(board[i][j].toUpperCase());
            // generate all up and down cases
            // check if in seenstates
              // check if solved puzzle

              // add each to queue if not
          }
        }
      }
    }
  }
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

function horizontalStates(board, letter, row, seenStates, queue) {
  // count empty spaces to right and left
  // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue
  
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

}

function verticalStates(board, letter, seenStates, queue) {
  // count empty spaces up and down
   // loop and generate the same board but with the piece shifted accordingly every time
  // every loop and generate check if solved and add to queue
}

//1. Initialize a queue containing just the start state.
//2. Dequeue the next state from the front of the queue.
//3. Check if that’s the goal and return True if so.
//4. Otherwise, get all possible next states and enqueue them at the back of the queue.
//5. If the queue is exhausted, all states were examined and the goal was never reached, so return False.
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
    const boardToCheck = queue.pop();
    console.log({boardToCheck})
    visitedSet.add(boardAsStr(boardToCheck))

    // check if is solved
    if(isSolved(boardToCheck)){
      // will need to implement paths/moves but just send back solved board for now
      return boardToCheck;
    }
    // if not add next states to queueue
    // make sure passin visitedSet here and adding to it is the same object
    const nextStates = getNextStates(boardToCheck, visitedSet);
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

  console.log("solved!")
  return true;
}

// move one piece, check  add to set

function getNextStates(board: any, seenStates: Set<string>){


  // if(!seenStates.has(boardAsStr(next_board))){
  //   seenStates.add(boardAsStr(next_board));
  // }
  // make sure board isnt in set?
  // find all possible states and add to queue
  // ie. a new board for each moveable piece moving once
  // will need function for making sure "next states" are in bound
  // might have that logic already in find diagonal neighbor
}

//1. Initialize a queue containing just the start state.
//2. Dequeue the next state from the front of the queue.
//3. Check if that’s the goal and return True if so.
//4. Otherwise, get all possible next states and enqueue them at the back of the queue.
//5. If the queue is exhausted, all states were examined and the goal was never reached, so return False.
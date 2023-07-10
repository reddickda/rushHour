import exp from "constants";
import { copyBoard, initialBoard, boardAsStr, convertFlatArrayTo2D, flattenBoard } from "../Utilities/boardHelpers"
import { assert, expect, test } from 'vitest'
import { getNextStates} from "../Utilities/boardSolver"

// test('test copy board', () => {
//   const board = initialBoard();
//   const copied = copyBoard(board);

//   assert.deepEqual(board, copied)

//   copied[0,0] = "A";
//   // expect(board).(copied);
//   assert.notDeepEqual(board, copied)
// })

// test('test sets board', () => {
//   const boardSet = new Set();

//   const board = initialBoard();
//   boardSet.add(boardAsStr(board));

//   expect(boardSet.has(boardAsStr(board))).toBe(true)

//   expect(boardSet.size).toBe(1)

//   const copied = copyBoard(board);

//   boardSet.add(boardAsStr(copied));

//   expect(boardSet.size).toBe(1)

//   const copiedTwo = copyBoard(copied);

//   copiedTwo[0][0] = "A"
//   boardSet.add(boardAsStr(copiedTwo));

//   expect(boardSet.size).toBe(2)

// })

// test('test queue', () => {
//   const boardSet = new Set();
//   const queue = [];

//   const board = initialBoard();
//   board[2][0] = "A";
//   board[2][1] = "A";

//   board[2][5] = "k";
//   board[3][5] = "k";
//   board[4][5] = "k";

//   board[2][4] = "j";
//   board[3][4] = "j";
//   board[4][4] = "j";

//   board[2][3] = "e";
//   board[3][3] = "e";

//   boardSet.add(boardAsStr(board));
//   queue.push([board]);


//   expect(queue.length).toBe(1)

//   const states = getNextStates(board, boardSet, queue)
//   console.log(states)

//   queue[0].map((b) => {
//     console.log(boardAsStr(b))
//   })

//   // expect(queue.length).toBe(4)

//   // expect(queue.pop()).toStrictEqual(board)
// })

test('test simple', () => {
  const boardSet = new Set();
  const queue = [];

  const board = initialBoard();
  board[2][1] = "A";
  board[2][2] = "A";

  board[2][5] = "k";
  board[3][5] = "k";
  board[4][5] = "k";

  console.log(boardAsStr(board))

  boardSet.add(boardAsStr(board));
  queue.push([board]);


  expect(queue.length).toBe(1)

  const states = getNextStates(board, boardSet, queue)
  console.log(states)

  queue[0].map((b) => {
    console.log(boardAsStr(b))
  })

  // expect(queue.length).toBe(4)

  // expect(queue.pop()).toStrictEqual(board)
})

const BOARD_LEN = 6;

export const initialBoard = () => {
  const initialBoard = makeSquareBoard();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      initialBoard[i][j] = '_';
    }
  }
  return initialBoard;
}

const makeSquareBoard = () => {
  const arr = new Array(BOARD_LEN)
  for (let i = 0; i < BOARD_LEN; i++)
    arr[i] = new Array(BOARD_LEN)
  return arr
}

export const boardAsStr = (board:any) => {
  let str = '';
  for(let i = 0; i < BOARD_LEN; i++){
    str += '\n';
    for(let j = 0; j < BOARD_LEN; j++) {
      str += board[i][j] + " "
    }
  }

  return str;
}

//   [
//     ['_', '_', '_', 'B', 'C', 'C'],
//     ['_', '_', '_', 'B', '_', '_'],
//     ['_', 'A', 'A', 'B', '_', '_'],
//     ['E', 'D', 'D', 'D', '_', '_'],
//     ['E', '_', '_', '_', '_', '_'],
//     ['F', 'F', 'G', 'G', '_', '_'],
//   ]

// <thead>
//    <tbody>
//      <tr>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//       </tr>
//       <tr>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//            <td>_</td>
//       </tr>
//       ....
//      </tbody>
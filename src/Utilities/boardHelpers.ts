export const initialBoard = () => {
  const initialBoard = makeSquareBoard(6);
  const boardLen = 6;
  for (let i = 0; i < boardLen; i++) {
    for (let j = 0; j < boardLen; j++) {
      initialBoard[i][j] = '_';
    }
  }
  return initialBoard;
}

const makeSquareBoard = (boardLen: number) => {
  const arr = new Array(boardLen)
  for (let i = 0; i < boardLen; i++)
    arr[i] = new Array(boardLen)
  return arr
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
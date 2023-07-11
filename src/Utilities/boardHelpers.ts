import { ITablePiece, THREEPIECES, TWOPIECES } from "../GameBoard";

export const BOARD_LEN = 6;

export const initialBoard = () => {
  const initialBoard = makeSquareBoard();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      initialBoard[i][j] = '_';
    }
  }
  return initialBoard;
}

export const initialBoardAsHashedSet = () => {
  const initialBoardAsSet = new Set<ITablePiece>();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      initialBoardAsSet.add({ key: hashPair(j, i), piece: '_' });
    }
  }
  return initialBoardAsSet;
}

const makeSquareBoard = () => {
  const arr = new Array(BOARD_LEN)
  for (let i = 0; i < BOARD_LEN; i++)
    arr[i] = new Array(BOARD_LEN)
  return arr
}

export const boardAsStr = (board: any) => {
  let str = '';
  for (let i = 0; i < BOARD_LEN; i++) {
    str += '\n';
    for (let j = 0; j < BOARD_LEN; j++) {
      str += board[i][j] + " "
    }
  }

  return str;
}

export function hashPair(x: number, y: number): number {
  return x * 6 + y;
}

export function unhashPair(hashValue: number): { x: number, y: number } {
  const x = Math.floor(hashValue / 6);
  const y = hashValue % 6;
  return { x, y };
}

export function copyBoard(board:any) {
  return board.map((arr:any) => arr.slice());
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

function getPieceCountsFromBoard(board: Set<ITablePiece>) {
  const pieceMap = new Map<string, number>();
  pieceMap.set('A', 0);
  pieceMap.set('B', 0);
  pieceMap.set('C', 0);
  pieceMap.set('D', 0);
  pieceMap.set('E', 0);
  pieceMap.set('F', 0);
  pieceMap.set('G', 0);
  pieceMap.set('H', 0);
  pieceMap.set('I', 0);
  pieceMap.set('J', 0);
  pieceMap.set('K', 0);
  pieceMap.set('_', 0);

  // get counts for each piece
  board.forEach((boardPiece) => {
    let val = pieceMap.get(boardPiece.piece) || 0;
    val = val + 1;
    pieceMap.set(boardPiece.piece, val);
  })
  return pieceMap;
}

// goes through the counts of each piece and marks as to remove by adding to set
// go over entire board array and if the piece string is marked for remove, set to _
function removeIncompletePiecesFromBoard(board: Set<ITablePiece>, pieceMap: Map<string, number>) {
  const piecesToRemove: Set<string> = new Set<string>();

  pieceMap.forEach((value, key) => {
    if (TWOPIECES.includes(key.toUpperCase()) && value < 2 && value !== 0) {
      piecesToRemove.add(key.toUpperCase());
    } else if (THREEPIECES.includes(key.toUpperCase()) && value < 3 && value !== 0) {
      piecesToRemove.add(key.toUpperCase());
    }
  })

  board.forEach((boardPiece) => {
    if (piecesToRemove.has(boardPiece.piece.toUpperCase())) {
      boardPiece.piece = '_'
    }
  })

  return board;
}

// break board back into 2d
export function convertFlatArrayTo2D(hashedBoard: Set<ITablePiece>) {
  const twoDimensionalBoard = initialBoard();

  hashedBoard.forEach((hashedPiece: ITablePiece) => {
    const unhashedCoordinates = unhashPair(hashedPiece.key);
    twoDimensionalBoard[unhashedCoordinates.y][unhashedCoordinates.x] = hashedPiece.piece
  })

  return twoDimensionalBoard;
}

// check for vertical pieces using math
// set verticals to lowercase
// go through board, keep track of seen pieces with set
function checkIfPiecesVertical(board: any) {
  const seenPieces = new Set();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      if (board[i][j] !== "_") {
        if (!seenPieces.has(board[i][j])) {
          seenPieces.add(board[i][j]);
          if (board[i + 1] && board[i + 1][j] === board[i][j])
            // vertical!!!
            // check if 3 piece
            if (board[i + 2] && board[i + 2][j] === board[i][j]) {
              board[i][j] = board[i][j].toLowerCase();
              board[i + 1][j] = board[i][j].toLowerCase();
              board[i + 2][j] = board[i][j].toLowerCase();
            }
            else {
              board[i][j] = board[i][j].toLowerCase();
              board[i + 1][j] = board[i][j].toLowerCase();
            }
        }
      }
    }
  }
  // check set for found piece
  // find first appearance of a piece, check if it has a duplicate to the right or below
  // to the right - horizontal, leave it
  // below - vertical, make both lowercase
  // add to set

  return board;
}


export function flattenBoard(board: any) {
  const hashedBoard = new Set<ITablePiece>();
  for (let i = 0; i < BOARD_LEN; i++) {
    for (let j = 0; j < BOARD_LEN; j++) {
      hashedBoard.add({ key: hashPair(j, i), piece: board[i][j] })
    }
  }
  return hashedBoard;
}

function clearAndSetPieceFromDrag(hashedPieces: Set<ITablePiece>, board: Set<ITablePiece>) {
  // clear board of the piece
  hashedPieces.forEach((hashedPiece) => {
    const { piece } = hashedPiece;
    board.forEach((boardPiece) => {
      if (piece.toUpperCase() === boardPiece.piece.toUpperCase()) {
        boardPiece.piece = "_"
      }
    })
  })

  // set the new piece
  hashedPieces.forEach((hashedPiece) => {
    const { key, piece } = hashedPiece;
    board.forEach((boardPiece) => {
      if (key === boardPiece.key) {
        boardPiece.piece = piece
      }
    })
  })

  return board;
}

export function addNewPiece(hashedPieces: Set<ITablePiece>, board: Set<ITablePiece>) {

  // clear and set new piece
  const boardWithNewPiece = clearAndSetPieceFromDrag(hashedPieces, board);
  
  // handle collisions

  // count each letter on board, if a two piece is less than 2 or a 3 pieces less than 3, remove
  const pieceMap = getPieceCountsFromBoard(boardWithNewPiece);

  // if a 2 piece is less than 2 or if a 3 piece is less than 3 clear that piece
  const cleanedBoard = removeIncompletePiecesFromBoard(boardWithNewPiece, pieceMap);

  // convert hashed board back to 2d board
  const convertedBoard = convertFlatArrayTo2D(cleanedBoard);
  // console.log({convertedBoard})

  // check for vertical pieces and set to lowercase
  const lowercasedBoard = checkIfPiecesVertical(convertedBoard);

  // convert back to hashed board
  // const flattenedBoard = flattenBoard(lowercasedBoard);
  // console.log("flatTo2D", convertFlatArrayTo2D(flattenedBoard))
  return flattenBoard(lowercasedBoard);
}

export function checkForDiagonals(spacesFromDrag: Set<ITablePiece>, setSpacesFromDrag:any){
  let isDiagonal = false;
  const tempPieces: any = [];
  spacesFromDrag.forEach((x) => {
    tempPieces.push(unhashPair(x.key))
  })
  tempPieces.map((piece: any, index: number) => {
    if (index + 1 < tempPieces.length) {
      // diagonals on a matrix 
      isDiagonal = findDiagonalNeighbors(piece, tempPieces[index + 1].x, tempPieces[index + 1].y)
      if (isDiagonal) {
        spacesFromDrag.clear();
        setSpacesFromDrag(spacesFromDrag)
        return;
      }
      if (tempPieces.length === 3) {
        if (findDiagonalNeighbors(tempPieces[0], tempPieces[2].x, tempPieces[2].y)) {
          spacesFromDrag.clear();
          setSpacesFromDrag(spacesFromDrag)
          return;
        }
      }
    }
  })
}

function findDiagonalNeighbors(prev: { x: number; y: number; }, x: number, y: number) {
  // Check top-left neighbor
  if (x > 0 && y > 0 && x === prev.x - 1 && y == prev.y - 1) {
    return true;
  }

  // Check top-right neighbor
  if (x < BOARD_LEN - 1 && y > 0 && x === prev.x + 1 && prev.y === y - 1) {
    return true;
  }

  // Check bottom-left neighbor
  if (x > 0 && y < BOARD_LEN - 1 && x === prev.x - 1 && y === prev.y + 1) {
    return true;
  }

  // Check bottom-right neighbor
  if (x < BOARD_LEN - 1 && y < BOARD_LEN - 1 && x === prev.x + 1 && y === prev.y + 1) {
    return true;
  }

  return false;
}
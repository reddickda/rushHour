import { useState } from "react";
import { initialBoard } from "./Utilities/boardHelpers";

export function GameBoard() {
  const [board, setBoard] = useState(initialBoard());

const handleCellClick = (rowIndex:number, cellIndex:number) => {
  console.log(cellIndex + ",", rowIndex)
}

  const BuildBoard = () => {
    return board.map((row, rowIndex) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        return <td key={cellIndex+","+rowIndex} onClick={() => handleCellClick(rowIndex, cellIndex)}>{td}</td>
      })}</tr>
    })
  }

  return (
    <table cellPadding={20}>
      <tbody>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
        </tr>
        {
          <BuildBoard />
        }
      </tbody>
    </table>)
}

// click
// update board
// rerender table
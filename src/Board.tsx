import { boardAsStr } from "./Utilities/boardHelpers"
import { letterColors } from "./ListOfPieces";

export const Board = ({ pathToDisplay }: any) => {

  const BoardContent = ({ content }: any) => {
    return content.board.map((row: [], rowIndex: number) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        let movedCell = false;
        if (td.toUpperCase() === content.letter.toUpperCase()) {
          movedCell = true;
        }
        return <td key={cellIndex + "," + rowIndex}><button style={
          {
            borderWidth: movedCell ? '5px' : undefined,
            borderStyle: movedCell ? 'solid' : undefined,
            borderColor: movedCell ? 'aquamarine' : undefined,
            height: 50, width: 50,
            backgroundColor: letterColors[td.toUpperCase()],
            userSelect: 'none'
          }}> </button></td>
      })}</tr>
    })
  }

  const BoardBody = ({ board }: any) => {
    return (<table cellPadding={0}>
      <tbody>
        <tr>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>4</th>
          <th>5</th>
          <th>6</th>
        </tr>
        <BoardContent content={board} />
      </tbody>
    </table>);
  }

  return pathToDisplay.map((path: any, index: number) => {
    if(index === 0) {
      return
    }
    return <div key={boardAsStr(path.board)} style={{ marginLeft: 'auto', marginRight: 'auto', width: 315, backgroundColor: 'green', padding: 5, marginBottom: 10, borderRadius: 5 }}><BoardBody board={path} /></div>
  })

}
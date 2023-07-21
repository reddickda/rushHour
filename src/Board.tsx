import { boardAsStr } from "./Utilities/boardHelpers"
import { letterColors } from "./ListOfPieces";

export const Board = ({ pathToDisplay }: any) => {

  const BoardContent = ({ content }: any) => {
    return content.board.map((row: [], rowIndex: number) => {
      let isExitRow = false
      let isExitCell = false;
      if (rowIndex === 2) {
        isExitRow = true;
      }
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        if (cellIndex === 5) {
          isExitCell = true;
        }
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
          }}>
          {isExitRow && isExitCell &&
            <div style={{
              height: '30px',
              width: 20,
              position: 'relative',
              left: '35px',
              borderRadius: 5,
              borderColor: 'black',
              borderWidth: '2px',
              borderStyle: 'solid',
              background: 'repeating-conic-gradient(white 0% 25%, black 0% 50%) 50%/ 10px 10px'
            }}></div>
          }</button></td>
      })}</tr>
    })
  }

  const BoardBody = ({ board, index }: any) => {
    return (<table cellPadding={0}>
      <caption>{index}</caption>
      <tbody>
        <tr>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
        <BoardContent content={board} />
      </tbody>
    </table>);
  }

  return pathToDisplay.map((path: any, index: number) => {
    if (index === 0) {
      return
    }
    return <div key={boardAsStr(path.board)} style={{ marginLeft: 'auto', marginRight: 'auto', width: 315, backgroundColor: 'green', padding: 5, marginBottom: 10, borderRadius: 5 }}><BoardBody index={index} board={path} /></div>
  })

}
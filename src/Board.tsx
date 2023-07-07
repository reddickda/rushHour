import { boardAsStr } from "./Utilities/boardHelpers"

export const Board = ({ pathToDisplay }: any) => {

  const BoardContent = ({ content }: any) => {
    return content.map((row: [], rowIndex: number) => {
      return <tr key={rowIndex}>{row.map((td: string, cellIndex: number) => {
        return <td key={cellIndex + "," + rowIndex}><button style={{ userSelect: 'none' }}>{td}</button></td>
      })}</tr>
    })
  }

  const BoardBody = ({ board }: any) => {
    return (<table style={{ height: "50%", width: "50%" }} cellPadding={0}>
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

  return pathToDisplay.map((path: any) => {
      return <div key={boardAsStr(path)} style={{ padding: 5 }}><div>___________________________________________</div><BoardBody board={path} /></div>
    })
  
}
import { Direction } from "./App";

export function LengthTwoPiece({letterRepresentation, color}: {letterRepresentation: string, color: string} ){
  const childStyle: React.CSSProperties = {
    float:'left',
    width: '50%',
    backgroundColor: color
  }

  const handleClick = (event: any) => {
    console.log('clicked', event.target.innerText)
  }

  return (<button id={letterRepresentation} onClick={handleClick} style={{width: 60, padding: 2}}><div style={childStyle}>{letterRepresentation}</div><div style={childStyle}>{letterRepresentation}</div></button>)
}



// when adding we can loop and add accordingly
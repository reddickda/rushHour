import { useMyContext } from './Context/ContextProvider';

export function LengthThreePiece({letterRepresentation, color}: {letterRepresentation: string, color: string} ){
  const { setSelectedPiece } = useMyContext();

  const childStyle: React.CSSProperties = {
    float:'left',
    width: '33.33%',
    backgroundColor: color
  }

  const handleClick = () => {
    setSelectedPiece(letterRepresentation)
  }

  return (<button id={letterRepresentation} onClick={handleClick} style={{width: 60, padding: 2}}><div style={childStyle}>{letterRepresentation}</div><div style={childStyle}>{letterRepresentation}</div><div style={childStyle}>{letterRepresentation}</div></button>)
}

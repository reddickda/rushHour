import { useMyContext } from './Context/ContextProvider';

export function LengthTwoPiece({letterRepresentation, color}: {letterRepresentation: string, color: string} ){
  const { setSelectedPiece } = useMyContext();

  const childStyle: React.CSSProperties = {
    float:'left',
    width: '50%',
    backgroundColor: color
  }

  const handleClick = () => {
    console.log('clicked', letterRepresentation)
    setSelectedPiece(letterRepresentation)
  }

  return (<button id={letterRepresentation} onClick={handleClick} style={{width: 60, padding: 2}}><div style={childStyle}>{letterRepresentation}</div><div style={childStyle}>{letterRepresentation}</div></button>)
}

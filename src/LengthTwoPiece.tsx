import { useMyContext } from './Context/ContextProvider';

export function LengthTwoPiece({letterRepresentation, color}: {letterRepresentation: string, color: string} ){
  const { setSelectedPiece, state } = useMyContext();
  const childStyle: React.CSSProperties = {
    float:'left',
    width: '50%',
    backgroundColor: color
  }

  const handleClick = () => {
    setSelectedPiece(letterRepresentation)
  }

  return (<button id={letterRepresentation} onClick={handleClick} style={{ 
    borderStyle: state.selectedPiece === letterRepresentation ? 'solid' : undefined,
    borderWidth: state.selectedPiece === letterRepresentation ? '3px' : undefined,
    borderColor: state.selectedPiece === letterRepresentation ? 'black' : undefined,
    backgroundColor: color,
     width: 70,
      height:30, 
      padding: 2}}><div style={childStyle}></div><div style={childStyle}></div></button>)
}

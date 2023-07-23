import { useMyContext } from "./Context/ContextProvider";
import { LengthThreePiece } from "./LengthThreePiece";
import { LengthTwoPiece } from "./LengthTwoPiece";
import { getPieceCountsFromBoard } from "./Utilities/boardHelpers";

export const letterColors: any = {
  'A': 'red',
  'B': 'orange',
  'C': '#354A21',
  'D': 'teal',
  'E': 'pink',
  'F': 'darkgreen',
  'G': 'purple',
  'H': 'tan',
  'I': '#5C2C06',
  'J': 'white',
  'K': 'maroon',
  'L': '#ffdb58',
  'M': 'yellow',
  'N': 'blue',
  'O': '#CBC3E3',
  'P': 'gray'
}

const OPACITY = .05
const OPACITY_LIGHT = .2

export function ListOfPieces() {
  const { state } = useMyContext();

  const pieceMap = getPieceCountsFromBoard(state.boardAsAHashedSet);

  return <>
    <div style={{display:'flex', backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <div style={{paddingRight: 4 }}>
        <li key={'redCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('A') !== 0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='red' letterRepresentation={'A'} />}</li>
        <li key={'orangeCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('B') !==0 ? OPACITY : undefined }}>{<LengthTwoPiece color='orange' letterRepresentation={'B'} />}</li>
        <li key={'greenCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('C') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='#354A21' letterRepresentation={'C'} />}</li>
        <li key={'lightBlueCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('D') !==0 ? OPACITY : undefined }}>{<LengthTwoPiece color='teal' letterRepresentation={'D'} />}</li>
      </div>
      <div style={{paddingRight: 4 }}>
        <li key={'pinkCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('E') !==0 ? OPACITY : undefined }}>{<LengthTwoPiece color='pink' letterRepresentation={'E'} />}</li>
        <li key={'darkGreenCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('F') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='darkGreen' letterRepresentation={'F'} />}</li>
        <li key={'purpleCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('G') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='purple' letterRepresentation={'G'} />}</li>
        <li key={'tanCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('H') !==0 ? OPACITY : undefined }}>{<LengthTwoPiece color='tan' letterRepresentation={'H'} />}</li>
      </div>
      <div>
        <li key={'brownCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('I') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='#5C2C06' letterRepresentation={'I'} />}</li>
        <li key={'whiteCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('J') !==0 ? OPACITY : undefined }}>{<LengthTwoPiece color='white' letterRepresentation={'J'} />}</li>
        <li key={'maroonCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('K') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='maroon' letterRepresentation={'K'} />}</li>
        <li key={'goldCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('L') !==0 ? OPACITY_LIGHT : undefined }}>{<LengthTwoPiece color='#ffdb58' letterRepresentation={'L'} />}</li>

      </div>
    </div>
    <div style={{backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <li key={'yellowCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('M') !==0 ? OPACITY : undefined }}>{<LengthThreePiece color='yellow' letterRepresentation={'M'} />}</li>
      <li key={'blueCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('N') !==0 ? OPACITY : undefined }}>{<LengthThreePiece color='blue' letterRepresentation={'N'} />}</li>
      <li key={'lightPurpleCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('O') !==0 ? OPACITY : undefined }}>{<LengthThreePiece color='#CBC3E3' letterRepresentation={'O'} />}</li>
      <li key={'grayCar'} style={{ listStyleType: 'none', opacity: pieceMap.get('P') !==0 ? OPACITY : undefined }}>{<LengthThreePiece color='gray' letterRepresentation={'P'} />}</li>
    </div>
  </>
}
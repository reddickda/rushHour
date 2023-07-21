import { LengthThreePiece } from "./LengthThreePiece";
import { LengthTwoPiece } from "./LengthTwoPiece";

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
  'L': 'yellow',
  'M': 'blue',
  'N': '#CBC3E3',
  'O': 'gray'
}

export function ListOfPieces() {

  return <>
    <div style={{display:'flex', backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <div style={{paddingRight: 4 }}>
        <li key={'redCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='red' letterRepresentation={'A'} />}</li>
        <li key={'orangeCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='orange' letterRepresentation={'B'} />}</li>
        <li key={'greenCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='#354A21' letterRepresentation={'C'} />}</li>
        <li key={'lightBlueCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='teal' letterRepresentation={'D'} />}</li>
      </div>
      <div style={{paddingRight: 4 }}>
        <li key={'pinkCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='pink' letterRepresentation={'E'} />}</li>
        <li key={'darkGreenCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='darkGreen' letterRepresentation={'F'} />}</li>
        <li key={'purpleCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='purple' letterRepresentation={'G'} />}</li>
        <li key={'tanCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='tan' letterRepresentation={'H'} />}</li>
      </div>
      <div>
        <li key={'brownCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='#5C2C06' letterRepresentation={'I'} />}</li>
        <li key={'whiteCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='white' letterRepresentation={'J'} />}</li>
        <li key={'maroonCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='maroon' letterRepresentation={'K'} />}</li>
      </div>
    </div>
    <div style={{backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <li key={'yellowCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='yellow' letterRepresentation={'L'} />}</li>
      <li key={'blueCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='blue' letterRepresentation={'M'} />}</li>
      <li key={'lightPurpleCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='#CBC3E3' letterRepresentation={'N'} />}</li>
      <li key={'grayCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='gray' letterRepresentation={'O'} />}</li>
    </div>
  </>
}
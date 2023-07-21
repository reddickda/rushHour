import { LengthThreePiece } from "./LengthThreePiece";
import { LengthTwoPiece } from "./LengthTwoPiece";

export const letterColors: any = {
  'A': 'red',
  'B': 'orange',
  'C': 'green',
  'D': 'teal',
  'E': 'pink',
  'F': 'darkgreen',
  'G': 'purple',
  'H': 'tan',
  'K': 'yellow',
  'I': 'blue',
  'J': '#CBC3E3',
  'L': 'gray'
}

export function ListOfPieces() {

  return <>
    <div style={{display:'flex', backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <div>
        <li key={'redCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='red' letterRepresentation={'A'} />}</li>
        <li key={'orangeCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='orange' letterRepresentation={'B'} />}</li>
        <li key={'greenCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='green' letterRepresentation={'C'} />}</li>
        <li key={'lightBlueCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='teal' letterRepresentation={'D'} />}</li>
      </div>
      <div>
        <li key={'pinkCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='pink' letterRepresentation={'E'} />}</li>
        <li key={'darkGreenCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='darkGreen' letterRepresentation={'F'} />}</li>
        <li key={'purpleCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='purple' letterRepresentation={'G'} />}</li>
        <li key={'tanCar'} style={{ listStyleType: 'none' }}>{<LengthTwoPiece color='tan' letterRepresentation={'H'} />}</li>
      </div>
    </div>
    <div style={{backgroundColor: '#242424', padding:10, borderRadius:10}}>
      <li key={'yellowCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='yellow' letterRepresentation={'K'} />}</li>
      <li key={'blueCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='blue' letterRepresentation={'I'} />}</li>
      <li key={'lightPurpleCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='#CBC3E3' letterRepresentation={'J'} />}</li>
      <li key={'grayCar'} style={{ listStyleType: 'none' }}>{<LengthThreePiece color='gray' letterRepresentation={'L'} />}</li>
    </div>
  </>
}
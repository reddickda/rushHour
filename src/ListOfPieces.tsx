import { LengthThreePiece } from "./LengthThreePiece";
import { LengthTwoPiece } from "./LengthTwoPiece";

export function ListOfPieces(){

  return <ul>
    <li key={'redCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='red' letterRepresentation={'A'} />}</li>
    <li key={'yellowCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='yellow' letterRepresentation={'B'} />}</li>
    <li key={'blueCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='blue' letterRepresentation={'C'} />}</li>
    <li key={'greenCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='green' letterRepresentation={'D'} />}</li>
    <li key={'tealCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='teal' letterRepresentation={'E'} />}</li>
    <li key={'brownCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='brown' letterRepresentation={'F'} />}</li>
    <li key={'tanCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='tan' letterRepresentation={'G'} />}</li>
    <li key={'purplenCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='purple' letterRepresentation={'H'} />}</li>
    <li key={'orangeCar'} style={{ listStyleType:'none'}}>{<LengthThreePiece color='orange' letterRepresentation={'I'} />}</li>
    <li key={'grayCar'} style={{ listStyleType:'none'}}>{<LengthThreePiece color='gray' letterRepresentation={'J'} />}</li>
    <li key={'pinkCar'} style={{ listStyleType:'none'}}>{<LengthThreePiece color='pink' letterRepresentation={'K'} />}</li>
  </ul>
}
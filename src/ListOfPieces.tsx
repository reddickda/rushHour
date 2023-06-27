import { LengthTwoPiece } from "./LengthTwoPiece";

export function ListOfPieces(){

  return <ul>
    <li key={'redCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='red' letterRepresentation={'B'} />}</li>
    <li key={'blueCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='blue' letterRepresentation={'C'} />}</li>
    <li key={'greenCar'} style={{ listStyleType:'none'}}>{<LengthTwoPiece color='green' letterRepresentation={'D'} />}</li>
  </ul>
}
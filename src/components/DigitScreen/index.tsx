import React from 'react';
import "./DigitScreen.scss";
interface DigitScreenProps{
    Value: number
}
const DigitScreen: React.FC<DigitScreenProps>=({Value})=> {
  return (
    <div className='DigitScreen'>{Value.toString().padStart(3,"0")}</div>
  )
}

export default DigitScreen;
import { stat } from 'fs';
import React from 'react'
import { CellState, CellVal } from '../../types';
import "./CellButton.scss"
interface CellButtonProps{
  row: number;
  col: number;
  state: CellState;
  value: CellVal;
  onClick(rowParam:number, colParam:number):(...args: any[])=> void;
  onContext(rowParam:number, colParam:number):(...args : any[])=>void;
}
const CellButton: React.FC<CellButtonProps> = ({row, col, state, value, onClick, onContext})=> {
  const renderContent=()=>{
    
    if(state === CellState.clicked){
      
        if(value === CellVal.bomb){
          
          return (<span role="img" aria-label='bomb'>💣</span>);
        }
        return <div>{value}</div>;
    }else if(state===CellState.flagged){
      return (<span role="img" aria-label='bomb'>🚩</span>);
    }
    return null;
  }

  return (
        <div 
        className={`CellButton ${state===CellState.clicked
        ?"clicked": ""} 
        value-${value}`}
        onClick={onClick(row,col)}
        onContextMenu={onContext(row,col)}>
          {renderContent()}
        </div>
  )
}

export default CellButton;
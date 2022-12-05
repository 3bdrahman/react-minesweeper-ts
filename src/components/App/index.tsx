import React, {useEffect, useState} from "react";
import "./App.scss";
import DigitScreen from "../DigitScreen";
import { generateCells } from "../../utils";
import CellButton from "../CellButton";
import {Cell, CellState, Emoji } from "../../types";
const App: React.FC=()=>{
    const [cells,setCells]=useState<Cell[][]>(generateCells());
    const [emoji,setEmoji]=useState<Emoji>(Emoji.smile);
    const [time,setTime]=useState<number>(0)
    const [gameOn, setGameOn]=useState<boolean>(false);
    const [bombsLeftToFlag, setBombsLeftToFlag]= useState<number>(10);
    useEffect(()=>{
        const handleMouseDown=()=>{
            setEmoji(Emoji.scard);
        }
        const handleMouseUp=()=>{
            setEmoji(Emoji.smile)
        }
        window.addEventListener("mousedown", handleMouseDown);
        window.addEventListener("mouseup", handleMouseUp);
            // remove listeners at end of component lifecycle to
            // save memory
        return()=>{
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        }
    },[]);
    useEffect(()=>{
        if(gameOn && time <999){
            const timer= setInterval(()=>{
                setTime(time+1);
            },1000);
            return()=>{
                clearInterval(timer);
            }
        }
    },[gameOn, time])
    const handleCellClick=(rowParam:number,colParam: number)=>(): void=>{
        // console.log(rowParam,colParam);
        if(!gameOn){
            setGameOn(true);
        }
    }
    const handleEmojiClick=(): void =>{
        //reset the game
        if(gameOn){
            setGameOn(false);
            setTime(0);
            setCells(generateCells());
        }
    }
    const handleRightClick=
    (rowParam:number,colParam:number)=>(e:React.MouseEvent<HTMLDivElement,MouseEvent>):void=>{
        // console.log(`right click triggered at ${rowParam}-${colParam} `)
        e.preventDefault();
        if(!gameOn) return;
        const currentCells=cells.slice();
        const currCell=cells[rowParam][colParam];
        if(currCell.state === CellState.clicked){
            return;
        } else if (currCell.state===CellState.clickable ){
            currentCells[rowParam][colParam].state=CellState.flagged;
            setCells(currentCells);
            setBombsLeftToFlag(bombsLeftToFlag-1);
        } else {
            currentCells[rowParam][colParam].state=CellState.clickable;
            setCells(currentCells);
            setBombsLeftToFlag(bombsLeftToFlag+1);
        }

    }
    const renderCells=()=>{
        return cells.map((row,rowIndex)=>
        row.map((cell,colIndex)=>
        <CellButton 
        key={`${rowIndex}-${colIndex}`} 
        row={rowIndex} 
        col={colIndex} 
        state={cell.state} 
        value={cell.value}
        onClick={handleCellClick}
        onContext={handleRightClick}/>))
    }
    console.log("cells", cells)
    return(
        <div className="App">
            <div className="Header">
                <DigitScreen Value={bombsLeftToFlag}/>
                <div className="emoji" onClick={handleEmojiClick}>
                        <span role="img"
                        aria-label="face">
                            {emoji}
                        </span>
                        
                </div>
                <DigitScreen Value={time}/>
            </div>
            <div className="Body">{renderCells()}</div>
        </div>
    )
}
export default App;
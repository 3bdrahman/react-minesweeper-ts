import React from "react";
import { MAX_COLS,MAX_ROWS,NO_BOMB } from "../constants";
import { CellVal, CellState, Cell } from "../types";
export const generateCells=(): Cell[][]=>{
    let cells:Cell[][]=[];
    // generate the cells 
    for(let i=0;i < MAX_ROWS; i++){
        cells.push([]);
        for(let j=0; j< MAX_COLS;j++){
            cells[i].push({
                value:CellVal.none,
                state:CellState.clickable
            })
        }
    }
    // place designated number of bombs randomly on board
    let bombsPlaced=0
    while(bombsPlaced < NO_BOMB){
        const randomRow=Math.floor(Math.random()* MAX_ROWS); // 0-MAX_ROWS
        const randomCol= Math.floor(Math.random()* MAX_COLS); // 0-MAX_COLS
        const currentCell = cells[randomRow][randomCol];
        if(currentCell.value != CellVal.bomb){
            cells= cells.map((row,rowIdx)=>(row.map((cell,colIdx)=>{
                if(randomRow===rowIdx && randomCol===colIdx){
                    return{
                        ...cell,
                        value:CellVal.bomb
                    }
                    
                }
                return cell;
            })))
            bombsPlaced++;
        }
    }
    // calculate number of bombs surrounding each cell
    for (let row = 0; row < MAX_ROWS;row++){
        for(let col=0; col<MAX_COLS;col++){
            const currCell = cells[row][col];
            if(currCell.value=== CellVal.bomb) continue;
            let numOfBombs = 0;
            // grap surrounding cells if they exist
            // (row-1,col-1) | (row-1,col)   |(row-1,col+1)
            // ---------------------------------------------
            // (row,col-1)   | (row,col)     |(row,col+1) 
            //----------------------------------------------
            // (row+1,col-1) | (row+1, col)  |(row+1,col+1)
            //----------------------------------------------
            let surrounding=[];
            surrounding[0]=row>0 && col >0 ? cells[row-1][col-1]: null;
            surrounding[1]= row>0? cells[row-1][col]: null;
            surrounding[2]= row>0 && col < MAX_COLS-1? cells[row-1][col+1]:null;
            surrounding[3]= col < MAX_COLS-1? cells[row][col+1]:null;
            surrounding[4]= row < MAX_ROWS-1 && col < MAX_COLS-1? cells[row+1][col+1]: null;
            surrounding[5]= row < MAX_ROWS-1? cells[row+1][col]:null;
            surrounding[6]= row<MAX_ROWS-1 && col > 0 ? cells[row+1][col-1]:null;
            surrounding[7]= col > 0? cells[row][col-1]:null;
            for(let i=0; i<surrounding.length;i++){
                if(surrounding[i] && surrounding[i]?.value==CellVal.bomb){
                    numOfBombs++;
                }
            }
            
            if(numOfBombs > 0){
                // TODO: understand why if 
                // change const currCell --> let currCell
                // reassign curr Cell it reutrns 0's instead
                // of bombcounts
             
                 
                cells[row][col]={
                    ...currCell,
                    value:numOfBombs
                }
                // console.log("cells[row][col]: ",cells[row][col]);
                // console.log("CurrCell: ",currCell);
            }
            
        }
    }
    
    return cells;
}

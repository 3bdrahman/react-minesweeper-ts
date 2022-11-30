import { MAX_COLS,MAX_ROWS } from "../constants";
import { CellVal, CellState, Cell } from "../types";
export const generateCells=(): Cell[][]=>{
    const cells:Cell[][]=[];
    for(let i=0;i < MAX_ROWS; i++){
        cells.push([]);
        for(let j=0; j< MAX_COLS;j++){
            cells[i].push({
                value:CellVal.none,
                state:CellState.clickable
            })
        }
    }
    return cells;
}
import React, {useState} from "react";
import "./App.scss";
import DigitScreen from "../DigitScreen";
import { generateCells } from "../../utils";
import CellButton from "../CellButton";
const App: React.FC=()=>{
    const [cells,setCells]=useState(generateCells());
    const renderCells=()=>{
        return cells.map((row,rowIndex)=>row.map((cell,colIndex)=><CellButton key={`${rowIndex}-${colIndex}`}/>))
    }
    console.log("cells", cells)
    return(
        <div className="App">
            <div className="Header">
                <DigitScreen Value={0}/>
                <div className="emoji">
                        <span role="img"
                        aria-label="face">
                            😂 
                        </span>
                </div>
                <DigitScreen Value={11}/>
            </div>
            <div className="Body">{renderCells()}</div>
        </div>
    )
}
export default App;
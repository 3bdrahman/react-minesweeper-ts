import React from "react";
import "./App.scss";
import DigitScreen from "../DigitScreen";
const App: React.FC=()=>{
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
            <div className="Body">Body</div>
        </div>
    )
}
export default App;
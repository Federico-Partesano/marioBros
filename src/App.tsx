import React from "react";
//import logo from "./logo.svg";
import "./App.css";
import Canvas from "./game/game";



function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Canvas />
        {/* <div>
          <audio  src={sound} autoPlay={true} loop={true} controls={true}></audio>
        </div> */}
      </header>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logger from "./components/Logger";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");
  const [gameTurns, setGameTurns] = useState([]);

  function updateActivePlayer() {
    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer == "X" ? "O" : "X"
    );
  }

  function gameBoardInputHandler(rowIndex, colIndex){
   
    let selectedPlayer = 'X';
    setGameTurns(prevGameTurns => {

      // done to ensure change of player, 
      // irrespective of state dependency
      if(prevGameTurns.length>0 && prevGameTurns[0].player==='X'){
        selectedPlayer = 'O';
      }

      let inputGameObj = {
        square : {
          row : rowIndex, col : colIndex
        },
        player : selectedPlayer
      };
      const updatedGameTurns = [inputGameObj,...prevGameTurns];
      return updatedGameTurns; 
    });

    updateActivePlayer();
  }

  return (
    <div className="App">
      <Header />

      {/* -- InfoBar -- */}
      <div className="infoBar">
        <Player name={"Player-1"} symbol={"X"} isActive={activePlayer == "X"} />
        <Player name={"Player-2"} symbol={"O"} isActive={activePlayer == "O"} />
      </div>

      <div className="game-logger">
        {/* -- GameBoard -- */}
        <GameBoard
          updateGameboard={gameBoardInputHandler}
          gameTurns = {gameTurns}
        />
        {/* -- Logger -- */}
        <Logger turns={gameTurns}/>
      </div>
    </div>
  );
}

export default App;

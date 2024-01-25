import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import Logger from "./components/Logger";
import { symbol as PlayerSymbol } from "./commons/Constants";

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  ///
  /// function to derive active player from gameTurns state
  /// : Done to avoid unnecessary state
  ///
  function deriveActivePlayer(gameTurns) {
    // done to ensure change of player,
    // irrespective of state dependency
    let selectedPlayer = PlayerSymbol.X;

    if (gameTurns.length > 0 && gameTurns[0].player === PlayerSymbol.X) {
      selectedPlayer = PlayerSymbol.O;
    }

    return selectedPlayer;
  }

  ///
  /// function to handle game board inputs
  ///
  function gameBoardInputHandler(rowIndex, colIndex) {
    setGameTurns((prevGameTurns) => {
      let selectedPlayer = deriveActivePlayer(gameTurns);
      let inputGameObj = {
        square: {
          row: rowIndex,
          col: colIndex,
        },
        player: selectedPlayer,
      };
      const updatedGameTurns = [inputGameObj, ...prevGameTurns];
      return updatedGameTurns;
    });
  }

  return (
    <div className="App">
      <Header />

      {/* -- InfoBar -- */}
      <div className="infoBar">
        <Player
          name={"Player-1"}
          symbol={PlayerSymbol.X}
          isActive={deriveActivePlayer(gameTurns) == PlayerSymbol.X}
        />
        <Player
          name={"Player-2"}
          symbol={"O"}
          isActive={deriveActivePlayer(gameTurns) == PlayerSymbol.O}
        />
      </div>

      <div className="game-logger">
        {/* -- GameBoard -- */}
        <GameBoard
          updateGameboard={gameBoardInputHandler}
          gameTurns={gameTurns}
        />
        {/* -- Logger -- */}
        <Logger turns={gameTurns} />
      </div>
    </div>
  );
}

export default App;

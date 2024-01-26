import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import GameOver from "./components/GameOver";
import Logger from "./components/Logger";
import {
  SYMBOLS as PlayerSymbol,
  INITIAL_GAMEBOARD,
  WINNING_COMBINATIONS,
} from "./commons/Constants";

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

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);
  const isDraw = gameTurns.length === 9;

  ///
  /// Reset Gameboard
  ///
  function resetGameboard(){
    setGameTurns([]);
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

  // need to use deep copy here
  let gameBoard = [...INITIAL_GAMEBOARD.map(arr => [...arr])];
  let winner;

  for (const itr of gameTurns) {
    const { square, player } = itr;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  // check for winning conditions
  WINNING_COMBINATIONS.forEach((element) => {
    const firstSymbol = gameBoard[element[0].row][element[0].col];
    const secondSymbol = gameBoard[element[1].row][element[1].col];
    const thirdSymbol = gameBoard[element[2].row][element[2].col];

    if (
      firstSymbol &&
      firstSymbol === secondSymbol &&
      firstSymbol === thirdSymbol
    )
      winner = firstSymbol;
  });

  return (
    <div className="App">
      <Header />

      {/* -- InfoBar -- */}
      <div className="infoBar">
        <Player
          name={"Player-1"}
          symbol={PlayerSymbol.X}
          isActive={activePlayer === PlayerSymbol.X}
        />
        <Player
          name={"Player-2"}
          symbol={"O"}
          isActive={activePlayer === PlayerSymbol.O}
        />
      </div>

      <div className="game-logger">
        {/* -- GameBoard -- */}
        <div>
          <GameBoard
            updateGameboard={gameBoardInputHandler}
            gameBoard={gameBoard}
          />

          {/* -- Game Over -- */}
          {(winner || isDraw) ? <GameOver winner={winner} onClickRematch={resetGameboard}/> : null}
        </div>
        {/* -- Logger -- */}
        <Logger turns={gameTurns} />
      </div>
    </div>
  );
}

export default App;

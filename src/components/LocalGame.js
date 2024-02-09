import {useState} from 'react'
import Player from "./Player";
import GameBoard from "./GameBoard";
import GameOver from "./GameOver";
import Logger from "./Logger";

import {
    SYMBOLS as PlayerSymbol,
    INITIAL_GAMEBOARD,
    WINNING_COMBINATIONS,
    INITIAL_PLAYER_NAMES,
  } from "../commons/Constants";
  
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
  /// function to derive winner
  ///
  function deriveWinner(gameBoard) {
    let winner;
  
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
    return winner;
  }
  
  ///
  /// function to derive gameboard
  ///
  function deriveGameboard(gameTurns) {
    // need to use deep copy here
    let gameBoard = [...INITIAL_GAMEBOARD.map((arr) => [...arr])];
  
    for (const itr of gameTurns) {
      const { square, player } = itr;
      const { row, col } = square;
      gameBoard[row][col] = player;
    }
  
    return gameBoard;
  }

export default function LocalGame() {
    const [gameTurns, setGameTurns] = useState([]);
    const [players, setPlayers] = useState(INITIAL_PLAYER_NAMES);
  
    const activePlayer = deriveActivePlayer(gameTurns);
    const isDraw = gameTurns.length === 9;
    const gameBoard = deriveGameboard(gameTurns);
  
    const winner = deriveWinner(gameBoard);
  
    ///
    /// Reset Gameboard
    ///
    function resetGameboard() {
      setGameTurns([]);
    }
  
    ///
    /// function to update Player Names
    ///
    function updatePlayer(playerSymbol, playerName) {
      setPlayers((prevState) => {
        return {
          ...prevState,
          [playerSymbol]: playerName,
        };
      });
  
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
    <div>
        {/* -- InfoBar -- */}
      <div className="infoBar">
        <Player
          name={players.X}
          symbol={PlayerSymbol.X}
          isActive={activePlayer === PlayerSymbol.X}
          onSave={updatePlayer}
        />
        <Player
          name={players.O}
          symbol={PlayerSymbol.O}
          isActive={activePlayer === PlayerSymbol.O}
          onSave={updatePlayer}
        />
      </div>

      <div className="game-logger">
        {/* -- GameBoard -- */}
        <div className="gameBoard-gameOver">
          <GameBoard
            updateGameboard={gameBoardInputHandler}
            gameBoard={gameBoard}
          />

          {/* -- Game Over -- */}
          {winner || isDraw ? (
            <GameOver
              winner={players[winner]}
              onClickRematch={resetGameboard}
            />
          ) : null}
        </div>
        {/* -- Logger -- */}
        <Logger turns={gameTurns} />
      </div>
    </div>
  )
}

import { useState, useContext, useEffect } from "react";
import { PlayersContext } from "../store/players-context";
import { RemoteContext } from "../store/remote-context";
import socketClient from "../socket/socket";

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

export default function Game() {
  const { isLocal, roomId, remotePlayers, nativePlayer, resetRemoteContext } =
    useContext(RemoteContext);

  const [players, setPlayers] = useState(
    remotePlayers != undefined ? remotePlayers : INITIAL_PLAYER_NAMES
  );

  const [gameTurns, setGameTurns] = useState([]);

  const [disconnectedPlayer, setDisconnectedPlayer] = useState(undefined);

  useEffect(() => {
    console.log("refreshing...");
    ///
    /// refersh gameturns from remote
    ///
    socketClient.on("refresh-gameTurns", (updatedGameTurns) => {
      // console.log(updatedGameTurns);
      setGameTurns(updatedGameTurns);
    });

    ///
    /// handle player disconnection
    ///
    socketClient.on("player-disconnected", (disconnectedPlayer) => {
      console.log(
        `Player disconnected, Name : ${disconnectedPlayer["playerName"]} from room : ${disconnectedPlayer["roomId"]}`
      );
      setDisconnectedPlayer(disconnectedPlayer);
    });

    ///
    /// handle remote-rematch-request
    ///
    socketClient.on("rematch-requested-to-client", (rematchPlayer) => {
      if(!window.confirm(`${rematchPlayer["playerName"]} requested rematch!`)) {
        resetRemoteContext();
      } else resetGameboard();
    });
  }, []);

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
  /// function to update Player Names for local Games
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

      if (roomId != undefined) {
        // console.log("emiting update gt!");
        socketClient.emit("update-gameturns", updatedGameTurns, roomId);
      }
      return updatedGameTurns;
    });
  }

  // player context value
  const ctxValuePlayer = {
    players: players,
    updatePlayer: updatePlayer,
  };

  return (
    <div>
      {/* -- InfoBar -- */}
      <PlayersContext.Provider value={ctxValuePlayer}>
        <div className="infoBar">
          <Player
            symbol={PlayerSymbol.X}
            isActive={activePlayer === PlayerSymbol.X}
            isEditable={isLocal}
          />
          <Player
            symbol={PlayerSymbol.O}
            isActive={activePlayer === PlayerSymbol.O}
            isEditable={isLocal}
          />

          {roomId != undefined && (
            <div className="remote-info">
              <h3>Room Id : {roomId}</h3>
              <p>
                Waiting for <strong>{players[activePlayer]}</strong>'s turn
              </p>
            </div>
          )}
        </div>
      </PlayersContext.Provider>

      <div className="game-logger">
        {/* -- GameBoard -- */}
        {/* <GameContext.Provider value={ctxValueGame}> */}
        <div
          className={`gameBoard-gameOver ${
            winner == undefined &&
            disconnectedPlayer == undefined &&
            nativePlayer != undefined &&
            nativePlayer != players[activePlayer]
              ? "disabled"
              : ""
          }`}
        >
          <GameBoard
            updateGameboard={gameBoardInputHandler}
            gameBoard={gameBoard}
          />
          {/* -- Game Over -- */}
          {disconnectedPlayer || winner || isDraw ? (
            <GameOver
              disconnectedPlayer={disconnectedPlayer}
              winner={players[winner]}
              onClickRematch={() => {
                resetGameboard();
              }}
            />
          ) : null}
        </div>
        {/* </GameContext.Provider> */}
        {/* -- Logger -- */}
        <Logger turns={gameTurns} />
      </div>
    </div>
  );
}

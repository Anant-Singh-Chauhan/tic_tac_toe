import React, { useContext } from "react";
import { RemoteContext } from "../store/remote-context";
import socketClient from "../socket/socket";

export default function GameOver({
  disconnectedPlayer,
  winner,
  onClickRematch,
}) {
  const { isLocal, resetRemoteContext } = useContext(RemoteContext);
  return (
    <div className="gameOver-shell">
      <div className="gameOver-title">Game Over!</div>
      <div className="gameOver-body">
        {disconnectedPlayer == undefined
          ? winner
            ? `${winner} won!`
            : "Draw"
          : `${disconnectedPlayer["playerName"]} disconnected!`}
      </div>
      {disconnectedPlayer == undefined ? (
        <button
          onClick={() => {
            onClickRematch();
            !isLocal && socketClient.emit("rematch-requested-to-server");
          }}
          className="gameOver-rematch"
        >
          Rematch?
        </button>
      ) : null}
      <button
        onClick={() => {
          onClickRematch();
          resetRemoteContext();
        }}
        className="gameOver-rematch"
      >
        Go Back to Main Menu
      </button>
    </div>
  );
}

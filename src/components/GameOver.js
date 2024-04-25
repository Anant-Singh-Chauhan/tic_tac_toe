import React, { useContext } from "react";
import { RemoteContext } from "../store/remote-context";

export default function GameOver({
  disconnectedPlayer,
  winner,
  onClickRematch,
}) {
  const { updateIsLocal, resetRemoteContext } = useContext(RemoteContext);
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
        <button onClick={onClickRematch} className="gameOver-rematch">
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

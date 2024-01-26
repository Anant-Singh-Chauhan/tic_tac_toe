import React from "react";

export default function GameOver({ winner, onClickRematch }) {
  return (
    <div className="gameOver-shell">
      <div className="gameOver-title">Game Over!</div>
      <div className="gameOver-body">{winner ? `${winner} won!` : "Draw"}</div>
      <button onClick={onClickRematch} className="gameOver-rematch">
        Rematch?
      </button>
    </div>
  );
}

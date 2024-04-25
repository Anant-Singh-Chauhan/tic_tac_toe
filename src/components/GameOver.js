import React, { useContext } from "react";
import { RemoteContext } from "../store/remote-context";

export default function GameOver({ winner, onClickRematch }) {
  const {updateIsLocal} = useContext(RemoteContext);
  return (
    <div className="gameOver-shell">
      <div className="gameOver-title">Game Over!</div>
      <div className="gameOver-body">{winner ? `${winner} won!` : "Draw"}</div>
      <button onClick={onClickRematch} className="gameOver-rematch">
        Rematch?
      </button>
      <button onClick={()=>{
        onClickRematch();
        updateIsLocal(undefined);
      }} className="gameOver-rematch">
        Go Back to Main Menu
      </button>
    </div>
  );
}

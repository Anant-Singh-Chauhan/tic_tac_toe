import React from "react";

export default function Logger({ turns }) {
  return (
    <ol id="logger_shell">
        <div>
            <h2>Play Logs :</h2>
        </div>
      {turns.map((turn) => (
        <li
          key={`${turn.square.row}+${turn.square.col}`}
        >{`${turn.player} selected ${turn.square.row} , ${turn.square.col}`}</li>
      ))}
    </ol>
  );
}

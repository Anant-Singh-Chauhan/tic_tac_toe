import React, { useState } from "react";

export default function Player({ name, symbol, isActive, onSave }) {
  const [editState, setEditState] = useState(false);
  const [playerName, setName] = useState(name);

  function toggleEditState() {
    if (editState) onSave(symbol,playerName);

    // not a good practice, if state depends on prev state
    // thats becoz react schedules state updates,
    // it's not immidieate.
    // setEditState(!editState);
    setEditState((prevEdit) => !prevEdit);
  }

  function updatePlayerName(event) {
    setName(event.target.value);
  }

  return (
    <div className={isActive ? "player highlighted-player" : "player"}>
      <span className="player-info">
        {editState ? (
          <input
            type="text"
            className=""
            value={playerName}
            onChange={updatePlayerName}
          />
        ) : (
          <span className="player-name">{playerName}</span>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button className="editBtn" onClick={toggleEditState}>
        {editState ? "Save" : "Edit"}
      </button>
    </div>
  );
}

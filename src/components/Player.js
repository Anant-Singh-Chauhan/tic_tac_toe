import React, { useState, useContext, memo } from "react";
import { PlayersContext } from "../store/players-context";

const Player = memo(function Player({ symbol, isActive, isEditable = true }) {
  const { players, updatePlayer } = useContext(PlayersContext);
  const [editState, setEditState] = useState(false);
  const [playerName, setName] = useState(players[symbol]);

  function toggleEditState() {
    if (editState) updatePlayer(symbol, playerName);

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

      {isEditable && (
        <button className="editBtn" onClick={toggleEditState}>
          {editState ? "Save" : "Edit"}
        </button>
      )}
    </div>
  );
});

export default Player;

import React, { useState } from "react";
import Switch from "react-switch";
import socketClient from "../socket/socket";

const initialPlayerName = "Enter Player Name";
const initialRoomId = "Enter Room ID";

//
export default function RemoteMenu() {
  const [playerName, setPlayerName] = useState("");
  const [roomId, setRoomId] = useState("");

  const [isPrivateRoom, setIsPrivateRoom] = useState(false);
  const [hasRoomId, setHasRoomId] = useState(false);

  //
  function togglePrivateRoom() {
    setIsPrivateRoom((prevState) => !prevState);

    if (hasRoomId === true) toggleHasRoomId();
  }

  //
  function toggleHasRoomId() {
    setHasRoomId((prevState) => !prevState);
  }

  //
  function updateRemotePlayer(event) {
    setPlayerName(event.target.value);
  }

  //
  function updateRoomId(event) {
    setRoomId(event.target.value);
  }

  //
  function submitHandler() {

    socketClient.connect();

    if(!isPrivateRoom){
        socketClient.emit("add-random-player", playerName);
    };
  }
  return (
    <div className="remote-menu">
      <div className="infoBar remote-form">
        <input
          type="text"
          name="remotePlayerName"
          id="remotePlayerName"
          placeholder={initialPlayerName}
          className="form-field"
          value={playerName}
          onChange={updateRemotePlayer}
        />
        <div className="form-field">
          <label htmlFor="createPrivateRoom">Enter Private Room</label>
          <Switch
            onChange={togglePrivateRoom}
            id="createPrivateRoom"
            checked={isPrivateRoom}
          />
        </div>

        <div className="form-field disabled">
          <label htmlFor="hasRoomId">Do You have a Room Id?</label>
          <Switch
            onChange={toggleHasRoomId}
            id="hasRoomId"
            checked={hasRoomId}
            disabled={!isPrivateRoom}
          />
        </div>

        <input
          type="text"
          name="remoteRoomId"
          id="remoteRoomId"
          placeholder={initialRoomId}
          className="form-field"
          disabled={!(isPrivateRoom && hasRoomId)}
          value={roomId}
          onChange={updateRoomId}
        />

        <button
          className="form-submit"
          disabled={playerName === "" || (hasRoomId && roomId === "")}
          onClick={submitHandler}
        >
          Check For Players
        </button>
      </div>
    </div>
  );
}

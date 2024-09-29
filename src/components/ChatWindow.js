import React, { useContext, useEffect, useState } from "react";
import socketClient from "../socket/socket";
import { RemoteContext } from "../store/remote-context";

const ChatWindow = function () {
  const [chats, setChats] = useState([]);

  const { nativePlayer, roomId } = useContext(RemoteContext);

  useEffect(() => {
    socketClient.on("game-chat-update", (newChat) => {
      updateChats(newChat.playerName, newChat.message);
    });
  }, []);

  ///
  function updateChats(playerName, message) {
    setChats((prevState) => {
      return [{ playerName, message }, ...prevState];
    });
  }

  return (
    <div id="chat_window" className="logger_shell">
      <div className="logs_title_div">
        <div>
          <h3>Chat Window</h3>
        </div>
        <button
          className="btnLogs"
          onClick={() => {
            document.getElementById("play_logs").classList.toggle("inactive");
            document.getElementById("chat_logs").classList.toggle("inactive");
          }}
        >
          toggle
        </button>
      </div>

      {/* send chat input */}
      <div id="send_chat">
        <input
          type="text"
          name="send_chat"
          id="send_chat_input"
          maxLength={60}
        />
        <button
          className="btnLogs"
          onClick={() => {
            let val = document.getElementById("send_chat_input").value;

            if (val.length > 0) {
              socketClient.emit(
                "send-game-chat",
                nativePlayer,
                document.getElementById("send_chat_input").value,
                roomId
              );
            }

            document.getElementById("send_chat_input").value = "";
          }}
        >
          Send
        </button>
      </div>

      {/* chat logs */}
      <ol id="chat_logs">
        {chats.map((chat) => (
          <li key={`${chat.playerName}+${Math.random()}`}>
            <strong>{chat.playerName}</strong> {`: ${chat.message}`}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ChatWindow;

import { useContext } from "react";
import { RemoteContext } from "../store/remote-context";

export default function Logger({ turns }) {
  const { isLocal } = useContext(RemoteContext);
  return (
    <div id="logger_shell" className="logger_shell">
      <div className="logs_title_div">
        <div>
          <h3>Play Logs :</h3>
        </div>
        {!isLocal && (
          <button
            className="btnLogs"
            onClick={() => {
              document.getElementById("play_logs").classList.toggle("inactive");
              document.getElementById("chat_logs").classList.toggle("inactive");
            }}
          >
            toggle
          </button>
        )}
      </div>

      <ol id="play_logs" className={isLocal ? "" :"inactive"}>
        {turns.map((turn) => (
          <li
            key={`${turn.square.row}+${turn.square.col}`}
          >{`${turn.player} selected ${turn.square.row} , ${turn.square.col}`}</li>
        ))}
      </ol>
    </div>
  );
}

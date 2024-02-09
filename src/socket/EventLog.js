import { useState } from "react";

export default function EventLog() {
  const [isConnected, setIsConnected] = useState(false);
  const [eventLogs, setEventLogs] = useState([]);
  return (
    <div>
      <h3>Event Logs</h3>
      <hr />
      <p>Connection Status : {isConnected}</p>
      <hr />
      <h6>Event Logs</h6>
      <ul>
        {eventLogs.map((ev) => {
          <li>{ev}</li>;
        })}
      </ul>
    </div>
  );
}

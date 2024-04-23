import { useState } from "react";
import { RemoteContext } from "./store/remote-context";
import { ProgressBar } from "react-loader-spinner";
import Game from "./components/Game";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RemoteMenu from "./components/RemoteMenu";
import RemoteGame from "./components/RemoteGame";

function App() {
  const [isLocal, setIsLocal] = useState(undefined);
  const [connectionSuccess, setConnectionSuccess] = useState(undefined);
  const [roomId, setRoomId] = useState(undefined);
  const [showRemoteGameboard, setShowRemoteGameboard] = useState(false);

  function showRemoteGameboardHandler(val, exMsg) {
    if (val === false)
      alert("Remote Connection Failed!, Something Went Wrong : " + exMsg);
    else alert("Finding Players!");

    setShowRemoteGameboard(val);
  }

  const remoteContextValue = {
    isLocal: isLocal,
    connectionSuccess: connectionSuccess,
    roomId: roomId,
    updateIsLocal: setIsLocal,
    updateConnectionSuccess: setConnectionSuccess,
    updateRemoteRoomId : setRoomId
  };

  return (
    <div className="App">
      <Header />
      <RemoteContext.Provider value={remoteContextValue}>
        {/* Main Menu */}

        {isLocal === undefined && <Menu />}

        {/* --Local Game-- */}
        {isLocal && <Game/>}

        {/* -- Remote Menu -- */}
        {isLocal === false && connectionSuccess === undefined && <RemoteMenu />}
        {isLocal === false && connectionSuccess === true && roomId == undefined && (
          <ProgressBar
          visible={true}
          height="100"
          width="100"
          color="#4fa94d"
          ariaLabel="progress-bar-loading"
          wrapperStyle={{}}
          wrapperClass=""
          />
        )}

        {/* -- Remote Game -- */}
        {(isLocal === false && connectionSuccess === true && roomId != undefined ) && <Game />}
      </RemoteContext.Provider>
    </div>
  );
}

export default App;

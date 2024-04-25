import { useContext, useEffect, useState } from "react";
import { RemoteContext } from "./store/remote-context";
import { ProgressBar } from "react-loader-spinner";
import Game from "./components/Game";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RemoteMenu from "./components/RemoteMenu";
import socketClient from "./socket/socket";

function App() {
  const [isLocal, setIsLocal] = useState(undefined);
  const [connectionSuccess, setConnectionSuccess] = useState(undefined);
  const [roomId, setRoomId] = useState(undefined);
  const [remotePlayers, setRemotePlayers] = useState(undefined);
  const [nativePlayer, setNativePlayer] = useState(undefined);

  const remoteContextValue = {
    isLocal: isLocal,
    connectionSuccess: connectionSuccess,
    roomId: roomId,
    remotePlayers: remotePlayers,
    nativePlayer: nativePlayer,
    updateIsLocal: setIsLocal,
    updateConnectionSuccess: setConnectionSuccess,
    updateRemoteRoomId: setRoomId,
    updateRemotePlayers: setRemotePlayers,
    updateNativePlayer: setNativePlayer,
    resetRemoteContext: () => {
      setIsLocal(undefined);
      setConnectionSuccess(undefined);
      setRoomId(undefined);
      setNativePlayer(undefined);
      setRemotePlayers(undefined);
      socketClient.disconnect();
    },
  };

  return (
    <div className="App">
      <RemoteContext.Provider value={remoteContextValue}>
        <Header />
        {/* Main Menu */}

        {isLocal === undefined && <Menu />}

        {/* --Local Game-- */}
        {isLocal && <Game />}

        {/* -- Remote Menu -- */}
        {isLocal === false && connectionSuccess === undefined && <RemoteMenu />}

        {isLocal === false &&
          connectionSuccess === true &&
          roomId == undefined && (
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
        {isLocal === false &&
          connectionSuccess === true &&
          roomId != undefined && <Game />}
      </RemoteContext.Provider>
    </div>
  );
}

export default App;

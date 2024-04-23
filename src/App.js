import { useState } from "react";
import { RemoteContext } from "./store/remote-context";
import { CirclesWithBar } from "react-loader-spinner";
import LocalGame from "./components/LocalGame";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RemoteMenu from "./components/RemoteMenu";
import RemoteGame from "./components/RemoteGame";

function App() {
  const [isLocal, setIsLocal] = useState(undefined);
  const [connectionSuccess, setConnectionSuccess] = useState(undefined);
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
    roomId: "",
    updateIsLocal: setIsLocal,
    updateConnectionSuccess: setConnectionSuccess,
  };

  return (
    <div className="App">
      <Header />
      <RemoteContext.Provider value={remoteContextValue}>
        {/* Main Menu */}

        {isLocal === undefined ? (
          <Menu />
        ) : isLocal === false && connectionSuccess === undefined ? (
          <RemoteMenu />
        ) : isLocal === false && connectionSuccess === false ? (
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        ) : (
          <LocalGame />
        )}

      </RemoteContext.Provider>
    </div>
  );
}

export default App;

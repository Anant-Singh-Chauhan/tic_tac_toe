import { useState } from "react";
import { RemoteContext } from "./store/remote-context";
import LocalGame from "./components/LocalGame";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RemoteMenu from "./components/RemoteMenu";
import RemoteGame from "./components/RemoteGame";

function App() {
  const [isLocal, setIsLocal] = useState(undefined);
  const [showRemoteGameboard, setShowRemoteGameboard] = useState(false);

  function showRemoteGameboardHandler(val, exMsg) {
    if (val === false)
      alert("Remote Connection Failed!, Something Went Wrong : " + exMsg);
    else alert("Finding Players!");

    setShowRemoteGameboard(val);
  }

  const remoteContextValue = {
    isLocal : isLocal,
    roomId:"",
    updateIsLocal : setIsLocal
  };

  return (
    <div className="App">
      <Header />
      <RemoteContext.Provider value={remoteContextValue}>
        {/* Menu and playfield */}
        {isLocal === undefined ? (
          <Menu />
        ) : isLocal === true ? (
          <LocalGame />
        ) : !showRemoteGameboard ? (
          <RemoteMenu remoteCallHandler={showRemoteGameboardHandler} />
        ) : (
          <RemoteGame />
        )}
      </RemoteContext.Provider>
    </div>
  );
}

export default App;

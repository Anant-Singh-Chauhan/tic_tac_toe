import { useState } from "react";
import LocalGame from "./components/LocalGame";
import "./App.css";
import Header from "./components/Header";
import Menu from "./components/Menu";
import RemoteMenu from "./components/RemoteMenu";

function App() {
  // socketClient.emit("add-player","");
  const [isLocal, setIsLocal] = useState(undefined);

  function menuHandler(isLocalSelected){
    setIsLocal(isLocalSelected);
  }

  return (
    
    <div className="App">
      <Header />

      {/* Menu and playfield */}
      {isLocal === undefined ? (
        <Menu menuHandler={menuHandler}/>
      ) : isLocal === true ? (
        <LocalGame />
      ) : (
        <RemoteMenu />
      )}
    </div>
  );
}

export default App;

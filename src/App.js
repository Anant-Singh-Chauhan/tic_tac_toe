import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";

function App() {
  const [activePlayer, setActivePlayer] = useState("X");

  function updateActivePlayer() {
    setActivePlayer((prevActivePlayer) =>
      prevActivePlayer == "X" ? "O" : "X"
    );
  }

  return (
    <div className="App">
      <Header />

      {/* -- InfoBar -- */}
      <div className="infoBar">
        <Player name={"Player-1"} symbol={"X"} isActive={activePlayer == "X"} />
        <Player name={"Player-2"} symbol={"O"} isActive={activePlayer == "O"} />
      </div>

      {/* -- GameBoard -- */}
      <GameBoard
        activePlayerSymbol={activePlayer}
        onUpdateActivePlayer={updateActivePlayer}
      />
    </div>
  );
}

export default App;

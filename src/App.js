import "./App.css";
import Header from "./components/Header";
import Player from "./components/Player";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="infoBar">
          <Player name={"Player-1"} symbol={"X"} />
          <Player name={"Player-2"} symbol={"O"} />
      </div>
    </div>
  );
}

export default App;

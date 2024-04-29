import React, { memo, useContext } from "react";
import logo from "../assets/ttt_logo.webp";
import { RemoteContext } from "../store/remote-context";

const Header = memo(function Header() {
  const { isLocal, updateIsLocal, resetRemoteContext } =
    useContext(RemoteContext);
  return (
    <header>
      <img src={logo} alt="ttt_img" className="header_img" />
      <h1>Tic Tac Toe</h1>
      <div className="player">
        <button
          className="editBtn"
          onClick={() => {
            isLocal && updateIsLocal(undefined);
            isLocal === false && resetRemoteContext();
          }}
        >
          Menu
        </button>
      </div>
    </header>
  );
});

export default Header;

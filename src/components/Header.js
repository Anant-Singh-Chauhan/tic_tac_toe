import React from "react";
import logo from "../assets/ttt_logo.webp";

export default function Header() {
  return (
    <header>
      <img src={logo} alt="ttt_img" className="header_img"/>
      <h1>Tic Tac Toe</h1>
    </header>
  );
}

import { createContext } from "react";

export const RemoteContext = createContext({
  isLocal: undefined,
  connectionSuccess : undefined,
  roomId: undefined,
  players : {},
  gameTurns : [],
  updateIsLocal: ()=>{},
  updateConnectionSuccess : ()=>{},
  updateRemoteRoomId : ()=>{},
  updatePlayers : ()=>{},
  updateGameTurns : ()=>{}
});

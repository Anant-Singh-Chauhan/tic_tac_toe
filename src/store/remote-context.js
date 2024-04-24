import { createContext } from "react";

export const RemoteContext = createContext({
  isLocal: undefined,
  connectionSuccess : undefined,
  roomId: undefined,
  remotePlayers : undefined,
  gameTurns : [],
  updateIsLocal: ()=>{},
  updateConnectionSuccess : ()=>{},
  updateRemoteRoomId : ()=>{},
  updateRemotePlayers : ()=>{},
  updateGameTurns : ()=>{}
});

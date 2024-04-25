import { createContext } from "react";

export const RemoteContext = createContext({
  isLocal: undefined,
  connectionSuccess : undefined,
  roomId: undefined,
  nativePlayer: undefined,
  remotePlayers : undefined,
  gameTurns : [],
  updateIsLocal: ()=>{},
  updateConnectionSuccess : ()=>{},
  updateRemoteRoomId : ()=>{},
  updateRemotePlayers : ()=>{},
  updateGameTurns : ()=>{},
  updateNativePlayer : ()=>{},
  resetRemoteContext : ()=>{}
});

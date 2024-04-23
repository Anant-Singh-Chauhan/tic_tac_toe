import { createContext } from "react";

export const RemoteContext = createContext({
  isLocal: undefined,
  connectionSuccess : undefined,
  roomId: undefined,
  updateIsLocal: ()=>{},
  updateConnectionSuccess : ()=>{},
  updateRoomId : ()=>{}
});

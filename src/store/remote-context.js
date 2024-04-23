import { createContext } from "react";

export const RemoteContext = createContext({
  isLocal: undefined,
  roomId: "",
  updateIsLocal: ()=>{},
});

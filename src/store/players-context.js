import { createContext } from "react";

// PLAYER CONTEXT
export const PlayersContext = createContext({
  players : {},
  updatePlayer : ()=>{}
});
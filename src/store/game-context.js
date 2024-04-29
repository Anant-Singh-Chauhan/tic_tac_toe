import { createContext } from "react";

export const GameContext = createContext({
  gameTurns: [],
  updateGameTurns: () => {},
});

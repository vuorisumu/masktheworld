import { createContext, useContext } from "react";
import type { Block, Position } from "./types";

interface LevelContextType {
  playerPos: Position;
  setPlayerPos: (pos: Position) => void;
  currentMap: Block[][];
}

const defaultContext: LevelContextType = {
  playerPos: { x: 0, y: 0 },
  setPlayerPos: () => {},
  currentMap: [[]],
};

const LevelContext = createContext<LevelContextType>(defaultContext);
export const useLevelContext = () => useContext(LevelContext);
export default LevelContext;

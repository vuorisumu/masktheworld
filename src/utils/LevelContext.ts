import { createContext, useContext } from "react";
import type { Block, Position } from "./types";

interface LevelContextType {
  playerPos: Position;
  setPlayerPos: (pos: Position) => void;
  currentMap: Block[][];
  getBlock: (x: number, y: number) => Block;
}

const defaultContext: LevelContextType = {
  playerPos: { x: 0, y: 0 },
  setPlayerPos: () => {},
  currentMap: [[]],
  getBlock: () => {
    return { solid: true, name: "wall", fall: false };
  }
};

const LevelContext = createContext<LevelContextType>(defaultContext);
export const useLevelContext = () => useContext(LevelContext);
export default LevelContext;

import { createContext, useContext } from "react";
import type { Block, MapType, MaskType } from "./types";

interface GameContextType {
  mask: MaskType;
  setMask: (mask: MaskType) => void;
  stage: number;
  stageUp: () => void;
  stageDown: () => void;
  currentMap: Block[][];
  currentStageMaps: MapType[];
  getBlock: (x: number, y: number) => Block;
}

const defaultContext: GameContextType = {
  mask: "normal",
  setMask: () => {},
  stage: 0,
  stageUp: () => {},
  stageDown: () => {},
  currentMap: [[]],
  currentStageMaps: [{ stage: 0, mask: "normal", file: "" }],
  getBlock: () => {
    return { solid: true, name: "wall" };
  },
};

const GameContext = createContext<GameContextType>(defaultContext);
export const useGameContext = () => useContext(GameContext);
export default GameContext;

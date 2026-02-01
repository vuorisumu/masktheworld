import { createContext, useContext } from "react";
import type { Block, ItemType, MapType, MaskType } from "./types";

interface GameContextType {
  mask: MaskType;
  setMask: (mask: MaskType) => void;
  stage: number;
  stageUp: () => void;
  stageDown: () => void;
  currentMap: Block[][];
  currentStageMaps: MapType[];
  currentStageItems?: ItemType[];
  getBlock: (x: number, y: number) => Block;
  setItemPos: (id: number, x: number, y: number) => void;
  resetAllItems: () => void;
  activateBlock: (id: string) => void;
  activatable?: Block[];
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
    return { id: "", solid: true, name: "wall", fall: false };
  },
  setItemPos: () => {},
  resetAllItems: () => {},
  activateBlock: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);
export const useGameContext = () => useContext(GameContext);
export default GameContext;

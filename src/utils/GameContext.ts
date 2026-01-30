import { createContext, useContext } from "react";

export type MaskType = "normal" | "other";
interface GameContextType {
  mask: MaskType;
  setMask: (mask: MaskType) => void;
  stage: number;
  stageUp: () => void;
  stageDown: () => void;
}

const defaultContext: GameContextType = {
  mask: "normal",
  setMask: () => {},
  stage: 0,
  stageUp: () => {},
  stageDown: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);
export const useGameContext = () => useContext(GameContext);
export default GameContext;

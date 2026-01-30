import { createContext, useContext } from "react";

export type MaskType = "normal" | "other";
interface GameContextType {
  mask: MaskType;
  setMask: (mask: MaskType) => void;
}

const defaultContext: GameContextType = {
  mask: "normal",
  setMask: () => {},
};

const GameContext = createContext<GameContextType>(defaultContext);
export const useGameContext = () => useContext(GameContext);
export default GameContext;

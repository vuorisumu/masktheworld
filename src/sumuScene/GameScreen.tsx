import { useState } from "react";
import GameContext, { type MaskType } from "../utils/GameContext";
import MaskButtons from "./MaskButtons";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");

  return (
    <GameContext.Provider value={{ mask, setMask }}>
      <MaskButtons />
      <div>
        <p>Morjesta pöytään</p>
      </div>
    </GameContext.Provider>
  );
}

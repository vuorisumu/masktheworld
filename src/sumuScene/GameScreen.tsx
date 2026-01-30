import { useState } from "react";
import GameContext, { type MaskType } from "../utils/GameContext";
import MaskButtons from "./MaskButtons";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");
  const [stage, setStage] = useState(0);

  const stageUp = () => {
    setStage(stage + 1);
  };

  const stageDown = () => {
    setStage(stage - 1);
  };

  return (
    <GameContext.Provider value={{ mask, setMask, stage, stageUp, stageDown }}>
      <MaskButtons />
      <div>
        <p>Morjesta pöytään</p>
      </div>
    </GameContext.Provider>
  );
}

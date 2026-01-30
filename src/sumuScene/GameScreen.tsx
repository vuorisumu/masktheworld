import { useState } from "react";
import GameContext from "../utils/GameContext";
import type { MaskType } from "../utils/types";
import LevelScreen from "./LevelScreen";
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
      <LevelScreen />
      <div>
        <p>Morjesta pöytään</p>
      </div>
    </GameContext.Provider>
  );
}

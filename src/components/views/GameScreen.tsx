import { useState } from "react";
import LevelScreen from "../../sumuScene/LevelScreen";
import MaskButtons from "../../sumuScene/MaskButtons";
import { useAppContext } from "../../utils/AppContext";
import GameContext from "../../utils/GameContext";
import type { MaskType } from "../../utils/types";
import ButtonPrompt from "../ButtonPrompt";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");
  const [stage, setStage] = useState(0);
  const { changeScene } = useAppContext();

  const stageUp = () => {
    setStage(stage + 1);
  };

  const stageDown = () => {
    setStage(stage - 1);
  };

  const quitGame = () => {
    changeScene("start");
  };

  return (
    <GameContext.Provider value={{ mask, setMask, stage, stageUp, stageDown }}>
      <MaskButtons />
      <LevelScreen />
      <ButtonPrompt buttonText="Luovuta" onConfirm={quitGame} promptText="U SURE??" />
    </GameContext.Provider>
  );
}

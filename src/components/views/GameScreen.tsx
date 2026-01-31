import { useMemo, useState } from "react";
import Test from "../../pateScene/Test";
import MaskButtons from "../../sumuScene/MaskButtons";
import { useAppContext } from "../../utils/AppContext";
import GameContext from "../../utils/GameContext";
import { type Block, type MapType, type MaskType } from "../../utils/types";
import ButtonPrompt from "../ButtonPrompt";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");
  const [stage, setStage] = useState(0);
  const { changeScene, allMaps } = useAppContext();

  const currentStageMaps = useMemo<MapType[]>(() => {
    return allMaps.filter((m) => m.stage === stage);
  }, [stage, allMaps]);

  const currentMap = useMemo<Block[][]>(() => {
    const match = allMaps.find((m) => m.stage === stage && m.mask === mask);
    if (match && match.level) {
      console.log("Currently used level has changed", match);
      return match.level;
    } else {
      console.log("No map associated with stage", stage, "and mask", mask);
    }
    return [[]];
  }, [stage, mask, allMaps]);

  const getBlock = (x: number, y: number) => {
    return currentMap[x][y];
  };

  const stageUp = () => {
    setStage(stage + 1);
  };

  const stageDown = () => {
    setStage(stage - 1);
  };

  const quitGame = () => {
    changeScene("menu");
  };

  return (
    <GameContext.Provider
      value={{ mask, setMask, stage, stageUp, stageDown, currentMap, currentStageMaps, getBlock }}
    >
      <MaskButtons />
      <Test />
      <ButtonPrompt buttonText="Luovuta" onConfirm={quitGame} promptText="U SURE??" />
    </GameContext.Provider>
  );
}

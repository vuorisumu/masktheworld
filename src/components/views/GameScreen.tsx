import { useMemo, useState } from "react";
import Test from "../../pateScene/Test";
import MaskButtons from "../../sumuScene/MaskButtons";
import { useAppContext } from "../../utils/AppContext";
import GameContext from "../../utils/GameContext";
import { type Block, type ItemType, type MapType, type MaskType } from "../../utils/types";
import ButtonPrompt from "../ButtonPrompt";
import Clock from "../Clock";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");
  const [stage, setStage] = useState(0);
  const { changeScene, allMaps } = useAppContext();
  const [tick, setTick] = useState(0);
  const [allItems, setAllItems] = useState<ItemType[]>([
    { id: 1, item: "box", x: 2, y: 2, level: 0, mask: "normal" },
    { id: 2, item: "box", x: 3, y: 2, level: 0, mask: "other" },
  ]);

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

  const currentStageItems = useMemo<ItemType[]>(() => {
    const matches = allItems.filter((m) => m.level === stage && m.mask === mask);
    return matches;
  }, [stage, mask, allItems]);

  const getBlock = (x: number, y: number) => {
    const hasItem = currentStageItems.find((i) => i.x === x && i.y === y);
    if (hasItem) console.log("HAS ITEM!!!!");
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

  const addTick = () => {
    setTick((prev) => prev + 1);
  };

  return (
    <GameContext.Provider
      value={{ mask, setMask, stage, stageUp, stageDown, currentMap, currentStageMaps, getBlock }}
    >
      <Clock refresh={tick} />
      <MaskButtons />
      <Test onChange={() => addTick()} />
      <ButtonPrompt buttonText="Luovuta" onConfirm={quitGame} promptText="U SURE??" />
    </GameContext.Provider>
  );
}

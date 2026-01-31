import { useMemo, useState, type CSSProperties } from "react";
import logo from "../../assets/Spr_LOGO.png";
import Test from "../../pateScene/Test";
import MaskButtons from "../../sumuScene/MaskButtons";
import { useAppContext } from "../../utils/AppContext";
import GameContext from "../../utils/GameContext";
import { initItems } from "../../utils/itemSpawns";
import { type Block, type ItemType, type MapType, type MaskType } from "../../utils/types";
import ButtonPrompt from "../ButtonPrompt";
import Clock from "../Clock";

export default function GameScreen() {
  const [mask, setMask] = useState<MaskType>("normal");
  const [stage, setStage] = useState(0);
  const { changeScene, allMaps } = useAppContext();
  const [tick, setTick] = useState(0);
  const [allItems, setAllItems] = useState<ItemType[]>(initItems);
  const [interactedBlocks, setInteractedBlocks] = useState<string[]>([]);

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
    const itemFound = currentStageItems.find((i) => i.x === x && i.y === y);
    const curr = currentMap[x][y];
    const arr = ["button", "door"];
    let activated = false;
    if (arr.includes(curr.name)) {
      if (interactedBlocks.includes(curr.id)) activated = true;
    }
    return {
      ...curr,
      ...(itemFound && { item: { id: itemFound.id, name: itemFound.item } }),
      ...(arr.includes(curr.name) && { activated }),
    };
    // if (itemFound) {
    //   const curr = currentMap[x][y];
    //   return { ...curr, item: { id: itemFound.id, name: itemFound.item } };
    // }
    // return currentMap[x][y];
  };

  const setItemPos = (itemID: number, x: number, y: number) => {
    setAllItems((prev) =>
      prev.map((m) => {
        if (m.id === itemID) return { ...m, x, y };
        return m;
      }),
    );
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

  const resetAllItems = () => {
    setAllItems(initItems);
  };

  const activateBlock = (id: string) => {
    if (interactedBlocks.includes(id)) {
      setInteractedBlocks((prev) => prev.filter((i) => i !== id));
    } else {
      setInteractedBlocks((prev) => [...prev, id]);
    }
  };

  return (
    <GameContext.Provider
      value={{
        mask,
        setMask,
        stage,
        stageUp,
        stageDown,
        currentMap,
        currentStageMaps,
        currentStageItems,
        getBlock,
        setItemPos,
        resetAllItems,
        activateBlock,
      }}
    >
      <div style={styles.menu}>
        <img src={logo} />
        <MaskButtons />
        <Clock refresh={tick} />
      </div>
      <Test onChange={() => addTick()} />
      <ButtonPrompt buttonText="Luovuta" onConfirm={quitGame} promptText="U SURE??" />
    </GameContext.Provider>
  );
}

const styles: { [key: string]: CSSProperties } = {
  menu: {
    display: "flex",
    flexDirection: "row",
    height: "100px",
    gap: 20,
    alignContent: "center",
    paddingBottom: 10,
  },
};

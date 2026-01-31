import { useState } from "react";
import Test from "../pateScene/Test";
import LevelContext from "../utils/LevelContext";
import { useGetMap } from "../utils/TextMapper";
import { type Position } from "../utils/types";

export default function LevelScreen() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const currentMap = useGetMap();

  const getBlock = (x: number, y: number) => {
    return currentMap[x][y];
  };

  return (
    <LevelContext.Provider value={{ playerPos, setPlayerPos, currentMap, getBlock }}>
      <Test />
    </LevelContext.Provider>
  );
}

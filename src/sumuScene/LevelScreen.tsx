import { useMemo, useState } from "react";
import Test from "../pateScene/Test";
import LevelContext from "../utils/LevelContext";
import { useGetMap } from "../utils/TextMapper";
import { type Block, type Position } from "../utils/types";

export default function LevelScreen() {
  const [playerPos, setPlayerPos] = useState<Position>({ x: 0, y: 0 });
  const mapTest = useGetMap();

  const currentMap = useMemo<Block[][]>(() => {
    return mapTest.map((row) =>
      row.map((col) => {
        switch (col) {
          case "X":
            return { solid: true, name: "wall" };
          case "-":
            return { solid: false, name: "floor" };
          default:
            return { solid: false, name: "floor" };
        }
      }),
    );
  }, [mapTest]);

  return (
    <LevelContext.Provider value={{ playerPos, setPlayerPos, currentMap }}>
      <Test />
    </LevelContext.Provider>
  );
}

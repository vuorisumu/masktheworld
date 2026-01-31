import { useMemo } from "react";
import { useGameContext } from "./GameContext";
import type { Block, MapType } from "./types";

export function useGetMap(): Block[][] {
  const { mask, stage } = useGameContext();
  const allMaps = useMemo<MapType[]>(() => {
    return [
      { stage: 0, mask: "normal", file: "stage0base" },
      { stage: 0, mask: "other", file: "stage0masked" },
      { stage: 1, mask: "normal", file: "mapTest" },
      { stage: 1, mask: "other", file: "maskedLevel" },
    ];
  }, []);

  const maps = useMemo<MapType[]>(() => {
    const mapArr: MapType[] = [];
    allMaps.forEach(async (obj) => {
      const r = await fetch(`${obj.file}.txt`);
      const txt = await r.text();
      const processed = txt.split("\n").map((r) => r.split(""));
      const level = processed.map((row) =>
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
      mapArr.push({ ...obj, level });
    });
    return mapArr;
  }, [allMaps]);

  return useMemo<Block[][]>(() => {
    const match = maps.find((m) => m.stage === stage && m.mask === mask);
    if (match && match.level) {
      console.log("Currently used level has changed", match);
      return match.level;
    } else {
      console.log("No map associated with stage", stage, "and mask", mask);
    }
    return [[]];
  }, [stage, mask, maps]);
}

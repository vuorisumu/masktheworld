import { useEffect, useMemo, useState } from "react";
import { useGameContext } from "./GameContext";
import type { Block, MapType } from "./types";

export function useGetMap(): Block[][] {
  const { mask, stage } = useGameContext();
  const [allMaps, setAllMaps] = useState<MapType[]>([]);

  useEffect(() => {
    const maps: MapType[] = [
      { stage: 0, mask: "normal", file: "stage0base" },
      { stage: 0, mask: "other", file: "stage0masked" },
      { stage: 1, mask: "normal", file: "mapTest" },
      { stage: 1, mask: "other", file: "maskedLevel" },
    ];

    const loadMaps = async () => {
      const loaded = await Promise.all(
        maps.map(async (map) => {
          const r = await fetch(`${map.file}.txt`);
          const txt = await r.text();
          const level: Block[][] = txt
            .trim()
            .split("\n")
            .map((row) =>
              row
                .split("")
                .filter((v) => v !== "\r")
                .map((col) => {
                  console.log(col);
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

          return { ...map, level };
        }),
      );

      setAllMaps(loaded);
    };

    loadMaps();
  }, []);

  return useMemo<Block[][]>(() => {
    const match = allMaps.find((m) => m.stage === stage && m.mask === mask);
    if (match && match.level) {
      console.log("Currently used level has changed", match);
      return match.level;
    } else {
      console.log("No map associated with stage", stage, "and mask", mask);
    }
    return [[]];
  }, [stage, mask, allMaps]);
}

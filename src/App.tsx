import { useEffect, useState } from "react";
import "./App.css";
import ScreenHandler from "./sumuScene/ScreenHandler";
import AppContext from "./utils/AppContext";
import { type Block, type MapType, type ScreenName } from "./utils/types";

function App() {
  const [screen, setScreen] = useState<ScreenName>("start");
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
                    case "T":
                      return { solid: true, name: "topwall" };
                    case "M":
                      return { solid: true, name: "cwall" };
                    case "Y":
                      return { solid: true, name: "ctopwall" };
                    case "-":
                      return { solid: false, name: "floor" };
                    case ".":
                      return { solid: false, name: "cfloor" };
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

  const changeScene = (newScreen: ScreenName) => {
    // virheidenhallinta tänne
    setScreen(newScreen);
  };

  return (
    <AppContext.Provider value={{ screen, changeScene, allMaps }}>
      <ScreenHandler />
    </AppContext.Provider>
  );
}

export default App;

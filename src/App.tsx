import { useEffect, useState } from "react";
import "./App.css";
import { MusicProvider } from "./pateScene/MusicProvider";
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
        maps.map(async (map, a) => {
          const r = await fetch(`${map.file}.txt`);
          const txt = await r.text();
          const level: Block[][] = txt
            .trim()
            .split("\n")
            .map((row, b) =>
              row
                .split("")
                .filter((v) => v !== "\r")
                .map((col, c) => {
                  const id = `${a}-${b}-${c}`;
                  switch (col) {
                    case "X":
                      return { id, solid: true, name: "wall", fall: false };
                    case "T":
                      return { id, solid: true, name: "topwall", fall: false };
                    case "M":
                      return { id, solid: true, name: "cwall", fall: false };
                    case "Y":
                      return { id, solid: true, name: "ctopwall", fall: false };
                    case "-":
                      return { id, solid: false, name: "floor", fall: false };
                    case ".":
                      return { id, solid: false, name: "cfloor", fall: false };
                    case "A":
                      return { id, solid: false, name: "hole", fall: true };
                    case "O":
                      return { id, solid: false, name: "ehole", fall: true };
                    case "Ö":
                      return { id, solid: false, name: "chole", fall: true };
                    case "E":
                      return { id, solid: false, name: "exit", fall: false };
                    case "C":
                      return { id, solid: false, name: "cexit", fall: false };
                    case "D":
                      return { id, solid: true, name: "door", fall: false, activated: false };
                    case "B":
                      return { id, solid: true, name: "cdoor", fall: false, activated: false };
                    // case "*":
                    //   return { id, solid: false, name: "button", fall: false, activated: false };
                    // case "^":
                    //   return { id, solid: false, name: "cbutton", fall: false, activated: false };
                    case "1":
                      return { id, solid: false, name: "spike1", fall: false, activated: false };
                    case "2":
                      return { id, solid: false, name: "cspike1", fall: false, activated: false };
                    case "I":
                      return { id, solid: false, name: "button1", fall: false, activated: false };
                    case "J":
                      return { id, solid: false, name: "cbutton1", fall: false, activated: false };
                    case "3":
                      return { id, solid: false, name: "spike2", fall: false, activated: false };
                    case "4":
                      return { id, solid: false, name: "cspike2", fall: false, activated: false };
                    case "N":
                      return { id, solid: false, name: "button2", fall: false, activated: false };
                    case "H":
                      return { id, solid: false, name: "cbutton2", fall: false, activated: false };
                    default:
                      return { id, solid: false, name: "floor", fall: false };
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
      <MusicProvider>
        <ScreenHandler />
      </MusicProvider>
    </AppContext.Provider>
  );
}

export default App;

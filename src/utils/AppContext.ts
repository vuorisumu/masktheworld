import { createContext, useContext } from "react";
import type { MapType, ScreenName } from "./types";

interface AppContextType {
  screen: ScreenName;
  changeScene: (newScene: ScreenName) => void;
  allMaps: MapType[];
}

const defaultContext: AppContextType = {
  screen: "start",
  changeScene: () => {},
  allMaps: [],
};

const AppContext = createContext<AppContextType>(defaultContext);
export const useAppContext = () => useContext(AppContext);
export default AppContext;

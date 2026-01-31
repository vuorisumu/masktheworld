import { createContext, useContext } from "react";
import type { ScreenName } from "./types";

interface AppContextType {
  screen: ScreenName;
  changeScene: (newScene: ScreenName) => void;
}

const defaultContext: AppContextType = {
  screen: "start",
  changeScene: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);
export const useAppContext = () => useContext(AppContext);
export default AppContext;

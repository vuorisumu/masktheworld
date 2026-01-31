import { useState } from "react";
import "./App.css";
import ScreenHandler from "./sumuScene/ScreenHandler";
import AppContext from "./utils/AppContext";
import { type ScreenName } from "./utils/types";

function App() {
  const [screen, setScreen] = useState<ScreenName>("start");

  const changeScene = (newScreen: ScreenName) => {
    // virheidenhallinta tänne
    setScreen(newScreen);
  };

  return (
    <AppContext.Provider value={{ screen, changeScene }}>
      <ScreenHandler />
    </AppContext.Provider>
  );
}

export default App;

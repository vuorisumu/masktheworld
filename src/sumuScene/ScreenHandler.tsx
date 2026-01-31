import GameScreen from "../components/views/GameScreen";
import MenuScreen from "../components/views/MenuScreen";
import PlayScreen from "../components/views/PlayScreen";
import SettingsScreen from "../components/views/SettingsScreen";
import { useAppContext } from "../utils/AppContext";

export default function ScreenHandler() {
  const { screen } = useAppContext();
  switch (screen) {
    case "start":
      return <PlayScreen />;
    case "menu":
      return <MenuScreen />;
    case "game":
      return <GameScreen />;
    case "settings":
      return <SettingsScreen />;
    default:
      return <MenuScreen />;
  }
}

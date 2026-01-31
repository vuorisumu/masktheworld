import GameScreen from "../components/views/GameScreen";
import MenuScreen from "../components/views/MenuScreen";
import { useAppContext } from "../utils/AppContext";

export default function ScreenHandler() {
  const { screen } = useAppContext();
  switch (screen) {
    case "start":
      return <MenuScreen />;
    case "game":
      return <GameScreen />;
    default:
      return <MenuScreen />;
  }
}

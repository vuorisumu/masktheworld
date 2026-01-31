import MenuScreen from "../components/views/MenuScreen";
import GameScreen from "./GameScreen";

type Props = {
  tabName: string;
};
export default function ScreenHandler({ tabName }: Props) {
  switch (tabName) {
    case "start":
      return <MenuScreen />;
    case "game":
      return <GameScreen />;
    default:
      return <MenuScreen />;
  }
}

import { useAppContext } from "../../utils/AppContext";

export default function SettingsScreen() {
  const { changeScene } = useAppContext();

  return (
    <div>
      <p>Settings!</p>
      <button type='button' onClick={() => changeScene("menu")}>
        BACK
      </button>
    </div>
  );
}

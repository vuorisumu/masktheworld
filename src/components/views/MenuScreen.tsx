import { useAppContext } from "../../utils/AppContext";

export default function MenuScreen() {
  const { changeScene } = useAppContext();

  return (
    <div>
      <p>Täältä alotetaan peli</p>
      <button type="button" onClick={() => changeScene("game")}>
        GAME ON
      </button>
    </div>
  );
}

import { useAppContext } from "../../utils/AppContext";
import useMusic from "../../utils/useMusic";

export default function MenuScreen() {
  const { changeScene } = useAppContext();
  const { playClick } = useMusic();

  return (
    <div>
      <p>Täältä alotetaan peli</p>
      <button type='button' onClick={() => changeScene("game")}>
        GAME ON
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          playClick();
        }}
      >
        Test
      </button>
      <button
        type='button'
        onClick={() => {
          playClick();
          changeScene("settings");
        }}
      >
        SET THINGS
      </button>
    </div>
  );
}

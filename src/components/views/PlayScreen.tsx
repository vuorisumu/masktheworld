import { useAppContext } from "../../utils/AppContext";

export default function PlayScreen() {
  const { changeScene } = useAppContext();

  return (
    <div>
      <img
        src='/playbutton.png'
        style={{ width: "10rem", cursor: "pointer" }}
        onClick={() => changeScene("menu")}
      />
    </div>
  );
}

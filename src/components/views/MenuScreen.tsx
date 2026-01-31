import type { CSSProperties } from "react";
import logo from "../../assets/Spr_LOGO.png";
import { useAppContext } from "../../utils/AppContext";
import useMusic from "../../utils/useMusic";

export default function MenuScreen() {
  const { changeScene } = useAppContext();
  const { playClick } = useMusic();

  return (
    <div>
      <div style={{ marginBottom: 20, marginTop: 10 }}>
        <p style={styles.titleText}>15K KG DYNAMIITTIA</p>
        <p style={styles.titlePlus}>PRESENTS:</p>
        <img src={logo} style={{ marginTop: 10 }} />
      </div>
      <div>
        <button type="button" onClick={() => changeScene("game")} style={styles.button}>
          <p style={styles.buttonText}>GAME ON</p>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault();
            playClick();
          }}
          style={styles.button}
        >
          <p style={styles.buttonText}>Test</p>
        </button>
        <button
          type="button"
          onClick={() => {
            playClick();
            changeScene("settings");
          }}
          style={styles.button}
        >
          <p style={styles.buttonText}>SET THINGS</p>
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  titleText: {
    fontSize: 32,
    color: "white",
    fontFamily: "monospace",
    fontWeight: 800,
    margin: 0,
  },
  titlePlus: {
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: 600,
    margin: 0,
  },
  button: {
    padding: "10px 15px",
    borderRadius: 10,
    backgroundColor: "#c79d8b",
    boxShadow: "inset -4px -3px #876354",
    border: 0,
    marginRight: 10,
  },
  buttonText: {
    fontWeight: 600,
    fontSize: 16,
    padding: 0,
    margin: 0,
    color: "#240c0a",
    fontFamily: "monospace",
  },
  in_use: {
    backgroundColor: "#664f4d",
    boxShadow: "inset 4px 3px #614846",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  maskTitle: {
    margin: 0,
    padding: 10,
    fontSize: 16,
    fontFamily: "monospace",
    fontWeight: 600,
  },
};

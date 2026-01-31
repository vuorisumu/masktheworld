import type { CSSProperties } from "react";
import { useGameContext } from "../utils/GameContext";
import type { Mask, MaskType } from "../utils/types";

export default function MaskButtons() {
  const { mask, setMask, stage, stageUp, stageDown } = useGameContext();
  const allMasks: Mask[] = [
    { name: "normal", level: 0 },
    { name: "other", level: 1 },
    { name: "best", level: 2 },
  ];

  const changeMask = (newMask: MaskType) => {
    setMask(newMask);
  };

  return (
    <div style={styles.row}>
      <div>
        <p style={styles.maskTitle}>Masks</p>
        {allMasks
          .filter((m) => m.level <= stage)
          .map((maskOption) => (
            <button
              type="button"
              onClick={() => changeMask(maskOption.name)}
              key={`btn-${maskOption.name}`}
              style={{ ...styles.button, ...(mask === maskOption.name && { ...styles.in_use }) }}
            >
              <p style={styles.buttonText}>{maskOption.name}</p>
            </button>
          ))}
      </div>

      <div>
        <p>Current level: {stage}</p>
        <button type="button" onClick={() => stageUp()}>
          +
        </button>
        <button type="button" onClick={() => stageDown()}>
          -
        </button>
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
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

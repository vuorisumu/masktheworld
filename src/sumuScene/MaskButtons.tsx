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
    <div>
      <div>
        <h3>For testing levels:</h3>
        <p>Current level: {stage}</p>
        <button type="button" onClick={() => stageUp()}>
          +
        </button>
        <button type="button" onClick={() => stageDown()}>
          -
        </button>
      </div>

      <div>
        <h3>Masks</h3>

        {allMasks
          .filter((m) => m.level <= stage)
          .map((maskOption) => (
            <button
              type="button"
              onClick={() => changeMask(maskOption.name)}
              key={`btn-${maskOption.name}`}
              style={mask === maskOption.name ? styles.in_use : {}}
            >
              {maskOption.name}
            </button>
          ))}
      </div>
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  in_use: {
    backgroundColor: "blue",
  },
};

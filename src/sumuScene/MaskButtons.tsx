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
      <button type="button" onClick={() => stageUp()}>
        +
      </button>
      <button type="button" onClick={() => stageDown()}>
        -
      </button>
      {allMasks
        .filter((m) => m.level <= stage)
        .map((maskOption) => (
          <button
            type="button"
            onClick={() => changeMask(maskOption.name)}
            key={`btn-${maskOption.name}`}
          >
            {mask === maskOption.name && "In use"}
            {maskOption.name}
          </button>
        ))}
    </div>
  );
}

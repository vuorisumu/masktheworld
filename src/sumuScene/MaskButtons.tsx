import { useGameContext, type MaskType } from "../utils/GameContext";

export default function MaskButtons() {
  const { mask, setMask } = useGameContext();
  const availableMasks: MaskType[] = ["normal", "other"];

  const changeMask = (newMask: MaskType) => {
    setMask(newMask);
  };
  return (
    <div>
      {availableMasks.map((maskOption) => (
        <button type="button" onClick={() => changeMask(maskOption)}>
          {mask === maskOption && "In use"}
          {maskOption}
        </button>
      ))}
    </div>
  );
}

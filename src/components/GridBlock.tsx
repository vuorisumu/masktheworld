import type { Block } from "../utils/types";
import PlayerTile from "./PlayerTile";

type Props = {
  block: Block;
  hasPlayer?: boolean;
};
export default function GridBlock({ block, hasPlayer }: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: "30px",
        height: "30px",
        border: "1px solid white",
        backgroundColor: block.solid ? "grey" : "black",
      }}
    >
      {hasPlayer && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "green",
          }}
        >
          <PlayerTile />
        </div>
      )}
    </div>
  );
}

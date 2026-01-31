import type { CSSProperties } from "react";
import { getBlockSprite } from "../utils/getBlockSprite";
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
        width: "36px",
        height: "36px",
        // border: "1px solid white",
        backgroundColor: block.solid ? "grey" : "black"
      }}
    >
      <div>
        <img src={getBlockSprite(block.name)} style={styles.image} />
      </div>
      {hasPlayer && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%"
          }}
        >
          <PlayerTile />
        </div>
      )}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  image: {
    width: "100%",
    height: "100%"
  }
};

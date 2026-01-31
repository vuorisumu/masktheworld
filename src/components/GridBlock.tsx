import type { CSSProperties } from "react";
import { getBlockSprite } from "../utils/getBlockSprite";
import type { Block } from "../utils/types";

type Props = {
  block: Block;
  hasPlayer?: boolean;
  size: number;
};
export default function GridBlock({ block, hasPlayer, size }: Props) {
  return (
    <div
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        // border: "1px solid white",
        backgroundColor: block.solid ? "grey" : "black",
      }}
    >
      <div>
        <img src={getBlockSprite(block.name, block.activated)} style={styles.image} />
      </div>
      {hasPlayer && (
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
            height: "100%",
            zIndex: 3,
          }}
        ></div>
      )}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  image: {
    width: "100%",
    height: "100%",
  },
};

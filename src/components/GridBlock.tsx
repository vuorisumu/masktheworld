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
      <div style={{ position: "relative" }}>
        <img src={getBlockSprite(block.name, block.activated)} style={styles.image} />
        {["button1", "cbutton1", "button2", "cbutton2"].includes(block.name) && (
          <img
            src={getBlockSprite("btn")}
            style={{ ...styles.image, position: "absolute", top: 0, left: 0 }}
          />
        )}
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

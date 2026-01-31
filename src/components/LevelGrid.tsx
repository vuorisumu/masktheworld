import { useEffect, useState, type CSSProperties } from "react";
import { useGameContext } from "../utils/GameContext";
import type { Position } from "../utils/types";
import GridBlock from "./GridBlock";
import PlayerTile from "./PlayerTile";

type Props = {
  playerPos: { x: number; y: number };
  anim: "idle" | "fall";
  resetPlayer: () => void;
};

export default function LevelGrid({ playerPos, anim, resetPlayer }: Props) {
  const gridBlockSize = 50;
  const { currentMap, getBlock } = useGameContext();
  const [falling, setFalling] = useState<boolean>(false);

  const samePos = (a: Position, b: Position) => {
    return a.x === b.x && a.y === b.y;
  };

  useEffect(() => {
    // if (anim === "fall") {
    //   console.log("falling!");
    //   setFalling(true);
    //   const t = setTimeout(() => {
    //     setFalling(false);
    //     resetAnim();
    //   }, 1250);
    //   return () => clearTimeout(t);
    // } else if (anim === "idle") {
    //   console.log("idling");
    // }
  }, [anim]);

  useEffect(() => {
    console.log(playerPos, getBlock(playerPos.y, playerPos.x + 1));

    if (getBlock(playerPos.y, playerPos.x).fall) {
      setFalling(true);

      const t = setTimeout(() => {
        setFalling(false);
        resetPlayer();
      }, 1250);
      return () => clearTimeout(t);
    }
  }, [playerPos]);

  return (
    <div style={{ position: "relative" }}>
      {currentMap.map((row, i) => (
        <div key={i} style={styles.row}>
          {row.map((col, j) => (
            <div key={j} style={styles.col}>
              <GridBlock
                size={gridBlockSize}
                block={col}
                hasPlayer={samePos({ x: j, y: i }, playerPos)}
              />
            </div>
          ))}
        </div>
      ))}
      <div
        style={{
          position: "absolute",
          width: `${gridBlockSize}px`,
          height: `${gridBlockSize}px`,
          //backgroundColor: "white",
          top: 0,
          left: 0,
          transform: `translate(${playerPos.x * gridBlockSize}px, ${
            playerPos.y * gridBlockSize
          }px)`,
          opacity: falling ? "0" : "1",
          transition: `transform 0.15s ease-out, opacity ${
            falling ? "1s" : "0.1s"
          } ease-in ${falling ? "0s" : "0.1s"}`,
          zIndex: 3
        }}
      >
        <div
          style={{
            transform: `scale(${falling ? "0" : "1"}) rotate(${
              falling ? "45deg" : "0deg"
            })`,
            transition: falling ? "transform 1s ease-in" : "none",
            transitionDelay: falling ? "0.05s" : "0s"
          }}
        >
          <PlayerTile />
        </div>
      </div>
    </div>
  );
}
const styles: { [key: string]: CSSProperties } = {
  row: {
    display: "flex",
    flexDirection: "row"
  },
  col: {
    display: "flex",
    flexDirection: "column"
  }
};

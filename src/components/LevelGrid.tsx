import { useEffect, useState, type CSSProperties } from "react";
import { useGameContext } from "../utils/GameContext";
import type { Position } from "../utils/types";
import GridBlock from "./GridBlock";
import PlayerTile from "./PlayerTile";
import BoxSpr from "../assets/Spr_Box.png";
import KeySpr from "../assets/Spr_Key.png";
import DynamiteSpr from "../assets/Spr_Dynamite.png";

type Props = {
  playerPos: { x: number; y: number };
  anim: "idle" | "fall";
  resetPlayer: () => void;
};

export default function LevelGrid({ playerPos, anim, resetPlayer }: Props) {
  const gridBlockSize = 50;
  const { currentMap, getBlock, currentStageItems, stageUp } = useGameContext();
  const [falling, setFalling] = useState<boolean>(false);
  const [fade, setFade] = useState<boolean>(false);

  const samePos = (a: Position, b: Position) => {
    return a.x === b.x && a.y === b.y;
  };

  useEffect(() => {
    //    console.log(playerPos, getBlock(playerPos.y, playerPos.x + 1));
    if (["exit", "cexit"].includes(getBlock(playerPos.y, playerPos.x).name)) {
      setFade(true);
      const t = setTimeout(() => {
        stageUp();
        resetPlayer();
        const w = setTimeout(() => {
          setFade(false);
        }, 150);
        return () => clearTimeout(w);
      }, 350);
      return () => clearTimeout(t);
    }
    if (getBlock(playerPos.y, playerPos.x).fall) {
      setFalling(true);

      const t = setTimeout(() => {
        setFalling(false);
        resetPlayer();
      }, 1250);
      return () => clearTimeout(t);
    }
  }, [playerPos, currentMap]);

  return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          opacity: fade ? "1" : "0",
          transition: "opacity 0.35s ease",
          backgroundColor: "black",
          position: "absolute",
          inset: 0,
          zIndex: 50
        }}
      />
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
      {/* Items */}
      {currentStageItems?.map((item) => (
        <div
          key={item.id}
          style={{
            width: `${gridBlockSize}px`,
            height: `${gridBlockSize}px`,
            position: "absolute",
            left: `${item.x * gridBlockSize}px`,
            top: `${item.y * gridBlockSize}px`
            // backgroundColor: "white"
          }}
        >
          <img
            src={getItemSprite(item.item)}
            style={{
              width: "100%",
              height: "100%",
              position: "relative"
            }}
          />
        </div>
      ))}

      {/* Player animations */}
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

const getItemSprite = (name: string) => {
  switch (name) {
    case "box":
      return BoxSpr;
    case "key":
      return KeySpr;
    case "dynamite":
      return DynamiteSpr;
    default:
      return BoxSpr;
      break;
  }
};

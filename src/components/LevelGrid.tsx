import { useEffect, type CSSProperties } from "react";
import { useGameContext } from "../utils/GameContext";
import type { Position } from "../utils/types";
import GridBlock from "./GridBlock";

type Props = {
  playerPos: { x: number; y: number };
};
export default function LevelGrid({ playerPos }: Props) {
  const { currentMap, getBlock } = useGameContext();

  const samePos = (a: Position, b: Position) => {
    return a.x === b.x && a.y === b.y;
  };

  // useEffect(() => {
  //   console.log(playerPos, getBlock(playerPos.y, playerPos.x + 1));
  // }, [playerPos]);

  return (
    <div>
      {currentMap.map((row, i) => (
        <div key={i} style={styles.row}>
          {row.map((col, j) => (
            <div key={j} style={styles.col}>
              <GridBlock
                block={col}
                hasPlayer={samePos({ x: j, y: i }, playerPos)}
              />
            </div>
          ))}
        </div>
      ))}
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

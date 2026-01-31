import { useEffect, useMemo, useState } from "react";
import LevelGrid from "../components/LevelGrid";
import { useLevelContext } from "../utils/LevelContext";
import type { Block } from "../utils/types";
import { useGameContext } from "../utils/GameContext";

interface PlayerProps {
  x: number;
  y: number;
  pastX: number;
  pastY: number;
}

export default function Test() {
  const [player, setPlayer] = useState<PlayerProps>({
    x: 3,
    y: 3,
    pastX: 3,
    pastY: 3
  });

  const { currentMap, getBlock } = useGameContext();
  const width: number = 8;
  const height: number = 8;
  // const playerRight: boolean = useMemo(
  //   () =>
  //     currentMap[0].length ? getBlock(player.x + 1, player.y).solid : true,
  //   [currentMap, player.x, player.y]
  // );
  //console.log(currentMap);

  function canPlayerMove(direction: "up" | "down" | "right" | "left") {
    switch (direction) {
      case "right":
        if (player.x < width - 1 && !getBlock(player.y, player.x + 1).solid) {
          return true;
        }
        return false;
      case "left":
        if (player.x > 0 && !getBlock(player.y, player.x - 1).solid) {
          return true;
        }
        return false;
      case "up":
        if (player.y > 0 && !getBlock(player.y - 1, player.x).solid) {
          return true;
        }
        return false;
      case "down":
        if (player.y < height - 1 && !getBlock(player.y + 1, player.x).solid) {
          return true;
        }
        return false;
    }
  }

  const handlePlayerMove = (direction: "up" | "down" | "right" | "left") => {
    switch (direction) {
      case "right":
        setPlayer({
          ...player,
          pastX: canPlayerMove(direction) ? player.x : player.pastX,

          x: canPlayerMove(direction)
            ? // eslint-disable-next-line react-hooks/immutability
              (player.x += 1)
            : player.x
        });
        break;
      case "left":
        setPlayer({
          ...player,
          pastX: canPlayerMove(direction) ? player.x : player.pastX,
          x: canPlayerMove(direction) ? (player.x -= 1) : player.x
        });
        break;
      case "down":
        setPlayer({
          ...player,
          pastY: canPlayerMove(direction) ? player.y : player.pastY,
          y: canPlayerMove(direction) ? (player.y += 1) : player.y
        });
        break;
      case "up":
        setPlayer({
          ...player,
          pastY: canPlayerMove(direction) ? player.y : player.pastY,
          y: canPlayerMove(direction) ? (player.y -= 1) : player.y
        });
        break;
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "d":
          handlePlayerMove("right");
          break;
        case "a":
          handlePlayerMove("left");
          break;
        case "s":
          handlePlayerMove("down");
          break;
        case "w":
          handlePlayerMove("up");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keyup", handler);
    };
  }, []);

  return <LevelGrid playerPos={player} />;

  // return (
  //   <div>
  //     {currentMap.map((xAxis, i) => (
  //       <div key={i} style={{ display: "flex", flexDirection: "row" }}>
  //         {xAxis.map((yAxis, j) => (
  //           <div key={j} style={{ display: "flex", flexDirection: "column" }}>
  //             <GridBlock
  //               player={i === player.y && j === player.x}
  //               block={currentMap[i][j]}
  //             />
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //   </div>
  // );
}

// function GridBlock({ player, block }: { player: boolean; block: Block }) {
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "30px",
//         height: "30px",
//         border: "1px solid white",
//         backgroundColor: block.solid ? "grey" : "black"
//       }}
//     >
//       {player && (
//         <div
//           style={{
//             position: "absolute",
//             left: 0,
//             top: 0,
//             width: "100%",
//             height: "100%",
//             backgroundColor: "green"
//           }}
//         ></div>
//       )}
//     </div>
//   );
// }

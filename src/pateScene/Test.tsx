import { useCallback, useEffect, useState } from "react";
import LevelGrid from "../components/LevelGrid";
import { useGameContext } from "../utils/GameContext";
import type { Position } from "../utils/types";

interface PlayerProps {
  x: number;
  y: number;
  pastX: number;
  pastY: number;
}

type Props = {
  onChange: (playerPos: Position) => void;
};
export default function Test({ onChange }: Props) {
  const [player, setPlayer] = useState<PlayerProps>({
    x: 3,
    y: 3,
    pastX: 3,
    pastY: 3
  });
  const [disablePlayer, setDisablePlayer] = useState<boolean>(false);
  const [animate, setAnimate] = useState<"idle" | "fall">("idle");

  const { currentStageItems, getBlock, setItemPos, currentMap } =
    useGameContext();
  const width: number = 8;
  const height: number = 8;

  useEffect(() => {
    if (getBlock(player.y, player.x).fall) {
      setDisablePlayer(true);
    }
  }, [player.x, player.y, getBlock, currentMap]);

  useEffect(() => {
    onChange(player);
  }, [player]);

  const canPlayerMove = useCallback(
    (direction: "up" | "down" | "right" | "left") => {
      switch (direction) {
        case "right":
          // Can the player move
          if (player.x < width - 1 && !getBlock(player.y, player.x + 1).solid) {
            // Get item value for block on right
            const blockItem = currentStageItems?.find(
              (it) => it.x === player.x + 1 && it.y === player.y
            );
            // Get item value for second block on right
            const blockItem2 = currentStageItems?.find(
              (it) => it.x === player.x + 2 && it.y === player.y
            );

            // If both are items then cant move
            if (blockItem && blockItem2) {
              return false;
            }

            // Box and key item move logic
            if (blockItem && ["box", "key"].includes(blockItem.item)) {
              // Would the box move outside world limits
              if (player.x < width) {
                // Would block move into wall
                if (!getBlock(player.y, player.x + 2).solid) {
                  setItemPos(blockItem.id, player.x + 2, player.y);
                } else {
                  // Swap places with box
                  setItemPos(blockItem.id, player.x, player.y);
                }
                return true;
              } else {
                return false;
              }
            }
            return true;
          }
          return false;
        case "left":
          // Can the player move
          if (player.x > 0 && !getBlock(player.y, player.x - 1).solid) {
            // Get item value for block on left
            const blockItem = currentStageItems?.find(
              (it) => it.x === player.x - 1 && it.y === player.y
            );
            // Get item value for second block on left
            const blockItem2 = currentStageItems?.find(
              (it) => it.x === player.x - 2 && it.y === player.y
            );

            // If both are items then cant move
            if (blockItem && blockItem2) {
              return false;
            }

            // Box item move logic
            if (blockItem && ["box", "key"].includes(blockItem.item)) {
              // Would the box move outside world limits
              if (player.x < width) {
                // Would block move into wall
                if (!getBlock(player.y, player.x - 2).solid) {
                  setItemPos(blockItem.id, player.x - 2, player.y);
                } else {
                  // Swap places with box
                  setItemPos(blockItem.id, player.x, player.y);
                }
                return true;
              } else {
                return false;
              }
            }
            return true;
          }
          return false;
        case "up":
          // Can the player move
          if (player.y > 0 && !getBlock(player.y - 1, player.x).solid) {
            // Get item value for block on top
            const blockItem = currentStageItems?.find(
              (it) => it.x === player.x && it.y === player.y - 1
            );
            // Get item value for second block on top
            const blockItem2 = currentStageItems?.find(
              (it) => it.x === player.x && it.y === player.y - 2
            );

            // If both are items then cant move
            if (blockItem && blockItem2) {
              return false;
            }

            // Box item move logic
            if (blockItem && ["box", "key"].includes(blockItem.item)) {
              // Would the box move outside world limits
              if (player.y > 1) {
                // Would block move into wall
                if (!getBlock(player.y - 2, player.x).solid) {
                  setItemPos(blockItem.id, player.x, player.y - 2);
                } else {
                  // Swap places with box
                  setItemPos(blockItem.id, player.x, player.y);
                }
                return true;
              } else {
                return false;
              }
            }
            return true;
          }
          return false;
        case "down":
          // Can the player move
          if (
            player.y < height - 1 &&
            !getBlock(player.y + 1, player.x).solid
          ) {
            const blockItem = currentStageItems?.find(
              (it) => it.x === player.x && it.y === player.y + 1
            );
            const blockItem2 = currentStageItems?.find(
              (it) => it.x === player.x && it.y === player.y + 2
            );

            // If both are items then cant move
            if (blockItem && blockItem2) {
              return false;
            }

            // Box item move logic
            if (blockItem && ["box", "key"].includes(blockItem.item)) {
              // Would the box move outside world limits
              if (player.y < height - 1) {
                // Would block move into wall
                if (!getBlock(player.y + 2, player.x).solid) {
                  setItemPos(blockItem.id, player.x, player.y + 2);
                } else {
                  // Swap places with box
                  setItemPos(blockItem.id, player.x, player.y);
                }
                return true;
              } else {
                return false;
              }
            }
            return true;
          }
          return false;
      }
    },
    [getBlock, player.x, player.y, setItemPos]
  );

  const handlePlayerMove = useCallback(
    (direction: "up" | "down" | "right" | "left") => {
      if (disablePlayer) return;
      console.log(currentStageItems);
      switch (direction) {
        case "right":
          setPlayer({
            ...player,
            pastX: canPlayerMove(direction) ? player.x : player.pastX,
            x: canPlayerMove(direction) ? (player.x += 1) : player.x
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
    },
    [canPlayerMove, player, disablePlayer, currentStageItems]
  );

  const resetPlayer = () => {
    setPlayer({ ...player, x: 3, y: 3 });
    setDisablePlayer(false);
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // console.log(e.key);
      switch (e.key.toLowerCase()) {
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
  }, [handlePlayerMove]);

  return (
    <LevelGrid playerPos={player} anim={animate} resetPlayer={resetPlayer} />
  );

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

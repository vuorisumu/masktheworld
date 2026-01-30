import { useEffect, useState } from "react";

interface PlayerProps {
  x: number;
  y: number;
}

export default function Test() {
  const width: number = 30;
  const height: number = 15;
  const [player, setPlayer] = useState<PlayerProps>({ x: 0, y: 0 });

  const handlePlayerMove = (direction: "up" | "down" | "right" | "left") => {
    switch (direction) {
      case "right":
        setPlayer({
          ...player,
          x: player.x < width - 1 ? (player.x += 1) : player.x
        });
        break;
      case "left":
        setPlayer({
          ...player,
          x: player.x > 0 ? (player.x -= 1) : player.x
        });
        break;
      case "down":
        setPlayer({
          ...player,
          y: player.y < height - 1 ? (player.y += 1) : player.y
        });
        break;
      case "up":
        setPlayer({
          ...player,
          y: player.y > 0 ? (player.y -= 1) : player.y
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

  return (
    <div>
      {Array(height)
        .fill(null)
        .map((_, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "row" }}>
            {Array(width)
              .fill(null)
              .map((_, j) => (
                <div
                  key={j}
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <GridBlock player={i === player.y && j === player.x} />
                </div>
              ))}
          </div>
        ))}
    </div>
  );
}

function GridBlock({ player }: { player: boolean }) {
  return (
    <div
      style={{
        width: "18px",
        height: "18px",
        border: "1px solid white",
        backgroundColor: player ? "green" : "transparent"
      }}
    ></div>
  );
}

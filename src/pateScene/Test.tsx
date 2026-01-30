import { useEffect, useState } from "react";

interface PlayerProps {
  x: number;
  y: number;
}

export default function Test() {
  const width: number = 30;
  const height: number = 15;
  const [player, setPlayer] = useState<PlayerProps>({ x: 0, y: 0 });

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      console.log(e.key);
      switch (e.key) {
        case "d":
          setPlayer({ ...player, x: (player.x += 1) });
          break;
        case "a":
          setPlayer({ ...player, x: (player.x -= 1) });
          break;
        case "s":
          setPlayer({ ...player, y: (player.y += 1) });
          break;
        case "w":
          setPlayer({ ...player, y: (player.y -= 1) });
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
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

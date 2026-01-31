import type { CSSProperties } from "react";

export default function SumuTestScene() {
  const arr = [
    { inUse: true, color: "red" },
    { inUse: false, color: "blue" },
    { inUse: false, color: "green" },
  ];

  return (
    <div>
      {arr.map((a) => (
        <div
          style={{ ...styles.layer, backgroundColor: a.color, ...(a.inUse && { zIndex: 100 }) }}
          key={a.color}
        ></div>
      ))}
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  layer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 200,
    height: 200,
  },
};

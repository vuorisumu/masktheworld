import type { CSSProperties } from "react";
import clock from "../assets/Spr_Clock_base.png";
import hand from "../assets/Spr_Clock_Hand.png";
type Props = {
  refresh: number;
};
export default function Clock({ refresh }: Props) {
  return (
    <div style={styles.wrapper}>
      <img src={clock} style={styles.image} />
      <img
        src={hand}
        style={{ ...styles.image, rotate: refresh * 90 + "deg", position: "absolute" }}
      />
    </div>
  );
}

const styles: { [key: string]: CSSProperties } = {
  wrapper: {
    position: "relative",
    width: 100,
    height: 100,
  },
  image: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
};

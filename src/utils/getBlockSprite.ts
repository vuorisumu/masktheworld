import creepy_floor from "../assets/Spr_Creepy_Floor.png";
import creepy_wall_1 from "../assets/Spr_Creepy_wall_1.png";
import creepy_wall_2 from "../assets/Spr_Creepy_wall_2.png";
import normal_floor from "../assets/Spr_Normal_Floor.png";
import normal_wall_1 from "../assets/Spr_Normal_wall_1.png";
import normal_wall_2 from "../assets/Spr_Normal_wall_2.png";
// import creepy_ceiling from "../assets/Spr_Creepy_Ceiling.png"

export const getBlockSprite = (name: string) => {
  switch (name) {
    case "floor":
      return normal_floor;
    case "wall":
      return normal_wall_2;
    case "topwall":
      return normal_wall_1;
    case "cwall":
      return creepy_wall_2;
    case "ctopwall":
      return creepy_wall_1;
    case "cfloor":
      return creepy_floor;
    default:
      return normal_floor;
  }
};

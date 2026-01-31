import creepy_floor from "../assets/Spr_Creepy_Floor.png";
import creepy_hole_edge from "../assets/Spr_Creepy_Hole.png";
import creepy_wall_1 from "../assets/Spr_Creepy_wall_1.png";
import creepy_wall_2 from "../assets/Spr_Creepy_wall_2.png";
import normal_hole from "../assets/Spr_Darkness_Hole.png";
import door from "../assets/Spr_Key_hole.png";
import normal_floor from "../assets/Spr_Normal_Floor.png";
import normal_hole_edge from "../assets/Spr_Normal_Hole.png";
import normal_wall_1 from "../assets/Spr_Normal_wall_1.png";
import normal_wall_2 from "../assets/Spr_Normal_wall_2.png";
// import creepy_ceiling from "../assets/Spr_Creepy_Ceiling.png"

export const getBlockSprite = (name: string, active?: boolean) => {
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
    case "hole":
      return normal_hole;
    case "ehole":
      return normal_hole_edge;
    case "chole":
      return creepy_hole_edge;
    case "exit":
      return normal_floor;
    case "cexit":
      return creepy_floor;
    case "door":
      return active ? normal_floor : door;
    case "cdoor":
      return active ? creepy_floor : door;
    default:
      return normal_floor;
  }
};

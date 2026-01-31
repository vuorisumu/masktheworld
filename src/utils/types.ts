export type ScreenName = "start" | "game" | "settings" | "menu";
export type MaskType = "normal" | "other" | "best";
export type Mask = {
  name: MaskType;
  level: number;
};

export type Position = {
  x: number;
  y: number;
};

export type Block = {
  solid: boolean;
  name: string;
  fall: boolean;
  item?: { id: number; name: string };
  activated?: boolean;
};

export type MapType = {
  stage: number;
  mask: MaskType;
  file: string;
  level?: Block[][];
};

export type ItemType = {
  id: number;
  level: number;
  mask: MaskType;
  item: string;
  x: number;
  y: number;
};

export type ScreenName = "start" | "game";
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
};

export type MapType = {
  stage: number;
  mask: MaskType;
  file: string;
  level?: Block[][];
};

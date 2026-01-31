import { createContext } from "react";

interface MusicContextType {
  play: () => void;
  //playClick: () => void;
}

export const MusicContext = createContext<MusicContextType | undefined>(
  undefined
);

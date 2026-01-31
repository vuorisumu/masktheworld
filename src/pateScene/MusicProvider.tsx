import { useAudioPlayer } from "react-use-audio-player";
import { useAppContext } from "../utils/AppContext";
import { MusicContext } from "./MusicContext";
import { useEffect, type ReactNode } from "react";

export function MusicProvider({ children }: { children: ReactNode }) {
  const { screen } = useAppContext();

  const { load, stop, isLoading } = useAudioPlayer();

  const handleStart = (name: string) => {
    load(name, {
      initialVolume: 0.75,
      autoplay: true
    });
  };

  const playClick = () => {
    load("/pipe.wav", {
      initialVolume: 1,
      autoplay: true
    });
  };

  useEffect(() => {
    switch (screen) {
      case "menu":
        handleStart("/calm.mp3");
        break;
      case "game":
        stop();
        break;
      default:
        stop();
        break;
    }
  }, [screen]);
  const play = () => {
    // play music
  };

  return (
    <MusicContext.Provider value={{ play, playClick }}>
      {!isLoading ? children : <p>Loading...</p>}
    </MusicContext.Provider>
  );
}

import { useAudioPlayer } from "react-use-audio-player";
import { useAppContext } from "../utils/AppContext";
import { MusicContext } from "./MusicContext";
import { useEffect, type ReactNode } from "react";

export function MusicProvider({ children }: { children: ReactNode }) {
  const { screen } = useAppContext();

  const { load: sfx } = useAudioPlayer();
  const { load: music, isLoading: musicLoading } = useAudioPlayer();

  const handleStart = (name: string) => {
    music(name, {
      initialVolume: 0.75,
      autoplay: true,
      loop: true
    });
  };

  const playClick = () => {
    sfx("/pipe.wav", {
      initialVolume: 1,
      autoplay: true
    });
  };

  useEffect(() => {
    switch (screen) {
      case "menu":
        handleStart("/angry.mp3");
        break;
      case "game":
        handleStart("/game.mp3");
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
      {!musicLoading ? children : <p>Loading...</p>}
    </MusicContext.Provider>
  );
}

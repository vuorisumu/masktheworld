import { useAudioPlayer } from "react-use-audio-player";
import { useAppContext } from "../utils/AppContext";
import { MusicContext } from "./MusicContext";
import { useCallback, useEffect, type ReactNode } from "react";
import angry from "../assets/angry.mp3";
import game from "../assets/game.mp3";
import pipe from "../assets/pipe.wav";

export function MusicProvider({ children }: { children: ReactNode }) {
  const { screen } = useAppContext();

  const { load: sfx } = useAudioPlayer();
  const { load: music, isLoading: musicLoading } = useAudioPlayer();

  const handleStart = useCallback(
    (name: string) => {
      music(name, {
        initialVolume: 0.75,
        autoplay: true,
        loop: true
      });
    },
    [music]
  );

  const playClick = () => {
    sfx(pipe, {
      initialVolume: 1,
      autoplay: true
    });
  };

  useEffect(() => {
    switch (screen) {
      case "menu":
        handleStart(angry);
        break;
      case "game":
        handleStart(game);
        break;
      default:
        break;
    }
  }, [screen, handleStart]);
  const play = () => {
    // play music
  };

  return (
    <MusicContext.Provider value={{ play, playClick }}>
      {!musicLoading ? children : <p>Loading...</p>}
    </MusicContext.Provider>
  );
}

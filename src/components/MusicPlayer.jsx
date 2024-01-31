import React, { useState, useEffect } from "react";

const MusicPlayer = ({ audios, currentAudioIndex, setCurrentAudioIndex }) => {
  const [audio, setAudio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const storedAudioIndex = localStorage.getItem("currentAudioIndex");
    if (storedAudioIndex !== null) {
      setCurrentAudioIndex(parseInt(storedAudioIndex, 10));
    }
  }, [setCurrentAudioIndex]);

  useEffect(() => {
    if (currentAudioIndex !== null) {
      const newAudio = new Audio(audios[currentAudioIndex].url);
      setAudio(newAudio);
    }
  }, [currentAudioIndex, audios]);

  useEffect(() => {
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  const playPauseHandler = () => {
    setIsPlaying(!isPlaying);
  };

  const nextHandler = () => {
    const nextIndex = (currentAudioIndex + 1) % audios.length;
    setCurrentAudioIndex(nextIndex);
    localStorage.setItem("currentAudioIndex", nextIndex.toString());
  };

  useEffect(() => {
    const updateLocalStorage = () => {
      localStorage.setItem("isPlaying", isPlaying.toString());
      localStorage.setItem("currentTime", audio.currentTime.toString());
    };

    audio.addEventListener("timeupdate", updateLocalStorage);
    audio.addEventListener("ended", nextHandler);

    return () => {
      audio.removeEventListener("timeupdate", updateLocalStorage);
      audio.removeEventListener("ended", nextHandler);
    };
  }, [audio, isPlaying, nextHandler]);

  return (
    <div className="p-4 flex-1">
      <h2 className="text-lg font-bold mb-4">Music Player</h2>
      <audio
        controls
        className="w-full"
        src={audios[currentAudioIndex]?.url}
      ></audio>
      <div className="flex justify-center mt-4">
        <button onClick={playPauseHandler}>
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={nextHandler}>Next</button>
      </div>
    </div>
  );
};

export default MusicPlayer;

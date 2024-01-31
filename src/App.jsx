import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Playlist from "./components/Playlist";
import UploadOptions from "./components/UploadOptions";
import MusicPlayer from "./components/MusicPlayer";

const App = () => {
  const [audios, setAudios] = useState([]);
  const [currentAudioIndex, setCurrentAudioIndex] = useState(null);

  const playAudio = (index) => {
    setCurrentAudioIndex(index);
    localStorage.setItem("currentAudioIndex", index);
  };

  const onFileChange = (file) => {
    const newAudios = [
      ...audios,
      { name: file.name, url: URL.createObjectURL(file) },
    ];
    setAudios(newAudios);

    if (currentAudioIndex === null) {
      setCurrentAudioIndex(0);
      localStorage.setItem("currentAudioIndex", "0");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <Navbar />
      <div className="flex-grow flex">
        <Playlist audios={audios} playAudio={playAudio} />
        <MusicPlayer
          audios={audios}
          currentAudioIndex={currentAudioIndex}
          setCurrentAudioIndex={setCurrentAudioIndex}
        />
        <UploadOptions onFileChange={onFileChange} />
      </div>
      {/* Footer */}
    </div>
  );
};

export default App;

import React from "react";

const Playlist = ({ audios, playAudio }) => {
  return (
    <div
      className={`p-4 flex-1 shadow-lg rounded-md border border-gray-300 transition-opacity duration-300`}
    >
      <h2 className="text-lg font-bold mb-4 text-center">Playlist</h2>
      <ul className="list-disc pl-4">
        {audios.map((audio, index) => (
          <li key={index} onClick={() => playAudio(index)}>
            {audio.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;

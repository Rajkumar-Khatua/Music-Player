import React, { useRef, useState } from "react";

const UploadOptions = ({ onFileChange }) => {
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleFileChange = () => {
    const file = fileInputRef.current.files[0];
    onFileChange(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsHovered(true);
  };

  const handleDragLeave = () => {
    setIsHovered(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    onFileChange(file);
    setIsHovered(false);
  };

  return (
    <div
      className={`p-4 flex-1 shadow-lg rounded-md border border-gray-300 transition-opacity duration-300 ${
        isHovered ? "opacity-75" : "opacity-100"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <h2 className="text-lg font-bold mb-4 text-center">Upload Options</h2>
      <div className="flex flex-col items-center justify-center">
        <label
          htmlFor="fileInput"
          className="bg-white shadow-md text-black p-8 cursor-pointer hover:shadow-lg hover:scale-110 rounded-full h-32 w-32 flex items-center justify-center transition-opacity duration-300"
        >
          <span>Drag or Select</span>
        </label>
        <input
          type="file"
          accept=".mp3"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden h-full w-full"
          id="fileInput"
        />
        <p className="mt-4 text-sm text-gray-600">Accepted file format: .mp3</p>
      </div>
    </div>
  );
};

export default UploadOptions;

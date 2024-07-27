import React, { useState, useRef, useEffect } from "react";
import SpeakerIcon from "@/public/speaker-icon.png";

const AudioComponent: React.FC<{ audioString?: string }> = ({
  audioString,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
        setProgress(0);
        setCurrentTime("00:00");
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (!isNaN(duration)) {
        setProgress((current / duration) * 100);
        setCurrentTime(formatTime(current));
      }
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.addEventListener("timeupdate", handleTimeUpdate);
      audio.addEventListener("ended", () => setIsPlaying(false));
    }
    return () => {
      if (audio) {
        audio.removeEventListener("timeupdate", handleTimeUpdate);
        audio.removeEventListener("ended", () => setIsPlaying(false));
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("loadedmetadata", () => {
        handleTimeUpdate();
      });
    }
  }, [audioString]);

  return (
    <div className="flex items-center w-full max-w-md rounded-full py-2">
      <button
        onClick={toggleAudio}
        className="bg-blue-500 text-white px-4 py-2 rounded-xl mr-2 text-sm font-semibold"
      >
        {isPlaying ? "🔊 Stop Audio" : "🔊 Listen Answer"}
      </button>
      {isPlaying && (
        <>
          <span className="mr-2 text-sm">{currentTime}</span>
          <div className="flex-grow">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              className={`w-full `}
              onChange={(e) => {
                if (audioRef.current) {
                  const newTime =
                    (parseInt(e.target.value) / 100) *
                    audioRef.current.duration;
                  audioRef.current.currentTime = newTime;
                }
              }}
            />
          </div>
        </>
      )}
      <audio ref={audioRef} src={`data:audio/mp3;base64,${audioString}`} />
    </div>
  );
};

export default AudioComponent;

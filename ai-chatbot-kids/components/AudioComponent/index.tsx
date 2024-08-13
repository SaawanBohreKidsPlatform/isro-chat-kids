"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const AudioComponent: React.FC<{ conversation_id?: number }> = ({
  conversation_id,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("00:00");
  const [duration, setDuration] = useState(0);
  const [audioEncoded, setAudioEncoded] = useState<string | undefined>();
  const [key, setKey] = useState(0); // Add this line
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const getAudio = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        "https://backend.isrospaceagent.com/isro-agent/generate_audio/",
        {
          method: "POST",
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-CSRFToken": process.env.NEXT_PUBLIC_CSRF_TOKEN ?? "",
          },
          body: JSON.stringify({
            "conversation_id": conversation_id
          }),
        }
      );
      const res = await response.json();
      setAudioEncoded(res.audio);
    } catch (error) {
      console.error("Error while processing user input", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
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

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("00:00");
  };

  useEffect(() => {
    if (audioEncoded && audioRef.current) {
      audioRef.current.load();
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setDuration(audioRef.current!.duration);
      }).catch(e => console.error("Error playing audio:", e));
    }
  }, [audioEncoded]);

  const handleButtonClick = () => {
    if (audioEncoded === undefined) {
      getAudio();
    } else {
      toggleAudio();
    }
  };

  return (
    <div className="flex items-center w-full max-w-md rounded-full py-2">
      <button
        onClick={handleButtonClick}
        className="bg-blue-500 lg:w-40 lg:h-9 md:w-40 md:h-9 w-40 h-10 text-white px-1 lg:px-4 md:px-4 py-2 rounded-xl mr-2 text-sm font-semibold relative"
        disabled={isLoading}
      >
        {isLoading ? (
          <Image src="/audio-loader.gif" width={30} height={30} className="w-14 h-14 absolute -top-[0.65rem] left-12" alt="" />
        ) : isPlaying ? (
          "🔊 Stop Audio"
        ) : (
          "🔊 Listen Answer"
        )}
      </button>
      {audioEncoded && isPlaying && (
        <>
          <span className="mr-2 text-sm">{currentTime}</span>
          <div className="flex-grow">
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              className="w-full cursor-pointer"
              onChange={(e) => {
                if (audioRef.current) {
                  const newTime = (parseInt(e.target.value) / 100) * audioRef.current.duration;
                  audioRef.current.currentTime = newTime;
                }
              }}
            />
          </div>
        </>
      )}
      {audioEncoded && (
        <audio 
          ref={audioRef} 
          src={`data:audio/mp3;base64,${audioEncoded}`}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleAudioEnd}
          onLoadedMetadata={() => {
            if (audioRef.current) {
              setDuration(audioRef.current.duration);
            }
          }}
        />
      )}
    </div>
  );
};

export default AudioComponent;
"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface AudioPlayerProps {
  audioSrc: string;
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isUserInteracted, setIsUserInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle play/pause manually after user interacts
  useEffect(() => {
    if (isUserInteracted && audioRef.current) {
      audioRef.current.muted = false; // Unmute once user interacts
      audioRef.current.volume = 0.5;
    }
  }, [isUserInteracted]);

  const handleUserInteraction = () => {
    if (!isUserInteracted) setIsUserInteracted(true);
  };

  const togglePlay = () => {
    handleUserInteraction();
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((err) => console.log("Play error:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    handleUserInteraction();
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <audio ref={audioRef} src={audioSrc} loop onError={() => console.error("Audio source error.")} />
      <button onClick={togglePlay} className="p-1.5 rounded-full hover:bg-white/10" aria-label={isPlaying ? "Pause" : "Play"}>
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>
      <button onClick={toggleMute} className="p-1.5 rounded-full hover:bg-white/10" aria-label={isMuted ? "Unmute" : "Mute"}>
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  );
}

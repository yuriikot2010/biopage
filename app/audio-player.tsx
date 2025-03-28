"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  audioSrc: string
}

export default function AudioPlayer({ audioSrc }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [hasInteracted, setHasInteracted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const enableAudio = () => {
      setHasInteracted(true)
      document.removeEventListener("click", enableAudio)
    }

    document.addEventListener("click", enableAudio)
    return () => document.removeEventListener("click", enableAudio)
  }, [])

  useEffect(() => {
    if (hasInteracted && audioRef.current) {
      audioRef.current.muted = false
      audioRef.current.play().then(() => setIsPlaying(true)).catch(console.error)
    }
  }, [hasInteracted])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <audio ref={audioRef} src={audioSrc} loop muted />

      <button
        onClick={togglePlay}
        className="p-1.5 rounded-full hover:bg-white/10"
        aria-label={isPlaying ? "Pause" : "Play"}
      >
        {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      </button>

      <button
        onClick={toggleMute}
        className="p-1.5 rounded-full hover:bg-white/10"
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
      </button>
    </div>
  )
}

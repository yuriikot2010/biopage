"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"

interface AudioPlayerProps {
  audioSrc: string
  autoPlay?: boolean
}

export default function AudioPlayer({ audioSrc, autoPlay = false }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.5

      if (autoPlay) {
        // Most browsers require user interaction before playing audio
        // This is just a placeholder for when the user enables audio
        audioRef.current.muted = true
        const playPromise = audioRef.current.play()

        if (playPromise !== undefined) {
          playPromise
            .then((_) => {
              setIsPlaying(true)
            })
            .catch((error) => {
              console.log("Autoplay prevented by browser:", error)
            })
        }
      }
    }
  }, [autoPlay])

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
      <audio ref={audioRef} src={audioSrc} loop />

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


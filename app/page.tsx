"use client"

import { useRef, useState } from "react"
import { Globe, Mail, Disc, TextIcon as Telegram, Music, Volume2, VolumeX } from "lucide-react"
import Link from "next/link"

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const handleEnter = () => {
    setShowContent(true)

    // Play audio when the button is clicked
    if (audioRef.current) {
      audioRef.current.muted = false
      audioRef.current.volume = 0.5
      audioRef.current.play().catch(err => console.error("Playback error:", err))
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  // Mock music data
  const currentMusic = {
    title: "Lofi Beats",
    artist: "ChillHop",
    cover: "/placeholder.svg?height=60&width=60",
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white overflow-hidden">
      <div className="fixed inset-0 z-0 bg-black"></div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} src="/placeholder.mp3" type="audio/mp3" loop />

      {!showContent ? (
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-6 border-2 border-green-500/50 rounded-full overflow-hidden flex items-center justify-center bg-black/50">
            <img
              src="/placeholder.svg?height=96&width=96"
              alt="WineNodes Logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-4xl font-bold text-green-400 mb-8">WineNodes</h1>

          <button
            onClick={handleEnter}
            className="px-8 py-3 rounded-md border border-green-500/50 bg-black/50 text-green-400 font-mono hover:bg-green-900/20 transition-all hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black"
          >
            &gt; Enter_System
          </button>
        </div>
      ) : (
        <div className="relative z-10 w-full max-w-md mx-auto bg-black/80 border border-green-500/30 rounded-md overflow-hidden shadow-lg shadow-green-900/20 backdrop-blur-sm">
          <div className="relative border-b border-green-500/30">
            <div className="p-6 flex flex-col items-center">
              <div className="w-20 h-20 mb-4 border-2 border-green-500/50 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=80&width=80"
                  alt="WineNodes Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              <h1 className="text-2xl font-bold text-green-400 mb-2 font-mono">WineNodes</h1>
              <p className="text-sm text-green-300/70 mb-4 font-mono">&gt; Premium_services</p>

              {/* Music Player */}
              <div className="w-full flex items-center space-x-3 bg-black/50 p-3 rounded-md border border-green-500/30">
                <div className="flex-shrink-0">
                  <Music className="w-5 h-5 text-green-400" />
                </div>
                <div className="flex-grow min-w-0">
                  <p className="text-sm font-mono text-green-300 truncate">{currentMusic.title}</p>
                  <p className="text-xs font-mono text-green-400/60 truncate">{currentMusic.artist}</p>
                </div>
                <button onClick={toggleMute} className="flex-shrink-0 p-1.5 rounded-full hover:bg-green-900/30">
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-green-400" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-green-400" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="p-6 space-y-3">
            <SocialLink icon={<Disc className="w-5 h-5" />} title="Discord" link="https://discord.gg/jP8QCaDVvM" />

            <SocialLink icon={<Telegram className="w-5 h-5" />} title="Telegram" link="https://t.me/FORTID8C7" />

            <SocialLink icon={<Mail className="w-5 h-5" />} title="Owner Contact" link="mailto:owner@winenodes.xyz" />

            <SocialLink icon={<Mail className="w-5 h-5" />} title="Support" link="mailto:support@winenodes.xyz" />
          </div>

          {/* Footer */}
          <div className="p-4 text-center text-xs text-green-400/60 border-t border-green-500/30 font-mono">
            © {new Date().getFullYear()} WineNodes.xyz Copyright reserved
          </div>
        </div>
      )}
    </main>
  )
}

function SocialLink({ icon, title, link }) {
  return (
    <Link
      href={link}
      className="group flex items-center space-x-3 p-3 rounded-md bg-black/50 border border-green-500/30 hover:border-green-400/70 hover:bg-green-900/20 transition-all font-mono"
    >
      <div className="bg-black/50 p-2 rounded-md border border-green-500/30">{icon}</div>
      <span className="font-medium text-green-300">{title}</span>
      <div className="flex-grow"></div>
      <div className="w-6 h-6 flex items-center justify-center rounded-full bg-black/50 border border-green-500/30 group-hover:bg-green-900/30 transition-colors">
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </Link>
  )
}

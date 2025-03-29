"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Globe, Mail, Disc, TextIcon as Telegram, Music, Volume2, VolumeX, Server, Cloud, Shield } from "lucide-react"
import Link from "next/link"
import Head from "next/head"

// This component would normally go in a separate file
export function JsonLd({ data }: { data: any }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export default function Home() {
  const [showContent, setShowContent] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  // SEO: Add language detection for better international targeting
  const [userLanguage, setUserLanguage] = useState("en")

  useEffect(() => {
    // Detect browser language
    const browserLang = navigator.language || (navigator as any).userLanguage
    if (browserLang.includes("ru")) {
      setUserLanguage("ru")
    }

    // Set page title dynamically for better SEO
    document.title =
      userLanguage === "ru"
        ? "Вайн Нодес | Хостинг VPS, Pterodactyl и выделенные серверы"
        : "WineNodes | VPS, Pterodactyl & Dedicated Web Hosting"
  }, [userLanguage])

  const handleEnter = () => {
    setShowContent(true)

    // Play audio when the button is clicked
    if (audioRef.current) {
      audioRef.current.muted = false
      audioRef.current.volume = 0.5
      audioRef.current.play().catch((err) => console.error("Playback error:", err))
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
    title: "The Days",
    artist: "Avicii",
    cover: "/placeholder.svg?height=60&width=60",
  }

  // SEO: Prepare localized content
  const content = {
    en: {
      tagline: "Sip, Savor, Stay Connected",
      buttonText: "> Smash it",
      discord: "Discord",
      telegram: "Telegram",
      contact: "Contact owner directly",
      support: "Support",
      services: ["VPS Hosting", "Pterodactyl Panels", "Dedicated Servers", "Web Hosting"],
    },
    ru: {
      tagline: "Подключайтесь с комфортом",
      buttonText: "> Войти",
      discord: "Дискорд",
      telegram: "Телеграм",
      contact: "Связаться с владельцем",
      support: "Поддержка",
      services: ["VPS Хостинг", "Панели Pterodactyl", "Выделенные серверы", "Веб-хостинг"],
    },
  }

  const t = content[userLanguage as keyof typeof content]

  // SEO: Structured data for better search engine understanding
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WineNodes",
    alternateName: ["Вайн Нодес", "Wine Nodes"],
    url: "https://winenodes.xyz",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://winenodes.xyz/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
    description:
      "Premium VPS, Pterodactyl and dedicated web hosting services with exceptional performance and reliability.",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "USD",
      lowPrice: "5",
      highPrice: "100",
      offerCount: "10",
    },
  }

  // SEO: Business structured data
  const businessData = {
    "@context": "https://schema.org",
    "@type": "HostingBusiness",
    name: "WineNodes",
    alternateName: ["Вайн Нодес", "Wine Nodes"],
    url: "https://winenodes.xyz",
    logo: "https://winenodes.xyz/logo.png",
    description:
      "Premium VPS, Pterodactyl and dedicated web hosting services with exceptional performance and reliability.",
    sameAs: ["https://discord.gg/jP8QCaDVvM", "https://t.me/FORTID8C7"],
    address: {
      "@type": "PostalAddress",
      addressCountry: "Global",
    },
    email: "support@winenodes.xyz",
    telephone: "+1-800-WINENODES",
  }

  return (
    <>
      {/* SEO: Add structured data */}
      <JsonLd data={structuredData} />
      <JsonLd data={businessData} />

      {/* SEO: Add meta tags */}
      <Head>
        <meta
          name="description"
          content="WineNodes (Вайн Нодес) offers premium VPS hosting, Pterodactyl panels, and dedicated web hosting services with exceptional performance and reliability."
        />
        <meta
          name="keywords"
          content="winenodes, wine nodes, вайн нодес, winenodes.xyz, vps hosting, pterodactyl, dedicated servers, web hosting, хостинг"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="WineNodes | VPS, Pterodactyl & Dedicated Web Hosting" />
        <meta
          property="og:description"
          content="Premium VPS, Pterodactyl and dedicated web hosting services with exceptional performance and reliability."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://winenodes.xyz" />
        <meta property="og:image" content="https://winenodes.xyz/og-image.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://winenodes.xyz" />
        <link rel="alternate" hrefLang="en" href="https://winenodes.xyz/en" />
        <link rel="alternate" hrefLang="ru" href="https://winenodes.xyz/ru" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-black text-white overflow-hidden">
        <div className="fixed inset-0 z-0 bg-black"></div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src="/placeholder.mp3" type="audio/mp3" loop />

        {!showContent ? (
          <section
            className="relative z-10 flex flex-col items-center justify-center text-center"
            aria-labelledby="welcome-heading"
          >
            <div className="w-24 h-24 mb-6 border-2 border-green-500/50 rounded-full overflow-hidden flex items-center justify-center bg-white">
              <img
                src="/placeholder.svg?height=96&width=96"
                alt="WineNodes Logo - Premium VPS and Web Hosting"
                className="w-full h-full object-cover"
              />
            </div>

            <h1 id="welcome-heading" className="text-4xl font-bold text-green-400 mb-2">
              WineNodes
              <span className="block text-sm mt-1 font-normal">Вайн Нодес</span>
            </h1>

            <p className="text-green-300/70 mb-8 max-w-md">
              Premium VPS, Pterodactyl and dedicated web hosting services with exceptional performance and reliability.
            </p>

            <button
              onClick={handleEnter}
              className="px-8 py-3 rounded-md border border-green-500/50 bg-black/50 text-green-400 font-mono hover:bg-green-900/20 transition-all hover:border-green-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:ring-offset-2 focus:ring-offset-black"
              aria-label="Enter website"
            >
              {t.buttonText}
            </button>
          </section>
        ) : (
          <section className="relative z-10 w-full max-w-md mx-auto bg-black/80 border border-green-500/30 rounded-md overflow-hidden shadow-lg shadow-green-900/20 backdrop-blur-sm">
            <div className="relative border-b border-green-500/30">
              <div className="p-6 flex flex-col items-center">
                <div className="w-20 h-20 mb-4 border-2 border-green-500/50 rounded-full overflow-hidden flex items-center justify-center bg-white">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="WineNodes Logo - VPS and Pterodactyl Hosting"
                    className="w-full h-full object-cover"
                  />
                </div>

                <h1 className="text-2xl font-bold text-green-400 mb-1 font-mono">
                  WineNodes
                  <span className="block text-sm mt-1 font-normal text-center">Вайн Нодес</span>
                </h1>
                <p className="text-sm text-green-300/70 mb-4 font-mono">&gt; {t.tagline}</p>

                {/* SEO: Add service highlights */}
                <div className="w-full grid grid-cols-2 gap-2 mb-4">
                  {t.services.map((service, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 text-sm text-green-300/80 bg-black/30 p-2 rounded border border-green-500/20"
                    >
                      {index === 0 && <Server className="w-4 h-4 text-green-400" />}
                      {index === 1 && <Shield className="w-4 h-4 text-green-400" />}
                      {index === 2 && <Globe className="w-4 h-4 text-green-400" />}
                      {index === 3 && <Cloud className="w-4 h-4 text-green-400" />}
                      <span>{service}</span>
                    </div>
                  ))}
                </div>

                {/* Music Player */}
                <div className="w-full flex items-center space-x-3 bg-black/50 p-3 rounded-md border border-green-500/30">
                  <div className="flex-shrink-0">
                    <Music className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="text-sm font-mono text-green-300 truncate">{currentMusic.title}</p>
                    <p className="text-xs font-mono text-green-400/60 truncate">{currentMusic.artist}</p>
                  </div>
                  <button
                    onClick={toggleMute}
                    className="flex-shrink-0 p-1.5 rounded-full hover:bg-green-900/30"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  >
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
              <SocialLink
                icon={<Disc className="w-5 h-5" />}
                title={t.discord}
                link="https://discord.gg/jP8QCaDVvM"
                description="Join our Discord community for support and updates"
              />

              <SocialLink
                icon={<Telegram className="w-5 h-5" />}
                title={t.telegram}
                link="https://t.me/winenodes"
                description="Follow us on Telegram for instant updates"
              />

              <SocialLink
                icon={<Mail className="w-5 h-5" />}
                title={t.contact}
                link="mailto:owner@winenodes.xyz"
                description="Email the owner directly for business inquiries"
              />

              <SocialLink
                icon={<Mail className="w-5 h-5" />}
                title={t.support}
                link="mailto:support@winenodes.xyz"
                description="Get technical support for your hosting services"
              />
            </div>

            {/* DMCA Badge */}
            <div className="p-4 text-center text-xs text-green-400/60 border-t border-green-500/30 font-mono">
              <div className="flex justify-center">
                <a
                  href="//www.dmca.com/Protection/Status.aspx?ID=b010b26b-8a0f-412f-a962-c38d21e42044"
                  title="DMCA.com Protection Status"
                  className="dmca-badge"
                >
                  <img
                    src="https://images.dmca.com/Badges/dmca_protected_sml_120y.png?ID=b010b26b-8a0f-412f-a962-c38d21e42044"
                    alt="DMCA.com Protection Status"
                  />
                </a>
              </div>
              © {new Date().getFullYear()} WineNodes.xyz (Вайн Нодес) Copying any form of contents is restricted in any
              way. All rights reserved.
            </div>
          </section>
        )}
      </main>
    </>
  )
}

function SocialLink({
  icon,
  title,
  link,
  description,
}: {
  icon: React.ReactNode
  title: string
  link: string
  description: string
}) {
  return (
    <Link
      href={link}
      className="group flex items-center space-x-3 p-3 rounded-md bg-black/50 border border-green-500/30 hover:border-green-400/70 hover:bg-green-900/20 transition-all font-mono"
      aria-label={`${title} - ${description}`}
    >
      <div className="bg-black/50 p-2 rounded-md border border-green-500/30">{icon}</div>
      <div>
        <span className="font-medium text-green-300 block">{title}</span>
        <span className="text-xs text-green-400/60 hidden md:block">{description}</span>
      </div>
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


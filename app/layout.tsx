import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "WineNodes | VPS, Pterodactyl & Dedicated Web Hosting",
  description:
    "WineNodes (Вайн Нодес) offers premium VPS hosting, Pterodactyl panels, and dedicated web hosting services with exceptional performance and reliability.",
  keywords:
    "winenodes, wine nodes, вайн нодес, winenodes.xyz, vps hosting, pterodactyl, dedicated servers, web hosting, хостинг",
  alternates: {
    canonical: "https://winenodes.xyz",
    languages: {
      en: "https://winenodes.xyz/en",
      ru: "https://winenodes.xyz/ru",
    },
  },
  openGraph: {
    title: "WineNodes | VPS, Pterodactyl & Dedicated Web Hosting",
    description:
      "Premium VPS, Pterodactyl and dedicated web hosting services with exceptional performance and reliability.",
    url: "https://winenodes.xyz",
    siteName: "WineNodes",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add hreflang tags for language variants */}
        <link rel="alternate" hrefLang="en" href="https://winenodes.xyz/en" />
        <link rel="alternate" hrefLang="ru" href="https://winenodes.xyz/ru" />
        <link rel="alternate" hrefLang="x-default" href="https://winenodes.xyz" />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}


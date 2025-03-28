"use client"

import { useEffect, useRef } from "react"

export default function DigitalRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Characters to display
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~"
    const fontSize = 14
    const columns = Math.floor(canvas.width / fontSize)

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Start above the canvas
    }

    // Drawing the characters
    const draw = () => {
      // Black semi-transparent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set color and font
      ctx.fillStyle = "#0f0" // Green text
      ctx.font = `${fontSize}px monospace`

      // Loop over drops
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = chars[Math.floor(Math.random() * chars.length)]

        // Calculate x position
        const x = i * fontSize

        // Calculate y position
        const y = drops[i] * fontSize

        // Add gradient effect - brighter at the head of each column
        const gradient = ctx.createLinearGradient(0, y - fontSize * 5, 0, y)
        gradient.addColorStop(0, "rgba(0, 255, 0, 0.1)")
        gradient.addColorStop(1, "rgba(0, 255, 0, 0.8)")
        ctx.fillStyle = gradient

        // Draw the character
        ctx.fillText(text, x, y)

        // Reset when it reaches the bottom or randomly
        if (y > canvas.height || Math.random() > 0.99) {
          drops[i] = 0
        }

        // Move it down
        drops[i]++
      }
    }

    // Animation loop
    const interval = setInterval(draw, 50)

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-full h-full" />
}


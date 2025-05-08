"use client"

import { useRef, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

// --- Define Image URLs and Particle Colors ---
const WS_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wellscout-ws.png-11LSxS9xrsfAW7Ish43PwHT3gx326T.png"
const OIL_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wellscout%20oil%20%282%29-ZOftu5aoL5k1IXOof94MVHV7Wkvzvo.png"
const WS_PARTICLE_COLOR = "#04d9ff"
const OIL_PARTICLE_COLOR = "#90EE90"

// --- Define Particle Structure ---
interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  size: number
  color: string
  life: number
  isWS: boolean
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // --- Canvas and Particle Effect ---
  useEffect(() => {
    setIsLoading(true)
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    // --- Configuration Variables ---
    const baseParticleCount = 20000
    let scaleFactor = 1
    let targetParticleCount = baseParticleCount

    let animationFrameId: number
    let particles: Particle[] = []
    let wsImage: HTMLImageElement | null = null
    let oilImage: HTMLImageElement | null = null
    let storedImageData: ImageData | null = null
    let storedWsDrawWidth = 0
    let storedTotalWidth = 0
    let storedLogoSpacing = 0

    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()

    const updateCanvasSize = () => {
      checkMobile()
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const canvasArea = canvas.width * canvas.height
      const referenceArea = 1920 * 1080
      const areaRatio = canvasArea > 0 ? canvasArea / referenceArea : 0
      scaleFactor = areaRatio > 0 ? Math.sqrt(areaRatio) : 1
      targetParticleCount = Math.floor(baseParticleCount * scaleFactor)
    }
    updateCanvasSize()

    // --- Load Images ---
    const loadImage = (src: string): Promise<HTMLImageElement> => {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.crossOrigin = "anonymous"
        img.onload = () => resolve(img)
        img.onerror = (err) => {
          console.error("Failed to load image:", src, err)
          reject(new Error(`Failed to load ${src}`))
        }
        img.src = src
      })
    }

    Promise.all([loadImage(WS_LOGO_URL), loadImage(OIL_LOGO_URL)])
      .then(([loadedWsImage, loadedOilImage]) => {
        wsImage = loadedWsImage
        oilImage = loadedOilImage
        initializeEffect()
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading images:", error)
        setIsLoading(false)
      })

    // --- Function to Draw Images and Get Data ---
    function drawImageDataAndCache(): boolean {
      if (!ctx || !canvas || !wsImage || !oilImage) {
        console.error("drawImageData prerequisites not met")
        storedImageData = null
        return false
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // --- Calculate dimensions and positions ---
      const wsLogoHeight = isMobile ? 120 : 240
      const wsAspectRatio = wsImage.naturalWidth / wsImage.naturalHeight
      const wsDrawWidth = wsLogoHeight * wsAspectRatio

      // Scale factor for the oil logo relative to WS
      const oilScaleFactor = 1.5
      const oilLogoHeight = wsLogoHeight * oilScaleFactor
      const oilAspectRatio = oilImage.naturalWidth / oilImage.naturalHeight
      const oilDrawWidth = oilLogoHeight * oilAspectRatio

      const logoSpacing = isMobile ? 25 : 50
      const totalWidth = wsDrawWidth + oilDrawWidth + logoSpacing

      // Center Y for WS top
      const canvasCenterY = canvas.height / 2
      const wsStartY = canvasCenterY - wsLogoHeight / 2

      // Bottom-align OIL with WS
      const oilStartY = wsStartY + wsLogoHeight - oilLogoHeight

      // Center everything horizontally
      const startX = canvas.width / 2 - totalWidth / 2

      // Draw WS
      ctx.drawImage(wsImage, startX, wsStartY, wsDrawWidth, wsLogoHeight)
      // Draw OIL
      ctx.drawImage(oilImage, startX + wsDrawWidth + logoSpacing, oilStartY, oilDrawWidth, oilLogoHeight)

      // Cache the image data and dimensions
      try {
        storedImageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
        storedWsDrawWidth = wsDrawWidth
        storedTotalWidth = totalWidth
        storedLogoSpacing = logoSpacing
      } catch (e) {
        console.error("Failed to get ImageData:", e)
        storedImageData = null
        return false
      }

      // Clear canvas after sampling
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return true
    }

    // --- Function to Create a Single Particle ---
    function createParticle(
      imageData: ImageData,
      wsDrawWidth: number,
      totalWidth: number,
      logoSpacing: number,
    ): Particle | null {
      if (!canvas) return null

      const data = imageData.data
      const canvasWidth = imageData.width
      const canvasHeight = imageData.height

      // Divide between WS and OIL
      const startX = canvas.width / 2 - totalWidth / 2
      const dividingLineX = startX + wsDrawWidth + logoSpacing / 2

      for (let attempt = 0; attempt < 50; attempt++) {
        const x = Math.floor(Math.random() * canvasWidth)
        const y = Math.floor(Math.random() * canvasHeight)
        const index = (y * canvasWidth + x) * 4

        if (index >= 0 && index < data.length && data[index + 3] > 128) {
          const isWS = x < dividingLineX
          const particleColor = isWS ? WS_PARTICLE_COLOR : OIL_PARTICLE_COLOR
          return {
            x,
            y,
            baseX: x,
            baseY: y,
            size: Math.random() * 1.5 + 0.5,
            color: particleColor,
            life: Math.random() * 150 + 50 + 50,
            isWS,
          }
        }
      }
      return null
    }

    // --- Create Initial Particles ---
    function createInitialParticles() {
      if (!canvas || !storedImageData) {
        console.warn("Cannot create initial particles, no cached image data.")
        return
      }
      particles = []

      let createdCount = 0

      for (let i = 0; i < targetParticleCount * 8 && createdCount < targetParticleCount; i++) {
        const particle = createParticle(storedImageData, storedWsDrawWidth, storedTotalWidth, storedLogoSpacing)
        if (particle) {
          particles.push(particle)
          createdCount++
        }
      }
    }

    // --- Animation Loop ---
    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const { x: mouseX, y: mouseY } = mousePositionRef.current
      const maxDistance = isMobile ? 60 : 90
      const forceMultiplier = isMobile ? 40 : 50

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        const dx = mouseX - p.x
        const dy = mouseY - p.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (
          distance > 0 &&
          distance < maxDistance &&
          (isTouchingRef.current || !("ontouchstart" in window && window.TouchEvent))
        ) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          const moveX = Math.cos(angle) * force * forceMultiplier
          const moveY = Math.sin(angle) * force * forceMultiplier
          p.x -= moveX
          p.y -= moveY
          ctx.fillStyle = p.color
        } else {
          p.x += (p.baseX - p.x) * 0.08
          p.y += (p.baseY - p.y) * 0.08
          ctx.fillStyle = p.color
        }
        ctx.fillRect(p.x, p.y, p.size, p.size)

        p.life--
        if (p.life <= 0) {
          particles.splice(i, 1)
        }
      }

      // Particle Replenishment
      if (storedImageData && particles.length < targetParticleCount * 0.7) {
        const particlesToAttempt = 20
        let added = 0
        for (let i = 0; i < particlesToAttempt * 5 && added < particlesToAttempt; i++) {
          const particle = createParticle(storedImageData, storedWsDrawWidth, storedTotalWidth, storedLogoSpacing)
          if (particle) {
            particles.push(particle)
            added++
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    // --- Initialize ---
    function initializeEffect() {
      if (!wsImage || !oilImage) {
        console.error("Cannot initialize effect, images not loaded.")
        return
      }

      const success = drawImageDataAndCache()

      if (success) {
        createInitialParticles()
        if (particles.length > 0) {
          cancelAnimationFrame(animationFrameId)
          animate()
        }
      }
    }

    // --- handleResize ---
    const handleResize = () => {
      cancelAnimationFrame(animationFrameId)
      updateCanvasSize()

      if (wsImage && oilImage) {
        const success = drawImageDataAndCache()
        if (success) {
          createInitialParticles()
          if (particles.length > 0) {
            animate()
          }
        }
      }
    }

    // --- Event Handlers ---
    const handleMove = (x: number, y: number) => (mousePositionRef.current = { x, y })
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY)
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        e.preventDefault()
        handleMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }
    const handleTouchStart = (e: TouchEvent) => {
      isTouchingRef.current = true
      if (e.touches.length > 0) handleMove(e.touches[0].clientX, e.touches[0].clientY)
    }
    const handleTouchEnd = () => {
      isTouchingRef.current = false
      mousePositionRef.current = { x: -10000, y: -10000 }
    }
    const handleMouseLeave = () => {
      if (!isTouchingRef.current) mousePositionRef.current = { x: -10000, y: -10000 }
    }

    // Add event listeners
    window.addEventListener("resize", handleResize)
    canvas.addEventListener("mousemove", handleMouseMove)
    canvas.addEventListener("touchmove", handleTouchMove, { passive: false })
    canvas.addEventListener("mouseleave", handleMouseLeave)
    canvas.addEventListener("touchstart", handleTouchStart, { passive: true })
    canvas.addEventListener("touchend", handleTouchEnd)
    canvas.addEventListener("touchcancel", handleTouchEnd)

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize)
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove)
        canvas.removeEventListener("touchmove", handleTouchMove)
        canvas.removeEventListener("mouseleave", handleMouseLeave)
        canvas.removeEventListener("touchstart", handleTouchStart)
        canvas.removeEventListener("touchend", handleTouchEnd)
        canvas.removeEventListener("touchcancel", handleTouchEnd)
      }
      cancelAnimationFrame(animationFrameId)
      particles = []
      ctx?.clearRect(0, 0, canvas?.width ?? 0, canvas?.height ?? 0)
      storedImageData = null
    }
  }, [])

  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full absolute top-0 left-0 touch-none block ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
        aria-label="Interactive particle effect with WS and OIL logos"
      />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto mt-96">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-6">
          Find <span className="gold-text">profitable</span> wells.
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
          Our AI approach identifies orphan wells with the lowest plugging costs.
        </p>
        <div className="flex justify-center">
          <Link href="/request-demo">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
              Request Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

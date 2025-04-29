"use client"

import { useRef, useEffect, useState } from "react"

// --- Define Image URLs and Particle Colors ---
const WS_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wellscout-ws.png-11LSxS9xrsfAW7Ish43PwHT3gx326T.png" // Updated to use the new WS logo
const OIL_LOGO_URL =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/wellscout%20oil%20%282%29-ZOftu5aoL5k1IXOof94MVHV7Wkvzvo.png" // Updated to use the new OIL logo
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

export default function Component() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mousePositionRef = useRef({ x: 0, y: 0 })
  const isTouchingRef = useRef(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [currentTimeEST, setCurrentTimeEST] = useState("")

  // --- Time Effect ---
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/New_York",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
        timeZoneName: "short",
      }
      setCurrentTimeEST(now.toLocaleString("en-US", options))
    }
    updateTime()
    const intervalId = setInterval(updateTime, 1000)
    return () => clearInterval(intervalId)
  }, [])

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
      console.log(`Canvas Size Updated: Target Particles: ${targetParticleCount}`)
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
        console.log("Images loaded successfully")
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
      console.log("Image data cached.")
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

      console.log(`Target Particles (in createInitialParticles): ${targetParticleCount}`)
      let createdCount = 0

      for (let i = 0; i < targetParticleCount * 8 && createdCount < targetParticleCount; i++) {
        const particle = createParticle(storedImageData, storedWsDrawWidth, storedTotalWidth, storedLogoSpacing)
        if (particle) {
          particles.push(particle)
          createdCount++
        }
      }
      console.log(`Actually Created Particles: ${createdCount}`)
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
      console.log("Initializing effect...")

      const success = drawImageDataAndCache()

      if (success) {
        createInitialParticles()
        if (particles.length > 0) {
          cancelAnimationFrame(animationFrameId)
          animate()
        } else {
          console.warn("No particles were created from the images.")
        }
      } else {
        console.error("Failed to get image data for initialization.")
      }
    }

    // --- handleResize ---
    const handleResize = () => {
      console.log("Resizing...")
      cancelAnimationFrame(animationFrameId)
      updateCanvasSize()

      if (wsImage && oilImage) {
        const success = drawImageDataAndCache()
        if (success) {
          createInitialParticles()
          if (particles.length > 0) {
            animate()
          } else {
            console.warn("No particles created after resize.")
          }
        } else {
          console.error("Failed to get image data after resize.")
        }
      } else {
        console.warn("Resize skipped: Images not loaded yet.")
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
      console.log("Cleaning up image particle effect")
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

  // --- JSX Rendering ---
  return (
    <div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <p className="text-white font-mono">Loading Logos...</p>
        </div>
      )}
      {/* Canvas Element */}
      <canvas
        ref={canvasRef}
        className={`w-full h-full absolute top-0 left-0 touch-none block ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500`}
        aria-label="Interactive particle effect with WS and OIL logos"
      />
      {/* Text Overlay */}
      <div
        className={`absolute bottom-[100px] text-center z-10 pointer-events-none ${
          isLoading ? "opacity-0" : "opacity-100"
        } transition-opacity duration-500 delay-200`}
      >
        <p className="font-mono text-gray-400 text-xs sm:text-base md:text-sm ">
          <span className="text-white">Plugging wells right.</span>{" "}
          <a
            target="_blank"
            className="invite-link text-gray-400 hover:text-blue-600 transition-colors duration-300 pointer-events-auto"
            rel="noreferrer"
        
          >
            Columbus, OH
          </a>{" "}
          <span>|</span>
          <span className="mx-1">{currentTimeEST}</span>
          <span className="transition-colors duration-300"> </span> <br />
          <a
            href="mailto:info@wellscout.com"
            className="text-gray-500 hover:text-gray-300 transition-colors duration-300 text-xs mt-2.5 inline-block pointer-events-auto"
            target="_blank"
            rel="noreferrer"
          >
            (inquiries: info@wellscout.com)
          </a>
          <style>{`
            a.invite-link:hover + span + span + span {
               color: ${WS_PARTICLE_COLOR}; /* Hover effect color */
            }
          `}</style>
        </p>
      </div>
    </div>
  )
}

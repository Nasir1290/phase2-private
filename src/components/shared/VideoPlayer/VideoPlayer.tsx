"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, VolumeX, Volume2, ChevronUp, ChevronDown, Settings, Play, Pause } from "lucide-react"

interface VideoPlayerProps {
  onClose?: () => void
  onNext?: () => void
  onPrevious?: () => void
  onRent?: () => void
}

const videoData = [
  {
    id: 1,
    src: "/placeholder-video.mp4",
    poster: "/bentley-car.png",
    title: "Bentley Flying Spur (Black), 2023",
    price: 612,
  },
  {
    id: 2,
    src: "/placeholder-video.mp4",
    poster: "/bentley-car.png",
    title: "Bentley Continental GT (White), 2024",
    price: 750,
  },
  {
    id: 3,
    src: "/placeholder-video.mp4",
    poster: "/bentley-car.png",
    title: "Bentley Mulsanne (Silver), 2023",
    price: 890,
  },
]

export default function VideoPlayer({ onClose, onNext, onPrevious, onRent }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [slideDirection, setSlideDirection] = useState<"next" | "prev" | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)


  const currentVideo = videoData[currentVideoIndex]
  const nextVideo = videoData[(currentVideoIndex + 1) % videoData.length]
  const prevVideo = videoData[currentVideoIndex === 0 ? videoData.length - 1 : currentVideoIndex - 1]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const slideToNext = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setSlideDirection("next")
    setIsPlaying(false)

    // Pause current video
    if (videoRef.current) {
      videoRef.current.pause()
    }

    // After animation completes
    setTimeout(() => {
      const nextIndex = (currentVideoIndex + 1) % videoData.length
      setCurrentVideoIndex(nextIndex)
      setSlideDirection(null)
      setIsAnimating(false)
      
      // Auto-play the new video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {
            setIsPlaying(false)
          })
        }
      }, 50)
    }, 400) // Match the CSS transition duration

    onNext?.()
  }

  const slideToPrevious = () => {
    if (isAnimating) return

    setIsAnimating(true)
    setSlideDirection("prev")
    setIsPlaying(false)

    // Pause current video
    if (videoRef.current) {
      videoRef.current.pause()
    }

    // After animation completes
    setTimeout(() => {
      const prevIndex = currentVideoIndex === 0 ? videoData.length - 1 : currentVideoIndex - 1
      setCurrentVideoIndex(prevIndex)
      setSlideDirection(null)
      setIsAnimating(false)
      
      // Auto-play the new video
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0
          videoRef.current.play().then(() => {
            setIsPlaying(true)
          }).catch(() => {
            setIsPlaying(false)
          })
        }
      }, 50)
    }, 400) // Match the CSS transition duration

    onPrevious?.()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case " ":
          e.preventDefault()
          togglePlay()
          break
        case "Escape":
          onClose?.()
          break
        case "ArrowUp":
          e.preventDefault()
          slideToPrevious()
          break
        case "ArrowDown":
          e.preventDefault()
          slideToNext()
          break
        case "m":
          toggleMute()
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [isPlaying, isMuted, onClose, currentVideoIndex, isAnimating])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      {/* Video Player Container */}
      <div className="relative w-full max-w-md bg-black rounded-2xl overflow-hidden">
        {/* Video Content */}
        <div className="relative aspect-[9/16] bg-black overflow-hidden">
          {/* Current Video */}
          <div
            className={`absolute inset-0 transition-transform duration-400 ease-out ${
              slideDirection === "next" 
                ? "transform -translate-y-full" 
                : slideDirection === "prev" 
                ? "transform translate-y-full" 
                : "transform translate-y-0"
            }`}
          >
            <video
              ref={videoRef}
              key={`current-${currentVideo.id}`}
              className="w-full h-full object-cover"
              poster={currentVideo.poster}
              muted={isMuted}
              loop
              playsInline
              onClick={togglePlay}
              onLoadedData={() => {
                console.log("[v0] Video loaded:", currentVideo.title)
              }}
            >
              <source src={currentVideo.src} type="video/mp4" />
              <img
                src={currentVideo.poster || "/placeholder.svg"}
                alt={currentVideo.title}
                className="w-full h-full object-cover"
              />
            </video>
          </div>

          {/* Next Video (slides from bottom when going next) */}
          {slideDirection === "next" && (
            <div
              className={`absolute inset-0 transition-transform duration-400 ease-out transform ${
                isAnimating ? "translate-y-0" : "translate-y-full"
              }`}
            >
              <video
                key={`next-${nextVideo.id}`}
                className="w-full h-full object-cover"
                poster={nextVideo.poster}
                muted={isMuted}
                loop
                playsInline
              >
                <source src={nextVideo.src} type="video/mp4" />
                <img
                  src={nextVideo.poster || "/placeholder.svg"}
                  alt={nextVideo.title}
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
          )}

          {/* Previous Video (slides from top when going previous) */}
          {slideDirection === "prev" && (
            <div
              className={`absolute inset-0 transition-transform duration-400 ease-out transform ${
                isAnimating ? "translate-y-0" : "-translate-y-full"
              }`}
            >
              <video
                key={`prev-${prevVideo.id}`}
                className="w-full h-full object-cover"
                poster={prevVideo.poster}
                muted={isMuted}
                loop
                playsInline
              >
                <source src={prevVideo.src} type="video/mp4" />
                <img
                  src={prevVideo.poster || "/placeholder.svg"}
                  alt={prevVideo.title}
                  className="w-full h-full object-cover"
                />
              </video>
            </div>
          )}

          {/* Play/Pause Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Button
              size="lg"
              variant="ghost"
              className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm transition-opacity duration-200 pointer-events-auto"
              onClick={togglePlay}
              style={{ opacity: isPlaying ? 0 : 1 }}
            >
              {isPlaying ? (
                <Pause className="w-8 h-8 text-white" fill="white" />
              ) : (
                <Play className="w-8 h-8 text-white ml-1" fill="white" />
              )}
            </Button>
          </div>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-end justify-between">
              <div className="text-white">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl font-bold">$ {currentVideo.price}</span>
                  <span className="bg-green-500 text-xs px-2 py-1 rounded font-medium">NO DEPOSIT</span>
                </div>
                <p className="text-sm text-gray-300">{currentVideo.title}</p>
              </div>

              <Button
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
                onClick={() => onRent?.()}
              >
                RENT
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side Controls */}
        <div className="absolute right-4 top-4 flex flex-col gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
            onClick={() => onClose?.()}
          >
            <X className="w-5 h-5 text-white" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
            onClick={toggleMute}
          >
            {isMuted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
          </Button>
        </div>

        {/* Right Side Navigation Controls */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-3">
          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm disabled:opacity-50"
            onClick={slideToPrevious}
            disabled={isAnimating}
          >
            <ChevronUp className="w-5 h-5 text-white" />
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm disabled:opacity-50"
            onClick={slideToNext}
            disabled={isAnimating}
          >
            <ChevronDown className="w-5 h-5 text-white" />
          </Button>

          <div className="relative">
            <Button
              size="sm"
              variant="ghost"
              className="w-10 h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSettings(!showSettings)}
            >
              <Settings className="w-5 h-5 text-white" />
            </Button>

            {/* Settings Menu */}
            {showSettings && (
              <div className="absolute right-12 bottom-0 bg-black/80 backdrop-blur-sm rounded-lg p-3 min-w-[150px]">
                <div className="text-white text-sm space-y-2">
                  <button className="block w-full text-left hover:text-blue-400">Quality</button>
                  <button className="block w-full text-left hover:text-blue-400">Speed</button>
                  <button className="block w-full text-left hover:text-blue-400">Report</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {showSettings && <div className="fixed inset-0 z-[-1]" onClick={() => setShowSettings(false)} />}
    </div>
  )
}
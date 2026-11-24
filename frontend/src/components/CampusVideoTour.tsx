'use client'

import React, { useRef, useState, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Maximize2, Sparkles, School } from 'lucide-react'

interface VideoChapter {
  time: number
  title: string
  label: string
}

const chapters: VideoChapter[] = [
  { time: 0, title: 'Campus Entrance', label: '00:00 Entrance & Morning Assembly' },
  { time: 4, title: 'Classrooms', label: '00:04 Interactive Digital Classrooms' },
  { time: 8, title: 'Laboratories', label: '00:08 Science & Computer Labs' },
  { time: 12, title: 'Sports Grounds', label: '00:12 Athletics & Sports Ground' },
  { time: 15, title: 'Student Life', label: '00:15 Holistic Campus Community' },
]

export function CampusVideoTour() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(17)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime)
    }
    const handleLoadedMetadata = () => {
      if (video.duration) setDuration(video.duration)
    }
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('loadedmetadata', handleLoadedMetadata)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
  }, [])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play()
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    videoRef.current.muted = !isMuted
    setIsMuted(!isMuted)
  }

  const handleFullscreen = () => {
    if (!videoRef.current) return
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen()
    }
  }

  const seekTo = (seconds: number) => {
    if (!videoRef.current) return
    videoRef.current.currentTime = seconds
    videoRef.current.play()
    setIsPlaying(true)
  }

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60)
    const s = Math.floor(secs % 60)
    return `${m}:${s < 10 ? '0' : ''}${s}`
  }

  return (
    <section
      className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden"
      aria-label="Campus Video Tour"
    >
      {/* Subtle background glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 mb-4">
            <School className="w-3.5 h-3.5" />
            <span>Virtual Campus Showcase</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
            Take a Video Tour of DNKV
          </h2>
          <p className="mt-4 text-base md:text-lg text-slate-300">
            Witness our vibrant rural campus, modern laboratories, active sports grounds, and
            energetic classroom sessions in action.
          </p>
        </div>

        {/* Video Player Card */}
        <div className="max-w-5xl mx-auto bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800">
          <div className="relative aspect-video bg-black group">
            <video
              ref={videoRef}
              src="/media/campus-tour.mp4"
              poster="/media/hero-poster.jpg"
              playsInline
              loop
              className="w-full h-full object-cover"
              onClick={togglePlay}
            />

            {/* Big center play button overlay when paused */}
            {!isPlaying && (
              <button
                type="button"
                onClick={togglePlay}
                aria-label="Play school video tour"
                className="absolute inset-0 m-auto w-20 h-20 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shadow-2xl hover:scale-110 transition-transform cursor-pointer focus:outline-none focus:ring-4 focus:ring-amber-400/50"
              >
                <Play className="w-8 h-8 fill-current ml-1" />
              </button>
            )}

            {/* Video Controls Bar */}
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 md:p-6 flex flex-col gap-3">
              {/* Progress bar */}
              <div
                className="w-full h-1.5 bg-slate-700/80 rounded-full cursor-pointer overflow-hidden"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  const pos = (e.clientX - rect.left) / rect.width
                  seekTo(pos * duration)
                }}
              >
                <div
                  className="h-full bg-amber-400 rounded-full transition-all duration-150"
                  style={{ width: `${(currentTime / (duration || 1)) * 100}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs md:text-sm text-slate-200">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={togglePlay}
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 fill-current" />
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={toggleMute}
                    aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-4 h-4 text-red-400" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>

                  <span className="font-mono text-xs text-slate-300">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    Full HD 1080p
                  </span>
                  <button
                    type="button"
                    onClick={handleFullscreen}
                    aria-label="Fullscreen"
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Chapters & Highlights navigation strip */}
          <div className="p-4 md:p-6 bg-slate-950/80 border-t border-slate-800">
            <div className="flex items-center gap-2 mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Jump to Section</span>
            </div>

            <div className="flex flex-wrap gap-2">
              {chapters.map((ch) => (
                <button
                  key={ch.time}
                  type="button"
                  onClick={() => seekTo(ch.time)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    currentTime >= ch.time && currentTime < ch.time + 4
                      ? 'bg-amber-500 text-slate-950 font-bold shadow'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  {ch.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

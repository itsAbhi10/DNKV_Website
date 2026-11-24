'use client'

import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  ArrowRight,
  Compass,
  Award,
  Sparkles,
  School,
  ShieldCheck,
  ChevronDown,
} from 'lucide-react'
import { BlurText } from './reactbits/BlurText'
import { ShinyText } from './reactbits/ShinyText'
import { useReducedMotion } from './reactbits/useReducedMotion'

interface HeroProps {
  headline?: string
  subheadline?: string
  videoDesktopUrl?: string
  videoMobileUrl?: string
  posterUrl?: string
  primaryButton?: { label: string; url: string }
  secondaryButton?: { label: string; url: string }
}

export function Hero({
  headline = 'Empowering Students for the Future',
  subheadline = 'Dr. Netaji Karale Vidyalaya, Chinchgaon — Quality Education, Strong Moral Values, and Holistic Development in Rural Maharashtra.',
  videoDesktopUrl = '/media/hero-1080.mp4',
  videoMobileUrl = '/media/hero-720.mp4',
  posterUrl = '/media/hero-poster.jpg',
  primaryButton = { label: 'Admissions 2026–27', url: '/admissions/process' },
  secondaryButton = { label: 'Explore Campus', url: '/facilities' },
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(true)
  const [scrollY, setScrollY] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const prefersReduced = useReducedMotion()

  // Ensure autoplay kicks in reliably on all browsers
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true
      videoRef.current.muted = true
      const playPromise = videoRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback if browser requires interaction
        })
      }
    }
  }, [])

  // Viewport detection for mobile-safe scroll dynamics
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile, { passive: true })
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Smooth scroll listener for Apple-style video zoom and layered parallax fade-out
  useEffect(() => {
    if (prefersReduced) return

    let animationFrameId: number

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    const onScroll = () => {
      cancelAnimationFrame(animationFrameId)
      animationFrameId = requestAnimationFrame(handleScroll)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(animationFrameId)
    }
  }, [prefersReduced])

  const togglePlay = () => {
    if (!videoRef.current) return
    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play().catch(() => {})
      setIsPlaying(true)
    }
  }

  const toggleMute = () => {
    if (!videoRef.current) return
    const nextMuted = !isMuted
    videoRef.current.muted = nextMuted
    setIsMuted(nextMuted)
  }

  // 1. Cinematic Zoom Scale: 1.0 expands smoothly to 1.16 as user begins scroll
  const videoProgress = Math.min(Math.max(scrollY / 500, 0), 1)
  const videoScale = prefersReduced ? 1.0 : 1.0 + videoProgress * 0.16

  // 2. Parallax fade-out for Hero headline, subtitle, and primary actions
  const headlineMaxScroll = isMobile ? 360 : 480
  const headlineProgress = Math.min(Math.max(scrollY / headlineMaxScroll, 0), 1)
  const headlineTranslateY = prefersReduced ? 0 : -headlineProgress * (isMobile ? 35 : 75)
  const headlineOpacity = prefersReduced ? 1.0 : Math.max(1.0 - headlineProgress * 1.15, 0)

  // 3. Staggered parallax plane for stat pills (different rate for depth layering)
  const pillsMaxScroll = isMobile ? 400 : 540
  const pillsProgress = Math.min(Math.max(scrollY / pillsMaxScroll, 0), 1)
  const pillsTranslateY = prefersReduced ? 0 : -pillsProgress * (isMobile ? 20 : 45)
  const pillsOpacity = prefersReduced ? 1.0 : Math.max(1.0 - pillsProgress * 1.1, 0)

  return (
    <section
      ref={containerRef}
      aria-label="Welcome and School Hero Video"
      className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden bg-slate-950 text-white pt-6 pb-14"
    >
      {/* Background Campus Video Canvas */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          preload="auto"
          poster={posterUrl}
          className="w-full h-full object-cover will-change-transform transition-transform duration-200 ease-out origin-center"
          style={{
            transform: `scale(${videoScale}) translate3d(0, 0, 0)`,
          }}
        >
          {/* Universal MP4 loaded first for immediate playback */}
          <source src={videoDesktopUrl} type="video/mp4" />
          {videoMobileUrl && (
            <source src={videoMobileUrl} media="(max-width: 768px)" type="video/mp4" />
          )}
          <source src="/media/hero-1080.webm" type="video/webm" />
          Your browser does not support HTML5 video.
        </video>

        {/* Balanced Cinematic Scrim Overlay: Video is vivid & clearly visible, text is crisp */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/50"
          aria-hidden="true"
        />
      </div>

      {/* Floating Modern Interactive Video Badge & Audio Toggle (Top Right) */}
      <div className="absolute top-5 right-5 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={toggleMute}
          aria-label={isMuted ? 'Unmute video audio' : 'Mute video audio'}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white text-xs font-semibold backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-md"
        >
          {isMuted ? (
            <VolumeX className="w-3.5 h-3.5 text-amber-400" />
          ) : (
            <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
          <span className="text-[11px] font-medium hidden sm:inline">
            {isMuted ? 'Sound Off' : 'Sound On'}
          </span>
        </button>

        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause background video' : 'Play background video'}
          className="p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105 shadow-md"
        >
          {isPlaying ? (
            <Pause className="w-3.5 h-3.5" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current text-amber-400" />
          )}
        </button>
      </div>

      {/* Hero Foreground Content with Parallax Lift */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white my-auto will-change-transform"
        style={{
          transform: `translate3d(0, ${headlineTranslateY}px, 0)`,
          opacity: headlineOpacity,
        }}
      >
        {/* Accreditation Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/40 border border-amber-400/40 text-amber-300 text-xs font-semibold mb-5 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span>Affiliated to Maharashtra State Board • Solapur Division</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.12] mb-5 font-serif text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)]">
          <BlurText text={headline} />
        </h1>

        {/* Subheadline */}
        <p className="text-sm sm:text-base lg:text-lg text-slate-100 font-normal max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          {subheadline}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-10">
          <Link
            href={primaryButton.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-7 py-3 rounded-full text-sm shadow-xl hover:shadow-amber-500/25 hover:scale-105 transition-all focus:ring-2 focus:ring-amber-300"
          >
            <ShinyText trigger="hover" shimmerColor="rgba(255, 255, 255, 0.95)">
              <span>{primaryButton.label}</span>
            </ShinyText>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href={secondaryButton.url}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-black/40 hover:bg-black/60 text-white font-semibold px-6 py-3 rounded-full text-sm backdrop-blur-md border border-white/30 transition-all hover:border-white/60 hover:scale-105"
          >
            <Compass className="w-4 h-4 text-amber-400" />
            <span>{secondaryButton.label}</span>
          </Link>
        </div>

        {/* 3 Floating Glassmorphic Stat Pills with Independent Parallax Plane */}
        <div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 max-w-3xl mx-auto will-change-transform transition-opacity"
          style={{
            transform: `translate3d(0, ${pillsTranslateY}px, 0)`,
            opacity: pillsOpacity,
          }}
        >
          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-left shadow-md">
            <div className="w-9 h-9 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-amber-300">100% Pass Rate</div>
              <div className="text-[11px] text-slate-200">SSC Board Distinction</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-left shadow-md">
            <div className="w-9 h-9 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300 shrink-0">
              <School className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-blue-300">Modern Campus</div>
              <div className="text-[11px] text-slate-200">Science & 40-PC IT Labs</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 text-left shadow-md">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-300 shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-emerald-300">1000+ Enrolled</div>
              <div className="text-[11px] text-slate-200">Holistic Rural Mentorship</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cinematic Seamless Hand-off to Stage Cards Section */}
      <div
        className="absolute -bottom-1 inset-x-0 h-28 sm:h-36 bg-gradient-to-t from-slate-50 via-slate-50/70 to-transparent pointer-events-none z-20"
        aria-hidden="true"
      />

      {/* Subtle Scroll Down Prompt */}
      <div
        className="absolute bottom-3 inset-x-0 flex flex-col items-center justify-center text-slate-400 text-[11px] font-medium transition-opacity pointer-events-none z-30"
        style={{ opacity: Math.max(1 - headlineProgress * 2.5, 0) }}
      >
        <ChevronDown className="w-4 h-4 animate-bounce text-amber-400" />
      </div>
    </section>
  )
}

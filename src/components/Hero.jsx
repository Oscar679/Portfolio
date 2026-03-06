import { useEffect, useRef, useState } from 'react'
import SplineScene from './SplineScene'
import HeroSpotlight from './HeroSpotlight'
import HeroParticles from './HeroParticles'

const messages = [
  { id: 0, text: "👋 Based in Växjö, Sweden — backend dev & DevOps engineer.", threshold: 60 },
  { id: 1, text: "🎓 Studying at Linnéuniversitetet · 134+ hp across backend, cloud & ML.", threshold: 160 },
  { id: 2, text: "💼 Interned at Videntic · AWS · PostgreSQL · CI/CD with GitHub Actions & Pulumi.", threshold: 270 },
  { id: 3, text: "🚀 Projects: GeoGuessr Clone · ClimateBot · Deep Learning (LSTM).", threshold: 380 },
  { id: 4, text: "📬 oscarekberg@hotmail.com — let's connect!", threshold: 490 },
]

const UNLOCK_AT = 620

export default function Hero() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)
  const [progress, setProgress] = useState(0)
  const progressRef = useRef(0)
  const sectionRef = useRef(null)
  const [typed, setTyped] = useState('')
  const fullText = 'Backend developer & DevOps engineer. I build robust systems, cloud infrastructure, and clean interfaces — from database design to deployment pipelines.'

  const visible = new Set(messages.filter(m => progress >= m.threshold).map(m => m.id))

  useEffect(() => {
    let i = 0
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++
        setTyped(fullText.slice(0, i))
        if (i >= fullText.length) clearInterval(interval)
      }, 16)
      return () => clearInterval(interval)
    }, 400)
    return () => clearTimeout(timer)
  }, [fullText])

  useEffect(() => {
    if (isMobile) return

    document.body.style.overflow = 'hidden'

    const update = (delta) => {
      const next = Math.max(0, progressRef.current + delta)
      progressRef.current = next
      setProgress(next)
      if (next >= UNLOCK_AT) {
        document.body.style.overflow = ''
        document.removeEventListener('wheel', onWheel)
        document.removeEventListener('touchstart', onTouchStart)
        document.removeEventListener('touchmove', onTouchMove)
      }
    }

    const onWheel = (e) => { e.preventDefault(); update(e.deltaY) }

    let touchY = 0
    const onTouchStart = (e) => { touchY = e.touches[0].clientY }
    const onTouchMove = (e) => {
      e.preventDefault()
      const delta = touchY - e.touches[0].clientY
      touchY = e.touches[0].clientY
      update(delta)
    }

    document.addEventListener('wheel', onWheel, { passive: false })
    document.addEventListener('touchstart', onTouchStart, { passive: true })
    document.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('wheel', onWheel)
      document.removeEventListener('touchstart', onTouchStart)
      document.removeEventListener('touchmove', onTouchMove)
    }
  }, [])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    let rafId
    const update = () => {
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const visiblePx = Math.max(0, Math.min(rect.bottom, vh) - Math.max(rect.top, 0))
      const ratio = Math.min(1, visiblePx / vh)
      const t = Math.pow(1 - ratio, 2)
      section.style.opacity = ratio < 1 ? String(Math.min(1, ratio * 1.2)) : '1'
      section.style.filter = t > 0 ? `blur(${t * 4}px)` : ''
    }
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#04080f]">
      <div className="scan-line z-30" />

      <HeroSpotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <HeroParticles />

      {/* Spline 3D scene — full hero, receives all mouse events */}
      <div className="absolute inset-0 z-0">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      {/* Content — pointer-events-none so mouse passes through to Spline */}
      <div className="relative z-10 w-full h-full flex items-center max-w-7xl mx-auto px-6 py-24 pointer-events-none">

        {/* Left text */}
        <div className="hud-box flex flex-col justify-center max-w-lg text-center lg:text-left items-center lg:items-start p-4">
          <div className="hud-br" /><div className="hud-bl" />

          <h1 className="animate-fade-up delay-1 text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-none text-primary mb-6">
            Hi, I&apos;m
            <br />
            <span className="animate-gradient glitch bg-linear-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Oscar Ekberg
            </span>
          </h1>

          <p className="animate-fade-up delay-2 text-muted text-lg max-w-md leading-relaxed mb-10">
            {typed}<span className="inline-block w-0.5 h-5 bg-cyan-400 ml-0.5 align-middle animate-pulse" style={{ opacity: typed.length < fullText.length ? 1 : 0 }} />
          </p>

          <div className="animate-fade-up delay-3 flex flex-col sm:flex-row gap-4 pointer-events-auto">
            <a
              href="#projects"
              onClick={() => navigator.vibrate?.(50)}
              className="px-8 py-3.5 rounded-full bg-cyan-500 hover:bg-cyan-400 active:scale-95 transition-all font-semibold text-black shadow-lg shadow-cyan-500/25"
            >
              View my work
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-ekberg-127833250/"
              target="_blank"
              rel="noreferrer"
              onClick={() => navigator.vibrate?.(50)}
              className="btn-outline px-8 py-3.5 rounded-full transition-all font-medium"
            >
              LinkedIn →
            </a>
          </div>
        </div>

      </div>

      {/* Chat bubbles from robot — hidden on small screens */}
      <div className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-3 items-end pointer-events-none w-64 sm:w-72">
        {messages.map(m => (
          <div
            key={m.id}
            style={{
              opacity: visible.has(m.id) ? 1 : 0,
              transform: visible.has(m.id) ? 'translateX(0) scale(1)' : 'translateX(16px) scale(0.95)',
              transition: 'opacity 0.4s ease, transform 0.4s ease',
            }}
            className="glass-card text-primary text-sm leading-relaxed px-4 py-2.5 rounded-2xl rounded-br-sm"
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 z-10 flex flex-col items-center gap-1.5 pointer-events-none scroll-hint">
        <span className="text-faint text-[10px] tracking-widest uppercase">Scroll</span>
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </div>

    </section>
  )
}

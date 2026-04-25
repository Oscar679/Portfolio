import { useEffect, useRef, useState } from 'react'
import { ArrowRight, ExternalLink, Gamepad2, MapPin, Terminal } from 'lucide-react'
import AnimatedShaderBackground from './ui/animated-shader-background'

const messages = [
  { id: 0, label: 'local', text: 'Växjö, Sweden. Backend and DevOps focus.', threshold: 60, accent: '#3ee7f4' },
  { id: 1, label: 'study', text: 'Linnéuniversitetet. 134+ hp across backend, cloud, and ML.', threshold: 160, accent: '#41f0bd' },
  { id: 2, label: 'current', text: 'Developing TerraTactics for Project Course 2 in Media Technology.', threshold: 260, accent: '#f5b84b' },
  { id: 3, label: 'internship', text: 'Videntic: AWS, PostgreSQL, CI/CD, GitHub Actions, and Pulumi.', threshold: 360, accent: '#7aa7ff' },
  { id: 4, label: 'builds', text: 'GeoGuessr clone, ClimateBot, and LSTM deep learning work.', threshold: 460, accent: '#41f0bd' },
  { id: 5, label: 'contact', text: 'oscarekberg@hotmail.com', threshold: 560, accent: '#ff6b8a' },
]

const HERO_TEXT = 'Backend developer and DevOps engineer building reliable systems, cloud infrastructure, and clean interfaces from database design to deployment pipelines.'
const UNLOCK_AT = 620
const heroChips = ['Backend systems', 'Cloud delivery', 'Game development']
const TERRATACTICS_REPO = 'https://github.com/Oscar679/TerraTactics'

function shouldUseHeroGate() {
  return (
    window.matchMedia('(min-width: 1024px)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
    window.scrollY < window.innerHeight * 0.35
  )
}

function getInitialProgress() {
  return shouldUseHeroGate() ? 0 : UNLOCK_AT
}

export default function Hero() {
  const [progress, setProgress] = useState(getInitialProgress)
  const progressRef = useRef(progress)
  const unlockedRef = useRef(progress >= UNLOCK_AT)
  const sectionRef = useRef(null)
  const [typed, setTyped] = useState('')

  const visible = new Set(messages.filter(m => progress >= m.threshold).map(m => m.id))
  const unlocked = progress >= UNLOCK_AT

  useEffect(() => {
    let i = 0
    let interval
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        i += 1
        setTyped(HERO_TEXT.slice(0, i))
        if (i >= HERO_TEXT.length) clearInterval(interval)
      }, 14)
    }, 360)
    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    if (!shouldUseHeroGate()) {
      progressRef.current = UNLOCK_AT
      unlockedRef.current = true
      return
    }

    const release = (delta = 0) => {
      if (unlockedRef.current) return
      unlockedRef.current = true
      progressRef.current = UNLOCK_AT
      setProgress(UNLOCK_AT)
      document.body.style.overflow = ''

      if (delta > 0) {
        requestAnimationFrame(() => {
          window.scrollBy({ top: Math.min(delta, 220), left: 0, behavior: 'auto' })
        })
      }
    }

    const updateGate = (delta) => {
      const next = Math.max(0, progressRef.current + delta)
      if (next >= UNLOCK_AT) {
        release(delta)
        return
      }
      progressRef.current = next
      setProgress(next)
    }

    const onWheel = (e) => {
      if (unlockedRef.current) return
      e.preventDefault()
      updateGate(e.deltaY)
    }

    let touchY = 0
    const onTouchStart = (e) => {
      touchY = e.touches[0]?.clientY ?? 0
    }
    const onTouchMove = (e) => {
      if (unlockedRef.current) return
      const nextY = e.touches[0]?.clientY ?? touchY
      const delta = touchY - nextY
      touchY = nextY
      e.preventDefault()
      updateGate(delta)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('touchstart', onTouchStart, { passive: true })
    window.addEventListener('touchmove', onTouchMove, { passive: false })

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('wheel', onWheel)
      window.removeEventListener('touchstart', onTouchStart)
      window.removeEventListener('touchmove', onTouchMove)
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
      const ratio = Math.min(1, visiblePx / Math.min(vh, rect.height || vh))
      const t = Math.pow(1 - ratio, 2)
      section.style.opacity = ratio < 1 ? String(Math.min(1, ratio * 1.2)) : '1'
      section.style.filter = t > 0 ? `blur(${t * 4}px)` : ''
    }
    const onScroll = () => {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(update)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <section ref={sectionRef} className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-[#07090d]">
      <AnimatedShaderBackground className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-[2] pointer-events-none bg-[linear-gradient(90deg,rgba(7,9,13,0.92)_0%,rgba(7,9,13,0.62)_44%,rgba(7,9,13,0.24)_76%,rgba(7,9,13,0.70)_100%)]" />

      <div className="relative z-10 mx-auto grid min-h-[92svh] w-full max-w-7xl items-center px-5 py-28 sm:px-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(320px,0.58fr)] lg:gap-10 lg:py-24 pointer-events-none">
        <div className="hero-copy max-w-3xl text-center lg:text-left">
          <div className="animate-fade-up delay-1 mb-5 flex flex-wrap items-center justify-center gap-2.5 lg:justify-start">
            <span className="hero-status-pill">
              <span className="hero-status-dot" />
              Backend / DevOps Engineer
            </span>
            <span className="hero-location-pill">
              <MapPin size={13} strokeWidth={2.4} aria-hidden="true" />
              Växjö, Sweden
            </span>
          </div>

          <h1 className="animate-fade-up delay-1 mb-6 text-5xl font-black leading-none text-primary sm:text-6xl lg:text-8xl">
            Oscar
            <br />
            <span className="animate-gradient glitch name-gradient">
              Ekberg
            </span>
          </h1>

          <p className="animate-fade-up delay-2 mx-auto mb-7 max-w-2xl text-base leading-8 text-muted sm:text-lg lg:mx-0">
            {typed}
            <span
              className="ml-1 inline-block h-5 w-0.5 align-middle bg-cyan-300 animate-pulse"
              style={{ opacity: typed.length < HERO_TEXT.length ? 1 : 0 }}
            />
          </p>

          <a
            href={TERRATACTICS_REPO}
            target="_blank"
            rel="noreferrer"
            onClick={() => navigator.vibrate?.(50)}
            className="animate-fade-up delay-3 hero-current-build mx-auto mb-7 max-w-2xl pointer-events-auto transition-transform hover:-translate-y-0.5 lg:mx-0"
          >
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-teal-300/12 text-teal-200">
              <Gamepad2 size={18} strokeWidth={2.2} aria-hidden="true" />
            </div>
            <div className="min-w-0 text-left">
              <p className="font-mono text-[11px] uppercase tracking-widest text-faint">Current build</p>
              <p className="text-sm font-semibold text-primary sm:text-base">
                TerraTactics <span className="font-normal text-muted">/ Project Course 2, Media Technology</span>
              </p>
            </div>
            <ExternalLink className="ml-auto hidden shrink-0 text-faint sm:block" size={15} strokeWidth={2.2} aria-hidden="true" />
          </a>

          <div className="animate-fade-up delay-3 mb-9 flex flex-wrap justify-center gap-2 lg:justify-start">
            {heroChips.map(chip => (
              <span key={chip} className="hero-chip">{chip}</span>
            ))}
          </div>

          <div className="animate-fade-up delay-4 flex w-full flex-col gap-3 pointer-events-auto sm:mx-auto sm:w-auto sm:flex-row sm:justify-center lg:mx-0 lg:justify-start">
            <a
              href="#projects"
              onClick={() => navigator.vibrate?.(50)}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-300 px-7 py-3.5 font-semibold text-[#031015] shadow-lg shadow-cyan-500/20 transition-all hover:bg-teal-300 active:scale-95"
            >
              View work
              <ArrowRight size={15} strokeWidth={2.4} aria-hidden="true" />
            </a>
            <a
              href="https://www.linkedin.com/in/oscar-ekberg-127833250/"
              target="_blank"
              rel="noreferrer"
              onClick={() => navigator.vibrate?.(50)}
              className="btn-outline inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 font-medium transition-all"
            >
              <ExternalLink size={15} strokeWidth={2.2} aria-hidden="true" />
              LinkedIn
            </a>
          </div>

          <div className="animate-fade-up delay-4 mt-8 hidden items-center gap-3 text-left text-xs text-faint sm:flex sm:justify-center lg:justify-start">
            <Terminal size={15} aria-hidden="true" />
            <span>REST APIs / AWS workflows / database design / game systems</span>
          </div>
        </div>
      </div>

      <div className="absolute right-6 top-1/2 z-20 hidden w-72 -translate-y-1/2 flex-col items-end gap-3 pointer-events-none lg:flex">
        {messages.map(m => (
          <div
            key={m.id}
            style={{
              opacity: visible.has(m.id) ? 1 : 0,
              transform: visible.has(m.id) ? 'translateX(0) scale(1)' : 'translateX(18px) scale(0.96)',
              transition: 'opacity 0.36s ease, transform 0.36s ease',
              borderColor: `${m.accent}40`,
            }}
            className="hero-reveal-card glass-card rounded-lg rounded-br-sm px-4 py-3 text-sm leading-relaxed text-primary"
          >
            <span className="mb-1 block font-mono text-[10px] uppercase text-faint">
              {m.label}
            </span>
            {m.text}
          </div>
        ))}
      </div>

      <div className="absolute bottom-6 z-10 flex flex-col items-center gap-1.5 pointer-events-none scroll-hint">
        <span className="text-[10px] uppercase tracking-widest text-faint">
          {unlocked ? 'Continue' : 'Reveal'}
        </span>
        <div className="scroll-mouse">
          <div className="scroll-dot" />
        </div>
      </div>
    </section>
  )
}

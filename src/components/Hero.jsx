import { useEffect, useRef, useState } from 'react'
import ParticleCanvas from './ParticleCanvas'

const roles = ['Backend Developer', 'DevOps Engineer', 'Full-stack Developer']

const stack = ['PHP', 'React', 'AWS', 'Docker', 'PostgreSQL']

function CodeCard() {
  return (
    <div className="glass-card rounded-2xl overflow-hidden font-mono text-[13px] w-full max-w-[18rem] leading-6">
      {/* macOS window chrome */}
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-card bg-white/2">
        <span className="w-3 h-3 rounded-full bg-red-400/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-400/60" />
        <span className="w-3 h-3 rounded-full bg-green-400/60" />
        <span className="ml-auto text-faint text-xs">oscar.ts</span>
      </div>

      {/* Code body */}
      <div className="p-5 space-y-0.5">
        <p>
          <span className="text-violet-400">const </span>
          <span className="text-cyan-300">oscar</span>
          <span className="text-primary"> = {'{'}</span>
        </p>

        <p className="pl-5">
          <span className="text-sky-300">name</span>
          <span className="text-primary">: </span>
          <span className="text-emerald-300">"Oscar Ekberg"</span>
          <span className="text-primary">,</span>
        </p>

        <p className="pl-5">
          <span className="text-sky-300">role</span>
          <span className="text-primary">: </span>
          <span className="text-emerald-300">"Full-stack Dev"</span>
          <span className="text-primary">,</span>
        </p>

        <p className="pl-5">
          <span className="text-sky-300">location</span>
          <span className="text-primary">: </span>
          <span className="text-emerald-300">"Växjö, SE"</span>
          <span className="text-primary">,</span>
        </p>

        <p className="pl-5">
          <span className="text-sky-300">stack</span>
          <span className="text-primary">: [</span>
        </p>

        {stack.map(t => (
          <p key={t} className="pl-10">
            <span className="text-amber-300">"{t}"</span>
            <span className="text-primary">,</span>
          </p>
        ))}

        <p className="pl-5">
          <span className="text-primary">],</span>
        </p>

        <p>
          <span className="text-primary">{'};'}</span>
        </p>
      </div>
    </div>
  )
}

export default function Hero() {
  const contentRef = useRef(null)
  const [typed, setTyped] = useState('')
  const [roleIdx, setRoleIdx] = useState(0)
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    const word = roles[roleIdx]

    if (phase === 'typing') {
      if (typed.length < word.length) {
        const t = setTimeout(() => setTyped(word.slice(0, typed.length + 1)), 100)
        return () => clearTimeout(t)
      } else {
        const t = setTimeout(() => setPhase('deleting'), 1800)
        return () => clearTimeout(t)
      }
    }

    if (phase === 'deleting') {
      if (typed.length > 0) {
        const t = setTimeout(() => setTyped(typed.slice(0, -1)), 60)
        return () => clearTimeout(t)
      } else {
        setRoleIdx(i => (i + 1) % roles.length)
        setPhase('typing')
      }
    }
  }, [typed, phase, roleIdx])

  useEffect(() => {
    const onScroll = () => {
      if (contentRef.current) {
        contentRef.current.style.transform =
          `translateY(${window.scrollY * 0.35}px)`
        contentRef.current.style.opacity =
          `${1 - window.scrollY / 500}`
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 overflow-hidden">

      <ParticleCanvas />

      {/* Background blobs (reduced blur on mobile) */}
      <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-cyan-600/20 rounded-full blur-xl md:blur-3xl animate-blob pointer-events-none" />

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-700/15 rounded-full blur-xl md:blur-3xl animate-blob blob-delay pointer-events-none" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 w-full max-w-5xl mx-auto grid lg:grid-cols-[1fr_auto] lg:gap-16 items-center transform-gpu will-change-transform"
      >

        {/* Left text */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">

          <p className="animate-fade-up delay-1 text-cyan-400 text-sm font-mono mb-4 h-5">
            {typed}<span className="animate-pulse">|</span>
          </p>

          <h1 className="animate-fade-up delay-2 text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-none text-primary mb-6">
            Oscar
            <br />
            <span className="animate-gradient bg-linear-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
              Ekberg
            </span>
          </h1>

          <p className="animate-fade-up delay-3 text-muted text-lg max-w-lg leading-relaxed mb-10">
            I build robust backends, cloud infrastructure, and clean interfaces — from database design to deployment pipelines.
          </p>

          <div className="animate-fade-up delay-4 flex flex-col sm:flex-row gap-4">

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

        {/* Code card — side on desktop, below on mobile */}
        <div className="hidden sm:flex justify-center lg:block animate-fade-up delay-4 mt-12 lg:mt-0">
          <CodeCard />
        </div>

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
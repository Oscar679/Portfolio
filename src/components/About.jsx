import { useEffect, useRef, useState } from 'react'
import ScrambleText from './ScrambleText'

const story = [
  "👋 I'm Oscar — curious developer based in Växjö, Sweden.",
  "🎓 Linnéuniversitetet · Interactive Media & Web Technologies",
  "📚 134+ hp — backend, cloud, ML & interactive media.",
  "💼 Backend / DevOps Intern at Videntic.",
  "☁️ AWS App Runner & Lambda · Pulumi IaC.",
  "🔄 CI/CD — GitHub Actions · Docker · Secrets management.",
  "🗄️ Refactored Supabase / PostgreSQL database structure.",
]

const skills = [
  "⚙️ Backend: PHP (Slim 4) · Java · REST APIs",
  "🖥️ Frontend: React · JavaScript · Tailwind",
  "☁️ Cloud: AWS · Docker · GitHub Actions · Pulumi",
  "🗄️ DBs: MySQL · PostgreSQL · Supabase · Oracle",
  "🤖 Other: Deep Learning (LSTM) · Python · Git · Linux",
]

const stats = [
  { value: '134+', label: 'credits completed', color: '#22d3ee' },
  { value: '1', label: 'internship', color: '#2dd4bf' },
  { value: '5+', label: 'projects built', color: '#60a5fa' },
  { value: '2+', label: 'years coding', color: '#a78bfa' },
]


function StatCounter({ value, label, color = '#22d3ee' }) {
  const num = parseInt(value)
  const suffix = value.replace(/[0-9]/g, '')
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1400
        const start = performance.now()
        let raf
        const step = (now) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setCount(Math.round(eased * num))
          if (t < 1) raf = requestAnimationFrame(step)
        }
        raf = requestAnimationFrame(step)
      },
      { threshold: 0.6 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [num])

  return (
    <div ref={ref} className="glass-card px-5 py-4 rounded-2xl text-center">
      <p className="text-2xl font-bold mb-1 tabular-nums" style={{ color }}>{count}{suffix}</p>
      <p className="text-faint text-xs">{label}</p>
    </div>
  )
}

export default function About() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [storyCount, setStoryCount] = useState(0)
  const [skillsCount, setSkillsCount] = useState(0)
  const timersRef = useRef([])
  const triggeredRef = useRef(false)

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
      if (ratio > 0.15 && !triggeredRef.current) { triggeredRef.current = true; setInView(true) }
    }
    const onScroll = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update) }
    window.addEventListener('scroll', onScroll, { passive: true })
    update()
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(rafId) }
  }, [])

  useEffect(() => {
    if (!inView) return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    story.forEach((_, i) => {
      const t = setTimeout(() => setStoryCount(i + 1), i * 280 + 200)
      timersRef.current.push(t)
    })
    skills.forEach((_, i) => {
      const t = setTimeout(() => setSkillsCount(i + 1), i * 280 + 400)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  const rowStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(8px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden min-h-screen"
      style={{ background: 'radial-gradient(ellipse at 85% 40%, rgba(6,182,212,0.10) 0%, transparent 55%), radial-gradient(ellipse at 10% 80%, rgba(96,165,250,0.06) 0%, transparent 50%)' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-cyan-400 text-sm font-mono mb-3"><span className="text-faint">// </span>about.tsx<span className="cursor-blink ml-0.5">▋</span></p>
        <ScrambleText as="h2" text="Who I am" className="text-4xl md:text-5xl font-bold mb-10" style={{ background: 'linear-gradient(90deg, #fff 0%, #22d3ee 60%, #60a5fa 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />

        {/* Stats strip */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}
        >
          {stats.map(({ value, label, color }) => (
            <StatCounter key={label} value={value} label={label} color={color} />
          ))}
        </div>

        {/* Two-column glass cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto mb-14">
          {/* Background card */}
          <div
            className="glass-card rounded-2xl p-6 border-l-2 border-cyan-400/30"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={e => {
              const r = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - r.left) / r.width - 0.5) * 14
              const y = ((e.clientY - r.top) / r.height - 0.5) * -14
              e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
              e.currentTarget.style.boxShadow = '0 0 0 1px #22d3ee33, 0 16px 40px #22d3ee22'
              e.currentTarget.style.transition = 'box-shadow 0.15s ease'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)'
              e.currentTarget.style.boxShadow = ''
              e.currentTarget.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            <p className="text-cyan-400/70 text-xs font-mono uppercase tracking-widest mb-5">Background</p>
            <div className="flex flex-col gap-2">
              {story.map((text, i) => (
                <div key={i} style={rowStyle(storyCount > i)}
                  className="bg-white/4 hover:bg-white/6 transition-colors rounded-xl px-3 py-2.5">
                  <p className="text-primary text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills card */}
          <div
            className="glass-card rounded-2xl p-6 border-l-2 border-violet-400/30"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={e => {
              const r = e.currentTarget.getBoundingClientRect()
              const x = ((e.clientX - r.left) / r.width - 0.5) * 14
              const y = ((e.clientY - r.top) / r.height - 0.5) * -14
              e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
              e.currentTarget.style.boxShadow = '0 0 0 1px #a78bfa33, 0 16px 40px #a78bfa22'
              e.currentTarget.style.transition = 'box-shadow 0.15s ease'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)'
              e.currentTarget.style.boxShadow = ''
              e.currentTarget.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            <p className="text-violet-400/70 text-xs font-mono uppercase tracking-widest mb-5">Skills</p>
            <div className="flex flex-col gap-2">
              {skills.map((text, i) => (
                <div key={i} style={rowStyle(skillsCount > i)}
                  className="bg-white/4 hover:bg-white/6 transition-colors rounded-xl px-3 py-2.5">
                  <p className="text-primary text-sm leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

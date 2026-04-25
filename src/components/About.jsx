import { useEffect, useRef, useState } from 'react'
import { FaCloud, FaDatabase, FaServer } from 'react-icons/fa'
import ScrambleText from './ScrambleText'

const story = [
  'Based in Växjö, Sweden with a backend-first mindset.',
  'Studying Interactive Media and Web Technologies at Linnéuniversitetet.',
  'Currently developing TerraTactics for Project Course 2 in Media Technology.',
  '134+ hp completed across backend, cloud, ML, and interactive media.',
  'Backend and DevOps intern experience at Videntic.',
  'Built AWS App Runner and Lambda workflows with Pulumi IaC.',
  'Worked with CI/CD, GitHub Actions, Docker, and secrets management.',
  'Refactored Supabase and PostgreSQL database structure.',
]

const skills = [
  'Backend: PHP (Slim 4), Java, REST APIs',
  'Frontend: React, JavaScript, Tailwind CSS',
  'Cloud: AWS, Docker, GitHub Actions, Pulumi',
  'Databases: MySQL, PostgreSQL, Supabase, Oracle',
  'Other: Deep Learning (LSTM), Python, Git, Linux',
]

const stats = [
  { value: '134+', label: 'credits completed', color: '#3ee7f4' },
  { value: '1', label: 'internship', color: '#41f0bd' },
  { value: '5+', label: 'projects built', color: '#f5b84b' },
  { value: '2+', label: 'years coding', color: '#ff6b8a' },
]

const focus = [
  {
    icon: FaServer,
    title: 'Backend systems',
    body: 'REST APIs, service boundaries, auth flows, and data-heavy application logic.',
    accent: '#3ee7f4',
  },
  {
    icon: FaCloud,
    title: 'Cloud delivery',
    body: 'Deployments, CI/CD, containers, IaC, and operational workflows that stay understandable.',
    accent: '#41f0bd',
  },
  {
    icon: FaDatabase,
    title: 'Data modeling',
    body: 'PostgreSQL, MySQL, Supabase, schema cleanup, and practical query design.',
    accent: '#f5b84b',
  },
]

function StatCounter({ value, label, color = '#3ee7f4' }) {
  const num = parseInt(value)
  const suffix = value.replace(/[0-9]/g, '')
  const [count, setCount] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const duration = 1400
        const start = performance.now()
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
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [num])

  return (
    <div ref={ref} className="glass-card metric-card rounded-lg px-5 py-4 text-center" style={{ '--metric-color': color }}>
      <p className="mb-1 text-2xl font-black tabular-nums" style={{ color }}>{count}{suffix}</p>
      <p className="text-xs text-faint">{label}</p>
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
      const ratio = Math.min(1, visiblePx / Math.min(vh, rect.height || vh))
      const t = Math.pow(1 - ratio, 2)
      section.style.opacity = ratio < 1 ? String(Math.min(1, ratio * 1.2)) : '1'
      section.style.filter = t > 0 ? `blur(${t * 4}px)` : ''
      if (ratio > 0.15 && !triggeredRef.current) {
        triggeredRef.current = true
        setInView(true)
      }
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

  useEffect(() => {
    if (!inView) return
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
    story.forEach((_, i) => {
      const t = setTimeout(() => setStoryCount(i + 1), i * 220 + 180)
      timersRef.current.push(t)
    })
    skills.forEach((_, i) => {
      const t = setTimeout(() => setSkillsCount(i + 1), i * 220 + 320)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  const rowStyle = (visible) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(8px)',
    transition: 'opacity 0.35s ease, transform 0.35s ease',
  })

  const tilt = (e, accent) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12
    e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
    e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}33, 0 18px 46px ${accent}1f`
    e.currentTarget.style.transition = 'box-shadow 0.15s ease'
  }

  const untilt = (e) => {
    e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)'
    e.currentTarget.style.boxShadow = ''
    e.currentTarget.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
  }

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-5 py-28 sm:px-6 lg:py-32"
      style={{ background: 'linear-gradient(135deg, rgba(62,231,244,0.075), transparent 34%), radial-gradient(ellipse at 94% 38%, rgba(65,240,189,0.08) 0%, transparent 55%), radial-gradient(ellipse at 8% 86%, rgba(245,184,75,0.055) 0%, transparent 48%)' }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-10 max-w-3xl">
          <p className="section-kicker mb-3"><span className="text-faint">// </span>about.jsx<span className="cursor-blink ml-0.5">_</span></p>
          <ScrambleText as="h2" text="Systems, shipping, and the stuff between" className="section-title text-4xl font-black leading-tight md:text-5xl" />
        </div>

        <div
          className="mb-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s' }}
        >
          {stats.map(({ value, label, color }) => (
            <StatCounter key={label} value={value} label={label} color={color} />
          ))}
        </div>

        <div className="mb-14 grid gap-4 md:grid-cols-3">
          {focus.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={item.title}
                className="glass-card rounded-lg p-5"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'none' : 'translateY(14px)',
                  transition: `opacity 0.5s ease ${0.15 + i * 0.1}s, transform 0.5s ease ${0.15 + i * 0.1}s`,
                }}
              >
                <div className="mb-4 grid h-10 w-10 place-items-center rounded-lg" style={{ background: `${item.accent}18`, color: item.accent }}>
                  <Icon size={17} aria-hidden="true" />
                </div>
                <h3 className="mb-2 text-base font-semibold text-primary">{item.title}</h3>
                <p className="text-sm leading-7 text-muted">{item.body}</p>
              </div>
            )
          })}
        </div>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-5 sm:grid-cols-2">
          <div
            className="glass-card rounded-lg border-l-2 border-cyan-300/35 p-5 sm:p-6"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.5s ease 0.1s, transform 0.5s ease 0.1s', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={e => tilt(e, '#3ee7f4')}
            onMouseLeave={untilt}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-cyan-200/70">Background</p>
            <div className="flex flex-col gap-2">
              {story.map((text, i) => (
                <div key={text} style={rowStyle(storyCount > i)} className="rounded-md bg-white/[0.04] px-3 py-2.5 transition-colors hover:bg-white/[0.065]">
                  <p className="text-sm leading-7 text-primary">{text}</p>
                </div>
              ))}
            </div>
          </div>

          <div
            className="glass-card rounded-lg border-l-2 border-amber-300/35 p-5 sm:p-6"
            style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'opacity 0.5s ease 0.25s, transform 0.5s ease 0.25s', transformStyle: 'preserve-3d', willChange: 'transform' }}
            onMouseMove={e => tilt(e, '#f5b84b')}
            onMouseLeave={untilt}
          >
            <p className="mb-5 font-mono text-xs uppercase tracking-widest text-amber-200/75">Tooling</p>
            <div className="flex flex-col gap-2">
              {skills.map((text, i) => (
                <div key={text} style={rowStyle(skillsCount > i)} className="rounded-md bg-white/[0.04] px-3 py-2.5 transition-colors hover:bg-white/[0.065]">
                  <p className="text-sm leading-7 text-primary">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

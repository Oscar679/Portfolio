import { useEffect, useRef, useState } from 'react'
import { FaAws, FaDocker, FaExternalLinkAlt, FaGitAlt, FaGithub, FaJava, FaLinux, FaPython, FaReact } from 'react-icons/fa'
import { SiGithubactions, SiHtml5, SiJavascript, SiMysql, SiPhp, SiPostgresql, SiPulumi, SiSupabase, SiTailwindcss, SiTensorflow } from 'react-icons/si'
import ScrambleText from './ScrambleText'

const techStack = [
  { label: 'PHP (Slim 4)', icon: SiPhp, color: '#777BB4' },
  { label: 'Java', icon: FaJava, color: '#ED8B00' },
  { label: 'React', icon: FaReact, color: '#61DAFB' },
  { label: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
  { label: 'Tailwind', icon: SiTailwindcss, color: '#06B6D4' },
  { label: 'HTML/CSS', icon: SiHtml5, color: '#E34F26' },
  { label: 'MySQL', icon: SiMysql, color: '#4479A1' },
  { label: 'PostgreSQL', icon: SiPostgresql, color: '#336791' },
  { label: 'Supabase', icon: SiSupabase, color: '#3ECF8E' },
  { label: 'Docker', icon: FaDocker, color: '#2496ED' },
  { label: 'AWS', icon: FaAws, color: '#FF9900' },
  { label: 'GitHub Actions', icon: SiGithubactions, color: '#2088FF' },
  { label: 'Pulumi', icon: SiPulumi, color: '#8A3391' },
  { label: 'TensorFlow', icon: SiTensorflow, color: '#FF6F00' },
  { label: 'Python', icon: FaPython, color: '#3776AB' },
  { label: 'Git', icon: FaGitAlt, color: '#F05032' },
  { label: 'Linux', icon: FaLinux, color: '#FCC624' },
]

const projects = [
  {
    title: 'TerraTactics',
    eyebrow: 'Current game project',
    description: 'Currently developing TerraTactics as part of Project Course 2 in Media Technology, bringing game design, systems thinking, and production work together in an active course project.',
    tags: ['Game development', 'Project Course 2', 'Media Technology', 'In progress'],
    href: 'https://github.com/Oscar679/TerraTactics',
    accent: '#41f0bd',
    current: true,
  },
  {
    title: 'GeoGuessr Clone',
    eyebrow: 'Full-stack game',
    description: 'Geography guessing game with a Slim 4 REST API, custom web components, and MySQL-backed CRUD game state.',
    tags: ['PHP', 'Slim 4', 'MySQL', 'Vanilla JS', 'REST API'],
    href: 'https://github.com/Oscar679/Web-Technology-6---GeoGuessr-Clone',
    liveHref: 'https://melab.lnu.se/~oe222ia/1me326/',
    accent: '#8b5cf6',
  },
  {
    title: 'ClimateBot',
    eyebrow: 'IoT monitoring',
    description: 'Environmental sensor pipeline that publishes real-time readings through a Python REST API into Google Sheets.',
    tags: ['Python', 'IoT', 'REST API', 'Google Sheets'],
    href: 'https://github.com/Oscar679/iot_project',
    accent: '#3ee7f4',
  },
  {
    title: 'Deep Learning LSTM',
    eyebrow: 'Machine learning',
    description: 'LSTM recurrent neural network experiments for time series prediction and multi-class classification.',
    tags: ['Python', 'TensorFlow', 'LSTM', 'ML', 'NumPy'],
    href: 'https://github.com/Oscar679/Deep_Learning_Project',
    accent: '#f5b84b',
  },
]

export default function Projects() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
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
    projects.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 170 + 180)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  const tilt = (e, accent) => {
    const r = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width - 0.5) * 12
    const y = ((e.clientY - r.top) / r.height - 0.5) * -12
    e.currentTarget.style.transform = `perspective(760px) rotateX(${y}deg) rotateY(${x}deg) translateY(-5px)`
    e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}40, 0 20px 46px ${accent}1f`
    e.currentTarget.style.transition = 'box-shadow 0.15s ease'
  }

  const untilt = (e) => {
    e.currentTarget.style.transform = 'perspective(760px) rotateX(0deg) rotateY(0deg) translateY(0)'
    e.currentTarget.style.boxShadow = ''
    e.currentTarget.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
  }

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-5 py-28 sm:px-6 lg:py-32"
      style={{ background: 'linear-gradient(155deg, rgba(255,107,138,0.055), transparent 30%), radial-gradient(ellipse at 14% 44%, rgba(139,92,246,0.10) 0%, transparent 54%), radial-gradient(ellipse at 92% 78%, rgba(245,184,75,0.06) 0%, transparent 48%)' }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="section-kicker mb-3 text-violet-300"><span className="text-faint">// </span>projects.jsx<span className="cursor-blink ml-0.5">_</span></p>
            <ScrambleText as="h2" text="Selected build logs" className="section-title text-4xl font-black leading-tight md:text-5xl" />
          </div>
          <a
            href="https://github.com/Oscar679"
            target="_blank"
            rel="noreferrer"
            style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 0.7s' }}
            className="btn-outline inline-flex w-fit items-center gap-2 rounded-full px-4 py-2.5 text-sm transition-all hover:border-cyan-300/60"
          >
            <FaGithub size={15} aria-hidden="true" />
            More on GitHub
          </a>
        </div>

        <div className="mb-16 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {projects.map(({ title, eyebrow, description, tags, href, liveHref, accent, current }, i) => (
            <article
              key={title}
              style={{
                opacity: visibleCount > i ? 1 : 0,
                transform: visibleCount > i ? 'translateX(0) scale(1)' : 'translateX(20px) scale(0.97)',
                transition: 'opacity 0.45s ease, transform 0.45s ease',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                '--project-accent': accent,
              }}
              className="glass-card project-card group flex min-h-[360px] flex-col rounded-lg p-5"
              onMouseMove={e => tilt(e, accent)}
              onMouseLeave={untilt}
            >
              <div className="mb-8 flex items-start justify-between gap-4">
                <div>
                  <p className="mb-2 font-mono text-[11px] uppercase tracking-widest text-faint">{eyebrow}</p>
                  <h3 className="text-xl font-bold leading-snug text-primary">{title}</h3>
                </div>
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-faint transition-colors group-hover:text-primary">
                  {current ? <FaGithub size={14} aria-hidden="true" /> : <FaExternalLinkAlt size={13} aria-hidden="true" />}
                </span>
              </div>

              <p className="mb-7 flex-1 text-sm leading-7 text-muted">{description}</p>

              <div className="mb-5 flex flex-wrap gap-2">
                {tags.map(tag => (
                  <span key={tag} className="rounded-md border px-2.5 py-1 text-xs" style={{ borderColor: `${accent}38`, color: `${accent}dd`, background: `${accent}0f` }}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-2 pt-1">
                {liveHref && (
                  <a
                    href={liveHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors hover:text-primary"
                    style={{ borderColor: `${accent}45`, color: `${accent}dd`, background: `${accent}10` }}
                  >
                    Live
                    <FaExternalLinkAlt size={10} aria-hidden="true" />
                  </a>
                )}
                {href && (
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.035] px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:text-primary"
                  >
                    Code
                    <FaGithub size={11} aria-hidden="true" />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s' }}>
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-faint">Toolchain matrix</p>
          <div className="flex flex-wrap gap-2">
            {techStack.map(item => {
              const Icon = item.icon
              return (
                <span
                  key={item.label}
                  className="tag-scan flex cursor-default items-center gap-1.5 rounded-md border border-white/5 bg-white/[0.035] px-3 py-1.5 text-xs text-muted transition-all duration-200 hover:border-current"
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = `${item.color}55`
                    e.currentTarget.style.color = item.color
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = ''
                    e.currentTarget.style.color = ''
                  }}
                >
                  <Icon size={11} style={{ color: item.color }} className="shrink-0" aria-hidden="true" />
                  {item.label}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

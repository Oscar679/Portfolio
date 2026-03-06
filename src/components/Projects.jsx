import { useEffect, useRef, useState } from 'react'
import ScrambleText from './ScrambleText'
import { FaReact, FaAws, FaDocker, FaPython, FaGitAlt, FaJava, FaLinux } from 'react-icons/fa'
import { SiPhp, SiMysql, SiPostgresql, SiSupabase, SiTailwindcss, SiJavascript, SiGithubactions, SiHtml5, SiPulumi, SiTensorflow } from 'react-icons/si'

const tags = [
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
    title: 'GeoGuessr Clone',
    description: 'Full-stack geography game. Players guess locations from street-view style images. Built with a Slim 4 REST API backend, Vanilla JS web components, and a MySQL database with full CRUD game state.',
    tags: ['PHP', 'Slim 4', 'MySQL', 'Vanilla JS', 'REST API'],
    href: 'https://github.com/Oscar679/Web-Technology-6---GeoGuessr-Clone',
    accent: '#8b5cf6',
  },
  {
    title: 'ClimateBot',
    description: 'IoT monitoring system that collects real-time environmental sensor data via a Python REST API and publishes it to Google Sheets for live visualization and logging.',
    tags: ['Python', 'IoT', 'REST API', 'Google Sheets'],
    href: 'https://github.com/Oscar679/iot_project',
    accent: '#06b6d4',
  },
  {
    title: 'Deep Learning — LSTM',
    description: 'Machine learning project implementing LSTM recurrent neural networks for time series prediction and multi-class classification on real-world datasets.',
    tags: ['Python', 'TensorFlow', 'LSTM', 'ML', 'NumPy'],
    href: 'https://github.com/Oscar679/Deep_Learning_Project',
    accent: '#f59e0b',
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
    projects.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 180 + 200)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden min-h-screen"
      style={{ background: 'radial-gradient(ellipse at 15% 45%, rgba(139,92,246,0.11) 0%, transparent 55%), radial-gradient(ellipse at 90% 75%, rgba(99,102,241,0.06) 0%, transparent 50%)' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-violet-400 text-sm font-mono mb-3"><span className="text-faint">// </span>projects.tsx<span className="cursor-blink ml-0.5">▋</span></p>
        <ScrambleText as="h2" text="Projects" className="text-4xl md:text-5xl font-bold mb-12" style={{ background: 'linear-gradient(90deg, #fff 0%, #a78bfa 55%, #818cf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {projects.map(({ title, description, tags, href, accent }, i) => (
            <a
              key={title}
              href={href}
              target="_blank"
              rel="noreferrer"
              style={{
                opacity: visibleCount > i ? 1 : 0,
                transition: 'opacity 0.5s ease, transform 0.5s ease',
                transformStyle: 'preserve-3d',
                willChange: 'transform',
                ...(visibleCount <= i && { transform: 'translateY(20px) scale(0.97)' }),
              }}
              className="glass-card group flex flex-col p-6 rounded-2xl"
              onMouseMove={e => {
                const r = e.currentTarget.getBoundingClientRect()
                const x = ((e.clientX - r.left) / r.width - 0.5) * 14
                const y = ((e.clientY - r.top) / r.height - 0.5) * -14
                e.currentTarget.style.transform = `perspective(700px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`
                e.currentTarget.style.boxShadow = `0 0 0 1px ${accent}33, 0 16px 40px ${accent}22`
                e.currentTarget.style.transition = 'box-shadow 0.15s ease'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0)'
                e.currentTarget.style.boxShadow = ''
                e.currentTarget.style.transition = 'transform 0.4s ease, box-shadow 0.4s ease'
              }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-primary font-semibold text-base leading-snug">{title}</h3>
                <svg className="shrink-0 w-4 h-4 text-faint group-hover:text-primary transition-colors ml-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <p className="text-muted text-sm leading-relaxed mb-5 flex-1">{description}</p>
              <div className="flex flex-wrap gap-1.5">
                {tags.map(tag => (
                  <span key={tag} className="text-xs px-2.5 py-0.5 rounded-full border border-white/8 text-faint"
                    style={{ borderColor: accent + '33', color: accent + 'cc' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>

        <a
          href="https://github.com/Oscar679"
          target="_blank"
          rel="noreferrer"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 0.7s' }}
          className="inline-flex items-center gap-2 text-sm text-faint hover:text-primary transition-colors mb-16"
        >
          View all on GitHub
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>

        {/* Tech stack */}
        <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'opacity 0.6s ease 0.8s, transform 0.6s ease 0.8s' }}>
          <p className="text-faint text-xs font-mono uppercase tracking-widest mb-4">Tech stack</p>
          <div className="flex flex-wrap gap-2">
            {tags.map(({ label, icon: Icon, color }) => (
              <span
                key={label}
                className="tag-scan flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border border-white/5 text-muted bg-white/3 hover:border-current transition-all duration-200 cursor-default"
                onMouseEnter={e => { e.currentTarget.style.borderColor = color + '55'; e.currentTarget.style.color = color }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = ''; e.currentTarget.style.color = '' }}
              >
                <Icon size={11} style={{ color }} className="shrink-0" />
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

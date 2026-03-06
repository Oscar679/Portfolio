import { useEffect, useRef, useState } from 'react'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa'
import ScrambleText from './ScrambleText'

const links = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'oscarekberg@hotmail.com',
    href: 'mailto:oscarekberg@hotmail.com',
    copy: 'oscarekberg@hotmail.com',
    accent: '#06b6d4',
  },
  {
    icon: FaLinkedin,
    label: 'LinkedIn',
    value: 'oscar-ekberg-127833250',
    href: 'https://www.linkedin.com/in/oscar-ekberg-127833250/',
    accent: '#0a66c2',
  },
  {
    icon: FaGithub,
    label: 'GitHub',
    value: 'Oscar679',
    href: 'https://github.com/Oscar679',
    accent: '#e2e8f0',
  },
]

export default function Contact() {
  const sectionRef = useRef(null)
  const [inView, setInView] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)
  const [copied, setCopied] = useState(false)
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
    links.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 180 + 300)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  const handleClick = async (e, link) => {
    if (!link.copy) return
    e.preventDefault()
    navigator.vibrate?.(50)
    await navigator.clipboard.writeText(link.copy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-32 px-6 overflow-hidden min-h-screen"
      style={{ background: 'radial-gradient(ellipse at 85% 35%, rgba(20,184,166,0.10) 0%, transparent 55%), radial-gradient(ellipse at 10% 70%, rgba(6,182,212,0.06) 0%, transparent 50%)' }}
    >
      <div className="relative z-10 max-w-5xl mx-auto">
        <p className="text-teal-400 text-sm font-mono mb-3"><span className="text-faint">// </span>contact.tsx<span className="cursor-blink ml-0.5">▋</span></p>
        <ScrambleText as="h2" text="Contact" className="text-4xl md:text-5xl font-bold mb-4" style={{ background: 'linear-gradient(90deg, #fff 0%, #2dd4bf 55%, #22d3ee 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }} />

        {/* Availability badge */}
        <div
          className="flex items-center gap-2 mb-12"
          style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-60" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-teal-400" />
          </span>
          <span className="text-teal-400 text-sm">Based in Växjö, Sweden</span>
        </div>

        <p className="text-muted text-lg max-w-lg leading-relaxed mb-12">
          Backend developer & DevOps engineer. Feel free to reach out — always happy to connect or chat about interesting projects.
        </p>

        {/* Contact cards */}
        <div className="flex flex-col gap-4 max-w-lg mb-16">
          {links.map((link, i) => {
            const Icon = link.icon
            const isEmail = !!link.copy
            return (
              <a
                key={link.label}
                href={link.href}
                target={isEmail ? undefined : '_blank'}
                rel="noreferrer"
                onClick={(e) => handleClick(e, link)}
                style={{
                  opacity: visibleCount > i ? 1 : 0,
                  transform: visibleCount > i ? 'translateX(0)' : 'translateX(-16px)',
                  transition: 'opacity 0.45s ease, transform 0.45s ease',
                }}
                className="glass-card group flex items-center gap-4 px-6 py-4 rounded-2xl hover:-translate-y-0.5 transition-transform duration-200"
                onMouseEnter={e => { e.currentTarget.style.boxShadow = `0 0 0 1px ${link.accent}33, 0 4px 20px ${link.accent}14` }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = '' }}
              >
                <div className="p-2.5 rounded-xl" style={{ background: link.accent + '18' }}>
                  <Icon size={18} style={{ color: link.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-faint text-xs mb-0.5">{link.label}</p>
                  <p className="text-primary text-sm font-medium truncate">{link.value}</p>
                </div>
                <svg className="w-4 h-4 text-faint group-hover:text-primary transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            )
          })}
        </div>
      </div>

      {/* Toast */}
      <div
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full glass-card text-sm text-primary border-teal-400/30"
        style={{
          opacity: copied ? 1 : 0,
          transform: `translateX(-50%) translateY(${copied ? 0 : 8}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
          borderColor: copied ? 'rgba(45,212,191,0.35)' : undefined,
        }}
      >
        <span className="text-teal-400">✓</span> Email copied to clipboard
      </div>

      <div className="absolute bottom-8 left-6 right-6 max-w-5xl mx-auto border-t border-card pt-8 text-faint text-sm flex justify-between">
        <span>Oscar Ekberg</span>
        <span>Växjö, Sweden</span>
      </div>
    </section>
  )
}

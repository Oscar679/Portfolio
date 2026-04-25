import { useEffect, useRef, useState } from 'react'
import { FaCheck, FaEnvelope, FaExternalLinkAlt, FaGithub, FaLinkedin, FaRegCopy } from 'react-icons/fa'
import ScrambleText from './ScrambleText'

const links = [
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'oscarekberg@hotmail.com',
    href: 'mailto:oscarekberg@hotmail.com',
    copy: 'oscarekberg@hotmail.com',
    accent: '#3ee7f4',
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
    accent: '#f7f8f2',
  },
]

const notes = ['Backend roles', 'DevOps internships', 'Cloud projects', 'Game projects']

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
    links.forEach((_, i) => {
      const t = setTimeout(() => setVisibleCount(i + 1), i * 170 + 280)
      timersRef.current.push(t)
    })
    return () => timersRef.current.forEach(clearTimeout)
  }, [inView])

  const handleClick = async (e, link) => {
    if (!link.copy) return
    e.preventDefault()
    navigator.vibrate?.(50)

    try {
      await navigator.clipboard.writeText(link.copy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    } catch {
      window.location.assign(link.href)
    }
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden px-5 py-28 sm:px-6 lg:py-32"
      style={{ background: 'linear-gradient(145deg, rgba(65,240,189,0.08), transparent 32%), radial-gradient(ellipse at 86% 34%, rgba(62,231,244,0.10) 0%, transparent 55%), radial-gradient(ellipse at 9% 78%, rgba(255,107,138,0.055) 0%, transparent 50%)' }}
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="contact-grid">
          <div>
            <p className="section-kicker mb-3 text-teal-300"><span className="text-faint">// </span>contact.jsx<span className="cursor-blink ml-0.5">_</span></p>
            <ScrambleText as="h2" text="Let the next build start clean" className="section-title mb-6 text-4xl font-black leading-tight md:text-5xl" />

            <div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-2"
              style={{ opacity: inView ? 1 : 0, transition: 'opacity 0.5s ease 0.1s' }}
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-teal-300" />
              </span>
              <span className="text-sm text-teal-200">Based in Växjö, Sweden</span>
            </div>

            <p className="mb-8 max-w-xl text-lg leading-8 text-muted">
              Backend developer and DevOps engineer interested in practical systems, cloud delivery, and teams that care about maintainable software.
            </p>

            <div className="flex flex-wrap gap-2">
              {notes.map((note, i) => (
                <span
                  key={note}
                  className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-muted"
                  style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(8px)', transition: `opacity 0.45s ease ${0.15 + i * 0.08}s, transform 0.45s ease ${0.15 + i * 0.08}s` }}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {links.map((link, i) => {
              const Icon = link.icon
              const isEmail = !!link.copy
              const ActionIcon = isEmail ? FaRegCopy : FaExternalLinkAlt
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
                  className="glass-card group flex items-center gap-4 rounded-lg px-5 py-4 transition-transform duration-200 hover:-translate-y-0.5 sm:px-6"
                  onMouseEnter={e => {
                    e.currentTarget.style.boxShadow = `0 0 0 1px ${link.accent}33, 0 10px 28px ${link.accent}16`
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.boxShadow = ''
                  }}
                >
                  <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg" style={{ background: `${link.accent}18` }}>
                    <Icon size={18} style={{ color: link.accent }} aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="mb-0.5 text-xs text-faint">{link.label}</p>
                    <p className="truncate text-sm font-semibold text-primary sm:text-base">{link.value}</p>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.035] text-faint transition-colors group-hover:text-primary">
                    <ActionIcon size={13} aria-hidden="true" />
                  </span>
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-card pt-8 text-sm text-faint sm:flex-row sm:items-center sm:justify-between">
          <span>Oscar Ekberg</span>
          <span>Backend developer / DevOps engineer</span>
        </div>
      </div>

      <div
        className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full border border-teal-300/30 bg-[#071014]/90 px-4 py-2.5 text-sm text-primary shadow-lg shadow-black/30 backdrop-blur-md"
        style={{
          opacity: copied ? 1 : 0,
          transform: `translateX(-50%) translateY(${copied ? 0 : 8}px)`,
          transition: 'opacity 0.3s ease, transform 0.3s ease',
          pointerEvents: 'none',
        }}
      >
        <FaCheck size={13} className="text-teal-300" aria-hidden="true" />
        Email copied
      </div>
    </section>
  )
}

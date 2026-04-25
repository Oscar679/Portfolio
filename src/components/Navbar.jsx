import { useEffect, useState } from 'react'
import { FaBars, FaGithub, FaTimes } from 'react-icons/fa'

const links = ['About', 'Projects', 'Contact']

export default function Navbar() {
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()))
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <nav className="fixed top-0 z-50 flex w-full items-center justify-between px-4 py-3 backdrop-blur-md nav-glass sm:px-6">
        <a href="#" className="group inline-flex items-center gap-3" aria-label="Oscar Ekberg home">
          <span className="grid h-9 w-9 place-items-center rounded-lg border border-cyan-300/25 bg-cyan-300/10 font-mono text-sm font-bold text-cyan-200 transition-colors group-hover:border-cyan-200/60">
            OE
          </span>
          <span className="hidden text-sm font-semibold text-primary sm:block">
            Oscar Ekberg
          </span>
        </a>

        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 text-sm text-muted md:flex">
          {links.map(l => {
            const id = l.toLowerCase()
            const isActive = active === id
            return (
              <a
                key={l}
                href={`#${id}`}
                className={`rounded-full px-4 py-2 transition-all hover:text-cyan-200 ${isActive ? 'bg-cyan-300/[0.12] text-cyan-200 shadow-[0_0_18px_rgba(62,231,244,0.12)]' : ''}`}
              >
                {l}
              </a>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://github.com/Oscar679"
            target="_blank"
            rel="noreferrer"
            className="btn-outline hidden items-center gap-2 rounded-full px-4 py-2 text-sm transition-all hover:border-cyan-300/60 md:inline-flex"
          >
            <FaGithub size={14} aria-hidden="true" />
            GitHub
          </a>

          <button
            className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-muted transition-colors hover:border-cyan-300/40 hover:text-cyan-200 md:hidden"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <FaTimes size={16} aria-hidden="true" /> : <FaBars size={16} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      <div className={`fixed inset-x-0 top-[65px] z-40 border-t border-card mobile-menu transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="flex flex-col gap-2 px-4 py-4">
          {links.map(l => {
            const id = l.toLowerCase()
            return (
              <a
                key={l}
                href={`#${id}`}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-3 py-3 text-sm transition-colors hover:bg-white/[0.05] hover:text-cyan-200 ${active === id ? 'bg-cyan-300/10 text-cyan-200' : 'text-muted'}`}
              >
                {l}
              </a>
            )
          })}
          <a
            href="https://github.com/Oscar679"
            target="_blank"
            rel="noreferrer"
            className="btn-outline mt-2 inline-flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-sm transition-all hover:border-cyan-300/60 hover:text-cyan-200"
          >
            <FaGithub size={14} aria-hidden="true" />
            GitHub
          </a>
        </div>
      </div>
    </>
  )
}

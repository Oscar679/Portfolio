import { useEffect, useState } from 'react'

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
      <nav className="fixed top-0 w-full z-50 px-6 py-4 flex items-center justify-between backdrop-blur-md nav-glass">
        <span className="text-lg font-bold tracking-tight text-primary">
          Oscar<span className="text-cyan-400">.</span>
        </span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm text-muted">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className={`relative transition-colors hover:text-cyan-400 ${active === l.toLowerCase() ? 'text-cyan-400' : ''}`}
            >
              {l}
              <span className={`absolute -bottom-1 left-0 w-full h-px bg-cyan-400 transition-transform duration-300 origin-left ${active === l.toLowerCase() ? 'scale-x-100' : 'scale-x-0'}`} />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {/* Desktop GitHub */}
          <a
            href="https://github.com/Oscar679"
            target="_blank"
            rel="noreferrer"
            className="hidden md:block btn-outline text-sm px-4 py-2 rounded-full transition-all hover:border-cyan-400/60 hover:text-cyan-400"
          >
            GitHub
          </a>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2 text-muted hover:text-cyan-400 transition-colors cursor-pointer"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-x-0 top-[57px] z-40 mobile-menu border-t border-card transition-all duration-300 md:hidden ${menuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}`}>
        <div className="flex flex-col px-6 py-5 gap-5">
          {links.map(l => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={() => setMenuOpen(false)}
              className={`text-sm transition-colors hover:text-cyan-400 ${active === l.toLowerCase() ? 'text-cyan-400' : 'text-muted'}`}
            >
              {l}
            </a>
          ))}
          <a
            href="https://github.com/Oscar679"
            target="_blank"
            rel="noreferrer"
            className="btn-outline text-sm px-4 py-2 rounded-full transition-all hover:border-cyan-400/60 hover:text-cyan-400 text-center"
          >
            GitHub
          </a>
        </div>
      </div>
    </>
  )
}

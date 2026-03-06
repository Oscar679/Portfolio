import { useEffect, useState } from 'react'

const sections = [
  { id: '', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
]

export default function DotNav() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const ids = ['about', 'projects', 'contact']
    const els = ids.map(id => document.getElementById(id)).filter(Boolean)

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    els.forEach(el => observer.observe(el))

    const onScroll = () => { if (window.scrollY < 200) setActive('') }
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  return (
    <nav className="fixed right-5 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-4 items-end">
      {sections.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a
            key={id || 'home'}
            href={id ? `#${id}` : '#'}
            onClick={id === '' ? e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) } : undefined}
            className="group flex items-center gap-2.5"
            title={label}
          >
            <span className="text-[11px] text-faint group-hover:text-primary transition-all duration-200 opacity-0 group-hover:opacity-100 whitespace-nowrap tracking-wide">
              {label}
            </span>
            <span
              className="block rounded-full transition-all duration-300"
              style={{
                width: isActive ? '10px' : '6px',
                height: isActive ? '10px' : '6px',
                background: isActive ? '#22d3ee' : 'rgba(255,255,255,0.2)',
                boxShadow: isActive ? '0 0 8px rgba(34,211,238,0.7)' : 'none',
              }}
            />
          </a>
        )
      })}
    </nav>
  )
}

import { useState, useEffect } from 'react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => { window.scrollTo({ top: 0, behavior: 'smooth' }); navigator.vibrate?.(40) }}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 w-14 h-14 md:w-11 md:h-11 md:bottom-8 md:right-8 rounded-full glass-card flex items-center justify-center text-muted hover:text-cyan-400 hover:border-cyan-400/30 transition-all duration-300 cursor-pointer ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  )
}

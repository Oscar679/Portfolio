import { useEffect, useState } from 'react'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
        navigator.vibrate?.(40)
      }}
      aria-label="Scroll to top"
      className={`fixed bottom-6 right-6 z-50 grid h-12 w-12 place-items-center rounded-lg glass-card text-muted transition-all duration-300 hover:border-cyan-300/35 hover:text-cyan-200 md:bottom-8 md:right-8 md:h-11 md:w-11 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <FaArrowUp size={15} aria-hidden="true" />
    </button>
  )
}

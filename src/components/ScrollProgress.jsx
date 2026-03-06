import { useEffect, useState } from 'react'

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight
      setProgress(total > 0 ? window.scrollY / total : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[60] h-[2px] origin-left pointer-events-none"
      style={{ transform: `scaleX(${progress})`, width: '100%', background: 'linear-gradient(90deg, #22d3ee, #2dd4bf, #60a5fa)' }}
    />
  )
}

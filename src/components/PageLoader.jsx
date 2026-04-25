import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 600)
    const hideTimer = setTimeout(() => setVisible(false), 1100)
    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(hideTimer)
    }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1, backgroundColor: 'var(--bg)' }}
    >
      <div className="hud-box hero-panel rounded-lg px-8 py-7 text-center">
        <div className="hud-br" />
        <div className="hud-bl" />
        <span className="mb-4 block text-3xl font-black text-primary">
          Oscar<span className="text-cyan-300">.</span>
        </span>
        <div className="flex justify-center gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="h-1.5 w-1.5 rounded-full bg-cyan-300"
              style={{ animation: `loader-dot 1s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

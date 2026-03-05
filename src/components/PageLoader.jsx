import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)
  const [fading, setFading] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFading(true), 600)
    const hideTimer = setTimeout(() => setVisible(false), 1100)
    return () => { clearTimeout(fadeTimer); clearTimeout(hideTimer) }
  }, [])

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-500"
      style={{ opacity: fading ? 0 : 1, backgroundColor: 'var(--bg)' }}
    >
      <div className="flex flex-col items-center gap-4">
        <span className="text-3xl font-bold tracking-tight text-primary">
          Oscar<span className="text-cyan-400">.</span>
        </span>
        <div className="flex gap-1.5">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-cyan-400"
              style={{ animation: `loader-dot 1s ease-in-out ${i * 0.15}s infinite` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

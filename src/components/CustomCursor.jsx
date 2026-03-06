import { useEffect, useState, useCallback } from 'react'

export default function CustomCursor() {
  const [ripples, setRipples] = useState([])

  const handleClick = useCallback((e) => {
    const id = Date.now() + Math.random()
    setRipples(r => [...r, { id, x: e.clientX, y: e.clientY }])
    setTimeout(() => setRipples(r => r.filter(rip => rip.id !== id)), 800)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      {ripples.map(rip => (
        <div
          key={rip.id}
          style={{
            position: 'fixed',
            left: rip.x,
            top: rip.y,
            pointerEvents: 'none',
            zIndex: 9998,
          }}
        >
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="ripple-ring"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      ))}
    </>
  )
}

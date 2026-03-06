import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const spotRef = useRef(null)

  useEffect(() => {
    // Desktop only
    if (window.matchMedia('(pointer: coarse)').matches) return

    const el = spotRef.current
    let raf

    const onMove = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (el) {
          el.style.left = e.clientX + 'px'
          el.style.top = e.clientY + 'px'
        }
      })
    }

    window.addEventListener('mousemove', onMove)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={spotRef}
      className="cursor-spotlight"
      aria-hidden="true"
    />
  )
}

import { useEffect, useRef } from 'react'

export default function SectionDivider() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.classList.add('drawn'); observer.unobserve(el) }
    }, { threshold: 0.5 })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className="section-divider" aria-hidden="true" />
}

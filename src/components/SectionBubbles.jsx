import { useEffect, useRef, useState } from 'react'

export default function SectionBubbles({ messages, side = 'right' }) {
  const ref = useRef(null)
  const [visibleCount, setVisibleCount] = useState(0)
  const timersRef = useRef([])
  const triggeredRef = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || triggeredRef.current) return
        triggeredRef.current = true
        timersRef.current.forEach(clearTimeout)
        timersRef.current = []
        messages.forEach((_, i) => {
          const t = setTimeout(() => setVisibleCount(i + 1), i * 220 + 200)
          timersRef.current.push(t)
        })
        observer.disconnect()
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      timersRef.current.forEach(clearTimeout)
    }
  }, [messages])

  const dx = side === 'right' ? '16px' : '-16px'

  return (
    <div
      ref={ref}
      className={`hidden xl:flex flex-col gap-3 items-${side === 'right' ? 'end' : 'start'} pointer-events-none absolute ${side === 'right' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 max-w-[210px]`}
    >
      {messages.map((text, i) => (
        <div
          key={i}
          style={{
            opacity: visibleCount > i ? 1 : 0,
            transform: visibleCount > i
              ? 'translateX(0) scale(1)'
              : `translateX(${dx}) scale(0.95)`,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
          }}
          className={`glass-card text-primary text-xs leading-relaxed px-3.5 py-2 rounded-2xl ${side === 'right' ? 'rounded-br-sm' : 'rounded-bl-sm'}`}
        >
          {text}
        </div>
      ))}
    </div>
  )
}

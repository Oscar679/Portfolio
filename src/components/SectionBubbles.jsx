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
  const alignment = side === 'right' ? 'items-end right-6' : 'items-start left-6'
  const bubbleTail = side === 'right' ? 'rounded-br-sm' : 'rounded-bl-sm'

  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute top-1/2 hidden max-w-[210px] -translate-y-1/2 flex-col gap-3 xl:flex ${alignment}`}
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
          className={`glass-card rounded-lg px-3.5 py-2 text-xs leading-relaxed text-primary ${bubbleTail}`}
        >
          {text}
        </div>
      ))}
    </div>
  )
}

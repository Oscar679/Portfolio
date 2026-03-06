import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#@ABCDEFGHIJKLabcdefghijkl0123456789'

export default function ScrambleText({ text, as: Tag = 'span', className, style }) {
  const [output, setOutput] = useState(text)
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        let frame = 0
        const totalFrames = 20
        const interval = setInterval(() => {
          frame++
          const progress = frame / totalFrames
          setOutput(
            text.split('').map((char, i) => {
              if (char === ' ') return ' '
              if (i / text.length < progress) return char
              return CHARS[Math.floor(Math.random() * CHARS.length)]
            }).join('')
          )
          if (frame >= totalFrames) {
            clearInterval(interval)
            setOutput(text)
          }
        }, 45)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [text])

  return <Tag ref={ref} className={className} style={style}>{output}</Tag>
}

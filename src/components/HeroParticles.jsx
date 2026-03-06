import { useEffect, useRef } from 'react'

export default function HeroParticles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 2.5 + 0.6,
      speedX: (Math.random() - 0.5) * 0.0004,
      speedY: -(Math.random() * 0.0005 + 0.0001),
      opacity: Math.random() * 0.5 + 0.08,
      phase: Math.random() * Math.PI * 2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const t = performance.now() / 1000
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.y < -0.02) { p.y = 1.02; p.x = Math.random() }
        if (p.x < -0.02) p.x = 1.02
        if (p.x > 1.02)  p.x = -0.02

        const pulse = 0.5 + 0.5 * Math.sin(t * 0.8 + p.phase)
        const alpha = p.opacity * pulse
        const px = p.x * canvas.width
        const py = p.y * canvas.height

        ctx.beginPath()
        ctx.arc(px, py, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(34,211,238,${alpha.toFixed(3)})`
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  )
}

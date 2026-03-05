import { useEffect, useRef } from "react"

export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const section = canvas.parentElement

    const DPR = window.devicePixelRatio || 1

    let width = 0
    let height = 0
    let particles = []
    let animationFrame
    let pointer = { x: null, y: null }

    const PARTICLE_COUNT = 70
    const MAX_DIST = 120
    const REPEL_RADIUS = 110
    const REPEL_FORCE = 2.5

    function resize() {
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * DPR
      canvas.height = height * DPR
      canvas.style.width = width + "px"
      canvas.style.height = height + "px"
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0)
    }

    function createParticles() {
      particles = []
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 2 + 0.6
        })
      }
    }

    function drawParticles() {
      ctx.clearRect(0, 0, width, height)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // Pointer repulsion (mouse + touch)
        if (pointer.x !== null) {
          const dx = p.x - pointer.x
          const dy = p.y - pointer.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_RADIUS && dist > 0) {
            const force = (REPEL_RADIUS - dist) / REPEL_RADIUS * REPEL_FORCE
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Dampen & clamp
        p.vx *= 0.98
        p.vy *= 0.98
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy)
        if (speed > 3) { p.vx = (p.vx / speed) * 3; p.vy = (p.vy / speed) * 3 }

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > width) p.vx *= -1
        if (p.y < 0 || p.y > height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(0, 255, 255, 0.7)"
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p.x - p2.x
          const dy = p.y - p2.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const opacity = 1 - dist / MAX_DIST
            ctx.beginPath()
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(0,255,255,${opacity * 0.25})`
            ctx.lineWidth = 1
            ctx.stroke()
          }
        }
      }

      animationFrame = requestAnimationFrame(drawParticles)
    }

    // Mouse events
    const onMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onMouseLeave = () => { pointer = { x: null, y: null } }

    // Touch events (passive — won't block scroll)
    const onTouchMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const t = e.touches[0]
      pointer = { x: t.clientX - rect.left, y: t.clientY - rect.top }
    }
    const onTouchEnd = () => { pointer = { x: null, y: null } }

    section.addEventListener('mousemove', onMouseMove)
    section.addEventListener('mouseleave', onMouseLeave)
    section.addEventListener('touchmove', onTouchMove, { passive: true })
    section.addEventListener('touchend', onTouchEnd)

    resize()
    createParticles()
    drawParticles()

    let lastWidth = width
    window.addEventListener("resize", () => {
      const newWidth = canvas.getBoundingClientRect().width
      resize()
      if (Math.abs(newWidth - lastWidth) > 10) {
        createParticles()
        lastWidth = newWidth
      }
    })

    return () => {
      cancelAnimationFrame(animationFrame)
      window.removeEventListener("resize", resize)
      section.removeEventListener('mousemove', onMouseMove)
      section.removeEventListener('mouseleave', onMouseLeave)
      section.removeEventListener('touchmove', onTouchMove)
      section.removeEventListener('touchend', onTouchEnd)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}
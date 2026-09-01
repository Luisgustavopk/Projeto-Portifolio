import React, { useEffect, useRef } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'

export const AmbientGlow = () => {
  const { levelRef } = usePlayer()
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

  
    const particleCount = 45
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: Math.random() * 1.6 + 0.6,
      speedY: Math.random() * 0.3 + 0.1,
      speedX: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.15,
    }))

    let wavePhase = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const rawLevel = levelRef?.current || 0
      const amp = Math.pow(rawLevel, 0.6)

      const centerX = canvas.width / 2
      const centerY = canvas.height * 0.32

      wavePhase += 0.008 + amp * 0.02

     
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 20,
        centerX, centerY, 380 + amp * 80
      )
      gradient.addColorStop(0, `rgba(37, 99, 235, ${0.18 + amp * 0.12})`)
      gradient.addColorStop(0.55, `rgba(14, 165, 233, ${0.07 + amp * 0.06})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, 420 + amp * 80, 0, Math.PI * 2)
      ctx.fill()

      const waveCount = 6
      for (let i = 0; i < waveCount; i++) {
        const baseRadius = 85 + i * 50
        const waveAmp = (5 + i * 2) + amp * (12 + i * 6)
        const currentOpacity = Math.max(0, (0.01 + amp * 0.2) - i * 0.006)

        ctx.beginPath()
        
        const step = 0.05
        for (let theta = 0; theta <= Math.PI * 2 + step; theta += step) {
          const distortion = Math.sin(theta * (3 + (i % 3)) + wavePhase * 1.5 + i) * waveAmp
          const r = baseRadius + distortion + (amp * 10 * (i + 1))
          
          const x = centerX + r * Math.cos(theta)
          const y = centerY + r * Math.sin(theta)

          if (theta === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }

        ctx.closePath()
        ctx.lineWidth = 1

        ctx.strokeStyle = i % 2 === 0
          ? `rgba(59, 130, 246, ${currentOpacity})`
          : `rgba(6, 182, 212, ${currentOpacity})`

        if (i % 2 === 1) {
          ctx.setLineDash([5, 9])
        } else {
          ctx.setLineDash([])
        }

        ctx.stroke()
      }

  
      ctx.setLineDash([])
      particles.forEach((p) => {
        p.y -= p.speedY + amp * 1.2
        p.x += Math.sin(wavePhase + p.y * 0.005) * p.speedX

        if (p.y < 0) {
          p.y = canvas.height
          p.x = Math.random() * canvas.width
        }

        const particleRadius = p.radius + amp * 1.4
        const currentAlpha = Math.min(0.75, p.alpha + amp * 0.35)

        ctx.beginPath()
        ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(147, 197, 253, ${currentAlpha})`
        ctx.shadowBlur = 4 + amp * 8
        ctx.shadowColor = 'rgba(59, 130, 246, 0.7)'
        ctx.fill()
        ctx.shadowBlur = 0
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [levelRef])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}

export default AmbientGlow
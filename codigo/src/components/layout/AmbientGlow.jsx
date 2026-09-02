import React, { useEffect, useRef } from 'react'
import { usePlayer } from '../../context/PlayerContext.jsx'

export const AmbientGlow = () => {
  const { levelRef, isPlaying } = usePlayer()
  const canvasRef = useRef(null)
  const particlesRef = useRef(null)
  const isPlayingRef = useRef(isPlaying)

  useEffect(() => {
    isPlayingRef.current = isPlaying
  }, [isPlaying])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId

    const musicalNotes = ['♪', '♫', '♩', '♬']

    // 1. Calcula a quantidade de partículas baseada na área da tela
    const calcParticleCount = (w, h) => {
      const area = w * h
      const count = Math.floor(area / 45000)
      return Math.max(12, Math.min(55, count)) // Min 12 (Mobile) até 55 (2K/4K)
    }

    let activeParticleCount = 0
    let speedScale = 1.0 // Fator de ajuste de velocidade proporcional à altura

    // 2. Criação/Manutenção do pool de partículas
    const ensureParticles = (targetCount, w, h) => {
      if (!particlesRef.current) {
        particlesRef.current = []
      }
      while (particlesRef.current.length < targetCount) {
        const index = particlesRef.current.length
        particlesRef.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          radius: Math.random() * 1.6 + 0.6,
          speedY: Math.random() * 0.3 + 0.1,
          speedX: (Math.random() - 0.5) * 0.25,
          alpha: Math.random() * 0.4 + 0.15,
          isNoteCandidate: index % 4 === 0, // ~25% viram notas musicais
          noteChar: musicalNotes[Math.floor(Math.random() * musicalNotes.length)],
          baseFontSize: Math.floor(Math.random() * 4) + 11,
          noteProgress: 0,
        })
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Ajusta a velocidade relativa usando 1200px de altura como referência (ideal para 2K/Full HD)
      // Evita que caia abaixo de 0.35x em telas extremamente pequenas
      speedScale = Math.max(0.35, canvas.height / 1200)

      activeParticleCount = calcParticleCount(canvas.width, canvas.height)
      ensureParticles(activeParticleCount, canvas.width, canvas.height)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    let wavePhase = 0

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const isMobile = canvas.width < 768
      const opacityFactor = isMobile ? 0.45 : 1.0
      const scaleFactor = isMobile ? 0.65 : 1.0

      const rawLevel = levelRef?.current || 0
      const amp = Math.pow(rawLevel, 0.6)

      const centerX = canvas.width / 2
      const centerY = canvas.height * (isMobile ? 0.25 : 0.32)

      wavePhase += 0.008 + amp * 0.02

      // 1. Gradiente radial de fundo
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 20 * scaleFactor,
        centerX, centerY, (380 + amp * 80) * scaleFactor
      )
      gradient.addColorStop(0, `rgba(37, 99, 235, ${(0.18 + amp * 0.12) * opacityFactor})`)
      gradient.addColorStop(0.55, `rgba(14, 165, 233, ${(0.07 + amp * 0.06) * opacityFactor})`)
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, (420 + amp * 80) * scaleFactor, 0, Math.PI * 2)
      ctx.fill()

      // 2. Ondas e anéis orbitais
      const waveCount = 6
      for (let i = 0; i < waveCount; i++) {
        const baseRadius = (85 + i * 50) * scaleFactor
        const waveAmp = ((5 + i * 2) + amp * (12 + i * 6)) * scaleFactor
        const currentOpacity = Math.max(0, ((0.01 + amp * 0.45) - i * 0.006) * opacityFactor)

        ctx.beginPath()
        
        const step = 0.05
        for (let theta = 0; theta <= Math.PI * 2 + step; theta += step) {
          const distortion = Math.sin(theta * (3 + (i % 3)) + wavePhase * 1.5 + i) * waveAmp
          const r = baseRadius + distortion + (amp * 10 * (i + 1) * scaleFactor)
          
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

      // 3. Renderização proporcional das partículas com velocidade adaptativa por escala
      ctx.setLineDash([])
      for (let i = 0; i < activeParticleCount; i++) {
        const p = particlesRef.current[i]
        if (!p) continue

        // Aplicação do speedScale para manter a velocidade constante independente da altura
        p.y -= (p.speedY + amp * 1.2) * speedScale
        p.x += Math.sin(wavePhase + p.y * 0.005) * (p.speedX * speedScale)

        if (p.y < 0) {
          p.y = canvas.height
          p.x = Math.random() * canvas.width
        }

        // Transição suave do progresso (0 a 1)
        if (p.isNoteCandidate) {
          const target = isPlayingRef.current ? 1 : 0
          p.noteProgress += (target - p.noteProgress) * 0.04
        }

        const currentAlpha = Math.min(0.85, (p.alpha + amp * 0.35) * opacityFactor)

        // Renderiza o ponto glow (opacidade diminui conforme vira nota)
        if (p.noteProgress < 0.99) {
          const glowAlpha = currentAlpha * (1 - p.noteProgress)
          const particleRadius = (p.radius + amp * 1.4) * (isMobile ? 0.75 : 1)

          ctx.beginPath()
          ctx.arc(p.x, p.y, particleRadius, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(147, 197, 253, ${glowAlpha})`
          ctx.shadowBlur = (4 + amp * 8) * scaleFactor
          ctx.shadowColor = `rgba(59, 130, 246, ${0.7 * (1 - p.noteProgress)})`
          ctx.fill()
          ctx.shadowBlur = 0
        }

        // Renderiza a nota musical (opacidade aumenta conforme vira nota)
        if (p.noteProgress > 0.01) {
          const noteAlpha = currentAlpha * p.noteProgress
          const fontSize = (p.baseFontSize + amp * 5) * (isMobile ? 0.85 : 1)

          ctx.font = `${fontSize}px sans-serif`
          ctx.fillStyle = `rgba(147, 197, 253, ${noteAlpha})`
          ctx.shadowBlur = (6 + amp * 10) * scaleFactor * p.noteProgress
          ctx.shadowColor = 'rgba(59, 130, 246, 0.9)'
          ctx.fillText(p.noteChar, p.x, p.y)
          ctx.shadowBlur = 0
        }
      }

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
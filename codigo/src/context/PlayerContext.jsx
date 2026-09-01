import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'

const PlayerContext = createContext(null)

// Player de música do popover do disco de vinil (navbar). Começa sem nada
// tocando; ao escolher uma faixa, toca baixinho e alimenta "levelRef" com a
// intensidade do áudio em tempo real (Web Audio API), pra quem quiser reagir
// visualmente a isso (ver AmbientGlow) sem precisar de um re-render do React
// a cada frame — é só um número (0..1) atualizado 60x/s numa ref.
export function PlayerProvider({ children }) {
  const audioRef = useRef(null)
  const audioCtxRef = useRef(null)
  const analyserRef = useRef(null)
  const dataArrayRef = useRef(null)
  const rafRef = useRef(null)
  const levelRef = useRef(0)
  const bandsRef = useRef({ bass: 0, mid: 0, treble: 0 })

  const [currentTrackId, setCurrentTrackId] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const tick = useCallback(() => {
    const analyser = analyserRef.current
    const data = dataArrayRef.current
    if (analyser && data) {
      analyser.getByteFrequencyData(data)

      const third = Math.floor(data.length / 3)
      let bass = 0
      let mid = 0
      let treble = 0
      for (let i = 0; i < third; i++) bass += data[i]
      for (let i = third; i < third * 2; i++) mid += data[i]
      for (let i = third * 2; i < data.length; i++) treble += data[i]
      bandsRef.current.bass = bass / third / 255
      bandsRef.current.mid = mid / third / 255
      bandsRef.current.treble = treble / (data.length - third * 2) / 255

      let sum = 0
      for (let i = 0; i < data.length; i++) sum += data[i]
      levelRef.current = sum / data.length / 255
    }
    rafRef.current = requestAnimationFrame(tick)
  }, [])

  const ensureGraph = useCallback(() => {
    if (audioCtxRef.current || !audioRef.current) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 128
      analyser.smoothingTimeConstant = 0.8
      const source = ctx.createMediaElementSource(audioRef.current)
      source.connect(analyser)
      analyser.connect(ctx.destination)
      audioCtxRef.current = ctx
      analyserRef.current = analyser
      dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount)
      tick()
    } catch (err) {
      // Web Audio pode não estar disponível em algum navegador/contexto —
      // a música continua tocando normalmente, só a reação visual desliga.
      console.warn('Visualizador de áudio indisponível:', err)
    }
  }, [tick])

  useEffect(() => {
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      audioCtxRef.current?.close()
    }
  }, [])

  async function playTrack(track) {
    const audio = audioRef.current
    if (!audio) return

    if (currentTrackId === track.id) {
      togglePlay()
      return
    }

    audio.src = track.src
    audio.volume = 0.18
    setCurrentTrackId(track.id)

    try {
      ensureGraph()
      if (audioCtxRef.current?.state === 'suspended') await audioCtxRef.current.resume()
      await audio.play()
      setIsPlaying(true)
    } catch (err) {
      console.warn('Não foi possível iniciar a reprodução — verifique se o arquivo de áudio existe:', err)
      setIsPlaying(false)
    }
  }

  function togglePlay() {
    const audio = audioRef.current
    if (!audio || !currentTrackId) return
    if (audio.paused) {
      audio.play()
      setIsPlaying(true)
    } else {
      audio.pause()
      setIsPlaying(false)
    }
  }

  const value = { currentTrackId, isPlaying, playTrack, togglePlay, levelRef, bandsRef }

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio ref={audioRef} loop onEnded={() => setIsPlaying(false)} preload="none" />
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer precisa estar dentro de <PlayerProvider>')
  return ctx
}

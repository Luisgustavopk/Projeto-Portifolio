import { useRef } from 'react'

// Personalidade emprestada do estilo comum em galerias como o 21st.dev: um
// brilho radial que segue o cursor dentro do card. Reimplementado do zero em
// CSS vars + Tailwind (sem copiar código de terceiros) — leve o suficiente
// pra usar em qualquer card do site.
export default function useSpotlight() {
  const ref = useRef(null)

  function onMouseMove(event) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--spot-y', `${event.clientY - rect.top}px`)
  }

  return { ref, onMouseMove }
}

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Sempre que a URL tiver um hash (#projetos, #contato...), rola suavemente
// até o elemento com esse id. O pequeno atraso garante que a seção já foi
// montada (e a transição de página já começou) antes do scroll iniciar.
export default function useHashScroll() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return undefined

    const id = location.hash.replace('#', '')
    const timeout = setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 150)

    return () => clearTimeout(timeout)
  }, [location])
}

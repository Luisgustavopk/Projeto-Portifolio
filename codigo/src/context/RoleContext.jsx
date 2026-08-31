import { createContext, useContext, useEffect, useMemo, useState } from 'react'

// Níveis de acesso (Sprint 2): a pessoa escolhe quem ela é e o site
// reprioriza o conteúdo pra o que mais importa pra aquele perfil.
export const ROLES = {
  visitante: {
    id: 'visitante',
    label: 'Visitante',
    ctaLabel: 'Ver Projetos',
    description: 'Visão geral equilibrada do portfólio.',
  },
  recrutador: {
    id: 'recrutador',
    label: 'Recrutador',
    ctaLabel: 'Ver Experiências',
    description: 'Prioriza formação, experiências e trajetória profissional.',
  },
  tecnico: {
    id: 'tecnico',
    label: 'Técnico',
    ctaLabel: 'Ver Repositórios',
    description: 'Prioriza stack, arquitetura e código dos projetos.',
  },
}

const STORAGE_KEY = 'portfolio:role'
const RoleContext = createContext(null)

export function RoleProvider({ children }) {
  const [role, setRole] = useState(() => {
    if (typeof window === 'undefined') return ROLES.visitante.id
    return window.localStorage.getItem(STORAGE_KEY) || ROLES.visitante.id
  })

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, role)
  }, [role])

  const value = useMemo(() => ({ role, setRole, roleInfo: ROLES[role] }), [role])

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
}

export function useRole() {
  const ctx = useContext(RoleContext)
  if (!ctx) throw new Error('useRole precisa estar dentro de <RoleProvider>')
  return ctx
}

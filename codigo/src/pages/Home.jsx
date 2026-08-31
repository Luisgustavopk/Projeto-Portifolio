import { motion } from 'framer-motion'
import Hero from '../components/sections/Hero.jsx'
import TechStack from '../components/sections/TechStack.jsx'
import Projects from '../components/sections/Projects.jsx'
import Contact from '../components/sections/Contact.jsx'
import RecruiterHighlight from '../components/sections/RecruiterHighlight.jsx'
import { useRole } from '../context/RoleContext.jsx'

// Sprint 2 — níveis de acesso: a ordem do conteúdo (depois do Hero) muda
// conforme o perfil selecionado no navbar.
// - técnico: projetos vêm antes da faixa de stack (prova de trabalho primeiro)
// - recrutador: banner com a experiência mais recente, direto após o Hero
// - visitante: ordem padrão
const BODY_ORDER = {
  visitante: ['techstack', 'projects'],
  tecnico: ['projects', 'techstack'],
  recrutador: ['highlight', 'techstack', 'projects'],
}

const BODY_SECTIONS = {
  techstack: TechStack,
  projects: Projects,
  highlight: RecruiterHighlight,
}

export default function Home() {
  const { role } = useRole()
  const order = BODY_ORDER[role] || BODY_ORDER.visitante

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <Hero />
      {order.map((key) => {
        const Section = BODY_SECTIONS[key]
        return <Section key={key} />
      })}
      <Contact />
    </motion.div>
  )
}

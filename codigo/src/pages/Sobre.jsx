import { motion } from 'framer-motion'
import SobreMim from '../components/sections/SobreMim.jsx'
import Experiencia from '../components/sections/Experiencia.jsx'
import Contact from '../components/sections/Contact.jsx'
import Interesses from '../components/sections/Interesses.jsx'
import { useRole } from '../context/RoleContext.jsx'

// Sprint 2 — níveis de acesso: a ordem das seções muda conforme o perfil
// selecionado no navbar, priorizando o que mais importa pra cada um.
const SECTION_ORDER = {
  visitante: ['sobre', 'interesses', 'experiencia'],
  recrutador: ['experiencia', 'sobre', 'interesses'],
  tecnico: ['sobre', 'experiencia', 'interesses'],
}

const SECTIONS = {
  sobre: SobreMim,
  experiencia: Experiencia,
  interesses: Interesses,
}

export default function Sobre() {
  const { role } = useRole()
  const order = SECTION_ORDER[role] || SECTION_ORDER.visitante

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
      className="pt-40"
    >
      {order.map((key) => {
        const Section = SECTIONS[key]
        return <Section key={key} />
      })}
      <Contact />
    </motion.div>
  )
}

import { motion } from 'framer-motion'

// Placeholder da Sprint 1 — aqui entram as seções "Sobre Mim" (PT/EN) e
// "Experiências", assim que o layout dessa página for adaptado também.
export default function Sobre() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      <section className="pt-40 pb-24 max-w-4xl mx-auto px-6">
        <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">// Em construção</span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Sobre Mim & Experiências</h1>
        <p className="text-xs text-neutral-500 font-mono mt-4">Sprint 1 — layout ainda não implementado.</p>
      </section>
    </motion.div>
  )
}

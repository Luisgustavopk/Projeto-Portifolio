import AmbientGlow from '../components/layout/AmbientGlow.jsx'
import Navbar from '../components/layout/Navbar.jsx'

// Placeholder da Sprint 1 — aqui entram as seções "Sobre Mim" (PT/EN) e
// "Experiências", assim que o layout dessa página for adaptado também.
export default function Sobre() {
  return (
    <>
      <AmbientGlow />
      <Navbar />
      <section className="pt-40 pb-24 max-w-4xl mx-auto px-6">
        <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">// Em construção</span>
        <h1 className="text-2xl font-bold text-white tracking-tight mt-2">Sobre Mim & Experiências</h1>
      </section>
    </>
  )
}

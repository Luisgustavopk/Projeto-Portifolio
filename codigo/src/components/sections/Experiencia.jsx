import { experiences } from '../../data/experiences.js'

export default function Experiencia() {
  return (
    <section id="experiencias" className="max-w-4xl mx-auto px-6 py-16 space-y-8 scroll-mt-28">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Experiências</h2>
        <span className="text-xs font-mono text-neutral-500">Estágios, freelas & projetos</span>
      </div>

      <div className="relative pl-6 space-y-6">
        <div className="absolute left-[3px] top-2 bottom-2 w-px bg-white/10"></div>
        {experiences.map((exp) => (
          <div key={exp.id} className="relative">
            <span className="absolute -left-6 top-1.5 w-2 h-2 rounded-full bg-blue-500"></span>
            <div className="bg-darkCard border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h3 className="text-base font-bold text-white">{exp.cargo}</h3>
                <span className="text-[11px] font-mono text-neutral-500">{exp.periodo}</span>
              </div>
              <p className="text-xs font-mono text-blue-400 mb-2">{exp.empresa}</p>
              <p className="text-xs text-neutral-400 leading-relaxed">{exp.descricao}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

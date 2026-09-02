import { profile } from '../../data/profile.js'

export default function SobreMim() {
  return (
    <section id="sobre-mim" className="max-w-4xl mx-auto px-6 py-16 space-y-8 scroll-mt-28">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        Sobre Mim
      </div>

      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight leading-tight">
        {profile.headline.pt}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">Português</span>
          <p className="text-sm text-neutral-400 leading-relaxed">{profile.bio.pt}</p>
        </div>
        <div className="space-y-2">
          <span className="text-[11px] font-mono text-neutral-500 uppercase tracking-wider">English</span>
          <p className="text-sm text-neutral-400 leading-relaxed">{profile.bio.en}</p>
        </div>
      </div>

      <div className="space-y-3">
        <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">Principais Tecnologias </span>
        <div className="flex flex-wrap gap-2">
          {profile.areaAtuacao.map((tech) => (
            <span key={tech} className="text-[11px] font-mono px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-300">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

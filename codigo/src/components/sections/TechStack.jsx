import { techStack, logoUrl } from '../../data/techStack.js'

// Duplicamos a lista pra criar o loop contínuo: quando a primeira metade
// sai da tela, a segunda (idêntica) já está entrando no mesmo ponto —
// então o "-50%" no keyframe do marquee fecha o ciclo sem salto visível.
const track = [...techStack, ...techStack]

export default function TechStack() {
  return (
    <div className="w-full bg-[#0D0D10]/80 border-b border-white/[0.06] py-6 backdrop-blur-sm overflow-hidden">
      <div className="max-w-4xl mx-auto border-x border-white/10 relative overflow-hidden">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] py-3">
          {track.map((tech, index) => (
            <div key={`${tech.slug}-${index}`} className="flex items-center gap-3 px-8 shrink-0">
              <img src={logoUrl(tech.slug)} alt="" className="tech-icon w-5 h-5" loading="lazy" />
              <span className="text-sm font-mono text-white font-medium whitespace-nowrap">{tech.name}</span>
            </div>
          ))}
        </div>
        {/* fade nas bordas pra suavizar a entrada/saída dos ícones */}
       <div className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-[#09090d] to-transparent"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#09090d] to-transparent"></div>
      </div>
    </div>
  )
}

import { Link } from 'react-router-dom'
import { IconChevronDown } from '../ui/icons.jsx'
import { useRole } from '../../context/RoleContext.jsx'

const CTA_HREF = {
  visitante: '#projetos',
  tecnico: '#projetos',
  recrutador: '/sobre#experiencias',
}

const SUBTITLE = {
  visitante:
    'Desenvolvendo aplicações completas, APIs robustas e arquiteturas resilientes. Foco em código limpo, boas práticas e alta performance.',
  tecnico:
    'Desenvolvendo aplicações completas, APIs robustas e arquiteturas resilientes. Confira a stack, o código e os repositórios de cada projeto.',
  recrutador:
    'Engenheiro de software em formação, com experiências, estágios e projetos organizados numa trajetória clara — direto ao ponto.',
}

export default function Hero() {
  const { role, roleInfo } = useRole()

  return (
    <section className="pt-40 pb-20 border-b border-white/[0.06]">
      <div className="max-w-4xl mx-auto px-6 space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          Engenharia de Software — PUC Minas
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Luis Gustavo <span className="text-neutral-500 font-normal">/ Software Engineer</span>
        </h1>

        <p className="text-base text-neutral-400 max-w-2xl font-normal leading-relaxed">{SUBTITLE[role] || SUBTITLE.visitante}</p>

        <div className="flex items-center gap-4 pt-4">
          <Link
            to={CTA_HREF[role] || CTA_HREF.visitante}
            className="bg-white text-black text-xs font-semibold px-5 py-3 rounded-lg hover:bg-neutral-200 transition-colors flex items-center gap-2"
          >
            {roleInfo.ctaLabel}
            <IconChevronDown />
          </Link>
          <Link
            to="#contato"
            className="bg-[#121216] border border-white/10 text-white text-xs font-semibold px-5 py-3 rounded-lg hover:bg-white/5 transition-colors"
          >
            Entrar em Contato
          </Link>
        </div>
      </div>
    </section>
  )
}

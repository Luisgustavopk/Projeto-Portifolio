import { Link } from 'react-router-dom'
import { experiences } from '../../data/experiences.js'
import { IconChevronDown } from '../ui/icons.jsx'

export default function RecruiterHighlight() {
  const latest = experiences[0]
  if (!latest) return null

  return (
    <div className="max-w-4xl mx-auto px-6 py-6">
      <Link
        to="/sobre#experiencias"
        className="flex items-center justify-between gap-4 bg-darkCard border border-blue-500/20 hover:border-blue-500/40 rounded-xl p-5 transition-all group"
      >
        <div>
          <span className="text-[11px] font-mono text-blue-400 uppercase tracking-widest">Experiência mais recente</span>
          <p className="text-sm font-bold text-white mt-1">
            {latest.cargo} <span className="text-neutral-500 font-normal">— {latest.empresa}</span>
          </p>
          <p className="text-xs text-neutral-500 font-mono mt-1">{latest.periodo}</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-blue-400 shrink-0">
          Ver trajetória completa
          <IconChevronDown className="w-3.5 h-3.5 -rotate-90 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  )
}

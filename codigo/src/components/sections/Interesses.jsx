import { profile } from '../../data/profile.js'

export default function Interesses() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16 space-y-8">
      <div className="border-b border-white/10 pb-4">
        <h2 className="text-2xl font-bold text-white tracking-tight">Interesses & Objetivos</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {profile.interesses.map((item, index) => (
          <div key={item.title + index} className="bg-darkCard border border-white/10 rounded-xl p-5">
            <span className="text-[11px] font-mono text-neutral-600 block mb-3">0{index + 1}</span>
            <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

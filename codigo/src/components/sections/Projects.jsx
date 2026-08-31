import ProjectCard from './ProjectCard.jsx'
import { projects } from '../../data/projects.js'

export default function Projects() {
  const timeline = [...projects].sort((a, b) => a.year - b.year)

  return (
    <section id="projetos" className="max-w-4xl mx-auto px-6 py-24 space-y-10 scroll-mt-28">
      <div className="flex justify-between items-end border-b border-white/10 pb-4">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Projetos em Destaque</h2>
        </div>
        <span className="text-xs font-mono text-neutral-500">Timeline Recente</span>
      </div>

      <div className="relative">
        <div className="hidden md:block absolute top-3 left-0 right-0 h-px bg-white/10"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {timeline.map((project) => (
            <div key={project.id} className="relative">
              <div className="hidden md:flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                <span className="text-[11px] font-mono text-neutral-500">{project.year}</span>
              </div>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
